jQuery().ready(function () {
    var var_tbl_obat = $('#tbl_obat').DataTable({
        'processing': true,
        'serverSide': true,
        'serverMethod': 'post',
        'dom': 'Bfrtip',
        'searching': false,
        'select': true,
        'colReorder': true,
        "bInfo" : false,
        "ajax": {
            "url": "modul/obat/load_data_obat.php",
            "dataType": "json",
            "type": "POST",
            "data": function (data) {

                // Read values
                var search_field_obat = $('#search_field_obat').val();
                var search_text_obat = $('#search_text_obat').val();
                
                data.search_field_obat = search_field_obat;
                data.search_text_obat = search_text_obat;
                
            }
        },
        "columns": [
{ 'data': 'id_obat' },
{ 'data': 'nama' },
{ 'data': 'stok' },
{ 'data': 'deskripsi' }

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

    $("form[name='form_obat']").validate({
        rules: {
id_obat: 'required',
nama: 'required',
deskripsi: 'required'

        },
        messages: {
id_obat:'id_obat tidak boleh kosong!',
nama:'nama tidak boleh kosong!',
deskripsi:'deskripsi tidak boleh kosong!'

        },
        submitHandler: function (form) {
 var id_obat= $('#id_obat').val();
var nama= $('#nama').val();
var deskripsi= $('#deskripsi').val();

 var typeact = $('#typeact').val();

 var formData = new FormData(form); // tambahan
 formData.append('typeact', typeact); // tambahan

            $.ajax({
                url: 'modul/obat/aksi.php',
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
    $('#search_text_obat').keyup(function () {
        var_tbl_obat.draw();
    });
    // ==============================================================
    // CLICK TANDA X DI INPUT SEARCH
    // ==============================================================
    $("#searchclear_obat").click(function () {
        $("#search_text_obat").val("");
        var_tbl_obat.draw();
    });

    // ===========================================
    // Ketika tombol Edit di tekan
    // ===========================================

    $("#edit_data_obat").click(function () {
        var rowData = var_tbl_obat.rows({ selected: true }).data()[0];
        if (rowData != null) {

            var id_obat = rowData['id_obat'];
var nama = rowData['nama'];
var deskripsi = rowData['deskripsi'];



            $("#typeact").val("edit");
  
            $('#id_obat').val(id_obat);
$('#nama').val(nama);
$('#deskripsi').val(deskripsi);

            //$("#id_obat").prop('disabled', true); // GA BISA DIEDIT KALI DISABLE
            $('#modal-title').text("Edit Data obat");
            $("#modal_obat").modal();
        }
        else {
            alert("Silakan pilih data yang akan di edit.");
        }
        //var no_pengajuan = rowData["no_pengajuan"];

    });

    // ==============================================================
    // TOMBOL  DELETE DI CLICK
    // ==============================================================
    jQuery("#hapus_data_obat").click(function () {
        var rowData = var_tbl_obat.rows({ selected: true }).data()[0];


        if (rowData) {
var id_obat = rowData['id_obat'];
            var a = confirm("Anda yakin akan menghapus data dengan id_obat=" + id_obat);
            if (a) {

                $.ajax({
                    url: 'modul/obat/aksi.php',
                    method: 'POST',
                    data: {
                        id_obat: id_obat,
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
    jQuery("#tambah_data_obat").click(function () {

        $('#id_obat').val('');
        $('#nama').val('');
        $('#deskripsi').val('');


        $("#typeact").val("add");
        $("#id_obat").prop('disabled', true);
        
        $('#modal-title').text("Tambah Data obat");
        $("#modal_obat").modal();
    });

    // ===========================================
    // Ketika tombol lihat data di tekan
    // ===========================================
    $("#lihat_data_obat").click(function () {

        $.ajax({
            url: "modul/obat/aksi.php",
            type: "POST",
            data: {
                typeact: 'lihat'
            },
            dataType: 'json',
            success: function (res) {
                console.log(res);
                var eTable = "<table id='tbl_obat' class='display dataTable' style='width:100%'><thead><th>id_obat</th><th>nama</th><th>stok</th><th>deskripsi</th></thead>";
                for (var i = 0; i < res.length; i++) {
                    eTable += "<tr>";
                    eTable += '<td>' + res[i]['id_obat'] + '</td>';
                    eTable += '<td>' + res[i]['nama'] + '</td>';
                    eTable += '<td>' + res[i]['stok'] + '</td>';
                    eTable += '<td>' + res[i]['deskripsi'] + '</td>';
                    eTable += "</tr>";
                }
                eTable += "</tbody></table>";
                $('#forTable_obat').html(eTable);
            }
        });

        $('#modal-title').text("Lihat Data Customer Service");
        $("#modal_lihat_obat").modal();
    });
    // ===========================================
    // Ketika tombol print data di tekan
    // ===========================================
    $("#print_data").click(function () {
        printHtml("forTable_obat");
    });

    // ===========================================
    // Ketika tombol export pdf di tekan
    // ===========================================
    $("#export_pdf").click(function () {

        var doc = new jsPDF('p', 'pt', 'A4');
        doc.setFontSize(16);
        doc.text("Tabel Data obat", (doc.internal.pageSize.width / 2), 50, null, null, 'center');
        doc.autoTable({
            html: '#tbl_obat',
            startY: 60,
            styles: {
                fontSize: 10,
                cellPadding: 1
            }
        });
        doc.save('table_data_obat.pdf')
    })


    // ===========================================
    // Ketika tombol export xlsx di tekan
    // ===========================================
    $("#export_xlsx").click(function () {
        let tbl1 = document.getElementById("tbl_obat");
        let worksheet_tmp1 = XLSX.utils.table_to_sheet(tbl1);
        let a = XLSX.utils.sheet_to_json(worksheet_tmp1, { header: 1 });
        let worksheet1 = XLSX.utils.json_to_sheet(a, { skipHeader: true });
        const new_workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(new_workbook, worksheet1, "Data obat");
        XLSX.writeFile(new_workbook, 'tmp_file.xls');
    })
});
