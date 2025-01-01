// Fungsi untuk memformat angka dengan pemisah ribuan
function formatRupiah(angka) {
  return angka.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

// Fungsi untuk menghapus format ribuan dari input
function removeFormatRupiah(input) {
  return input.replace(/\./g, '');
}

// Fungsi untuk menampilkan simbol mata uang
function getCurrencySymbol(currency) {
  switch(currency) {
    case 'USD':
      return '$';
    case 'EUR':
      return '€';
    case 'GBP':
      return '£';
    case 'JPY':
      return '¥';
    default:
      return 'Rp'; // Default adalah Rupiah
  }
}

// Menampilkan daftar barang dari file JSON
function tampilkanDaftarBarang() {
  // URL file JSON
  const jsonUrl = '/barang.json'; // Sesuaikan dengan path JSON Anda
  
  fetch(jsonUrl)
    .then(response => response.json()) // Mengubah respons ke format JSON
    .then(data => {
      const tabelBarang = document.getElementById('tabelBarang'); // Pastikan tabel ada di HTML
      tabelBarang.innerHTML = ''; // Kosongkan tabel sebelum ditambahkan data baru

      // Iterasi data barang dan tambahkan ke tabel
      data.barang.forEach(item => {
        const row = document.createElement('tr');
        const cellNama = document.createElement('td');
        cellNama.textContent = item.nama; // Ambil hanya nama barang
        row.appendChild(cellNama);
        tabelBarang.appendChild(row);
      });
    })
    .catch(error => console.error('Terjadi kesalahan saat memuat data:', error));
}

// Event listener untuk tombol hitung
document.getElementById('hitungBtn').addEventListener('click', function () {
  // Ambil nilai input dan hapus format ribuan
  const hargaInput = document.getElementById('harga').value;
  const harga = parseFloat(removeFormatRupiah(hargaInput));
  const ppn = parseFloat(document.getElementById('ppn').value);
  const currency = document.getElementById('currency').value;

  // Validasi input
  if (isNaN(harga) || isNaN(ppn) || harga <= 0 || ppn <= 0) {
    alert('Masukkan nilai yang valid!');
    return;
  }

  // Hitung nilai PPN dan total harga
  const nilaiPPN = (harga * ppn) / 100;
  const totalHarga = harga + nilaiPPN;

  // Tampilkan hasil dengan format ribuan dan simbol mata uang sesuai pilihan
  const currencySymbol = getCurrencySymbol(currency);
  document.getElementById('hasilPPN').textContent = `PPN: ${currencySymbol} ${formatRupiah(nilaiPPN.toFixed(0))}`;
  document.getElementById('totalHarga').textContent = `Total Harga: ${currencySymbol} ${formatRupiah(totalHarga.toFixed(0))}`;
});

// Event listener untuk memformat input harga secara langsung
document.getElementById('harga').addEventListener('input', function (event) {
  let input = event.target.value.replace(/\./g, ''); // Hilangkan titik sementara
  if (/^\d+$/.test(input)) {
    // Jika input valid (hanya angka), tambahkan format ribuan
    event.target.value = formatRupiah(input);
  } else if (input === '') {
    // Reset jika input kosong
    event.target.value = '';
  } else {
    // Jika tidak valid (mengandung karakter non-angka), pertahankan nilai terakhir
    event.target.value = event.target.getAttribute('data-last-valid') || '';
  }
  // Simpan nilai terakhir yang valid
  event.target.setAttribute('data-last-valid', event.target.value);
});

// Event listener untuk mengupdate hasil saat mata uang dipilih
document.getElementById('currency').addEventListener('change', function () {
  // Ambil nilai input dan hapus format ribuan
  const hargaInput = document.getElementById('harga').value;
  const harga = parseFloat(removeFormatRupiah(hargaInput));
  const ppn = parseFloat(document.getElementById('ppn').value);
  const currency = document.getElementById('currency').value;

  // Validasi input
  if (isNaN(harga) || isNaN(ppn) || harga <= 0 || ppn <= 0) {
    alert('Masukkan nilai yang valid!');
    return;
  }

  // Hitung nilai PPN dan total harga
  const nilaiPPN = (harga * ppn) / 100;
  const totalHarga = harga + nilaiPPN;

  // Tampilkan hasil dengan format ribuan dan simbol mata uang sesuai pilihan
  const currencySymbol = getCurrencySymbol(currency);
  document.getElementById('hasilPPN').textContent = `PPN: ${currencySymbol} ${formatRupiah(nilaiPPN.toFixed(0))}`;
  document.getElementById('totalHarga').textContent = `Total Harga: ${currencySymbol} ${formatRupiah(totalHarga.toFixed(0))}`;
});

// Panggil fungsi tampilkanDaftarBarang untuk menampilkan daftar barang saat halaman dimuat
window.addEventListener('load', tampilkanDaftarBarang);
