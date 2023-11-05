<?php

require('vendor/autoload.php');

use \PhpMqtt\Client\MqttClient;
use \PhpMqtt\Client\ConnectionSettings;

$server   = '127.0.0.1';
$port     = 1883;
$clientId = rand(5, 15);
$username = 'emqx_user';
$password = '';


$connectionSettings = (new ConnectionSettings)
  ->setUsername($username)
  ->setPassword($password)->setKeepAliveInterval(60);


$mqtt = new MqttClient($server, $port, $clientId);

$mqtt->connect($connectionSettings);
?>