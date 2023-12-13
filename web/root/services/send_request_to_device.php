<?php

    include("../../config/cors.php");
    if(!isset($_COOKIE['token']) || !isset($_POST['device_id']) || !isset($_POST['house_id']) || !isset($_POST['room_id']) || !isset($_POST['request']))
    {
        echo json_encode(['status' => 'Failed']);
    }
    else
    {
        include('../../config/config.php');
        $token = $_COOKIE['token'];
        $query = "select usr_id, expire_date from tokens where val='$token'";
        $result = mysqli_query($connection, $query);
        if(mysqli_num_rows($result) == 0)
        {
            echo json_encode(['status' => 'failed']);
        }
        else
        {
            $rec = mysqli_fetch_assoc($result);
            $usr_id = $rec['usr_id'];
            $expire_date = $rec['expire_date'];
            $cur_date = new DateTime();
            $cur_date = $cur_date->format('Y-m-d H:i:s');
            if ($cur_date > $expire_date)
            {
                echo json_encode(['status' => 'failed']);
            }
            else
            {   
                $room_id = $_POST['room_id'];
                $device_id = $_POST['device_id'];
                //get house id
                $query = "select house_id from house where usr_id=$usr_id";
                $result = mysqli_query($connection, $query);
                $data = mysqli_fetch_assoc($result);
                $house_id = $data['house_id'];
                
                $query = "select device_name from devices where house_id=$house_id and room_id=$room_id and device_id=$device_id";
                $result = mysqli_query($connection, $query);
                $data = mysqli_fetch_assoc($result);
                $device_name = $data['device_name'];
                
                $topic = "";
                $result_topic = "";
                if( strpos( $device_name, "fan" ) !== false) 
                {
                    $topic = "output/fan/command";
                    $result_topic = "output/fan/result";
                }
                else if ( strpos( $device_name, "light") !== false)
                {
                    $topic = "output/light/command";
                    $result_topic = "output/light/result";
                }

                include('../../config/mqtt_config.php');
                //define topic here
                $result = 0;
                $end_time = time() + 2;
                $request = $_POST['house_id'] .';'. $_POST['room_id'] .';'. $_POST['device_id'] .';'. $_POST['request'];
                $mqtt->publish($topic, $request);
                $mqtt->subscribe($result_topic, function($topic, $message){
                        global $result ;
                        $result = $message;
                        global $end_time;
                        $end_time = 0;
                });
                
                while(time() < $end_time)
                {
                    $mqtt->loopOnce(microtime(true), false);
                }
                $mqtt->disconnect();
                if ($result == 0)
                {
                    echo json_encode(['status'=> 'failed']);
                }
                else
                {
                    $status = $_POST['request'];
                    echo json_encode(['status'=> 'success']);
                    $query = "update devices set status=$status where house_id=$house_id and room_id=$room_id and device_id=$device_id";
                    mysqli_query($connection, $query);
                }
                
                
                //change device status in database
            }
        }
        $connection->close();
    }

?>