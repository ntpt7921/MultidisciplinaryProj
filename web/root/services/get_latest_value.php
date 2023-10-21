<?php
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
            if (strtotime($cur_date) > strtotime($expire_date))
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
                    $query = "select value from $table where room_id=$room_id ORDER BY time DESC LIMIT 1";
                    $result = mysqli_query($connection, $query);
                    $data = mysqli_fetch_assoc($result);
                    $return_data[$room_id] = $data['value'];
                }

                echo json_encode(['status'=> "Success", "data" => $return_data]);
            }
            $connection->close();
        }
    }
?>