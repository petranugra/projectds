<?php
	require("../config/config.php");
	
	session_start();

	$nama_admin	=  $conn -> real_escape_string($_POST['nama_admin']);
	$password   =  $conn -> real_escape_string(($_POST['password']));
	$sql_login  = "SELECT * FROM admin WHERE nama_admin='$nama_admin' AND password='$password'";

	if ( $result = mysqli_query($conn, $sql_login))
		{
			$rowcount=mysqli_num_rows($result);
			if($rowcount > 0){
				$row = $result -> fetch_array(MYSQLI_ASSOC);
				session_start();
				$_SESSION['nama_admin_login'] = $row['nama_admin'];
				$_SESSION['kode_admin_login'] = $row['kode_admin'];
				$_SESSION['level_login'] = $row['level'];
				header("location:index.php?mod=obat");
			}
			else
			{
				header("location:login_fail.php");
			}
		}
?>