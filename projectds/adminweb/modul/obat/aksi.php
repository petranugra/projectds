<?php 
//session_start();
//require('../../sess.php');
require ('../../../config/config.php');

if(isset($_POST['typeact'])){ $act = $_POST['typeact']; }else{ $act = ''; }
if ($act=='add') {

$id_obat = $conn -> real_escape_string($_POST['id_obat']);
$nama = $conn -> real_escape_string($_POST['nama']);
$deskripsi = $conn -> real_escape_string($_POST['deskripsi']);

    
    $obat_add = $conn->prepare('INSERT INTO obat VALUES (?, ?, ?)');
    $obat_add->bind_param ('sss', $id_obat, $nama, $deskripsi);
    $obat_add->execute();

     if($obat_add == true){
        header('location:index_obat.php');
     }
}
if ($act=="edit") {

$id_obat = $conn -> real_escape_string($_POST['id_obat']);
$nama = $conn -> real_escape_string($_POST['nama']);
$deskripsi = $conn -> real_escape_string($_POST['deskripsi']);


// BUANG FIELD PERTAMA

    $obat_edit = $conn->prepare("UPDATE obat SET id_obat=?, nama=?, deskripsi=? WHERE id_obat=?");
    $obat_edit->bind_param ('ssss', $id_obat, $nama, $deskripsi,$id_obat);
    $obat_edit->execute();
   
    // Kembali Ke halaman Semula
    if($obat_edit == true){
        header("location:index_obat.php");
    }
}

if ($act=="del") {
$id_obat= $_POST['id_obat'];
    $query="DELETE FROM obat WHERE id_obat='$id_obat'";
    $result = mysqli_query($conn,$query);
    if($result == true){
        header("location:index_obat.php");
    }
}

if ($act=="lihat") {

    $user_lihat = $conn->prepare("SELECT * from obat ");
    $user_lihat->execute();
    $result = $user_lihat->get_result();

    $data = array();

    while ($row = $result->fetch_assoc()) {
       $data[] = array(
'id_obat'=>$row['id_obat'],
'nama'=>$row['nama'],
'deskripsi'=>$row['deskripsi']         
       );
    }
    echo json_encode($data);
}
?>