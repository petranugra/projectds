<?php 
//session_start();
//require('../../sess.php');
require ('../../../config/config.php');

if(isset($_POST['typeact'])){ $act = $_POST['typeact']; }else{ $act = ''; }
if ($act=='add') {

$kode_kategori = $conn -> real_escape_string($_POST['kode_kategori']);
$nama_kategori = $conn -> real_escape_string($_POST['nama_kategori']);
$keterangan_kategori = $conn -> real_escape_string($_POST['keterangan_kategori']);
$filename = $conn -> real_escape_string($_POST['filename']);

    
    $kategori_add = $conn->prepare('INSERT INTO kategori VALUES (?, ?, ?, ?)');
    $kategori_add->bind_param ('ssss', $kode_kategori, $nama_kategori, $keterangan_kategori, $filename);
    $kategori_add->execute();

     if($kategori_add == true){
        header('location:index_kategori.php');
     }
}
if ($act=="edit") {

$kode_kategori = $conn -> real_escape_string($_POST['kode_kategori']);
$nama_kategori = $conn -> real_escape_string($_POST['nama_kategori']);
$keterangan_kategori = $conn -> real_escape_string($_POST['keterangan_kategori']);
$filename = $conn -> real_escape_string($_POST['filename']);


// BUANG FIELD PERTAMA

    $kategori_edit = $conn->prepare("UPDATE kategori SET kode_kategori=?, nama_kategori=?, keterangan_kategori=?, filename=? WHERE kode_kategori=?");
    $kategori_edit->bind_param ('sssss', $kode_kategori, $nama_kategori, $keterangan_kategori, $filename,$kode_kategori);
    $kategori_edit->execute();
   
    // Kembali Ke halaman Semula
    if($kategori_edit == true){
        header("location:index_kategori.php");
    }
}

if ($act=="del") {
$kode_kategori= $_POST['kode_kategori'];
    $query="DELETE FROM kategori WHERE kode_kategori='$kode_kategori'";
    $result = mysqli_query($conn,$query);
    if($result == true){
        header("location:index_kategori.php");
    }
}

if ($act=="lihat") {

    $user_lihat = $conn->prepare("SELECT * from kategori ");
    $user_lihat->execute();
    $result = $user_lihat->get_result();

    $data = array();

    while ($row = $result->fetch_assoc()) {
       $data[] = array(
'kode_kategori'=>$row['kode_kategori'],
'nama_kategori'=>$row['nama_kategori'],
'keterangan_kategori'=>$row['keterangan_kategori'],
'filename'=>$row['filename']         
       );
    }
    echo json_encode($data);
}
?>