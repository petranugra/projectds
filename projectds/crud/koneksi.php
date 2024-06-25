<?php

	$host_txt     = $_POST['host_txt'];
	$username_txt = $_POST['username_txt'];
	$password_txt = $_POST['password_txt'];
	$database_txt = $_POST['database_txt'];

	$host = $host_txt;
	$user = $username_txt;
	$password = $password_txt;
	$db = $database_txt;
	
    $conn = new mysqli($host,$user,$password,$db);

	if ($conn -> connect_errno) {
	  echo "Failed to connect to MySQL: " . $conn -> connect_error;
	  exit();
	}

	if(isset($_POST['typeact'])){ $act = $_POST['typeact']; }else{ $act = ''; }

	if ($act=='table') {

		// Ambil semua table
		$get_table = $conn->prepare("SELECT DISTINCT TABLE_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA='$database_txt'");
	    $get_table->execute();
	    $result = $get_table->get_result();

	    $data = array();

	    while ($row = $result->fetch_assoc()) {
	       $data[] = array( 'TABLE_NAME'=>$row['TABLE_NAME'] );
	    }
	    echo json_encode($data);

	}
	if ($act=='field') {

		// Ambil semua field dari table
		$nama_table = $_POST['nama_table'];
		
		$get_table = $conn->prepare("SELECT COLUMN_NAME FROM information_schema.COLUMNS WHERE TABLE_SCHEMA='$database_txt' AND TABLE_NAME='$nama_table'");
	    $get_table->execute();
	    $result = $get_table->get_result();

	    $data = array();

	    while ($row = $result->fetch_assoc()) {
	       $data[] = array( 'COLUMN_NAME'=>$row['COLUMN_NAME'] );
	    }
	    echo json_encode($data);


	}

?>