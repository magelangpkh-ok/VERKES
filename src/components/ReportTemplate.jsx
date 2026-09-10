import React from 'react';

const ReportTemplate = ({ data, meta }) => {
  // Constants for title based on type
  const titleCategory = "DISABILITAS DAN LANSIA";
  const nameHeader = "Nama Lansia / Disabilitas";
  const measureHeader2 = "Tekanan Darah";
  const measureUnit1 = "kg"; // Fixed: Berat badan should be kg
  const measureUnit2 = "mmHg"; // Fixed: Tinggi=cm, Tekanan Darah=mmHg

  // Helper for empty rows to fill page if data is sparse
  const minimumRows = 15;
  const renderRows = [...data];
  if (renderRows.length < minimumRows) {
    for (let i = renderRows.length; i < minimumRows; i++) {
      renderRows.push({
        no: i + 1,
        noKK: '',
        nama: '',
        namaPengurus: '',
        alamat: '',
        beratBadan: '',
        tinggiAtauTekanan: '',
        keterangan: ''
      });
    }
  }

  return (
    <div className="report-container">
      <div className="report-header">
        FORM HASIL PEMERIKSAAN PESERTA PKH<br />
        KOMPONEN KESEHATAN<br />
        {titleCategory}
      </div>

      <div className="meta-grid">
        <table className="meta-table">
          <tbody>
            <tr>
              <td>Faskes</td>
              <td>:</td>
              <td>{meta.faskes || 'Posyandu ....................'}</td>
            </tr>
            <tr>
              <td>Alamat</td>
              <td>:</td>
              <td>{meta.alamat || '................................'}</td>
            </tr>
            <tr>
              <td>Pendamping</td>
              <td>:</td>
              <td>{meta.pendamping || '................................'}</td>
            </tr>
            <tr>
              <td>Bulan</td>
              <td>:</td>
              <td>{meta.bulan || '................................'}</td>
            </tr>
          </tbody>
        </table>
        
        <table className="meta-table">
          <tbody>
            <tr>
              <td>Provinsi</td>
              <td>:</td>
              <td>{meta.provinsi || '................................'}</td>
            </tr>
            <tr>
              <td>Kabupaten</td>
              <td>:</td>
              <td>{meta.kabupaten || '................................'}</td>
            </tr>
            <tr>
              <td>Kecamatan</td>
              <td>:</td>
              <td>{meta.kecamatan || '................................'}</td>
            </tr>
            <tr>
              <td>Desa</td>
              <td>:</td>
              <td>{meta.desa || '................................'}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <table className="data-table">
        <thead>
          <tr>
            <th rowSpan="2" style={{width: '3%'}}>No</th>
            <th rowSpan="2" style={{width: '15%'}}>No. KK</th>
            <th rowSpan="2" style={{width: '18%'}}>{nameHeader}</th>
            <th rowSpan="2" style={{width: '15%'}}>Nama Pengurus</th>
            <th rowSpan="2" style={{width: '20%'}}>Alamat</th>
            <th colSpan="2" style={{width: '15%'}}>Hasil Pemeriksaan</th>
            <th rowSpan="2" style={{width: '14%'}}>Keterangan</th>
          </tr>
          <tr>
            <th style={{fontWeight: 'normal', fontSize: '9pt'}}>Berat Badan<br/>({measureUnit1})</th>
            <th style={{fontWeight: 'normal', fontSize: '9pt'}}>{measureHeader2}<br/>({measureUnit2})</th>
          </tr>
        </thead>
        <tbody>
          {renderRows.map((row, idx) => (
            <tr key={idx}>
              <td>{row.no}</td>
              <td className="text-left">{row.noKK}</td>
              <td className="text-left">{row.nama}</td>
              <td className="text-left">{row.namaPengurus}</td>
              <td className="text-left">{row.alamat}</td>
              <td>{row.beratBadan}</td>
              <td>{row.tinggiAtauTekanan}</td>
              <td>{row.keterangan}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Recap Table area depending on type */}
      <div style={{width: '60%', marginLeft: '5%', display: 'flex', gap: '20px'}}>
         <table className="data-table" style={{marginBottom: '10px'}}>
           <thead>
             <tr><th colSpan="2">Lansia</th></tr>
             <tr>
               <th className="text-left" style={{backgroundColor: 'black', color: 'white'}}>Rekap Kehadiran</th>
               <th style={{backgroundColor: 'black', color: 'white'}}>Jumlah</th>
             </tr>
           </thead>
           <tbody>
             <tr><td className="text-left">Hadir</td><td></td></tr>
             <tr><td className="text-left">Tidak Hadir</td><td></td></tr>
           </tbody>
         </table>
         <table className="data-table" style={{marginBottom: '10px'}}>
           <thead>
             <tr><th colSpan="2">Disabilitas</th></tr>
             <tr>
               <th className="text-left" style={{backgroundColor: 'black', color: 'white'}}>Rekap Kehadiran</th>
               <th style={{backgroundColor: 'black', color: 'white'}}>Jumlah</th>
             </tr>
           </thead>
           <tbody>
             <tr><td className="text-left">Hadir</td><td></td></tr>
             <tr><td className="text-left">Tidak Hadir</td><td></td></tr>
           </tbody>
         </table>
      </div>

      <div className="signature-area">
        <div style={{textAlign: 'center', marginBottom: '10px', fontWeight: 'bold'}}>
          Mengetahui dan Menyetujui,<br/>
          {meta.kecamatan || '................................'}, ................................ 20...
        </div>
        
        <table className="signature-table">
          <tbody>
            <tr>
              <td>Pendamping PKH</td>
              <td>Bidan Desa</td>
              <td>Kepala Desa</td>
            </tr>
            <tr>
              <td><div className="signature-line"></div></td>
              <td><div className="signature-line"></div></td>
              <td><div className="signature-line"></div></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReportTemplate;
