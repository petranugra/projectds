<?php 
//session_start();
//require('../../sess.php');
require ('../../../config/config.php');

if(isset($_POST['typeact'])){ $act = $_POST['typeact']; }else{ $act = ''; }
if ($act=='add') {

$level = $conn -> real_escape_string($_POST['level']);
$nama = $conn -> real_escape_string($_POST['nama']);

    
    $level_add = $conn->prepare('INSERT INTO level VALUES (?, ?)');
    $level_add->bind_param ('ss', $level, $nama);
    $level_add->execute();

     if($level_add == true){
        header('location:index_level.php');
     }
}
if ($act=="edit") {

$level = $conn -> real_escape_string($_POST['level']);
$nama = $conn -> real_escape_string($_POST['nama']);


// BUANG FIELD PERTAMA

    $level_edit = $conn->prepare("UPDATE level SET level=?, nama=? WHERE level=?");
    $level_edit->bind_param ('sss', $level, $nama,$level);
    $level_edit->execute();
   
    // Kembali Ke halaman Semula
    if($level_edit == true){
        header("location:index_level.php");
    }
}

if ($act=="del") {
$level= $_POST['level'];
    $query="DELETE FROM level WHERE level='$level'";
    $result = mysqli_query($conn,$query);
    if($result == true){
        header("location:index_level.php");
    }
}

if ($act=="lihat") {

    $user_lihat = $conn->prepare("SELECT * from level ");
    $user_lihat->execute();
    $result = $user_lihat->get_result();

    $data = array();

    while ($row = $result->fetch_assoc()) {
       $data[] = array(
'level'=>$row['level'],
'nama'=>$row['nama']         
       );
    }
    echo json_encode($data);
}
?>