<?php
	$host = "localhost";
	$user = "root";
	$password ="";
	$db = "projectds";
	
    $conn = new mysqli($host,$user,$password,$db);

	if ($conn -> connect_errno) {
	  echo "Failed to connect to MySQL: " . $conn -> connect_error;
	  exit();
	}
?>