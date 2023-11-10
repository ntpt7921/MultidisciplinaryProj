const mqtt = require("mqtt")
const moment = require('moment');
const db_connect = require('./DBconnection');



const client = mqtt.connect('mqtt://127.0.0.1:1883')
client.on('connect', function () {
  	console.log('Connected');
	client.subscribe('input/soil_humid');
})



// Receive messages
client.on('message', (topic, message)=> {
	
});


