<?php
//session_start();
//require("sess.php");
//require ("../config/config.php");

?> <script type="text/javascript" src="../js/plugins/jqueryvalidation.js"></script>
<script type="text/javascript" src="modul/barang/barang.js"></script>
<!-- <script type="text/javascript" src="../js/barang.js"></script> -->
<div class="col-md-12" style="padding-bottom: 0px;padding-top: 25px;padding-right: 25px;padding-left: 15px;height: 182.688px;width: 100%;">
  <span>Halaman barang</span>
  <div class="page-header" style="margin-top: 10px;">
    <h1 style="font-size: 23px;margin-top: 8px;height: 30.6875px;">
      <i class="glyphicon glyphicon-lock" style="font-size: 18px;"></i>&nbsp;Data barang
    </h1>
  </div>
  <div class="row">
    <div class='col-md-6 text-left'>
      <div class="btn-group" role="group" aria-label="Toolbar">
        <button id='lihat_data_barang' class='btn btn-info' data-toggle='tooltip' data-placement='top' title='Lihat Data barang' style='color:white;'>
          <i class='far fa-eye' style='font-size: 15px;'></i> Lihat </button><button id='tambah_data_barang' class='btn btn-success' data-toggle='tooltip' data-placement='top' title='Edit Data'>
          <i class='far fa-plus-square' style='font-size: 15px;'></i> Tambah
        </button>
        <button id='edit_data_barang' class='btn btn-primary' data-toggle='tooltip' data-placement='top' title='Edit Data'>
          <i class='far fa-edit' style='font-size: 15px;'></i> Edit
        </button>
        <button id='hapus_data_barang' class='btn btn-danger' data-toggle='tooltip' data-placement='top' title='Hapus Data'>
          <i class='far fa-trash-alt' style='font-size: 15px;'></i> Hapus
        </button>
      </div>
    </div>
    <div class='col-md-6 text-right'>
      <div class='input-group'>
        <div class='input-group-prepend'>
          <span class="input-group-text">Cari : </span>
        </div>
        <div class='input-group-prepend'>
          <select id='search_field_barang' name='search_field_barang'> <option value='kode_barang'>kode_barang</option>
<option value='kode_kategori'>kode_kategori</option>
<option value='nama_barang'>nama_barang</option>
<option value='harga_barang'>harga_barang</option>
<option value='stok_barang'>stok_barang</option>
<option value='keterangan_barang'>keterangan_barang</option>
<option value='filename'>filename</option>
<option value='kode_supplier'>kode_supplier</option>
<option value='bv'>bv</option>
<option value='expired_barang'>expired_barang</option>
 </select>
        </div>
        <span id='searchclear_barang' data-toggle='tooltip' data-placement='top' title='Clear'><i class="fas fa-times"></i></span>
        <input class='form-control' name='search_text_barang' id='search_text_barang' type='search' placeholder='Masukkan Kata Kunci Pencarian' />
      </div>
    </div>
  </div>
</div>
<!-- Modal -->
<div id="modal_barang" class="modal fade" role="dialog" tabindex="-1">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h4 id="modal-title" class="modal-title">Edit Data barang</h4>
        <button class="close" type="button" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">×</span>
        </button>
      </div>
      <div class="modal-body">
        <form name="form_barang">
          <input type="hidden" class="form-control" id="typeact" /> <label>kode_barang<br /></label><input type='text' class='form-control' id='kode_barang' name='kode_barang' /><div><span class='error'></span></div>
<label>kode_kategori<br /></label><input type='text' class='form-control' id='kode_kategori' name='kode_kategori' /><div><span class='error'></span></div>
<label>nama_barang<br /></label><input type='text' class='form-control' id='nama_barang' name='nama_barang' /><div><span class='error'></span></div>
<label>harga_barang<br /></label><input type='text' class='form-control' id='harga_barang' name='harga_barang' /><div><span class='error'></span></div>
<label>stok_barang<br /></label><input type='text' class='form-control' id='stok_barang' name='stok_barang' /><div><span class='error'></span></div>
<label>keterangan_barang<br /></label><input type='text' class='form-control' id='keterangan_barang' name='keterangan_barang' /><div><span class='error'></span></div>
<label>filename<br /></label><input type='text' class='form-control' id='filename' name='filename' /><div><span class='error'></span></div>
<label>kode_supplier<br /></label><input type='text' class='form-control' id='kode_supplier' name='kode_supplier' /><div><span class='error'></span></div>
<label>bv<br /></label><input type='text' class='form-control' id='bv' name='bv' /><div><span class='error'></span></div>
<label>expired_barang<br /></label><input type='text' class='form-control' id='expired_barang' name='expired_barang' /><div><span class='error'></span></div>

          <!--<label>No. Pegawai <br /></label><input type="text" class="form-control" id="no_peg" name="no_peg" /><div><span class="error"></span></div>-->
      </div>
      <div class="modal-footer">
        <button class="btn btn-default" type="button" data-dismiss="modal">Close</button>
        <button type="submit" id="simpan_data_barang" class="btn btn-primary">Simpan Data</button>
        </form>
      </div>
    </div>
  </div>
</div>
<div id="modal_lihat_barang" class="modal fade" role="dialog" tabindex="-1">
  <div class="modal-dialog modal-lg" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h4 id="modal-title" class="modal-title">Lihat Data barang</h4>
        <button class="close" type="button" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">×</span>
        </button>
      </div>
      <div class="modal-body">
        <div id="forTable_barang"></div>
      </div>
      <div class="modal-footer">
        <button class="btn btn-default" type="button" data-dismiss="modal">Close</button>
        <button type="submit" id="print_data" class="btn btn-primary">
          <i class="glyphicon glyphicon-print" style="font-size: 18px;"></i>&nbsp;Print Data </button>
        <button type="submit" id="export_pdf" class="btn btn-primary">
          <i class="glyphicon glyphicon-export" style="font-size: 18px;"></i>&nbsp;PDF </button>
        <button type="submit" id="export_xlsx" class="btn btn-primary">
          <i class="glyphicon glyphicon-export" style="font-size: 18px;"></i>&nbsp;XLSX </button>
      </div>
    </div>
  </div>
</div>
<script type="text/javascript"></script>
<div style="width:100%">
  <table id="tbl_barang" class="display dataTable" style="width:100%">
    <thead>
      <tr> <th>kode_barang</th>
<th>kode_kategori</th>
<th>nama_barang</th>
<th>harga_barang</th>
<th>stok_barang</th>
<th>keterangan_barang</th>
<th>filename</th>
<th>kode_supplier</th>
<th>bv</th>
<th>expired_barang</th>

        <!--<th>No. Pegawai</th>-->
      </tr>
    </thead>
    <tbody></tbody>
  </table>
</div>