<?php

include("config/db_connector.php");

$email = $_POST['email'];

if ($insert_stmt = $mysqli->prepare("INSERT INTO newsletter (email, date_created) VALUES (?, NOW())")) {    

	$insert_stmt->bind_param('s', $email); 
	$insert_stmt->execute();

}

echo "0";