jQuery().ready(function () {
    var var_tbl_prediksi = $('#tbl_prediksi').DataTable({
        'processing': true,
        'serverSide': true,
        'serverMethod': 'post',
        'dom': 'Bfrtip',
        'searching': false,
        'select': true,
        'colReorder': true,
        "bInfo" : false,
        "ajax": {
            "url": "modul/prediksi/load_data_prediksi.php",
            "dataType": "json",
            "type": "POST",
            "data": function (data) {

                // Read values
                var search_field_prediksi = $('#search_field_prediksi').val();
                var search_text_prediksi = $('#search_text_prediksi').val();
                
                data.search_field_prediksi = search_field_prediksi;
                data.search_text_prediksi = search_text_prediksi;
                
            }
        },
        "columns": [
{ 'data': 'id_prediksi' },
{ 'data': 'id_obat' },
{ 'data': 'jumlah' },
{ 'data': 'periode' }

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

    $("form[name='form_prediksi']").validate({
        rules: {
id_prediksi: 'required',
id_obat: 'required',
jumlah: 'required',
periode: 'required'

        },
        messages: {
id_prediksi:'id_prediksi tidak boleh kosong!',
id_obat:'id_obat tidak boleh kosong!',
jumlah:'jumlah tidak boleh kosong!',
periode:'periode tidak boleh kosong!'

        },
        submitHandler: function (form) {
 var id_prediksi= $('#id_prediksi').val();
var id_obat= $('#id_obat').val();
var jumlah= $('#jumlah').val();
var periode= $('#periode').val();

 var typeact = $('#typeact').val();

 var formData = new FormData(form); // tambahan
 formData.append('typeact', typeact); // tambahan

            $.ajax({
                url: 'modul/prediksi/aksi.php',
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
    $('#search_text_prediksi').keyup(function () {
        var_tbl_prediksi.draw();
    });
    // ==============================================================
    // CLICK TANDA X DI INPUT SEARCH
    // ==============================================================
    $("#searchclear_prediksi").click(function () {
        $("#search_text_prediksi").val("");
        var_tbl_prediksi.draw();
    });

    // ===========================================
    // Ketika tombol Edit di tekan
    // ===========================================

    $("#edit_data_prediksi").click(function () {
        var rowData = var_tbl_prediksi.rows({ selected: true }).data()[0];
        if (rowData != null) {

            var id_prediksi = rowData['id_prediksi'];
var id_obat = rowData['id_obat'];
var jumlah = rowData['jumlah'];
var periode = rowData['periode'];



            $("#typeact").val("edit");
  
            $('#id_prediksi').val(id_prediksi);
$('#id_obat').val(id_obat);
$('#jumlah').val(jumlah);
$('#periode').val(periode);

            //$("#id_prediksi").prop('disabled', true); // GA BISA DIEDIT KALI DISABLE
            $('#modal-title').text("Edit Data prediksi");
            $("#modal_prediksi").modal();
        }
        else {
            alert("Silakan pilih data yang akan di edit.");
        }
        //var no_pengajuan = rowData["no_pengajuan"];

    });

    // ==============================================================
    // TOMBOL  DELETE DI CLICK
    // ==============================================================
    jQuery("#hapus_data_prediksi").click(function () {
        var rowData = var_tbl_prediksi.rows({ selected: true }).data()[0];


        if (rowData) {
var id_prediksi = rowData['id_prediksi'];
            var a = confirm("Anda yakin akan menghapus data dengan id_prediksi=" + id_prediksi);
            if (a) {

                $.ajax({
                    url: 'modul/prediksi/aksi.php',
                    method: 'POST',
                    data: {
                        id_prediksi: id_prediksi,
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
    jQuery("#tambah_data_prediksi").click(function () {

        $('#id_prediksi').val('');
$('#id_obat').val('');
$('#jumlah').val('');
$('#periode').val('');


        $("#typeact").val("add");
        $("#id_prediksi").prop('disabled', false);
        
        $('#modal-title').text("Tambah Data prediksi");
        $("#modal_prediksi").modal();
    });

    // ===========================================
    // Ketika tombol lihat data di tekan
    // ===========================================
    $("#lihat_data_prediksi").click(function () {

        $.ajax({
            url: "modul/prediksi/aksi.php",
            type: "POST",
            data: {
                typeact: 'lihat'
            },
            dataType: 'json',
            success: function (res) {
                console.log(res);
                var eTable = "<table id='tbl_prediksi' class='display dataTable' style='width:100%'><thead><th>id_prediksi</th><th>id_obat</th><th>jumlah</th><th>periode</th></thead>";
                for (var i = 0; i < res.length; i++) {
                    eTable += "<tr>";
                    eTable += '<td>' + res[i]['id_prediksi'] + '</td>';
eTable += '<td>' + res[i]['id_obat'] + '</td>';
eTable += '<td>' + res[i]['jumlah'] + '</td>';
eTable += '<td>' + res[i]['periode'] + '</td>';
                    eTable += "</tr>";
                }
                eTable += "</tbody></table>";
                $('#forTable_prediksi').html(eTable);
            }
        });

        $('#modal-title').text("Lihat Data Customer Service");
        $("#modal_lihat_prediksi").modal();
    });
    // ===========================================
    // Ketika tombol print data di tekan
    // ===========================================
    $("#print_data").click(function () {
        printHtml("forTable_prediksi");
    });

    // ===========================================
    // Ketika tombol export pdf di tekan
    // ===========================================
    $("#export_pdf").click(function () {

        var doc = new jsPDF('p', 'pt', 'A4');
        doc.setFontSize(16);
        doc.text("Tabel Data prediksi", (doc.internal.pageSize.width / 2), 50, null, null, 'center');
        doc.autoTable({
            html: '#tbl_prediksi',
            startY: 60,
            styles: {
                fontSize: 10,
                cellPadding: 1
            }
        });
        doc.save('table_data_prediksi.pdf')
    })


    // ===========================================
    // Ketika tombol export xlsx di tekan
    // ===========================================
    $("#export_xlsx").click(function () {
        let tbl1 = document.getElementById("tbl_prediksi");
        let worksheet_tmp1 = XLSX.utils.table_to_sheet(tbl1);
        let a = XLSX.utils.sheet_to_json(worksheet_tmp1, { header: 1 });
        let worksheet1 = XLSX.utils.json_to_sheet(a, { skipHeader: true });
        const new_workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(new_workbook, worksheet1, "Data prediksi");
        XLSX.writeFile(new_workbook, 'tmp_file.xls');
    })
});