<?php
// set email address to send to
$send_to = "contact-me@kopijunkie.net";

// get data from contact form
$sender = $_POST['name'];
$email    = $_POST['email'];
$message = $_POST['message'];

// prepare message content to be sent
$subject = "KopiJunkie.net - Contact Form Email from " . $sender;
$content = "Message received from: \n" . 
                    "Name: " . $sender . "\n" . 
                    "Email: " . $email . "\n" . 
                    "Message: " . $message . "\n" . 
                    "End of message";
$headers = 'From: ' . $sender . '<' . $email . '>';

// send message using mail() function
$mail_sent = mail($send_to, $subject, $content, $headers);
?>
