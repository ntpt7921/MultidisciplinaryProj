# Sequence diagram for use cases within the system

## Get current state of system

```mermaid
sequenceDiagram
    participant ui as UI
    participant s as Server Services
    participant db as Database

    ui->>+s: Request current state
    s->>+db:Query data
    db->>-s: Return data
    s->>-ui: Return current state
```

## Send command to Yolo:bit

```mermaid
sequenceDiagram
    participant ui as UI
    participant s as Server Services
    participant db as Database
    participant b as MQTT broker
    participant y as Yolobit

    ui->>+s: Send command
    s->>+b: Send command
    b-)+y: Send command
    y-->>-b: Return result
    b-->>-s: Return result
    s->>+db: Save state
    s-->>-ui: Return result
```

## Get information sent from Yolo:bit into database

```mermaid
sequenceDiagram
    participant y as Yolobit
    participant b as MQTT broker
    participant s as Server Services
    participant db as Database

    y-)+b: Data (sensor/device)
    b-)+s: Data from Yolobit
    s-)+db: Put data into DB
```
