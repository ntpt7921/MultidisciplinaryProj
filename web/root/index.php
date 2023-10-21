<?php
    if(isset($_COOKIE['token']))
    {
        header('Location: ./pages/pages/analytics.php');
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