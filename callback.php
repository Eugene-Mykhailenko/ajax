<?php
$to = "testlol@gmail.com";
if (isset($_POST['u_name']) && isset($_POST['u_mail']) && isset($_POST['u_tell'])) {
    $text = "Имя: " . strip_tags(trim($_POST["u_name"])) . "\n";
    $text .= "Email: " . strip_tags(trim($_POST["u_mail"])) . "\n";
    $text .= "Телефон: " . strip_tags(trim($_POST["u_tell"]));
    
    $headers = "MIME-Version: 1.0" . "\r\n"; 
    $headers .= "Content-type:text/plain; charset=utf-8" . "\r\n"; 
    $headers .= "From: ".strip_tags(trim($_POST["u_mail"])). "\r\n";
    
    if (mail($to, "Заявка на партнерство с сайта ajax.systems", $text)) {
        echo "Success";
    } else {
        echo "Error";
    }
    exit();
}
if (isset($_POST['u_subscribe'])) {
    $text .= "Email: " . strip_tags(trim($_POST["u_subscribe"]));

    
    $headers = "MIME-Version: 1.0" . "\r\n"; 
    $headers .= "Content-type:text/plain; charset=utf-8" . "\r\n"; 
    $headers .= "From: ".strip_tags(trim($_POST["u_mail"])). "\r\n";
    
    if (mail($to, "Подписка с сайта ajax.systems", $text)) {
        echo "Success";
    } else {
        echo "Error";
    }
    exit();
}
?>