<?php 
//session_start();
//require('../../sess.php');
require ('../../../config/config.php');

if(isset($_POST['typeact'])){ $act = $_POST['typeact']; }else{ $act = ''; }
if ($act=='add') {

$id_prediksi = $conn -> real_escape_string($_POST['id_prediksi']);
$id_obat = $conn -> real_escape_string($_POST['id_obat']);
$jumlah = $conn -> real_escape_string($_POST['jumlah']);
$periode = $conn -> real_escape_string($_POST['periode']);

    
    $prediksi_add = $conn->prepare('INSERT INTO prediksi VALUES (?, ?, ?, ?)');
    $prediksi_add->bind_param ('ssss', $id_prediksi, $id_obat, $jumlah, $periode);
    $prediksi_add->execute();

     if($prediksi_add == true){
        header('location:index_prediksi.php');
     }
}
if ($act=="edit") {

$id_prediksi = $conn -> real_escape_string($_POST['id_prediksi']);
$id_obat = $conn -> real_escape_string($_POST['id_obat']);
$jumlah = $conn -> real_escape_string($_POST['jumlah']);
$periode = $conn -> real_escape_string($_POST['periode']);


// BUANG FIELD PERTAMA

    $prediksi_edit = $conn->prepare("UPDATE prediksi SET id_prediksi=?, id_obat=?, jumlah=?, periode=? WHERE id_prediksi=?");
    $prediksi_edit->bind_param ('sssss', $id_prediksi, $id_obat, $jumlah, $periode,$id_prediksi);
    $prediksi_edit->execute();
   
    // Kembali Ke halaman Semula
    if($prediksi_edit == true){
        header("location:index_prediksi.php");
    }
}

if ($act=="del") {
$id_prediksi= $_POST['id_prediksi'];
    $query="DELETE FROM prediksi WHERE id_prediksi='$id_prediksi'";
    $result = mysqli_query($conn,$query);
    if($result == true){
        header("location:index_prediksi.php");
    }
}

if ($act=="lihat") {

    $user_lihat = $conn->prepare("SELECT * from prediksi ");
    $user_lihat->execute();
    $result = $user_lihat->get_result();

    $data = array();

    while ($row = $result->fetch_assoc()) {
       $data[] = array(
'id_prediksi'=>$row['id_prediksi'],
'id_obat'=>$row['id_obat'],
'jumlah'=>$row['jumlah'],
'periode'=>$row['periode']         
       );
    }
    echo json_encode($data);
}
?>