
    
<?php
  session_start();

  if (!isset($_SESSION['nama_admin_login'])){
    header("location:index_login.php");
  }
  require ("../config/config.php");


?>

<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">

    <script type="text/javascript" src="assets/jquery/jquery-3.6.0.min.js"></script>

    <link rel="stylesheet" href="assets/bootstrap/css/bootstrap.min.css">

    <link rel="stylesheet" href="assets/sidebar/css/style.css">
    <link rel="stylesheet" href="assets/sidebar/css/mCustomScrollbar.min.css">

    <script defer src="https://use.fontawesome.com/releases/v5.0.13/js/solid.js"></script>
    <script defer src="https://use.fontawesome.com/releases/v5.0.13/js/fontawesome.js"></script>

    <!--  Plugin XLSX -->
    <script type="text/javascript" src="assets/export/xlsx.js"></script>

    <!--  Plugin Convert to PDF -->
    <script type="text/javascript" src="assets/export/jspdf.min.js"></script>
    <script type="text/javascript" src="assets/export/jspdf.plugin.autotable.min.js"></script>

    <!--  Plugin Print -->
    <script type="text/javascript" src="assets/export/umum.js"></script>

    <!--  Plugin Datatables -->
    <script src="assets/datatables/js/jquery.dataTables.min.js"></script>
    <script src="assets/datatables/js/dataTables.buttons.min.js"></script>
    <script src="assets/datatables/js/buttons.flash.min.js"></script>
    <script src="assets/datatables/js/jszip_3.1.3_jszip.min.js"></script>
    <script src="assets/datatables/js/vfs_fonts.js"></script>
    <script src="assets/datatables/js/buttons.html5.min.js"></script>
    <script src="assets/datatables/js/buttons.print.min.js"></script>
    <script src="assets/datatables/js/dataTables.select.min.js"></script>

    <link rel="stylesheet" href="assets/datatables/css/jquery.dataTables.min.css">
    <link rel="stylesheet" href="assets/datatables/css/buttons.dataTables.min.css">

    <link rel="stylesheet" href="assets/styles.css">

    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.0/css/all.css" >


</head>
<body style="background-color: rgb(237,237,237);">
	<div class="wrapper">
        <!-- Sidebar  -->
        <nav id="sidebar">
            <div class="sidebar-header">
                <h3>Program</h3>
            </div>

            <ul class="list-unstyled components">
                <p>Selamat Datang</p>

                <li class="active">
                    <a href="#">MAIN MENU</a>
                </li>

                <?php
                  
                    include ("menu.php");
                ?>


            </ul>

            <ul class="list-unstyled CTAs">
                <li>
                    <!-- <a href="https://bootstrapious.com/tutorial/files/sidebar.zip" class="download">Download source</a> -->
                </li>
                <li>
                    <!-- <a href="https://bootstrapious.com/p/bootstrap-sidebar" class="article">Back to article</a> -->
                </li>
            </ul>
        </nav>

        <!-- Page Content  -->
        <div id="content">

            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <div class="container-fluid">

                    <button type="button" id="sidebarCollapse" class="btn btn-info">
                        <i class="fas fa-align-left"></i>
                        <span></span>
                    </button>
                    <button class="btn btn-dark d-inline-block d-lg-none ml-auto" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <i class="fas fa-align-justify"></i>
                    </button>

                </div>
            </nav>


        <?php
                  
            include ("controller.php");
        ?>
            
        </div>
    </div>

<script type="text/javascript" src="assets/bootstrap/js/popper.min.js"></script>
<script type="text/javascript" src="assets/bootstrap/js/bootstrap.bundle.min.js"></script>
<script type="text/javascript" src="assets/sidebar/js/jquery.mCustomScrollbar.concat.min.js"></script>
<script type="text/javascript" src="../js/index.js"></script>

</body>
</html>