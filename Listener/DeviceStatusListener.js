const mqtt = require("mqtt")
const db_connect = require('./DBconnection');

fans = []
lights = []

db_connect.getConnection(function(err){

    var query = `select * from devices`;
    db_connect.query(query, (err, res)=>{
        res.forEach(data => {
            if(data.device_name.includes("fan"))
            {
                fans.push({house : data.house_id, room : data.room_id, id:  data.device_id});
            }
            else
            {
                lights.push({house : data.house_id, room : data.room_id, id:  data.device_id});
            }
        });


        const client = mqtt.connect('mqtt://127.0.0.1:1883');
        client.on('connect', function () {
              client.subscribe('output/fan/state');
              client.subscribe('output/light/state');
        });

        client.on('message', (topic, message)=>{
            //console.log(`topic: ${topic}, message: ${message}`);
            var data = message.toString().split(';');
            var house = data[0];
            var room = data[1];
            var device = data[2];
            var state = data[3];
            var query = `update devices set status=${state} where house_id=${house} and room_id=${room} and device_id=${device}`;
            db_connect.query(query);
        });

        setInterval(requestState, 1000);
        function requestState()
        {
            fans.forEach(fan => {
                message = fan.house + ';' + fan.room + ';' + fan.id + ';';
                client.publish('input/fan/state', message);
            })

            lights.forEach(light => {
                message = light.house + ';' + light.room + ';' + light.id + ';';
                client.publish('input/light/state', message);
            })
        }
    });
});

