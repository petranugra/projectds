<?php
//session_start();
//require("sess.php");
//require ("../config/config.php");

?> <script type="text/javascript" src="../js/plugins/jqueryvalidation.js"></script>
<script type="text/javascript" src="modul/prediksi/prediksi.js"></script>
<!-- <script type="text/javascript" src="../js/prediksi.js"></script> -->
<div class="col-md-12" style="padding-bottom: 0px;padding-top: 25px;padding-right: 25px;padding-left: 15px;height: 182.688px;width: 100%;">
  <span>Halaman prediksi</span>
  <div class="page-header" style="margin-top: 10px;">
    <h1 style="font-size: 23px;margin-top: 8px;height: 30.6875px;">
      <i class="glyphicon glyphicon-lock" style="font-size: 18px;"></i>&nbsp;Data prediksi
    </h1>
  </div>
  <div class="row">
    <div class='col-md-6 text-left'>
      <div class="btn-group" role="group" aria-label="Toolbar">
        <button id='lihat_data_prediksi' class='btn btn-info' data-toggle='tooltip' data-placement='top' title='Lihat Data prediksi' style='color:white;'>
          <i class='far fa-eye' style='font-size: 15px;'></i> Lihat </button><button id='tambah_data_prediksi' class='btn btn-success' data-toggle='tooltip' data-placement='top' title='Edit Data'>
          <i class='far fa-plus-square' style='font-size: 15px;'></i> Tambah
        </button>
        <button id='edit_data_prediksi' class='btn btn-primary' data-toggle='tooltip' data-placement='top' title='Edit Data'>
          <i class='far fa-edit' style='font-size: 15px;'></i> Edit
        </button>
        <button id='hapus_data_prediksi' class='btn btn-danger' data-toggle='tooltip' data-placement='top' title='Hapus Data'>
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
          <select id='search_field_prediksi' name='search_field_prediksi'> <option value='id_prediksi'>id_prediksi</option>
<option value='id_obat'>id_obat</option>
<option value='jumlah'>jumlah</option>
<option value='periode'>periode</option>
 </select>
        </div>
        <span id='searchclear_prediksi' data-toggle='tooltip' data-placement='top' title='Clear'><i class="fas fa-times"></i></span>
        <input class='form-control' name='search_text_prediksi' id='search_text_prediksi' type='search' placeholder='Masukkan Kata Kunci Pencarian' />
      </div>
    </div>
  </div>
</div>
<!-- Modal -->
<div id="modal_prediksi" class="modal fade" role="dialog" tabindex="-1">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h4 id="modal-title" class="modal-title">Edit Data prediksi</h4>
        <button class="close" type="button" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">×</span>
        </button>
      </div>
      <div class="modal-body">
        <form name="form_prediksi">
          <input type="hidden" class="form-control" id="typeact" /> <label>id_prediksi<br /></label><input type='text' class='form-control' id='id_prediksi' name='id_prediksi' /><div><span class='error'></span></div>
<label>id_obat<br /></label><input type='text' class='form-control' id='id_obat' name='id_obat' /><div><span class='error'></span></div>
<label>jumlah<br /></label><input type='text' class='form-control' id='jumlah' name='jumlah' /><div><span class='error'></span></div>
<label>periode<br /></label><input type='text' class='form-control' id='periode' name='periode' /><div><span class='error'></span></div>

          <!--<label>No. Pegawai <br /></label><input type="text" class="form-control" id="no_peg" name="no_peg" /><div><span class="error"></span></div>-->
      </div>
      <div class="modal-footer">
        <button class="btn btn-default" type="button" data-dismiss="modal">Close</button>
        <button type="submit" id="simpan_data_prediksi" class="btn btn-primary">Simpan Data</button>
        </form>
      </div>
    </div>
  </div>
</div>
<div id="modal_lihat_prediksi" class="modal fade" role="dialog" tabindex="-1">
  <div class="modal-dialog modal-lg" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h4 id="modal-title" class="modal-title">Lihat Data prediksi</h4>
        <button class="close" type="button" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">×</span>
        </button>
      </div>
      <div class="modal-body">
        <div id="forTable_prediksi"></div>
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
  <table id="tbl_prediksi" class="display dataTable" style="width:100%">
    <thead>
      <tr> <th>id_prediksi</th>
<th>id_obat</th>
<th>jumlah</th>
<th>periode</th>

        <!--<th>No. Pegawai</th>-->
      </tr>
    </thead>
    <tbody></tbody>
  </table>
</div>





