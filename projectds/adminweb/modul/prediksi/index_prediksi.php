<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>EMA Calculation and Graph</title>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <style>
        table {
            width: 100%;
            border-collapse: collapse;
        }
        table, th, td {
            border: 1px solid black;
        }
        th, td {
            padding: 8px;
            text-align: center;
        }
    </style>
</head>
<body>

<?php
// Konfigurasi koneksi database
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "projectds";

// Membuat koneksi
$conn = new mysqli($servername, $username, $password, $dbname);

// Memeriksa koneksi
if ($conn->connect_error) {
    die("Koneksi gagal: " . $conn->connect_error);
}

// Query untuk mengambil data jumlah pembelian
$sql = "SELECT periode, jumlah FROM pembelian ORDER BY periode ASC";
$result = $conn->query($sql);

$dates = [];
$purchases = [];

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $dates[] = $row['periode'];
        $purchases[] = $row['jumlah'];
    }
} else {
    echo "Tidak ada data.";
    $conn->close();
    exit;
}

$conn->close();

function calculateEMA($prices, $period) {
    $ema = [];
    $multiplier = 2 / ($period + 1);
    
    // Mulai dengan Simple Moving Average (SMA) untuk EMA pertama
    $sma = array_sum(array_slice($prices, 0, $period)) / $period;
    $ema[] = $sma;

    // Hitung EMA selanjutnya
    for ($i = $period; $i < count($prices); $i++) {
        $currentEma = ($prices[$i] - $ema[count($ema) - 1]) * $multiplier + $ema[count($ema) - 1];
        $ema[] = $currentEma;
    }

    return $ema;
}

function calculateMAPE($actual, $predicted) {
    $sumPercentageError = 0;
    $n = count($actual);

    for ($i = 0; $i < $n; $i++) {
        $sumPercentageError += abs(($actual[$i] - $predicted[$i]) / $actual[$i]);
    }

    $mape = ($sumPercentageError / $n) * 100;
    return $mape;
}

$period = 3; // Sesuaikan dengan kebutuhan Anda
$emaValues = calculateEMA($purchases, $period);

// Untuk menghitung MAPE, kita hanya bisa menggunakan nilai EMA yang memiliki nilai aktual yang sesuai (dimulai dari periode ke-n)
$actualValues = array_slice($purchases, $period);
$predictedValues = array_slice($emaValues, 1); // Menghapus nilai EMA pertama yang berdasarkan SMA

$mape = calculateMAPE($actualValues, $predictedValues);

// Prediksi 3 bulan berikutnya menggunakan EMA
for ($i = 0; $i < 3; $i++) {
    $nextEma = ($purchases[count($purchases) - 1] - end($emaValues)) * (2 / ($period + 1)) + end($emaValues);
    $emaValues[] = $nextEma;
    $purchases[] = $nextEma; // Tambahkan nilai prediksi ke array purchases untuk melanjutkan perhitungan EMA
    $dates[] = date('Y-m', strtotime(end($dates) . ' +1 month')); // Tambahkan tanggal prediksi
}

echo "<h2>Data Pembelian dan EMA</h2>";
echo "<table>";
echo "<tr><th>Periode</th><th>Jumlah Pembelian</th><th>EMA</th><th>Percentage Error</th></tr>";

for ($i = 0; $i < count($actualValues); $i++) {
    $percentageError = abs(($actualValues[$i] - $predictedValues[$i]) / $actualValues[$i]) * 100;
    echo "<tr>";
    echo "<td>" . $dates[$i + $period] . "</td>";
    echo "<td>" . $actualValues[$i] . "</td>";
    echo "<td>" . $predictedValues[$i] . "</td>";
    echo "<td>" . $percentageError . "%</td>";
    echo "</tr>";
}

// Tampilkan prediksi 3 bulan berikutnya
for ($i = count($actualValues); $i < count($emaValues) - 1; $i++) {
    echo "<tr>";
    echo "<td>" . $dates[$i + $period] . "</td>";
    echo "<td> - </td>"; // Tidak ada nilai aktual untuk prediksi
    echo "<td>" . $emaValues[$i + 1] . "</td>";
    echo "<td> - </td>"; // Tidak ada nilai percentage error untuk prediksi
    echo "</tr>";
}

echo "</table>";

echo "<h3>MAPE: " . $mape . "%</h3>";
?>

<canvas id="myChart" width="400" height="200"></canvas>
<script>
    const labels = <?php echo json_encode(array_slice($dates, $period)); ?>;
    const data = {
        labels: labels,
        datasets: [
            {
                label: 'Jumlah Pembelian',
                data: <?php echo json_encode($actualValues); ?>,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
            },
            {
                label: 'EMA',
                data: <?php echo json_encode(array_slice($emaValues, 1)); ?>,
                borderColor: 'rgb(255, 99, 132)',
                tension: 0.1
            }
        ]
    };

    const config = {
        type: 'line',
        data: data,
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Grafik Jumlah Pembelian dan EMA'
                }
            }
        },
    };

    const myChart = new Chart(
        document.getElementById('myChart'),
        config
    );
</script>

</body>
</html>
