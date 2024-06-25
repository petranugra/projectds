

<?php
    require("../config/config.php");
          session_start();
          session_destroy();
?>

<!DOCTYPE html>
<html lang="en">

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

    <link rel="stylesheet" href="assets/styles.css">

    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.0/css/all.css" >


</head>
<body style="background-color: rgb(237,237,237);">
    <div class="wrapper">
        <!-- Sidebar  -->
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

                <li>
                    <a href="index_login.php">Login</a>
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


 <div style="width: 100%;">

        <div class="row">
                    <div class="col-md-12" style="padding-bottom: 0px;padding-top: 25px;padding-right: 25px;padding-left: 15px;height: 182.688px;width: 100%;">
                        <!-- <span>Halaman Login Fail</span>
                        <div class="page-header" style="margin-top: 10px;"></div>
                          -->
                               
                    </div>
        </div> 

                    <h3><center>LOGIN GAGAL! <br> 
                    Username atau Password Anda tidak benar.<br>
                    Atau account Anda sedang diblokir.<br>
                    <a href=index_login.php><b>ULANGI LAGI</b></a></center></h3>
                 


    </div>
            
        </div>
    </div>


<script type="text/javascript" src="assets/bootstrap/js/popper.min.js"></script>
<script type="text/javascript" src="assets/bootstrap/js/bootstrap.bundle.min.js"></script>
<script type="text/javascript" src="assets/sidebar/js/jquery.mCustomScrollbar.concat.min.js"></script>
<script type="text/javascript" src="../js/index.js"></script>

</body>
</html>