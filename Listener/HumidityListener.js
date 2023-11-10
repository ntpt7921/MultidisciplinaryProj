const mqtt = require("mqtt")
const moment = require('moment');
const db_connect = require('./DBconnection');



const client = mqtt.connect('mqtt://127.0.0.1:1883')
client.on('connect', function () {
  	console.log('Connected')

	client.subscribe('input/air_humid');
})



// Receive messages
client.on('message', (topic, message)=> {
	//process message
	var message = message.toString().split(';');
	//console.log(message);
	house_id = message[0];
	room_id = message[1];
	device_id = message[2];
	value = message[3];
	dateString = moment().format('YYYY/MM/DD HH:mm:ss'); //get current time
	

    //do something with the data
	db_connect.getConnection(function(err){
		var query = `insert into cambien_nhietdo value (${house_id}, ${room_id},${value}, '${dateString}')`;
		db_connect.query(query);
	});
});


