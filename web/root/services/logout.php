<?php
    if(!isset($_COOKIE['token']))
    {
        exit();
    }
    include('../../config/config.php');
    $token = $_COOKIE['token'];
    $query = "delete from tokens where val = $token";
    mysqli_query($connection, $query);
    $connection->close();
?>