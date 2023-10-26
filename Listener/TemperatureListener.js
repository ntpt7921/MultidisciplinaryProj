const mqtt = require("mqtt")
const moment = require('moment');
const db_connect = require('./DBconnection');
const fs = require('fs');



const client = mqtt.connect('mqtt://127.0.0.1:1883')
client.on('connect', function () {
  	console.log('Connected')

	client.subscribe('input/air_temp');
})



// Receive messages
client.on('message', (topic, message)=> {
	//process message
	var message = message.toString();
	//console.log(message);
	console.log("recieving new data");
	dateString = moment().format('MMMM Do YYYY, h:mm:ss a'); //get current time
	fs.appendFileSync('/var/www/temp/temperature.txt', message+' date: ' + dateString + '\n');
	console.log('data saved to /var/www/temp/temperature.txt');

	/*
	//insert to database
	con.connect(function(err){
		if (!err)
		{
			var query = "insert into cambien_nhietdo value ()";
			con.query(query);
		} 
	});
	*/
});


