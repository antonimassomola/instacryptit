<?php
	
include("js/swiftlib/swift_required.php");

function format_email($info, $format){

	//grab the template content
	//$template = file_get_contents('template/email_template' . $format);
	$template = "Hello Master,
	<br><br>
	Name: {NAME}
	<br>
	Email: {EMAIL}
	<br>
	Subject: {SUBJECT}
	<br>
	Message: {MESSAGE}
	<br>
	";
			
	//replace all the tags
	$template = ereg_replace('{NAME}', $info['name'], $template);
	$template = ereg_replace('{EMAIL}', $info['email'], $template);
	$template = ereg_replace('{SUBJECT}', $info['subject'], $template);
	$template = ereg_replace('{MESSAGE}', $info['message'], $template);
		
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
	$message ->setFrom(array('noreply@instacryptit.com' => 'InstaCryptIt Contact'));
	$message ->setTo(array('antonimassomola@gmail.com' => $info['name']));

	$message ->setBody($body_plain_txt);
	$message ->addPart($body, 'text/html');
			
	$result = $mailer->send($message);
	
	return $result;
	
}

$name 		= $_POST['name'];
$email 		= $_POST['email'];
$subject 	= $_POST['subject'];
$message 	= $_POST['message'];

$data = array(
	'name' => $name,
	'email' => $email,
	'subject' => $subject,
	'message' => $message
);

send_email($data);