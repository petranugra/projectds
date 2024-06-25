$(document).ready(function () {
           $("#open").click(function() {
               $.ajax({
                   url : "javascript.txt",
                   dataType: "text",
                   success : function (data) { $("#t4_javascript").text(data); }
               });
               $.ajax({
                   url : "config.txt",
                   dataType: "text",
                   success : function (data) { $("#t4_config").text(data); }
               });
               $.ajax({
                   url : "index.txt",
                   dataType: "text",
                   success : function (data) { $("#t4_index").text(data); }
               });
               $.ajax({
                   url : "aksi.txt",
                   dataType: "text",
                   success : function (data) { $("#t4_aksi").text(data); }
               });
               $.ajax({
                   url : "loaddata.txt",
                   dataType: "text",
                   success : function (data) { $("#t4_load_data").text(data); }
               });
               $.ajax({
                   url : "snippets.txt",
                   dataType: "text",
                   success : function (data) { $("#t4_snippets").text(data); }
               });
               $.ajax({
                   url : "../../kasir/adminweb/assets/styles.css",
                   dataType: "text",
                   success : function (data) { $("#t4_styles").text(data); }
               });
               $.ajax({
                   url : "../../kasir/adminweb/controller.php"
               }).done(function(data) {
                   $("#t4_controller").html(data);
               });
           });

          $("#koneksi").click(function() {

            var host_txt = $("#host_txt").val();
            var username_txt = $("#username_txt").val();
            var password_txt = $("#password_txt").val();
            var database_txt = $("#database_txt").val();

            $.ajax({
              url: "koneksi.php",
              type: "POST",
              data: {
                  host_txt: host_txt,
                  username_txt: username_txt,
                  password_txt: password_txt,
                  database_txt: database_txt,
                  typeact:"table"
              },
              dataType: 'json',
              success: function (res) {
                  console.log(res);
                  var $select_table = $('#table_txt');                        
                  $select_table.find('option').remove();  
                  for (var i = 0; i < res.length; i++) {
                    $select_table.append('<option value="' + res[i]['TABLE_NAME'] + '">' + res[i]['TABLE_NAME'] + '</option>');
                  }
              }
            });
        });

        $('#table_txt').on('change', function() {
          var host_txt = $("#host_txt").val();
          var username_txt = $("#username_txt").val();
          var password_txt = $("#password_txt").val();
          var database_txt = $("#database_txt").val();
          var nama_table = $("#table_txt").val();
          $.ajax({
              url: "koneksi.php",
              type: "POST",
              data: {
                  host_txt: host_txt,
                  username_txt: username_txt,
                  password_txt: password_txt,
                  database_txt: database_txt,
                  nama_table: nama_table,
                  typeact:"field"
              },
              dataType: 'json',
              success: function (res) {
                  console.log(res);
                  var $select_field = $('#fields_txt');                        
                  $select_field.find('option').remove();  
                  for (var i = 0; i < res.length; i++) {
                    $select_field.append('<option value="' + res[i]['COLUMN_NAME'] + '">' + res[i]['COLUMN_NAME'] + '</option>');
                  }
              }
            });
        });

        $("#config_copy").click(function(){
            let textarea_config = document.getElementById("t4_config");
            textarea_config.select();
            document.execCommand("copy");
        });

        $("#index_copy").click(function(){
            let textarea_index = document.getElementById("t4_index");
            textarea_index.select();
            document.execCommand("copy");
        });

        $("#javascript_copy").click(function(){
            let textarea_javascript = document.getElementById("t4_javascript");
            textarea_javascript.select();
            document.execCommand("copy");
        });

        $("#load_copy").click(function(){
            let textarea_load = document.getElementById("t4_load_data");
            textarea_load.select();
            document.execCommand("copy");
        });

        $("#aksi_copy").click(function(){
            let textarea_aksi = document.getElementById("t4_aksi");
            textarea_aksi.select();
            document.execCommand("copy");
        });


        $("#generate").click(function() {

            $("#index_name").val("index_NAMA_TABLE.php");
            $("#javascript_name").val("NAMA_TABLE.js");
            $("#loaddata_name").val("load_data_NAMA_TABLE.php");

            var nama_table = $("#table_txt").val();
            var nama_field = document.getElementById('fields_txt');

            // ========= BAGIAN CONFIG =========//
            var text = $("#t4_config").text();

            var host_txt = $("#host_txt").val();
            var username_txt = $("#username_txt").val();
            var password_txt = $("#password_txt").val();
            var database_txt = $("#database_txt").val();
           
            text = text.replace('ISI_HOST', host_txt);
            text = text.replace('ISI_USER', username_txt);
            text = text.replace('ISI_PASS', password_txt);
            text = text.replace('ISI_DATA', database_txt);
            
            $("#t4_config").text(text); 

            // ========== BAGIAN INDEX =========//
            var text_index = $("#t4_index").text();

            var ISI_SEARCH_ISI = "";
            var ISI_HEAD_TABLE = "";
            var ISI_FORM_EDIT = "";

            for (i = 0; i < nama_field.options.length; i++) {
              if(i == nama_field.options.length-1){
                ISI_SEARCH_ISI = ISI_SEARCH_ISI + "<option value='" + nama_field.options[i].value + "'>" + nama_field.options[i].value + "</option>\n";
                ISI_HEAD_TABLE = ISI_HEAD_TABLE + "<th>" + nama_field.options[i].value + "</th>\n";
                ISI_FORM_EDIT = ISI_FORM_EDIT + "<label>" + nama_field.options[i].value + "<br /></label><input type='text' class='form-control' id='" + nama_field.options[i].value + "' name='" + nama_field.options[i].value + "' /><div><span class='error'></span></div>\n";

              }
              else
              {
                ISI_SEARCH_ISI = ISI_SEARCH_ISI + "<option value='" + nama_field.options[i].value + "'>" + nama_field.options[i].value + "</option>\n";
                ISI_HEAD_TABLE = ISI_HEAD_TABLE + "<th>" + nama_field.options[i].value + "</th>\n";
                ISI_FORM_EDIT = ISI_FORM_EDIT + "<label>" + nama_field.options[i].value + "<br /></label><input type='text' class='form-control' id='" + nama_field.options[i].value + "' name='" + nama_field.options[i].value + "' /><div><span class='error'></span></div>\n";
              }
            }

            text_index = text_index.replace(/NAMA_TABLE/g, nama_table);
            text_index = text_index.replace('SEARCH_ISI', ISI_SEARCH_ISI);
            text_index = text_index.replace('HEAD_TABLE', ISI_HEAD_TABLE);
            text_index = text_index.replace('FORM_EDIT', ISI_FORM_EDIT);


            $("#t4_index").text(text_index);

            // ========== BAGIAN LOAD DATA =========//
            var text_load_data = $("#t4_load_data").text();
            var isi = "";

            text_load_data = text_load_data.replaceAll("$$$$", nama_table);

            for (i = 0; i < nama_field.options.length; i++) {
              if(i == nama_field.options.length-1){
               isi = isi + "'" + nama_field.options[i].value + "'=>$row['" + nama_field.options[i].value + "']\n" ;
              }
              else
              {
                isi = isi + "'" + nama_field.options[i].value + "'=>$row['" + nama_field.options[i].value + "'],\n" ;
              }
            }

            text_load_data = text_load_data.replace('ISI_LOAD_DATA', isi);
            $("#t4_load_data").text(text_load_data); 

            // ========== BAGIAN AKSI =========//
            var text_aksi= $("#t4_aksi").text();

            text_aksi = text_aksi.replace(/NAMA_TABLE/g, nama_table);

            var ISI_TEMPAT_VALUES = "";
            var ISI_ISI_VALUES = "";
            var ISI_TIPE_VARIABLE = "";
            var ISI_VARIABLE_TIPE_ADD = "";
            var ISI_VALUES_EDIT = "";
            var ISI_LIHAT_ISI = "";
            var ISI_POST_VARIABLE = "";

            var ISI_WHERE_EDIT = "";
            var ISI_POST_DELETE = "";
            var ISI_WHERE_DELETE = "";
            var ISI_VALUES_ISI_EDIT = "";

            for (i = 0; i < nama_field.options.length; i++) {

              ISI_POST_VARIABLE += "$" + nama_field.options[i].value + " = $conn -> real_escape_string($_POST['" + nama_field.options[i].value + "']);\n";

              if(i == nama_field.options.length-1){
                ISI_TEMPAT_VALUES += "?";
                ISI_ISI_VALUES += "$" + nama_field.options[i].value;
                ISI_TIPE_VARIABLE += "ss";
                ISI_VARIABLE_TIPE_ADD += "s";
                ISI_VALUES_EDIT += nama_field.options[i].value + "=?";
                ISI_LIHAT_ISI += "'" + nama_field.options[i].value + "'=>$row['" + nama_field.options[i].value + "']";
              }
              else
              {
                ISI_TEMPAT_VALUES += "?, ";
                ISI_ISI_VALUES += "$" + nama_field.options[i].value + ", ";
                ISI_TIPE_VARIABLE += "s";
                ISI_VARIABLE_TIPE_ADD += "s";
                ISI_VALUES_EDIT += nama_field.options[i].value + "=?, ";
                ISI_LIHAT_ISI += "'" + nama_field.options[i].value + "'=>$row['" + nama_field.options[i].value + "'],\n";
              }
            }


            ISI_WHERE_EDIT = nama_field.options[0].value + "=?";
            ISI_POST_DELETE = "$" + nama_field.options[0].value + "= $_POST['" + nama_field.options[0].value + "'];";
            ISI_WHERE_DELETE = nama_field.options[0].value + "='$" + nama_field.options[0].value + "'";
            ISI_VALUES_ISI_EDIT += ISI_ISI_VALUES + ",$" + nama_field.options[0].value;

            text_aksi = text_aksi.replace(/POST_VARIABLE/g, ISI_POST_VARIABLE);
            text_aksi = text_aksi.replace("TEMPAT_VALUES", ISI_TEMPAT_VALUES);
            text_aksi = text_aksi.replace("TIPE_VARIABLE", ISI_TIPE_VARIABLE);
            text_aksi = text_aksi.replace("VALUES_EDIT", ISI_VALUES_EDIT);
            text_aksi = text_aksi.replace("WHERE_EDIT", ISI_WHERE_EDIT);
            text_aksi = text_aksi.replace("POST_DELETE", ISI_POST_DELETE);
            text_aksi = text_aksi.replace("WHERE_DELETE", ISI_WHERE_DELETE);
            text_aksi = text_aksi.replace("LIHAT_ISI", ISI_LIHAT_ISI);
            text_aksi = text_aksi.replace("VALUES_ISI_EDIT", ISI_VALUES_ISI_EDIT);
            text_aksi = text_aksi.replace("ISI_VALUES", ISI_ISI_VALUES);
            text_aksi = text_aksi.replace("VARIABLE_TIPE_ADD", ISI_VARIABLE_TIPE_ADD);

            $("#t4_aksi").text(text_aksi); 

            // ========== BAGIAN JAVASCRIPT =========//
            var text_javascript = $("#t4_javascript").text();

            var ISI_COLUMNS_ISI= ""; 
            var ISI_COLUMNDEFS_ISI= ""; 
            var ISI_RULES_ISI= ""; 
            var ISI_MESSAGES_ISI= ""; 
            var ISI_SUBMITHANDLER_ISI= "";
            var ISI_DATA_ISI= ""; 
            var ISI_EDIT_ISI= ""; 
            var ISI_DELETE_ISI= ""; 
            var ISI_FORM_ISI= ""; 
            var ISI_HEADER_ISI= ""; 
            var ISI_ETABLE_ISI= ""; 
            var ISI_TAMBAH_ISI= "";

            text_javascript = text_javascript.replace(/NAMA_TABLE/g, nama_table);


              for (i = 0; i < nama_field.options.length; i++) {

              ISI_POST_VARIABLE += "$" + nama_field.options[i].value + " = $conn -> real_escape_string($_POST['" + nama_field.options[i].value + "']);\n";

              if(i == nama_field.options.length-1){

                ISI_COLUMNS_ISI += "{ 'data': '" + nama_field.options[i].value + "' }\n";
                ISI_COLUMNDEFS_ISI += "{ 'targets': " + i + ", 'className': 'text-center' }\n";
                ISI_RULES_ISI += nama_field.options[i].value + ": 'required'\n";
                ISI_MESSAGES_ISI += nama_field.options[i].value + ":'" + nama_field.options[i].value + " tidak boleh kosong!'\n";
                ISI_SUBMITHANDLER_ISI += "var " + nama_field.options[i].value + "= $('#" + nama_field.options[i].value + "').val();\n";
                //ISI_DATA_ISI += nama_field.options[i].value + ":" + nama_field.options[i].value + "\n";
                ISI_EDIT_ISI += "var " + nama_field.options[i].value + " = rowData['" + nama_field.options[i].value + "'];\n";
                ISI_FORM_ISI += "$('#" + nama_field.options[i].value + "').val(" + nama_field.options[i].value + ");\n";
                ISI_HEADER_ISI += "<th>" + nama_field.options[i].value + "</th>"
                ISI_ETABLE_ISI += "eTable += '<td>' + res[i]['" + nama_field.options[i].value + "'] + '</td>';"
                ISI_TAMBAH_ISI += "$('#" + nama_field.options[i].value + "').val('');\n";
                
              }
              else
              {
                ISI_COLUMNS_ISI += "{ 'data': '" + nama_field.options[i].value + "' },\n";
                ISI_COLUMNDEFS_ISI += "{ 'targets': " + i + ", 'className': 'text-center' },\n";
                ISI_RULES_ISI += nama_field.options[i].value + ": 'required',\n";
                ISI_MESSAGES_ISI += nama_field.options[i].value + ":'" + nama_field.options[i].value + " tidak boleh kosong!',\n";
                ISI_SUBMITHANDLER_ISI += "var " + nama_field.options[i].value + "= $('#" + nama_field.options[i].value + "').val();\n";
                //ISI_DATA_ISI += nama_field.options[i].value + ":" + nama_field.options[i].value + ",\n";
                ISI_EDIT_ISI += "var " + nama_field.options[i].value + " = rowData['" + nama_field.options[i].value + "'];\n";
                ISI_FORM_ISI += "$('#" + nama_field.options[i].value + "').val(" + nama_field.options[i].value + ");\n";
                ISI_HEADER_ISI += "<th>" + nama_field.options[i].value + "</th>"
                ISI_ETABLE_ISI += "eTable += '<td>' + res[i]['" + nama_field.options[i].value + "'] + '</td>';\n";
                ISI_TAMBAH_ISI += "$('#" + nama_field.options[i].value + "').val('');\n";
              }
            }

            ISI_DELETE_ISI = "var " + nama_field.options[0].value + " = rowData['" + nama_field.options[0].value + "'];";

            text_javascript = text_javascript.replace("COLUMNS_ISI", ISI_COLUMNS_ISI);
            text_javascript = text_javascript.replace("COLUMNDEFS_ISI", ISI_COLUMNDEFS_ISI);
            text_javascript = text_javascript.replace("RULES_ISI", ISI_RULES_ISI);
            text_javascript = text_javascript.replace("MESSAGES_ISI", ISI_MESSAGES_ISI);
            text_javascript = text_javascript.replace("SUBMITHANDLER_ISI", ISI_SUBMITHANDLER_ISI);
            //text_javascript = text_javascript.replace("DATA_ISI", ISI_DATA_ISI);
            text_javascript = text_javascript.replace("EDIT_ISI", ISI_EDIT_ISI);
            text_javascript = text_javascript.replace("DELETE_ISI", ISI_DELETE_ISI);
            text_javascript = text_javascript.replace("FORM_ISI", ISI_FORM_ISI);
            text_javascript = text_javascript.replace("FORM_ISI", ISI_FORM_ISI);
            text_javascript = text_javascript.replace(/DEL_FIELD/g, nama_field.options[0].value);
            text_javascript = text_javascript.replace(/ADD_FIELD/g, nama_field.options[0].value);
            text_javascript = text_javascript.replace(/EDIT_FIELD/g, nama_field.options[0].value);
            text_javascript = text_javascript.replace("HEADER_ISI", ISI_HEADER_ISI);
            text_javascript = text_javascript.replace("ETABLE_ISI", ISI_ETABLE_ISI);
            text_javascript = text_javascript.replace("TAMBAH_ISI", ISI_TAMBAH_ISI);

            $("#t4_javascript").text(text_javascript); 

            // ========== BAGIAN NAMA FILE =========//

            var index_name = $("#index_name").val();
            var javascript_name = $("#javascript_name").val();
            var loaddata_name = $("#loaddata_name").val();

            index_name = index_name.replace("NAMA_TABLE", nama_table);
            javascript_name = javascript_name.replace("NAMA_TABLE", nama_table);
            loaddata_name = loaddata_name.replace("NAMA_TABLE", nama_table);

            $("#index_name").val(index_name);
            $("#javascript_name").val(javascript_name);
            $("#loaddata_name").val(loaddata_name);


          });

          // ========== BAGIAN SAVE FILE =========//

          $("#config_save").click(function() {

            const filename = document.getElementById('config_name').value;
            const content = document.getElementById('t4_config').value;

            const textBlob = new Blob([content], { type: 'plain/text' });

            var downloadLink = document.createElement("a");
            downloadLink.download = filename;
            downloadLink.innerHTML = "Download File";
            downloadLink.href = window.URL.createObjectURL(textBlob);
            downloadLink.click();
            delete downloadLink;
            delete textBlob;
            
          });

          $("#index_save").click(function() {

            const filename = document.getElementById('index_name').value;
            const content = document.getElementById('t4_index').value;

            const textBlob = new Blob([content], { type: 'plain/text' });

            var downloadLink = document.createElement("a");
            downloadLink.download = filename;
            downloadLink.innerHTML = "Download File";
            downloadLink.href = window.URL.createObjectURL(textBlob);
            downloadLink.click();
            delete downloadLink;
            delete textBlob;
            
          });

          $("#javascript_save").click(function() {

            const filename = document.getElementById('javascript_name').value;
            const content = document.getElementById('t4_javascript').value;

            const textBlob = new Blob([content], { type: 'plain/text' });

            var downloadLink = document.createElement("a");
            downloadLink.download = filename;
            downloadLink.innerHTML = "Download File";
            downloadLink.href = window.URL.createObjectURL(textBlob);
            downloadLink.click();
            delete downloadLink;
            delete textBlob;
            
          });

          $("#aksi_save").click(function() {

            const filename = document.getElementById('aksi_name').value;
            const content = document.getElementById('t4_aksi').value;

            const textBlob = new Blob([content], { type: 'plain/text' });

            var downloadLink = document.createElement("a");
            downloadLink.download = filename;
            downloadLink.innerHTML = "Download File";
            downloadLink.href = window.URL.createObjectURL(textBlob);
            downloadLink.click();
            delete downloadLink;
            delete textBlob;
            
          });

          $("#loaddata_save").click(function() {

            const filename = document.getElementById('loaddata_name').value;
            const content = document.getElementById('t4_load_data').value;

            const textBlob = new Blob([content], { type: 'plain/text' });

            var downloadLink = document.createElement("a");
            downloadLink.download = filename;
            downloadLink.innerHTML = "Download File";
            downloadLink.href = window.URL.createObjectURL(textBlob);
            downloadLink.click();
            delete downloadLink;
            delete textBlob;
            
          });

          $("#styles_save").click(function() {

            const filename = document.getElementById('styles_name').value;
            const content = document.getElementById('t4_styles').value;

            const textBlob = new Blob([content], { type: 'plain/text' });

            var downloadLink = document.createElement("a");
            downloadLink.download = filename;
            downloadLink.innerHTML = "Download File";
            downloadLink.href = window.URL.createObjectURL(textBlob);
            downloadLink.click();
            delete downloadLink;
            delete textBlob;
            
          });

          // REMOVE FIELD ON FIELD SELECT

          $('#field_remove').click(function() {
              $('#fields_txt').find('option:selected').remove();
          });



}); 