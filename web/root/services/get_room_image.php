<?php

    include("../../config/cors.php");
    if(!isset($_COOKIE['token']) || !isset($_POST['room_id']))
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
                $room_id = $_POST['room_id'];
                $path = "/var/www/image/house_$house_id/room_$room_id/result.png";
                $type = pathinfo($path, PATHINFO_EXTENSION);
                $data = file_get_contents($path);
                $base64 = 'data:image/' . $type . ';base64,' . base64_encode($data);
                echo json_encode(['status'=> 'success','image'=> $base64]);
            }
        }
        $connection->close();
    }
?>