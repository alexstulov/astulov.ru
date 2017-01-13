<?
    if(empty($_POST['name']) or strlen($_POST['name']) < 3) { // если введено менее 5 символов, то ошибка
        $error1 = 'Имя?';
    } else $error1 = NULL;
    if(empty($_POST['email']) or strlen($_POST['email']) < 5) { // если введено менее 5 символов, то ошибка
        $error2 = 'Электронная почта?';
    } else $error2 = NULL;
    if(empty($_POST['theme']) or strlen($_POST['theme']) < 3) { // если введено менее 3 символов, то ошибка
        $error3 = 'Тема?';
    } else $error3 = NULL;
    if(empty($_POST['message']) or strlen($_POST['message']) < 20) { // если введено менее 10 символов, то ошибка
        $error4 = 'Сообщение?';
    } else $error4 = NULL;
    if(empty($error1) && empty($error2) && empty($error3) && empty($error4)) {
        $date = date("Y-m-d H:i:s");
        $name = $_POST['name'];
        $from = $_POST['email'];
        $phone = $_POST['phone'];
        $text = $_POST['message'];
        //$to .= 'test@test.net' . ', 'test2@test.net' . ', '; тут можно указывать несколько ящиков через запятую
        $to .= 'kinos.pro@gmail.com'; // это ящик на который будет приходить письмо
        $subject = 'Письмо с сайта '.$_SERVER['HTTP_HOST'].'';
        $message .= '
        <!DOCTYPE html>
        <html lang="ru">
            <head>
                <title>'.$subject.'</title>
                <style media="screen" type="text/css">
                    table {
                    padding:5px;
                    margin:5px;
                    border:#E2E2E2 solid 2px;
                    width:600px;
                    text-align: center;
                    }
                    td {
                    border:#E2E2E2 solid 1px;
                    width:100px;
                    padding:5px;
                    margin:5px;
                    text-align: center;
                    color:#000000;
                    }
                    body {
                    margin: 0;
                    padding: 6px;
                    border: 0;
                    background: #fff;
                    text-align: center;
                    }
                </style>
            </head>
            <body>
                <table>
                <tr>
                    <td colspan="2">Имя:</td>
                    <td colspan="2">'.$name.'</td>
                </tr>
                <tr>
                    <td colspan="2">Почта:</td>
                    <td colspan="2">'.$from.'</td>
                </tr>
                <tr>
                    <td colspan="2">Телефон:</td>
                    <td colspan="2">'.$phone.'</td>
                </tr>
                <tr>
                    <td colspan="2">Сообщение:</td>
                    <td colspan="2">'.$text.'</td>
                </tr>
                <tr>
                    <td colspan="2">Дата отправки сообщения:</td>
                    <td colspan="2"><div style="line-height: 30px;">'.$date.' г.</div></td>
                </tr>
                </table>
            </body>
        </html>';
    	$headers  = 'MIME-Version: 1.0' . "\r\n";
        $headers .= 'Content-type: text/html; charset=utf-8' . "\r\n";
        $headers .= 'To: <kinos.pro@gmail.com>' . "\r\n";
        $headers .= 'From: <'.$from.'>' . "\r\n";
        if (mail('kinos.pro@gmail.com', $subject, $message,$headers))
            echo '<span class="success">Сообщение успешно отправлено!</span>';
        else
            echo '<span class="error">Сообщение не отправлено, попробуйте позднее!</span>';
    } else {
        echo '
            <span class="error">'.$error1.'</span>
            <span class="error">'.$error2.'</span>
            <span class="error">'.$error3.'</span>
            <span class="error">'.$error4.'</span>';
    }
?>