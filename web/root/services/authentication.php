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
            $header = json_encode(['typ' => 'JWT', 'alg' => 'HS256']); //header
            $payload = json_encode(['user_id' => $data['usr_id']]); //payload
            $base64UrlHeader = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($header)); // Encode Header to Base64Url String
            $base64UrlPayload = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($payload)); //Encode payload to _______
            $time = json_encode(['time' => $date]);
            $base64UrlTime = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($time));
            $signature = hash_hmac('sha256', $base64UrlHeader . "." . $base64UrlPayload . "." . $base64UrlTime, 'DADN_SMARTHOME', true); // Create Signature Hash
            $base64UrlSignature = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($signature)); //Encode signature
            $jwt = $base64UrlHeader . "." . $base64UrlPayload . "." . $base64UrlSignature; //Create JWT
            
            //add token to database
            $query = "INSERT INTO TOKENS VALUE ($usrID, '$jwt', '$date')";
            mysqli_query($connection, $query);

            echo json_encode(['status' => 'Success', 'token' => $jwt]);
        }
    }
    
    $connection->close();
?>