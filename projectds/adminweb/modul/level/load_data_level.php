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
$search_field_level= $_POST['search_field_level'];
$search_text_level = $_POST['search_text_level'];

$searchQuery = " ";
if($search_text_level != ''){
   $searchQuery .= " and (".$search_field_level." like '%".$search_text_level."%' ) ";
}

## Total number of records without filtering
$sel = $conn->query("select count(*) as allcount from level");
$records = $sel->fetch_assoc();
$totalRecords = $records['allcount'];


## Total number of records with filtering
$sel = $conn->query("select count(*) as allcount from level WHERE 1 ".$searchQuery);
$records = $sel->fetch_assoc();
$totalRecordwithFilter = $records['allcount'];


## Fetch records
$empRecords = $conn->query("select * from level WHERE 1 ".$searchQuery." order by ".$columnName." ".$columnSortOrder." limit ".$row1.",".$rowperpage);

$data = array();

while ($row = $empRecords->fetch_assoc()) {
   $data[] = array(
'level'=>$row['level'],
'nama'=>$row['nama']

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