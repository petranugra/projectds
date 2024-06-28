<?php

if ($_GET["mod"]=="barang") { 
		include("modul/barang/index_barang.php");
}

if ($_GET["mod"]=="kategori") { 
		include("modul/kategori/index_kategori.php");
}

if ($_GET["mod"]=="level") { 
		include("modul/level/index_level.php");
}

if ($_GET["mod"]=="obat") { 
		include("modul/obat/index_obat.php");
}

if ($_GET["mod"]=="pembelian") { 
	include("modul/pembelian/index_pembelian.php");
}

if ($_GET["mod"]=="pemesanan") { 
	include("modul/pemesanan/index_pemesanan.php");
}

if ($_GET["mod"]=="prediksi") { 
	include("modul/prediksi/index_prediksi.php");
}

if ($_GET["mod"]=="prediksi2") { 
	include("modul/prediksi2/index_prediksi2.php");
}

?>