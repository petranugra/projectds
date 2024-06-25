<?php
//session_start();
//require("sess.php");
//require ("../config/config.php");

?> <script type="text/javascript" src="../js/plugins/jqueryvalidation.js"></script>
<script type="text/javascript" src="modul/level/level.js"></script>
<!-- <script type="text/javascript" src="../js/level.js"></script> -->
<div class="col-md-12" style="padding-bottom: 0px;padding-top: 25px;padding-right: 25px;padding-left: 15px;height: 182.688px;width: 100%;">
  <span>Halaman level</span>
  <div class="page-header" style="margin-top: 10px;">
    <h1 style="font-size: 23px;margin-top: 8px;height: 30.6875px;">
      <i class="glyphicon glyphicon-lock" style="font-size: 18px;"></i>&nbsp;Data level
    </h1>
  </div>
  <div class="row">
    <div class='col-md-6 text-left'>
      <div class="btn-group" role="group" aria-label="Toolbar">
        <button id='lihat_data_level' class='btn btn-info' data-toggle='tooltip' data-placement='top' title='Lihat Data level' style='color:white;'>
          <i class='far fa-eye' style='font-size: 15px;'></i> Lihat </button><button id='tambah_data_level' class='btn btn-success' data-toggle='tooltip' data-placement='top' title='Edit Data'>
          <i class='far fa-plus-square' style='font-size: 15px;'></i> Tambah
        </button>
        <button id='edit_data_level' class='btn btn-primary' data-toggle='tooltip' data-placement='top' title='Edit Data'>
          <i class='far fa-edit' style='font-size: 15px;'></i> Edit
        </button>
        <button id='hapus_data_level' class='btn btn-danger' data-toggle='tooltip' data-placement='top' title='Hapus Data'>
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
          <select id='search_field_level' name='search_field_level'> <option value='level'>level</option>
<option value='nama'>nama</option>
 </select>
        </div>
        <span id='searchclear_level' data-toggle='tooltip' data-placement='top' title='Clear'><i class="fas fa-times"></i></span>
        <input class='form-control' name='search_text_level' id='search_text_level' type='search' placeholder='Masukkan Kata Kunci Pencarian' />
      </div>
    </div>
  </div>
</div>
<!-- Modal -->
<div id="modal_level" class="modal fade" role="dialog" tabindex="-1">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h4 id="modal-title" class="modal-title">Edit Data level</h4>
        <button class="close" type="button" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">×</span>
        </button>
      </div>
      <div class="modal-body">
        <form name="form_level">
          <input type="hidden" class="form-control" id="typeact" /> <label>level<br /></label><input type='text' class='form-control' id='level' name='level' /><div><span class='error'></span></div>
<label>nama<br /></label><input type='text' class='form-control' id='nama' name='nama' /><div><span class='error'></span></div>

          <!--<label>No. Pegawai <br /></label><input type="text" class="form-control" id="no_peg" name="no_peg" /><div><span class="error"></span></div>-->
      </div>
      <div class="modal-footer">
        <button class="btn btn-default" type="button" data-dismiss="modal">Close</button>
        <button type="submit" id="simpan_data_level" class="btn btn-primary">Simpan Data</button>
        </form>
      </div>
    </div>
  </div>
</div>
<div id="modal_lihat_level" class="modal fade" role="dialog" tabindex="-1">
  <div class="modal-dialog modal-lg" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h4 id="modal-title" class="modal-title">Lihat Data level</h4>
        <button class="close" type="button" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">×</span>
        </button>
      </div>
      <div class="modal-body">
        <div id="forTable_level"></div>
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
  <table id="tbl_level" class="display dataTable" style="width:100%">
    <thead>
      <tr> <th>level</th>
<th>nama</th>

        <!--<th>No. Pegawai</th>-->
      </tr>
    </thead>
    <tbody></tbody>
  </table>
</div>