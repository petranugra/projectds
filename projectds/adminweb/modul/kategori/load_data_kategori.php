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
$search_field_kategori= $_POST['search_field_kategori'];
$search_text_kategori = $_POST['search_text_kategori'];

$searchQuery = " ";
if($search_text_kategori != ''){
   $searchQuery .= " and (".$search_field_kategori." like '%".$search_text_kategori."%' ) ";
}

## Total number of records without filtering
$sel = $conn->query("select count(*) as allcount from kategori");
$records = $sel->fetch_assoc();
$totalRecords = $records['allcount'];


## Total number of records with filtering
$sel = $conn->query("select count(*) as allcount from kategori WHERE 1 ".$searchQuery);
$records = $sel->fetch_assoc();
$totalRecordwithFilter = $records['allcount'];


## Fetch records
$empRecords = $conn->query("select * from kategori WHERE 1 ".$searchQuery." order by ".$columnName." ".$columnSortOrder." limit ".$row1.",".$rowperpage);

$data = array();

while ($row = $empRecords->fetch_assoc()) {
   $data[] = array(
'kode_kategori'=>$row['kode_kategori'],
'nama_kategori'=>$row['nama_kategori'],
'keterangan_kategori'=>$row['keterangan_kategori'],
'filename'=>$row['filename']

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