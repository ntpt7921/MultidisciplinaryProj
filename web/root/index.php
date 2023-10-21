<?php
    if(isset($_COOKIE['token']))
    {
        include('./config/config.php');
        $token = $_COOKIE['token'];
        $query = "SELECT usr_id, expire_date from tokens where val='$token'";
        $result = mysqli_query($connection, $query);
        if(mysqli_num_rows($result) != 0)
        {
            $data = mysqli_fetch_assoc($result);
            $expire_date = $data['expire_date'];
            $expire_date = strtotime($expire_date);
            date_default_timezone_set('Asia/Bangkok');
            $cur_date = new DateTime();
            $cur_date = $cur_date->format('Y-m-d H:i:s');
            if ($expire_date > strtotime($cur_date))
            {
                header('Location: ./pages/pages/analytics.php');
                exit();
            }
        }
    
    }
?>

<html>
    <form>
        Username: <input type="text" id="username" name="username"><br>
        Password: <input type="password" id="password" name="password"><br>
        <button type="button" id="login">Log in</button>
    </form>
    <script src="https://code.jquery.com/jquery-3.7.1.min.js" ></script>
    <script>
        document.getElementById('login').addEventListener('click', function(){
            $.ajax({
                url : "http://localhost/services/authentication.php",
                type: 'post',
                data: {
                    username: document.getElementById('username').value,
                    password: document.getElementById('password').value
                },
                success: function(res){	
                    res = JSON.parse(res);
                    {
                        document.cookie = 'token=' + res['token']+";path=/;";
                        window.location = './pages/pages/analytics.php';
                    }
                },
            })
        })
    </script>
</html>