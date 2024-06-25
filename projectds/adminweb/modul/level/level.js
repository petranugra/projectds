jQuery().ready(function () {
    var var_tbl_level = $('#tbl_level').DataTable({
        'processing': true,
        'serverSide': true,
        'serverMethod': 'post',
        'dom': 'Bfrtip',
        'searching': false,
        'select': true,
        'colReorder': true,
        "bInfo" : false,
        "ajax": {
            "url": "modul/level/load_data_level.php",
            "dataType": "json",
            "type": "POST",
            "data": function (data) {

                // Read values
                var search_field_level = $('#search_field_level').val();
                var search_text_level = $('#search_text_level').val();
                
                data.search_field_level = search_field_level;
                data.search_text_level = search_text_level;
                
            }
        },
        "columns": [
{ 'data': 'level' },
{ 'data': 'nama' }

        ],
        "columnDefs": [
{ 'targets': 0, 'className': 'text-center' },
{ 'targets': 1, 'className': 'text-center' }

        ],
        buttons: []
    });

    // ==============================================================
    // FORM VALIDASI
    // ==============================================================

    $("form[name='form_level']").validate({
        rules: {
level: 'required',
nama: 'required'

        },
        messages: {
level:'level tidak boleh kosong!',
nama:'nama tidak boleh kosong!'

        },
        submitHandler: function (form) {
 var level= $('#level').val();
var nama= $('#nama').val();

 var typeact = $('#typeact').val();

 var formData = new FormData(form); // tambahan
 formData.append('typeact', typeact); // tambahan

            $.ajax({
                url: 'modul/level/aksi.php',
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
    $('#search_text_level').keyup(function () {
        var_tbl_level.draw();
    });
    // ==============================================================
    // CLICK TANDA X DI INPUT SEARCH
    // ==============================================================
    $("#searchclear_level").click(function () {
        $("#search_text_level").val("");
        var_tbl_level.draw();
    });

    // ===========================================
    // Ketika tombol Edit di tekan
    // ===========================================

    $("#edit_data_level").click(function () {
        var rowData = var_tbl_level.rows({ selected: true }).data()[0];
        if (rowData != null) {

            var level = rowData['level'];
var nama = rowData['nama'];



            $("#typeact").val("edit");
  
            $('#level').val(level);
$('#nama').val(nama);

            //$("#level").prop('disabled', true); // GA BISA DIEDIT KALI DISABLE
            $('#modal-title').text("Edit Data level");
            $("#modal_level").modal();
        }
        else {
            alert("Silakan pilih data yang akan di edit.");
        }
        //var no_pengajuan = rowData["no_pengajuan"];

    });

    // ==============================================================
    // TOMBOL  DELETE DI CLICK
    // ==============================================================
    jQuery("#hapus_data_level").click(function () {
        var rowData = var_tbl_level.rows({ selected: true }).data()[0];


        if (rowData) {
var level = rowData['level'];
            var a = confirm("Anda yakin akan menghapus data dengan level=" + level);
            if (a) {

                $.ajax({
                    url: 'modul/level/aksi.php',
                    method: 'POST',
                    data: {
                        level: level,
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
    jQuery("#tambah_data_level").click(function () {

        $('#level').val('');
$('#nama').val('');


        $("#typeact").val("add");
        $("#level").prop('disabled', false);
        
        $('#modal-title').text("Tambah Data level");
        $("#modal_level").modal();
    });

    // ===========================================
    // Ketika tombol lihat data di tekan
    // ===========================================
    $("#lihat_data_level").click(function () {

        $.ajax({
            url: "modul/level/aksi.php",
            type: "POST",
            data: {
                typeact: 'lihat'
            },
            dataType: 'json',
            success: function (res) {
                console.log(res);
                var eTable = "<table id='tbl_level' class='display dataTable' style='width:100%'><thead><th>level</th><th>nama</th></thead>";
                for (var i = 0; i < res.length; i++) {
                    eTable += "<tr>";
                    eTable += '<td>' + res[i]['level'] + '</td>';
eTable += '<td>' + res[i]['nama'] + '</td>';
                    eTable += "</tr>";
                }
                eTable += "</tbody></table>";
                $('#forTable_level').html(eTable);
            }
        });

        $('#modal-title').text("Lihat Data Customer Service");
        $("#modal_lihat_level").modal();
    });
    // ===========================================
    // Ketika tombol print data di tekan
    // ===========================================
    $("#print_data").click(function () {
        printHtml("forTable_level");
    });

    // ===========================================
    // Ketika tombol export pdf di tekan
    // ===========================================
    $("#export_pdf").click(function () {

        var doc = new jsPDF('p', 'pt', 'A4');
        doc.setFontSize(16);
        doc.text("Tabel Data level", (doc.internal.pageSize.width / 2), 50, null, null, 'center');
        doc.autoTable({
            html: '#tbl_level',
            startY: 60,
            styles: {
                fontSize: 10,
                cellPadding: 1
            }
        });
        doc.save('table_data_level.pdf')
    })


    // ===========================================
    // Ketika tombol export xlsx di tekan
    // ===========================================
    $("#export_xlsx").click(function () {
        let tbl1 = document.getElementById("tbl_level");
        let worksheet_tmp1 = XLSX.utils.table_to_sheet(tbl1);
        let a = XLSX.utils.sheet_to_json(worksheet_tmp1, { header: 1 });
        let worksheet1 = XLSX.utils.json_to_sheet(a, { skipHeader: true });
        const new_workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(new_workbook, worksheet1, "Data level");
        XLSX.writeFile(new_workbook, 'tmp_file.xls');
    })
});