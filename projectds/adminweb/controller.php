<?php

if ($_GET["mod"]=="barang") { //BARANG
		include("modul/barang/index_barang.php");
}

if ($_GET["mod"]=="kategori") { //KAREGORI
		include("modul/kategori/index_kategori.php");
}

if ($_GET["mod"]=="level") { //LEVEL
		include("modul/level/index_level.php");
}

if ($_GET["mod"]=="obat") { //LEVEL
		include("modul/obat/index_obat.php");
}

if ($_GET["mod"]=="pembelian") { //LEVEL
	include("modul/pembelian/index_pembelian.php");
}

if ($_GET["mod"]=="pemesanan") { //LEVEL
	include("modul/pemesanan/index_pemesanan.php");
}

if ($_GET["mod"]=="prediksi") { //LEVEL
	include("modul/prediksi/index_prediksi.php");
}

if ($_GET["mod"]=="prediksi2") { //LEVEL
	include("modul/prediksi2/index_prediksi2.php");
}

?>