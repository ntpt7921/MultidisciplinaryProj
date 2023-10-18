<?php
    include('../config/db_config.php');

    if(!isset($_POST['username']))
    {
        echo "Empty username";
    }
    else if(!isset($_POST['password']))
    {
        echo "Empty password";
    }
    else
    {
        $usr_name = $_POST['username'];
        $password = $_POST['password'];
        $query = "select * from usr where usr_name='$usr_name' and usr_pass=password('$password')";
        $connection->$query($query);
        if(mysqli_affected_rows($connection) == 0)
        {
            echo 'Wrong password or username';
        }
        else
        {
            echo 'Login success';
        }
    }
    
    $connection->close();
?>