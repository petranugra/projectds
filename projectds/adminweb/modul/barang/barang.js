jQuery().ready(function () {
    var var_tbl_barang = $('#tbl_barang').DataTable({
        'processing': true,
        'serverSide': true,
        'serverMethod': 'post',
        'dom': 'Bfrtip',
        'searching': false,
        'select': true,
        'colReorder': true,
        "bInfo" : false,
        "ajax": {
            "url": "modul/barang/load_data_barang.php",
            "dataType": "json",
            "type": "POST",
            "data": function (data) {

                // Read values
                var search_field_barang = $('#search_field_barang').val();
                var search_text_barang = $('#search_text_barang').val();
                
                data.search_field_barang = search_field_barang;
                data.search_text_barang = search_text_barang;
                
            }
        },
        "columns": [
{ 'data': 'kode_barang' },
{ 'data': 'kode_kategori' },
{ 'data': 'nama_barang' },
{ 'data': 'harga_barang' },
{ 'data': 'stok_barang' },
{ 'data': 'keterangan_barang' },
{ 'data': 'filename' },
{ 'data': 'kode_supplier' },
{ 'data': 'bv' },
{ 'data': 'expired_barang' }

        ],
        "columnDefs": [
{ 'targets': 0, 'className': 'text-center' },
{ 'targets': 1, 'className': 'text-center' },
{ 'targets': 2, 'className': 'text-center' },
{ 'targets': 3, 'className': 'text-center' },
{ 'targets': 4, 'className': 'text-center' },
{ 'targets': 5, 'className': 'text-center' },
{ 'targets': 6, 'className': 'text-center' },
{ 'targets': 7, 'className': 'text-center' },
{ 'targets': 8, 'className': 'text-center' },
{ 'targets': 9, 'className': 'text-center' }

        ],
        buttons: []
    });

    // ==============================================================
    // FORM VALIDASI
    // ==============================================================

    $("form[name='form_barang']").validate({
        rules: {
kode_barang: 'required',
kode_kategori: 'required',
nama_barang: 'required',
harga_barang: 'required',
stok_barang: 'required',
keterangan_barang: 'required',
filename: 'required',
kode_supplier: 'required',
bv: 'required',
expired_barang: 'required'

        },
        messages: {
kode_barang:'kode_barang tidak boleh kosong!',
kode_kategori:'kode_kategori tidak boleh kosong!',
nama_barang:'nama_barang tidak boleh kosong!',
harga_barang:'harga_barang tidak boleh kosong!',
stok_barang:'stok_barang tidak boleh kosong!',
keterangan_barang:'keterangan_barang tidak boleh kosong!',
filename:'filename tidak boleh kosong!',
kode_supplier:'kode_supplier tidak boleh kosong!',
bv:'bv tidak boleh kosong!',
expired_barang:'expired_barang tidak boleh kosong!'

        },
        submitHandler: function (form) {
 var kode_barang= $('#kode_barang').val();
var kode_kategori= $('#kode_kategori').val();
var nama_barang= $('#nama_barang').val();
var harga_barang= $('#harga_barang').val();
var stok_barang= $('#stok_barang').val();
var keterangan_barang= $('#keterangan_barang').val();
var filename= $('#filename').val();
var kode_supplier= $('#kode_supplier').val();
var bv= $('#bv').val();
var expired_barang= $('#expired_barang').val();

 var typeact = $('#typeact').val();

 var formData = new FormData(form); // tambahan
 formData.append('typeact', typeact); // tambahan

            $.ajax({
                url: 'modul/barang/aksi.php',
                method: 'POST',
                contentType: false, // tambahan
                processData: false, // tambahan
                data: formData,
//                data: {
//typeact: typeact,
//DATA_ISI     
//                },
                success: function (data) {
                    if (typeact == "add") {
                        alert("Data Berhasil Ditambah");
                    }
                    else if (typeact == "edit") {
                        alert("Data Berhasil Diubah");
                    }
                    $("#modal_cs").hide();
                    location.reload(true);
                }
            })
        }
    });

    // ==============================================================
    // KETIKA MENGETIK DI INPUT SEARCH
    // ==============================================================
    $('#search_text_barang').keyup(function () {
        var_tbl_barang.draw();
    });
    // ==============================================================
    // CLICK TANDA X DI INPUT SEARCH
    // ==============================================================
    $("#searchclear_barang").click(function () {
        $("#search_text_barang").val("");
        var_tbl_barang.draw();
    });

    // ===========================================
    // Ketika tombol Edit di tekan
    // ===========================================

    $("#edit_data_barang").click(function () {
        var rowData = var_tbl_barang.rows({ selected: true }).data()[0];
        if (rowData != null) {

            var kode_barang = rowData['kode_barang'];
var kode_kategori = rowData['kode_kategori'];
var nama_barang = rowData['nama_barang'];
var harga_barang = rowData['harga_barang'];
var stok_barang = rowData['stok_barang'];
var keterangan_barang = rowData['keterangan_barang'];
var filename = rowData['filename'];
var kode_supplier = rowData['kode_supplier'];
var bv = rowData['bv'];
var expired_barang = rowData['expired_barang'];



            $("#typeact").val("edit");
  
            $('#kode_barang').val(kode_barang);
$('#kode_kategori').val(kode_kategori);
$('#nama_barang').val(nama_barang);
$('#harga_barang').val(harga_barang);
$('#stok_barang').val(stok_barang);
$('#keterangan_barang').val(keterangan_barang);
$('#filename').val(filename);
$('#kode_supplier').val(kode_supplier);
$('#bv').val(bv);
$('#expired_barang').val(expired_barang);

            //$("#kode_barang").prop('disabled', true); // GA BISA DIEDIT KALI DISABLE
            $('#modal-title').text("Edit Data barang");
            $("#modal_barang").modal();
        }
        else {
            alert("Silakan pilih data yang akan di edit.");
        }
        //var no_pengajuan = rowData["no_pengajuan"];

    });

    // ==============================================================
    // TOMBOL  DELETE DI CLICK
    // ==============================================================
    jQuery("#hapus_data_barang").click(function () {
        var rowData = var_tbl_barang.rows({ selected: true }).data()[0];


        if (rowData) {
var kode_barang = rowData['kode_barang'];
            var a = confirm("Anda yakin akan menghapus data dengan kode_barang=" + kode_barang);
            if (a) {

                $.ajax({
                    url: 'modul/barang/aksi.php',
                    method: 'POST',
                    data: {
                        kode_barang: kode_barang,
                        typeact: 'del'
                    },
                    success: function (data) {
                        alert("Data Berhasil Dihapus");
                        location.reload(true);
                    }
                })
            }
        }
        else {
            alert("Pilih satu baris untuk dihapus");
        }
    });

    // ==============================================================
    // TOMBOL TAMBAH DATA DI CLICK
    // ==============================================================
    jQuery("#tambah_data_barang").click(function () {

        $('#kode_barang').val('');
$('#kode_kategori').val('');
$('#nama_barang').val('');
$('#harga_barang').val('');
$('#stok_barang').val('');
$('#keterangan_barang').val('');
$('#filename').val('');
$('#kode_supplier').val('');
$('#bv').val('');
$('#expired_barang').val('');


        $("#typeact").val("add");
        $("#kode_barang").prop('disabled', false);
        
        $('#modal-title').text("Tambah Data barang");
        $("#modal_barang").modal();
    });

    // ===========================================
    // Ketika tombol lihat data di tekan
    // ===========================================
    $("#lihat_data_barang").click(function () {

        $.ajax({
            url: "modul/barang/aksi.php",
            type: "POST",
            data: {
                typeact: 'lihat'
            },
            dataType: 'json',
            success: function (res) {
                console.log(res);
                var eTable = "<table id='tbl_barang' class='display dataTable' style='width:100%'><thead><th>kode_barang</th><th>kode_kategori</th><th>nama_barang</th><th>harga_barang</th><th>stok_barang</th><th>keterangan_barang</th><th>filename</th><th>kode_supplier</th><th>bv</th><th>expired_barang</th></thead>";
                for (var i = 0; i < res.length; i++) {
                    eTable += "<tr>";
                    eTable += '<td>' + res[i]['kode_barang'] + '</td>';
eTable += '<td>' + res[i]['kode_kategori'] + '</td>';
eTable += '<td>' + res[i]['nama_barang'] + '</td>';
eTable += '<td>' + res[i]['harga_barang'] + '</td>';
eTable += '<td>' + res[i]['stok_barang'] + '</td>';
eTable += '<td>' + res[i]['keterangan_barang'] + '</td>';
eTable += '<td>' + res[i]['filename'] + '</td>';
eTable += '<td>' + res[i]['kode_supplier'] + '</td>';
eTable += '<td>' + res[i]['bv'] + '</td>';
eTable += '<td>' + res[i]['expired_barang'] + '</td>';
                    eTable += "</tr>";
                }
                eTable += "</tbody></table>";
                $('#forTable_barang').html(eTable);
            }
        });

        $('#modal-title').text("Lihat Data Customer Service");
        $("#modal_lihat_barang").modal();
    });
    // ===========================================
    // Ketika tombol print data di tekan
    // ===========================================
    $("#print_data").click(function () {
        printHtml("forTable_barang");
    });

    // ===========================================
    // Ketika tombol export pdf di tekan
    // ===========================================
    $("#export_pdf").click(function () {

        var doc = new jsPDF('p', 'pt', 'A4');
        doc.setFontSize(16);
        doc.text("Tabel Data barang", (doc.internal.pageSize.width / 2), 50, null, null, 'center');
        doc.autoTable({
            html: '#tbl_barang',
            startY: 60,
            styles: {
                fontSize: 10,
                cellPadding: 1
            }
        });
        doc.save('table_data_barang.pdf')
    })


    // ===========================================
    // Ketika tombol export xlsx di tekan
    // ===========================================
    $("#export_xlsx").click(function () {
        let tbl1 = document.getElementById("tbl_barang");
        let worksheet_tmp1 = XLSX.utils.table_to_sheet(tbl1);
        let a = XLSX.utils.sheet_to_json(worksheet_tmp1, { header: 1 });
        let worksheet1 = XLSX.utils.json_to_sheet(a, { skipHeader: true });
        const new_workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(new_workbook, worksheet1, "Data barang");
        XLSX.writeFile(new_workbook, 'tmp_file.xls');
    })
});