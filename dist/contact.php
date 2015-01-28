<?php
// set email address to send to
$send_to = "contact-me@kopijunkie.net";

// if contact form is submitted...
if(isset($_POST['submit'])) 
{
    $errors = 0; // default errors value (no errors)
    $success = false; // default success boolean value (false = email not sent yet)
    $error_msg = array();   // array to hold error messages
    $name_error = "Please fill in the <strong>Name</strong> field";
    $email_error1 = "Please fill in the <strong>Email</strong> field";
    $email_error2 = "That <strong>email address</strong> doesn't look right.";
    $message_error = "What's your <strong>message</strong> for me?";
    $spam_error = "You need to get the answer to " . 
                                "<strong>'What's 5 + 2?'</strong> right first. Try again.";
    
    // check all form input fields are not empty or default value
    $sender = check_input($_POST['name']);
    $email    = check_input($_POST['email']);
    $message = check_input($_POST['message']);
    
    if(empty($sender) || $sender == "Your Name")
    {
        array_push($error_msg, $name_error);
        $errors++;
    }
    
    // if email address is not valid, re-direct to Form Error page
    if(empty($email) || $email == "Your Email")
    {
        array_push($error_msg, $email_error1);
        $errors ++;
    }
    else if (!preg_match("/([\w\-]+\@[\w\-]+\.[\w\-]+)/", $email))
    {
        array_push($error_msg, $email_error2);
        $errors++;
    }
    
    if(empty($message))
    {
        array_push($error_msg, $message_error);
        $errors++;
    }
    
    if($_POST['spam'] != 7)
    {
        array_push($error_msg, $spam_error);
        $errors++;
    }
    
    if($errors == 0)
    {
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
        if($mail_sent == true)
        {
            $success = $mail_sent;
        }
        else
        {
            $success = false;
        }
        
        //show_data($sender, $email, $message);        
    }
}
    
// checks data obtained for errors
function check_input($data, $problem='')
{
    $data = filter_var($data, FILTER_SANITIZE_STRING);
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}

// shows data collected from the contact form (TESTING USE ONLY)
function show_data($sender, $email, $message)
{
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

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <title>KopiJunkie.net - Online home and portfolio of Kimmi Gan | Contact</title>
    <!-- INFO -->
    <meta name="Author" content="Kimmi Gan aka KopiJunkie" />
    <meta name="Copyright" content="Copyright 2011 Kimmi Gan / KopiJunkie" />
    <meta name="Description" content="Online home and portfolio of Kimmi Gan aka KopiJunkie - web technologies geek and aspiring web designer, web developer." />
    <meta name="Keywords" content="Kimmi Gan, Gan Kimmi, KopiJunkie, Kimmi Gan portfolio, KopiJunkie portfolio, web design, web development" /> 

    <!-- FAVICON / CSS / JAVASCRIPT FILE LINKS -->
    <link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
    <link rel="icon" href="favicon.ico" type="image/x-icon" />
    <link href="css/style.css" rel="stylesheet" type="text/css" media="screen" />
    <link href="css/form-style.css" rel="stylesheet" type="text/css" media="screen" />
</head>
<body>
<div id="main" class="container">
    <div id="header">
        <div id="logo">
                <h1><a href="http://www.kopijunkie.net">KopiJunkie</a></h1>
        </div>
        <div style="clear:both"></div>
        <div id="tagline">
            <h3>The online home of a coffee junkie</h3>
        </div>
        <div id="socialm">
            <h3>Follow Me On</h3>
            <ul id="follow">
                <li id="twitter"><a href="http://www.twitter.com/kopijunkie">Twitter</a></li>
                <li id="flickr"><a href="http://www.flickr.com/photos/kimchigang/">Flickr</a></li>
                <li id="lastfm"><a href="http://www.last.fm/user/KopiJunkie">Last.fm</a></li>
            </ul>
        </div><!-- end socialm -->
        <div style="clear:both"></div>
        <ul id = "navbar">
            <li><a href="index.html">Home</a></li>
            <li><a href="about.html">About</a></li>
            <li><a href="portfolio.html">Portfolio</a></li>
            <li><a href="contact.html">Contact</a></li>
        </ul><!-- end navbar -->
        <div style="clear:both"></div>
    </div><!-- end header -->
    
    <div id="content">
        <?php
        if(isset($_POST['submit'])) 
        {
            if($errors == 0 && $success == true && isset($_POST['submit'])) 
            {
                echo "<h2>Message Sent!</h2>";
                echo "<p>Thank you for your email. I'll get back to you shortly.</p>";
                echo "<p>Now that that's done, why not head to ";
                echo '<a class="home" href="http://www.kopijunkie.net">';
                echo "KopiJunkie.net's main page</a>?<br />";
                echo "Or click on any of the links in the menu above.</p>";
            }
            if(isset($_POST['submit']) && $success == false && $errors != 0) 
            {
                echo '<h2>Oops! There was a problem with the details given.</h2>';
                echo '<p>Please see below for the error(s) found:</p>';
                // list all errors found
                echo "<ul>";
                foreach($error_msg as $error_found)
                {
                    echo "<li>" . $error_found . "</li>";
                }
                echo "</ul><br />"; ?>
        
        <div id="contact-form">
        <form id="ajax_form" action="contact.php" method="POST">
            <p><label for="name">Name</label>
            <input id="name" class="text_input clear" name="name" type="text" value="<?php echo $sender ?>" /></p>
             
            <p><label for="email">Email</label>
            <input id="email" class="text_input clear" name="email" type="text" value="<?php echo $email ?>" /></p>
             
             <p id="comments"><label for="message">Message</label><textarea id="message" name="message"><?php echo $message ?></textarea></p>
             
            <p><label for="spam">What's 5 + 2?</label>
            <input id="spam" class="text_input clear" name="spam" type="<?php echo $spam ?>"  /></p>
             
            <p><input id="submit" name="submit" type="submit" value="Send" /></p>
        </form>
        </div><!-- end contact-form -->
        
        <?php 
            }
            if($errors == 0 && $success == false && isset($_POST['submit'])) 
            {
                echo '<h2>Sorry, but there was a problem with the contact form.</h2>';
                echo '<p>How about you contact me directly at <strong id="contact">';
                echo '<a href="mailto:contact-me@kopijunkie.net">contact-me (at) ';
                echo 'kopijunkie.net</a></strong></p>';
            }
        }
        ?>
    </div><!-- end content -->
    
    <div id="sidebar">
        <h3 id="who">Who Am I?</h3>
        <p>
        <img src="images/avatar.jpg" alt="That's me! Or a self drawn cartoon sketch version anyway..." title="That's me!" />
        
        I'm Kimmi Gan. <br /> This is my personal website and digital playground for all things web techy.<br /><a id="about-more" href="about.html">Learn more &gt;&gt;</a></p>
        <h3 id="musings">Coffee Fueled Thoughts</h3>
        <div id="twitter-feed">
            <h1><a href="http://twitter.com/kopijunkie">@kopijunkie</a></h1>
            
            <ul id="twitter_update_list"><li></li></ul>
        </div><!-- end twitter-feed -->
        <script src="http://twitter.com/javascripts/blogger.js" type="text/javascript"></script>
        <script src="http://twitter.com/statuses/user_timeline/kopijunkie.json?callback=twitterCallback2&count=1" type="text/javascript"></script>
    </div><!-- end sidebar -->
    <div style="clear:both"></div>
</div><!-- end main -->
        
<div id="footer" class="container">
        <div id="media-previews">
            <h3>What I'm Listening To...</h3>
            <div id="lastfmrecords"></div>
            <div style="clear:both"></div>
            <br />
            <h3 id="photo-wall">Flickr Through My Photos...</h3>
            <div id="flickr_badge_wrapper">
            <script type="text/javascript" src="http://www.flickr.com/badge_code_v2.gne?&amp;count=6&amp;display=random&amp;size=s&amp;layout=x&amp;source=user&amp;user=99054034%40N00"></script>
            </div>
        <div style="clear:both"></div>
        </div><!-- end media previews -->
        <p id="copyright">Copyright &copy; 2011 Kimmi Gan / KopiJunkie | <a href="contact.html" title="Get In Touch">Contact</a> | <a href="http://validator.w3.org/check?amp;uri=www.kopijunkie.net&amp;charset=(detect+automatically)&amp;doctype=Inline&amp;group=0" title="XHTML Validation">HTML</a> | <a href="http://jigsaw.w3.org/css-validator/validator?uri=www.kopijunkie.net&amp;profile=css21&amp;usermedium=all&amp;warning=1&amp;lang=en" title="CSS Validation">CSS</a></p>
</div><!-- end footer -->
</body>
</html>