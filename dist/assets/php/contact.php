<?php
// set email address to send to
$send_to = "contact-me@kopijunkie.net";

// if contact form is submitted...
if(isset($_POST['submit'])) {
    $errors = 0;            // default errors value (no errors)
    $success = false;       // default success boolean value (false = email not sent yet)
    $error_msg = array();   // array to hold error messages
    $name_error = "Please fill in the <strong>Name</strong> field";
    $email_error1 = "Please fill in the <strong>Email</strong> field";
    $email_error2 = "That <strong>email address</strong> doesn't look right.";
    $message_error = "What's your <strong>message</strong> for me?";

    // check all form input fields are not empty or default value
    $sender = check_input($_POST['name']);
    $email    = check_input($_POST['email']);
    $message = check_input($_POST['message']);

    if(empty($sender)) {
        array_push($error_msg, $name_error);
        $errors++;
    }

    // if email address is not valid, re-direct to Form Error page
    if(empty($email)) {
        array_push($error_msg, $email_error1);
        $errors ++;
    }
    else if (!preg_match("/([\w\-]+\@[\w\-]+\.[\w\-]+)/", $email)) {
        array_push($error_msg, $email_error2);
        $errors++;
    }

    if(empty($message)) {
        array_push($error_msg, $message_error);
        $errors++;
    }

    if($errors == 0) {
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
        if($mail_sent == true) {
            $success = $mail_sent;
        } else {
            $success = false;
        }

        //show_data($sender, $email, $message);
    }
}

// checks data obtained for errors
function check_input($data, $problem='') {
    $data = filter_var($data, FILTER_SANITIZE_STRING);
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}

// shows data collected from the contact form (TESTING USE ONLY)
function show_data($sender, $email, $message) {
?>
    <html>
    <body>

    <h2>Success!</h2>

    <p>Sender Name: <?php echo $sender ?></p>
    <p>Sender Email: <?php echo $email ?></p>
    <p>Sender Message: <?php echo $message ?></p>

    </body>
    </html>
<?php
}
?>
