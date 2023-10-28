<?php
    if(!isset($_COOKIE['token']))
    {
      header('Location: ../. ');
      exit();
    }
    else
    {
        include('../../config/config.php');
        $token = $_COOKIE['token'];
        $query = "SELECT usr_id, expire_date from tokens where val='$token'";
        $result = mysqli_query($connection, $query);
        if(mysqli_num_rows($result) == 0)
        {
        header('Location: ../.');
        $connection->close();
        exit();
        }
        else
        {
            $data = mysqli_fetch_assoc($result);
            $expire_date = $data['expire_date'];
            $expire_date = strtotime($expire_date);
            date_default_timezone_set('Asia/Bangkok');
            $cur_date = new DateTime();
            $cur_date = $cur_date->format('Y-m-d H:i:s');
            if ($expire_date < strtotime($cur_date))
            {
                header('Location: ../.');
                $connection->close();
                exit();
            }
        }
        header('Location: ./pages/home.php');
        exit();
    }
?>