<?php 
require ("../../../config/config.php");

$draw = $_POST['draw'];
$row1 = $_POST['start'];
$rowperpage = $_POST['length']; // Rows display per page
$columnIndex = $_POST['order'][0]['column']; // Column index
$columnName = $_POST['columns'][$columnIndex]['data']; // Column name
$columnSortOrder = $_POST['order'][0]['dir']; // asc or desc
$searchValue = $_POST['search']['value']; // Search value

## Custom Field value
$search_field_barang= $_POST['search_field_barang'];
$search_text_barang = $_POST['search_text_barang'];

$searchQuery = " ";
if($search_text_barang != ''){
   $searchQuery .= " and (".$search_field_barang." like '%".$search_text_barang."%' ) ";
}

## Total number of records without filtering
$sel = $conn->query("select count(*) as allcount from barang");
$records = $sel->fetch_assoc();
$totalRecords = $records['allcount'];


## Total number of records with filtering
$sel = $conn->query("select count(*) as allcount from barang WHERE 1 ".$searchQuery);
$records = $sel->fetch_assoc();
$totalRecordwithFilter = $records['allcount'];


## Fetch records
$empRecords = $conn->query("select * from barang WHERE 1 ".$searchQuery." order by ".$columnName." ".$columnSortOrder." limit ".$row1.",".$rowperpage);

$data = array();

while ($row = $empRecords->fetch_assoc()) {
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

## Response
$response = array(
   "draw" => intval($draw), 
   "iTotalRecords" => $totalRecords,
   "iTotalDisplayRecords" => $totalRecordwithFilter,
   "aaData" => $data
);

echo json_encode($response);

?>