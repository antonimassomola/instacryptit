<?php

include("js/swiftlib/swift_required.php");
include("config/db_connector.php");

function format_email($info, $format){

	//grab the template content
	//$template = file_get_contents('template/email_template' . $format);
	$template = "Hello,
<br><br>
You receive this e-mail because someone sent you the following encrypted message.
<br><br>
-------------- BEGIN --------------<br>

{MESSAGE}

<br>--------------- END ---------------<br><br>

To decrypt this message go to {SITEPATH}/?data={MESSAGE} and paste the encrypted message. <br>
* You must know the secret passphrase used to decrypt the message<br>
";
			
	//replace all the tags
	$template = ereg_replace('{MESSAGE}', $info['message'], $template);
	$template = ereg_replace('{SITEPATH}','http://www.' . $_SERVER['SERVER_NAME'], $template);
		
	//return the html of the template
	return $template;

}

//send the welcome letter
function send_email($info){
		
	//format each email
	$body = format_email($info,'html');
	$body_plain_txt = format_email($info,'txt');

	//setup the mailer
	$transport = Swift_MailTransport::newInstance();
	$mailer = Swift_Mailer::newInstance($transport);
	$message = Swift_Message::newInstance();
	$message ->setSubject('InstaCryptIt - ' . $info['subject']);
	$message ->setFrom(array('noreply@instacryptit.com' => 'InstaCryptIt'));
	$message ->setTo(array($info['email'] => 'InstaCryptIt'));

	$message ->setBody($body_plain_txt);
	$message ->addPart($body, 'text/html');
			
	$result = $mailer->send($message);
	
	return $result;
	
}

$email 		= $_POST['email'];
$subject 	= $_POST['subject'];
$message 	= $_POST['message'];

$data = array(
	'email' => $email,
	'subject' => $subject,
	'message' => $message
);

if ($insert_stmt = $mysqli->prepare("INSERT INTO message_counter (date_created) VALUES (NOW())")) {    

	$insert_stmt->execute();

}
	   			

send_email($data);

echo "0";
