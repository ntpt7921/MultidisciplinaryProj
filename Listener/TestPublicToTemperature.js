const { read } = require('fs');
const mqtt = require('mqtt')
const readline = require('readline-sync')
const mysql = require('mysql');


const client = mqtt.connect('mqtt://13.54.202.88:1883')

subscribe_success = false;

client.on('connect', function () {
  	console.log('Connected')
 	 // Subscribe to a topic
	 var temperature = readline.question();
	client.publish('input/air_temp', temperature);
	client.end();
})
