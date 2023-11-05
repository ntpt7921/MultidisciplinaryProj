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
                
                include('../../config/mqtt_config.php');
                //define topic here
                $mqtt->publish('', $_POST['request']);
                echo json_encode(['status'=> 'failed']);

                //change device status in database
            }
        }
        $connection->close();
    }
?>