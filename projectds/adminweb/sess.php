<?php
	if ( empty($_SESSION['nama_admin_login'])) {
		header("location:../../index_login.php");
	}
?>