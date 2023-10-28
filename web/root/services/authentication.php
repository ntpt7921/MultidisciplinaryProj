<?php
    include("../../config/cors.php");

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
        try{
            $expr = '/[a-zA-z0-9]/';
        if(!preg_match($expr, $_POST['username']) || !preg_match($expr, $_POST['password']))
        {
            echo json_encode(['status' => 'Failed']);
            exit();
        }
        include('../../config/config.php');
        $usr_name = $_POST['username'];
        $password = $_POST['password'];
        $query = "select usr_id from usr where usr_name='$usr_name' and usr_pass=password('$password')";
        $result =  mysqli_query($connection, $query);
        if($result->num_rows == 0)
        {
            echo json_encode(['status' => 'Failed']);
        }
        else
        {
            $data = $result->fetch_assoc();
            $usrID = $data['usr_id'];
            date_default_timezone_set('Asia/Bangkok');
            $date = new DateTime();
            $date->modify('+1 day');
            $date = $date->format('Y-m-d H:i:s');
            //create token
            $userID = json_encode(['user_id' => $data['usr_id']]);
            $base64UrlUserID= str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($userID));
            $time = json_encode(['time' => $date]);
            $base64UrlTime = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($time));
            $signature = hash_hmac('sha256',$base64UrlUserID . "." . $base64UrlTime, 'DADN_SMARTHOME', true); // Create Signature Hash
            $base64UrlSignature = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($signature)); //Encode signature
            $jwt =  $base64UrlUserID . ".". $base64UrlTime . "." . $base64UrlSignature; //Create JWT
            
            //add token to database
            $query = "INSERT INTO tokens VALUE ($usrID, '$jwt', '$date')";
            mysqli_query($connection, $query);
           
            echo json_encode(['status' => 'Success', 'token' => $jwt, 'expired' => $date]);

        }
         $connection->close();
        }catch(Exception $e)
        {
            echo json_encode(['status' => $e->getMessage()]);
        }
        
    }

    
?>