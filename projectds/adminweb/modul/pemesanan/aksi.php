<?php 
//session_start();
//require('../../sess.php');
require ('../../../config/config.php');

if(isset($_POST['typeact'])){ $act = $_POST['typeact']; }else{ $act = ''; }
if ($act=='add') {

$id_pemesanan = $conn -> real_escape_string($_POST['id_pemesanan']);
$id_obat = $conn -> real_escape_string($_POST['id_obat']);
$jumlah = $conn -> real_escape_string($_POST['jumlah']);
$periode = $conn -> real_escape_string($_POST['periode']);

    
    $pemesanan_add = $conn->prepare('INSERT INTO pemesanan VALUES (?, ?, ?, ?)');
    $pemesanan_add->bind_param ('ssss', $id_pemesanan, $id_obat, $jumlah, $periode);
    $pemesanan_add->execute();

     if($pemesanan_add == true){
        header('location:index_pemesanan.php');
     }
}
if ($act=="edit") {

$id_pemesanan = $conn -> real_escape_string($_POST['id_pemesanan']);
$id_obat = $conn -> real_escape_string($_POST['id_obat']);
$jumlah = $conn -> real_escape_string($_POST['jumlah']);
$periode = $conn -> real_escape_string($_POST['periode']);


// BUANG FIELD PERTAMA

    $pemesanan_edit = $conn->prepare("UPDATE pemesanan SET id_pemesanan=?, id_obat=?, jumlah=?, periode=? WHERE id_pemesanan=?");
    $pemesanan_edit->bind_param ('sssss', $id_pemesanan, $id_obat, $jumlah, $periode,$id_pemesanan);
    $pemesanan_edit->execute();
   
    // Kembali Ke halaman Semula
    if($pemesanan_edit == true){
        header("location:index_pemesanan.php");
    }
}

if ($act=="del") {
$id_pemesanan= $_POST['id_pemesanan'];
    $query="DELETE FROM pemesanan WHERE id_pemesanan='$id_pemesanan'";
    $result = mysqli_query($conn,$query);
    if($result == true){
        header("location:index_pemesanan.php");
    }
}

if ($act=="lihat") {

    $user_lihat = $conn->prepare("SELECT * from pemesanan p join obat o ON p.id_obat = o.id_obat");
    $user_lihat->execute();
    $result = $user_lihat->get_result();

    $data = array();

    while ($row = $result->fetch_assoc()) {
       $data[] = array(
'id_pemesanan'=>$row['id_pemesanan'],
'id_obat'=>$row['id_obat'],
'nama'=>$row['nama'],
'jumlah'=>$row['jumlah'],
'periode'=>$row['periode']         
       );
    }
    echo json_encode($data);
}
?>