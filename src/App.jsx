import React, { useState, useRef } from 'react';
import { UploadCloud, FileType, Printer, Settings, Download } from 'lucide-react';
import { parseExcelFile } from './utils/excelParser';
import ReportTemplate from './components/ReportTemplate';
import * as XLSX from 'xlsx';

function App() {
  const [templateType, setTemplateType] = useState('balita');
  const [fileData, setFileData] = useState(null);
  const [fileName, setFileName] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  
  const [meta, setMeta] = useState({
    faskes: '', alamat: '', pendamping: '', bulan: '',
    provinsi: '', kabupaten: '', kecamatan: '', desa: ''
  });

  const fileInputRef = useRef(null);

  // Template download is now handled by static links in the UI

  const handleMetaChange = (e) => {
    const { name, value } = e.target;
    setMeta(prev => ({ ...prev, [name]: value }));
  };

  const handleFileUpload = async (file) => {
    if (!file) return;
    setFileName(file.name);
    try {
      const data = await parseExcelFile(file);
      setFileData(data);
    } catch (error) {
      alert("Error parsing excel file: " + error.message);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      <div className="app-container print-none">
        <header>
          <h1>Generator <span className="highlight">Verkes</span></h1>
          <p>Ubah format Excel hasil ekspor menjadi laporan resmi PKH standar dengan satu klik.</p>
        </header>

        <div className="glass-panel">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>
            <Settings color="var(--primary)" />
            <h2 style={{ fontSize: '1.2rem', color: 'var(--text-main)' }}>Konfigurasi Dokumen</h2>
          </div>
          
          <div className="form-grid">
            <div className="input-group" style={{ gridColumn: '1 / -1' }}>
              <label>Template Laporan</label>
              <select value={templateType} onChange={(e) => setTemplateType(e.target.value)}>
                <option value="balita">Kesehatan: Ibu Hamil & Balita</option>
                <option value="lansia">Kesehatan: Disabilitas & Lansia</option>
              </select>
            </div>
            
            <div className="input-group">
              <label>Faskes</label>
              <input type="text" name="faskes" value={meta.faskes} onChange={handleMetaChange} placeholder="Posyandu Desa..." />
            </div>
            <div className="input-group">
              <label>Alamat Faskes</label>
              <input type="text" name="alamat" value={meta.alamat} onChange={handleMetaChange} placeholder="Desa..." />
            </div>
            <div className="input-group">
              <label>Nama Pendamping</label>
              <input type="text" name="pendamping" value={meta.pendamping} onChange={handleMetaChange} placeholder="Nama..." />
            </div>
            <div className="input-group">
              <label>Bulan Laporan</label>
              <input type="text" name="bulan" value={meta.bulan} onChange={handleMetaChange} placeholder="Contoh: September 2026" />
            </div>
            <div className="input-group">
              <label>Provinsi</label>
              <input type="text" name="provinsi" value={meta.provinsi} onChange={handleMetaChange} placeholder="Jawa Tengah" />
            </div>
            <div className="input-group">
              <label>Kabupaten</label>
              <input type="text" name="kabupaten" value={meta.kabupaten} onChange={handleMetaChange} placeholder="Magelang" />
            </div>
            <div className="input-group">
              <label>Kecamatan</label>
              <input type="text" name="kecamatan" value={meta.kecamatan} onChange={handleMetaChange} placeholder="Windusari" />
            </div>
            <div className="input-group">
              <label>Desa</label>
              <input type="text" name="desa" value={meta.desa} onChange={handleMetaChange} placeholder="Kentengsari" />
            </div>
          </div>
        </div>

        <div className="glass-panel">
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
            <a 
              href="/Template_Ibu_Hamil_Balita.xlsx"
              download
              className="btn-outline"
              style={{ flex: 1 }}
            >
              <Download size={18} /> Template Ibu Hamil & Balita
            </a>
            <a 
              href="/Template_Disabilitas_Lansia.xlsx"
              download
              className="btn-outline"
              style={{ flex: 1 }}
            >
              <Download size={18} /> Template Lansia & Disabilitas
            </a>
          </div>

          <div 
            className={`upload-area ${isDragging ? 'active' : ''}`}
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current.click()}
          >
            <div className="icon-circle">
              <UploadCloud size={32} />
            </div>
            <h3 style={{ color: 'var(--text-main)', marginBottom: '0.5rem', fontWeight: '700' }}>Tarik & Lepas File Excel</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>atau klik untuk menelusuri komputer Anda</p>
            {fileName && <p style={{ color: 'var(--primary)', marginTop: '1rem', fontWeight: 'bold' }}><FileType size={16} style={{display: 'inline', verticalAlign: 'middle'}}/> {fileName} loaded</p>}
          </div>
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={(e) => handleFileUpload(e.target.files[0])} 
            accept=".xlsx, .xls" 
            style={{ display: 'none' }} 
          />

          <button 
            className="btn-primary" 
            onClick={handlePrint} 
            disabled={!fileData}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}
          >
            <Printer size={20} /> Generate & Print PDF
          </button>
        </div>
      </div>

      {/* Preview and Print Area */}
      {fileData && (
        <div className="preview-wrapper">
          <h2 className="preview-title print-none">📄 Live Preview</h2>
          <div className="paper-sheet">
            <ReportTemplate data={fileData} meta={meta} type={templateType} />
          </div>
        </div>
      )}

      <footer className="print-none">
        <p>© 2026 MagelangOK. Dibuat untuk efisiensi. | <a href="https://magelang-ok.vercel.app/" target="_blank" rel="noreferrer">Magelang OK</a></p>
      </footer>

      <style dangerouslySetInnerHTML={{__html: `
        @media print {
          .print-none {
            display: none !important;
          }
          .preview-wrapper {
            margin: 0;
            padding: 0;
            box-shadow: none;
            border: none;
            background: none;
            backdrop-filter: none;
          }
        }
      `}} />
    </>
  );
}

export default App;
