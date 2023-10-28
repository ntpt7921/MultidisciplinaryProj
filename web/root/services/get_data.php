<?php

    include("../../config/cors.php");
    if(!isset($_COOKIE['token']) || !isset($_POST['type']) || !isset($_POST['room_id']) || !isset($_POST['number']))
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

                //get data here
                $num_row = $_POST['number'];
                $table = $_POST['type'] == "humidity" ? "cambien_doam" : "cambien_nhietdo";
                $room_id = $_POST['room_id'];
                $query = "select value, time from $table where house_id=$house_id and room_id=$room_id ORDER BY time DESC LIMIT $num_row";
                $result = mysqli_query($connection, $query);
                $label = array();
                $data = array();
                while($row = mysqli_fetch_assoc($result))
                {
                    array_push($label, $row["time"]);
                    array_push($data, $row["value"]);
                }

                echo json_encode(['status' => 'success', 'label' => $label,'data'=> $data]);
            }
        }
        $connection->close();
    }
?>