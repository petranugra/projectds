jQuery().ready(function () {
    var var_tbl_kategori = $('#tbl_kategori').DataTable({
        'processing': true,
        'serverSide': true,
        'serverMethod': 'post',
        'dom': 'Bfrtip',
        'searching': false,
        'select': true,
        'colReorder': true,
        "bInfo" : false,
        "ajax": {
            "url": "modul/kategori/load_data_kategori.php",
            "dataType": "json",
            "type": "POST",
            "data": function (data) {

                // Read values
                var search_field_kategori = $('#search_field_kategori').val();
                var search_text_kategori = $('#search_text_kategori').val();
                
                data.search_field_kategori = search_field_kategori;
                data.search_text_kategori = search_text_kategori;
                
            }
        },
        "columns": [
{ 'data': 'kode_kategori' },
{ 'data': 'nama_kategori' },
{ 'data': 'keterangan_kategori' },
{ 'data': 'filename' }

        ],
        "columnDefs": [
{ 'targets': 0, 'className': 'text-center' },
{ 'targets': 1, 'className': 'text-center' },
{ 'targets': 2, 'className': 'text-center' },
{ 'targets': 3, 'className': 'text-center' }

        ],
        buttons: []
    });

    // ==============================================================
    // FORM VALIDASI
    // ==============================================================

    $("form[name='form_kategori']").validate({
        rules: {
kode_kategori: 'required',
nama_kategori: 'required',
keterangan_kategori: 'required',
filename: 'required'

        },
        messages: {
kode_kategori:'kode_kategori tidak boleh kosong!',
nama_kategori:'nama_kategori tidak boleh kosong!',
keterangan_kategori:'keterangan_kategori tidak boleh kosong!',
filename:'filename tidak boleh kosong!'

        },
        submitHandler: function (form) {
 var kode_kategori= $('#kode_kategori').val();
var nama_kategori= $('#nama_kategori').val();
var keterangan_kategori= $('#keterangan_kategori').val();
var filename= $('#filename').val();

 var typeact = $('#typeact').val();

 var formData = new FormData(form); // tambahan
 formData.append('typeact', typeact); // tambahan

            $.ajax({
                url: 'modul/kategori/aksi.php',
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
    $('#search_text_kategori').keyup(function () {
        var_tbl_kategori.draw();
    });
    // ==============================================================
    // CLICK TANDA X DI INPUT SEARCH
    // ==============================================================
    $("#searchclear_kategori").click(function () {
        $("#search_text_kategori").val("");
        var_tbl_kategori.draw();
    });

    // ===========================================
    // Ketika tombol Edit di tekan
    // ===========================================

    $("#edit_data_kategori").click(function () {
        var rowData = var_tbl_kategori.rows({ selected: true }).data()[0];
        if (rowData != null) {

            var kode_kategori = rowData['kode_kategori'];
var nama_kategori = rowData['nama_kategori'];
var keterangan_kategori = rowData['keterangan_kategori'];
var filename = rowData['filename'];



            $("#typeact").val("edit");
  
            $('#kode_kategori').val(kode_kategori);
$('#nama_kategori').val(nama_kategori);
$('#keterangan_kategori').val(keterangan_kategori);
$('#filename').val(filename);

            //$("#kode_kategori").prop('disabled', true); // GA BISA DIEDIT KALI DISABLE
            $('#modal-title').text("Edit Data kategori");
            $("#modal_kategori").modal();
        }
        else {
            alert("Silakan pilih data yang akan di edit.");
        }
        //var no_pengajuan = rowData["no_pengajuan"];

    });

    // ==============================================================
    // TOMBOL  DELETE DI CLICK
    // ==============================================================
    jQuery("#hapus_data_kategori").click(function () {
        var rowData = var_tbl_kategori.rows({ selected: true }).data()[0];


        if (rowData) {
var kode_kategori = rowData['kode_kategori'];
            var a = confirm("Anda yakin akan menghapus data dengan kode_kategori=" + kode_kategori);
            if (a) {

                $.ajax({
                    url: 'modul/kategori/aksi.php',
                    method: 'POST',
                    data: {
                        kode_kategori: kode_kategori,
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
    jQuery("#tambah_data_kategori").click(function () {

        $('#kode_kategori').val('');
$('#nama_kategori').val('');
$('#keterangan_kategori').val('');
$('#filename').val('');


        $("#typeact").val("add");
        $("#kode_kategori").prop('disabled', false);
        
        $('#modal-title').text("Tambah Data kategori");
        $("#modal_kategori").modal();
    });

    // ===========================================
    // Ketika tombol lihat data di tekan
    // ===========================================
    $("#lihat_data_kategori").click(function () {

        $.ajax({
            url: "modul/kategori/aksi.php",
            type: "POST",
            data: {
                typeact: 'lihat'
            },
            dataType: 'json',
            success: function (res) {
                console.log(res);
                var eTable = "<table id='tbl_kategori' class='display dataTable' style='width:100%'><thead><th>kode_kategori</th><th>nama_kategori</th><th>keterangan_kategori</th><th>filename</th></thead>";
                for (var i = 0; i < res.length; i++) {
                    eTable += "<tr>";
                    eTable += '<td>' + res[i]['kode_kategori'] + '</td>';
eTable += '<td>' + res[i]['nama_kategori'] + '</td>';
eTable += '<td>' + res[i]['keterangan_kategori'] + '</td>';
eTable += '<td>' + res[i]['filename'] + '</td>';
                    eTable += "</tr>";
                }
                eTable += "</tbody></table>";
                $('#forTable_kategori').html(eTable);
            }
        });

        $('#modal-title').text("Lihat Data Customer Service");
        $("#modal_lihat_kategori").modal();
    });
    // ===========================================
    // Ketika tombol print data di tekan
    // ===========================================
    $("#print_data").click(function () {
        printHtml("forTable_kategori");
    });

    // ===========================================
    // Ketika tombol export pdf di tekan
    // ===========================================
    $("#export_pdf").click(function () {

        var doc = new jsPDF('p', 'pt', 'A4');
        doc.setFontSize(16);
        doc.text("Tabel Data kategori", (doc.internal.pageSize.width / 2), 50, null, null, 'center');
        doc.autoTable({
            html: '#tbl_kategori',
            startY: 60,
            styles: {
                fontSize: 10,
                cellPadding: 1
            }
        });
        doc.save('table_data_kategori.pdf')
    })


    // ===========================================
    // Ketika tombol export xlsx di tekan
    // ===========================================
    $("#export_xlsx").click(function () {
        let tbl1 = document.getElementById("tbl_kategori");
        let worksheet_tmp1 = XLSX.utils.table_to_sheet(tbl1);
        let a = XLSX.utils.sheet_to_json(worksheet_tmp1, { header: 1 });
        let worksheet1 = XLSX.utils.json_to_sheet(a, { skipHeader: true });
        const new_workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(new_workbook, worksheet1, "Data kategori");
        XLSX.writeFile(new_workbook, 'tmp_file.xls');
    })
});