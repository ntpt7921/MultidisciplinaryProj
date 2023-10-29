# Outline of project

Input: 
- PIR sensor - P0
- Temp and humidity (DHT20) - I2C1 port
- Soil humidity - P1 (ADC) port
- Ultra sonic - dual port P3/P6
- Camera - not really an input but needed, on laptop or phone
    - one for presence detection 
    - one for face id and presence detection

Output:
- Relay - P2
- Fan - P14/P15
- Servo - header P4
- Buzzer - onboard
- RGB LED - P16/P12
- Pump - dual port P10/P13

Functionality:
- Door control (open/close) - with face ID and proximity sensor
- Device control
    - Fan control (with PWM)
    - Other device control (with relay)
    - Light control (RGB LED), which will use AI and PIR for presence detection
- Plant watering
- Environment monitoring
    - Ground humidity
    - Air temp/humidity

# General detail from the Yolo:bit viewpoint

## Reading sensor (input)

- Using event, read the value of the sensor every x seconds:
    - PIR sensor (high/low) voltage, indicating have/have not people
    - DHT20, through I2C, update readings, then read them
    - Soil humidity, read value within range (0, 100)
    - Ultra sonic (use command to read value)

- AI result on dedicated MQTT topic: can not be read, but received from the server
    - presence detection result
    - face id result

## MQTT message format

We assume that there is multiple implementation of the system, each with different `room_id` and
`house_id`. All instance of the system will send/receive by the same centralized topic. So to
differentiate each instance, every packet of information sent/received by the system must have the
following format: `<house_id>;<room_id>;<content>`.

Each Yolo:bit instance is expected to be able to parse the packet, determining if the packet is
directed toward itself or not. If `house_id` and `room_id` match, then process the content; if not
then discard the packet.

## Control signal sent through MQTT topics

Since we are not sure about the QoS provided by the Yolo:bit, and also because we need some type of
feedback when remotely controlling the system. For each control topic, there will be a state topic
representing the current state of the peripherals. There will also be a result code topic for each
action.

All the control triplet are:
- For the door (servo)
- Fan
- Relay
- RGB LED color
- Pump

There will be other topics serving other functionality, those will be mentioned with the
functionality description.

**Assumption:** for control triplet (unless noted otherwise), "0" string means negative,
deactivated, disabled; "1" string means positive, activated, enabled. This is applied only to
command and status topic. The result code return can have arbitrary string.

# Specific for all use case

## Current state reporting

### Description

We need a way for the system to report its current state (input/output states). Not really a user
facing use case, since only other component communicating with the Yolo:bit need this.

We define a topic, into which the Yolo:bit will listen. If any message is publish into this topic,
the system will responds with it states.

### MQTT topics

- Input state:
    - `<prefix>/report_current state/input`
- Output state (we only send door, light, pump, relay, fan)
    - `<prefix>/report_current state/output`

## Environment monitoring

### Description

Read sensor (DHT20, soil humid). For each sensor, sent info through MQTT to broker->database

### MQTT topics

- Air temp topic 
    - `<prefix>/input/air_temp`
- Air humidity topic 
    - `<prefix>/input/air_humid`
- Soil humidity topic
    - `<prefix>/input/soil_humid`

## Plan watering

### Description

The plant is watered when only when the soil humidity is low enough. The user can trigger the
watering. Upon detection of dry soil, a notification is send to the user.

To prevent over-watering, a sequence of 30s of idle time + 2s of pump run time is used. This will
hopefully ensure the water have time to spread out and affect the sensor reading (prevent pumping
too much water too fast).

```mermaid
stateDiagram-v2
    need_water: Need water 
    no_need_water: Do not need water (0)
    
    
    no_need_water --> need_water: Soil humidity is lower than (lower) limit
    need_water --> no_need_water: Soil humidity is higher than (upper) limit

    note right of no_need_water
    When there is no need for water, the system will 
    refuse the pump more water (even if the user 
    requested it)
    end note

    note left of need_water
    Under the user request, the system will pump more 
    water in 2 seconds spurt, spaced out by 30 seconds 
    of dispersing time.

    A notification will be send to the user upon entering 
    this state.
    end note

    state need_water {
        halt: Do nothing (1)
        wait: 30s delay (2)
        spurt: Run pump 2s (3)

        [*] --> halt
        halt --> wait: User send pump command
        wait --> spurt
        spurt --> wait
    }
```

### MQTT topics

- Pump control triplet
    - `<prefix>/output/pump/state`
    - `<prefix>/output/pump/result`
    - `<prefix>/output/pump/command`
- A notification topic
    - `<prefix>/plant_watering/notification`

## Light control

### Description

The light can be controlled by the user by changing the RGB triplet value. To turn off the light,
set the triplet to (0, 0, 0). Any color and brightness is achievable through changing this triplet.

For the light on/off control, activation can also be achieved through 
- User control
- PIR motion detection at night.

The set RGB triplet will persist up until the automatically turn off. When it automatically turn on
again, the color will be fixed (hard-coded), user have to change this again.

```mermaid
stateDiagram-v2
    manual: Controlled by user (3)
    automatic: Automatically controlled

    automatic --> manual: Receive user command
    manual --> manual: Receive user command
    manual --> automatic: After 10 minutes without user command

    note left of manual
    The light can either be on or off in this state
    end note

    note right of automatic
    There are 3 sub-state, each with specified light state:
    - User not detected: light off
    - Delay (15s) and user detected: light on

    The design assume that presence detection by the camera requires
    light to be on. As such, we use a complementary PIR sensor for
    motion detection to decide if the light should be turn on so that
    camera can take picture of the room.
    end note

    state automatic {
        direction RL
        have_presence: User detected (2)
        no_presence: User not detected (0)
        detection_delay: Delay 15s (1)

        state condition <<choice>>
        [*] --> condition
        condition --> detection_delay: if light is on
        condition --> no_presence: if light is off

        have_presence --> detection_delay: User not detected
        detection_delay --> have_presence: User detected

        detection_delay --> no_presence: User not detected
        no_presence --> detection_delay: PIR detects motion
    }
```

### MQTT topics

- light color control triplet 
    - `<prefix>/output/rgb_led/state`
    - `<prefix>/output/rgb_led/result`
    - `<prefix>/output/rgb_led/command`

    **Note**: The value sent to state and command will be a concatenation of the RGB triplet writen
    in decimal value, zero-filled to 3 digit, in that specific order.

    **Example**: For #FFFFFF, the corresponding string is "255255255"; for #000000, the string is
    "000000000"; for #00FF00, the string is "000255000".

- human presence result from AI topic
    - `<prefix>/light_control/presence`

- light control notification
    - `<prefix>/light_control/notification`

## Fan control / Other device control

### Description

The device (fan, relay-connected device) can be controlled remotely by the user. The user can
see device state.
- For fan: PWM duty cycle
- For relay: On/Off state 

### MQTT topics

- For fan: control triplet
    - `<prefix>/output/fan/state`
    - `<prefix>/output/fan/result`
    - `<prefix>/output/fan/command`

    **Note**: The value sent to state and command will be a natural number in range [0-100],
    formatted as a string.

- For relay: control triplet
    - `<prefix>/output/relay/state`
    - `<prefix>/output/relay/result`
    - `<prefix>/output/relay/command`

## Door control

### Description

The door can be controlled automatically. Process is as followed:

1. User come near the door (detected through ultrasound)

2. Sound the buzzer to notify user of face id

3. ID result become available  
- If face id passed, open the door
- If not, do nothing, return to step 2 after some delay time

4. Wait until ultrasound does not detect user any more, close the door 

Or the door can be controlled remotely.

```mermaid
stateDiagram-v2
    manual: Controlled by user (3)
    automatic: Automatically controlled

    automatic --> manual: Receive user command
    manual --> manual: Receive user command
    manual --> automatic: After 30 seconds without user command

    note left of manual
    The door can either be open or close in this state
    end note

    note right of automatic
    There are 3 sub-states:
    - User not detected: door is close
    - Identification delay: door is close, send invoke signal to
      camera-attached device for face ID
    - User detected: door is open

    We assume that the face ID camera is always able to capture
    images and process them. The ultrasonic is there to detect user
    presence, which will activate the camera presence detection.
    end note

    state automatic {
        direction LR
        have_presence: User detected (2)
        no_presence: User not detected (0)
        id_delay: Identification delay 15s (1)

        state selection <<choice>>
        [*] --> selection
        selection --> no_presence: if door is close
        selection --> have_presence: if door is open

        no_presence --> id_delay: Ultrasonic detects user
        id_delay --> no_presence: Fail identification
        id_delay --> have_presence: Pass identification
        have_presence --> no_presence: Ultrasonic does not detects user
    }

```

### MQTT topics

- door control triplet 
    - `<prefix>/output/door/state`
    - `<prefix>/output/door/result`
    - `<prefix>/output/door/command`
- camera face id 
    - activation topic `<prefix>/door_control/id_activate`
    - result topic `<prefix>/door_control/id_result`
- door control notification
    - `<prefix>/door_control/notification`
