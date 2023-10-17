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

There will be other topics serving each functionality, those will be mentioned with the
functionality description.

# Specific for all use case

## Environment monitoring

### Description

Read sensor (DHT20, soil humid). For each sensor, sent info through MQTT to broker->database

### MQTT topics

- Air temp topic 
- Air humidity topic 
- Soil humidity topic

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
- A notification topic

## Light control

### Description

The light can be controlled remotely by the user. The user can see device state.
- Color

For the light on/off control, activation can also be achieved through 
- User control
- PIR motion detection at night.

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
- human presence result from AI topic

## Fan control / Other device control

### Description

The device (fan, relay-connected device) can be controlled remotely by the user. The user can
see device state.
- For fan: PWM duty cycle
- For relay: On/Off state 

### MQTT topics

- For fan: control triplet
- For relay: control triplet

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
- camera face id 
    - activation topic 
    - result topic 
