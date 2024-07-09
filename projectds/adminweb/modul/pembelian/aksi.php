<?php 
//session_start();
//require('../../sess.php');
require ('../../../config/config.php');

if(isset($_POST['typeact'])){ $act = $_POST['typeact']; }else{ $act = ''; }
if ($act=='add') {

$id_obat = $conn -> real_escape_string($_POST['id_obat']);
$jumlah = $conn -> real_escape_string($_POST['jumlah']);
$periode = $conn -> real_escape_string($_POST['periode']);

    
    $pembelian_add = $conn->prepare('INSERT INTO pembelian (id_obat,jumlah,periode) VALUES (?, ?, ?)');
    $pembelian_add->bind_param ('sss', $id_obat, $jumlah, $periode);
    $pembelian_add->execute();

     if($pembelian_add == true){
        header('location:index_pembelian.php');
     }
}
if ($act=="edit") {

$id_pembelian = $conn -> real_escape_string($_POST['id_pembelian']);
$id_obat = $conn -> real_escape_string($_POST['id_obat']);
$jumlah = $conn -> real_escape_string($_POST['jumlah']);
$periode = $conn -> real_escape_string($_POST['periode']);


// BUANG FIELD PERTAMA

    $pembelian_edit = $conn->prepare("UPDATE pembelian SET id_pembelian=?, id_obat=?, jumlah=?, periode=? WHERE id_pembelian=?");
    $pembelian_edit->bind_param ('sssss', $id_pembelian, $id_obat, $jumlah, $periode,$id_pembelian);
    $pembelian_edit->execute();
   
    // Kembali Ke halaman Semula
    if($pembelian_edit == true){
        header("location:index_pembelian.php");
    }
}

if ($act=="del") {
$id_pembelian= $_POST['id_pembelian'];
    $query="DELETE FROM pembelian WHERE id_pembelian='$id_pembelian'";
    $result = mysqli_query($conn,$query);
    if($result == true){
        header("location:index_pembelian.php");
    }
}

if ($act=="lihat") {

    $user_lihat = $conn->prepare("SELECT * from pembelian p JOIN obat o on o.id_obat = p.id_obat ");
    
    $user_lihat->execute();
    $result = $user_lihat->get_result();
    $data = array();

    while ($row = $result->fetch_assoc()) {
       $data[] = array(
'id_pembelian'=>$row['id_pembelian'],
'id_obat'=>$row['id_obat'],
'nama'=>$row['nama'],
'jumlah'=>$row['jumlah'],
'periode'=>$row['periode']         
       );
    }
    echo json_encode($data);
}
?>

