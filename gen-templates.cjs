const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path');

const generate = () => {
  const publicDir = path.join(__dirname, 'public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir);
  }

  // Balita
  const columnsBalita = ["No", "No. KK", "Nama Balita", "Nama Pengurus", "Alamat", "Berat Badan", "Tinggi Badan", "Keterangan"];
  const dummyBalita = [
    columnsBalita.reduce((acc, curr) => ({...acc, [curr]: ""}), {}),
    { "No": 1, "No. KK": "3308091122334455", "Nama Balita": "Budi", "Nama Pengurus": "Siti", "Alamat": "Dsn. Mawar", "Berat Badan": 12, "Tinggi Badan": 80, "Keterangan": "Sehat" }
  ];
  const wsBalita = XLSX.utils.json_to_sheet(dummyBalita, { header: columnsBalita });
  const wbBalita = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wbBalita, wsBalita, "Data Peserta");
  XLSX.writeFile(wbBalita, path.join(publicDir, 'Template_Ibu_Hamil_Balita.xlsx'));

  // Lansia
  const columnsLansia = ["No", "No. KK", "Nama Lansia / Disabilitas", "Nama Pengurus", "Alamat", "Berat Badan", "Tekanan Darah", "Keterangan"];
  const dummyLansia = [
    columnsLansia.reduce((acc, curr) => ({...acc, [curr]: ""}), {}),
    { "No": 1, "No. KK": "3308095544332211", "Nama Lansia / Disabilitas": "Mbah Joyo", "Nama Pengurus": "Agus", "Alamat": "Dsn. Melati", "Berat Badan": 55, "Tekanan Darah": "120/80", "Keterangan": "Cek Rutin" }
  ];
  const wsLansia = XLSX.utils.json_to_sheet(dummyLansia, { header: columnsLansia });
  const wbLansia = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wbLansia, wsLansia, "Data Peserta");
  XLSX.writeFile(wbLansia, path.join(publicDir, 'Template_Disabilitas_Lansia.xlsx'));

  console.log("Templates generated in public folder.");
};

generate();
