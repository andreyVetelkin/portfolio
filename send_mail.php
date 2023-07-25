<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $to = "andrtv0@gmail.com"; // Адрес, на который отправляются данные
    $subject = "Запись через онлайн форму"; // Тема письма

    $name = $_POST["full-name"];
    $phone = $_POST["phone"];
    $email = $_POST["email"];

    $message = "ФИО: " . $name . "\n";
    $message .= "Номер телефона: " . $phone . "\n";
    $message .= "Email: " . $email . "\n";

    // Отправка письма
    if (mail($to, $subject, $message)) {
        echo "Сообщение успешно отправлено!";
    } else {
        echo "Ошибка при отправке сообщения!";
    }
}
?>