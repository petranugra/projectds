<?php
// Jalankan script Python
$output = shell_exec('python3 /path/to/pythonphpobat.py');

// Menampilkan output dari script Python (jika ada)
echo "<pre>$output</pre>";

// Menampilkan gambar hasil prediksi
echo "<img src='/path/to/save/prediction_plot.png' alt='Prediction Plot'>";
?>