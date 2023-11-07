<?php

    include("../../config/cors.php");
    if(!isset($_COOKIE['token'])  || !isset($_POST['room_id']) || !isset($_POST['device_id']))
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
                //get house id
                $query = "select house_id from house where usr_id=$usr_id";
                $result = mysqli_query($connection, $query);
                $data = mysqli_fetch_assoc($result);
                $house_id = $data['house_id'];

                //get devices
                $query = "select device_id, status from devices where house_id=$house_id and room_id=$room_id";
                $result = mysqli_query($connection, $query);
                $devices = [];
                while($row = mysqli_fetch_assoc($result))
                {
                    array_push( $devices, $row);
                }

                echo json_encode(["status"=> "success", "devices"=> $devices ]);
            }
        }
        $connection->close();
    }
?>