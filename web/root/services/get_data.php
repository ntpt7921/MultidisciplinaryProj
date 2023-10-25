<?php

    include("../config/cors.php");
    if(!isset($_COOKIE['token']) || !isset($_POST['table']))
    {
        echo json_encode(['status' => 'Failed']);
    }
    else
    {
        include('../config/config.php');
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
                $query = "select house_id from house where usr_id=".$usr_id;
                $result = mysqli_query($connection, $query);
                $data = mysqli_fetch_assoc($result);
                $house_id = $data['house_id'];

                $query = "select room_id from room where house_id=".$house_id;
                $result = mysqli_query($connection, $query);
                $room_ids = array();
                while ($data = mysqli_fetch_assoc($result))
                {
                    array_push($room_ids, $data['room_id']);
                }
                
                $table = $_POST['table'];
                $return_data = array();
                foreach($room_ids as $room_id)
                {
                    $current_room_data = array();
                    $query = "select value, time from $table where house_id=$house_id and room_id=$room_id";
                    $result = mysqli_query($connection, $query);
                    while($data = mysqli_fetch_assoc($result))
                    {
                        array_push($current_room_data, $data);
                    }
                    array_push($return_data, [$room_id => $current_room_data]);
                }
                echo json_encode(['status' => 'Success', 'data' => $return_data]);
            }
            $connection->close();
        }
    }
?>