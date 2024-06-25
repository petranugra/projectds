<?php 
//session_start();
//require('../../sess.php');
require ('../../../config/config.php');

if(isset($_POST['typeact'])){ $act = $_POST['typeact']; }else{ $act = ''; }
if ($act=='add') {

$kode_barang = $conn -> real_escape_string($_POST['kode_barang']);
$kode_kategori = $conn -> real_escape_string($_POST['kode_kategori']);
$nama_barang = $conn -> real_escape_string($_POST['nama_barang']);
$harga_barang = $conn -> real_escape_string($_POST['harga_barang']);
$stok_barang = $conn -> real_escape_string($_POST['stok_barang']);
$keterangan_barang = $conn -> real_escape_string($_POST['keterangan_barang']);
$filename = $conn -> real_escape_string($_POST['filename']);
$kode_supplier = $conn -> real_escape_string($_POST['kode_supplier']);
$bv = $conn -> real_escape_string($_POST['bv']);
$expired_barang = $conn -> real_escape_string($_POST['expired_barang']);

    
    $barang_add = $conn->prepare('INSERT INTO barang VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)');
    $barang_add->bind_param ('ssssssssss', $kode_barang, $kode_kategori, $nama_barang, $harga_barang, $stok_barang, $keterangan_barang, $filename, $kode_supplier, $bv, $expired_barang);
    $barang_add->execute();

     if($barang_add == true){
        header('location:index_barang.php');
     }
}
if ($act=="edit") {

$kode_barang = $conn -> real_escape_string($_POST['kode_barang']);
$kode_kategori = $conn -> real_escape_string($_POST['kode_kategori']);
$nama_barang = $conn -> real_escape_string($_POST['nama_barang']);
$harga_barang = $conn -> real_escape_string($_POST['harga_barang']);
$stok_barang = $conn -> real_escape_string($_POST['stok_barang']);
$keterangan_barang = $conn -> real_escape_string($_POST['keterangan_barang']);
$filename = $conn -> real_escape_string($_POST['filename']);
$kode_supplier = $conn -> real_escape_string($_POST['kode_supplier']);
$bv = $conn -> real_escape_string($_POST['bv']);
$expired_barang = $conn -> real_escape_string($_POST['expired_barang']);


// BUANG FIELD PERTAMA

    $barang_edit = $conn->prepare("UPDATE barang SET kode_barang=?, kode_kategori=?, nama_barang=?, harga_barang=?, stok_barang=?, keterangan_barang=?, filename=?, kode_supplier=?, bv=?, expired_barang=? WHERE kode_barang=?");
    $barang_edit->bind_param ('sssssssssss', $kode_barang, $kode_kategori, $nama_barang, $harga_barang, $stok_barang, $keterangan_barang, $filename, $kode_supplier, $bv, $expired_barang,$kode_barang);
    $barang_edit->execute();
   
    // Kembali Ke halaman Semula
    if($barang_edit == true){
        header("location:index_barang.php");
    }
}

if ($act=="del") {
$kode_barang= $_POST['kode_barang'];
    $query="DELETE FROM barang WHERE kode_barang='$kode_barang'";
    $result = mysqli_query($conn,$query);
    if($result == true){
        header("location:index_barang.php");
    }
}

if ($act=="lihat") {

    $user_lihat = $conn->prepare("SELECT * from barang ");
    $user_lihat->execute();
    $result = $user_lihat->get_result();

    $data = array();

    while ($row = $result->fetch_assoc()) {
       $data[] = array(
'kode_barang'=>$row['kode_barang'],
'kode_kategori'=>$row['kode_kategori'],
'nama_barang'=>$row['nama_barang'],
'harga_barang'=>$row['harga_barang'],
'stok_barang'=>$row['stok_barang'],
'keterangan_barang'=>$row['keterangan_barang'],
'filename'=>$row['filename'],
'kode_supplier'=>$row['kode_supplier'],
'bv'=>$row['bv'],
'expired_barang'=>$row['expired_barang']         
       );
    }
    echo json_encode($data);
}
?>