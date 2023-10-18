<?php
    include('../config/db_config.php');

    if(!isset($_POST['username']))
    {
        echo json_encode(['status' => 'Failed']);
    }
    else if(!isset($_POST['password']))
    {
        echo json_encode(['status' => 'Failed']);
    }
    else
    {
        $usr_name = $_POST['username'];
        $password = $_POST['password'];
        $query = "select * from usr where usr_name='$usr_name' and usr_pass=password('$password')";
        $result =  mysqli_query($connection, $query);
        if($result->num_rows == 0)
        {
            echo json_encode(['status' => 'Failed']);
        }
        else
        {
            echo json_encode(['status' => 'Success']);
        }
    }
    
    $connection->close();
?>