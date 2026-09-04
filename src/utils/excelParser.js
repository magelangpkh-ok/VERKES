import * as XLSX from 'xlsx';

export const parseExcelFile = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const data = e.target.result;
        const workbook = XLSX.read(data, { type: 'binary' });
        
        // Asumsi data ada di sheet pertama
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        
        // Convert to JSON
        // Range 0 assumes headers are on the first row
        const json = XLSX.utils.sheet_to_json(worksheet, { defval: "" });
        
        // Clean up the data: Ensure we have the necessary keys based on what we expect
        // This is a basic mapping, assuming Excel columns are somewhat predictably named
        const mappedData = json.map((row, index) => {
          return {
            no: index + 1,
            noKK: row['No. KK'] || row['No KK'] || row['NO KK'] || '',
            nama: row['Nama Balita'] || row['Nama Lansia / Disabilitas'] || row['Nama'] || '',
            namaPengurus: row['Nama Pengurus'] || '',
            alamat: row['Alamat'] || '',
            // The template shows blank for these, meaning they are filled manually AFTER printing
            // Or if data exists, we put it here. We'll leave it blank if undefined.
            beratBadan: row['Berat Badan'] || '',
            tinggiAtauTekanan: row['Tinggi Badan'] || row['Tekanan Darah'] || '',
            keterangan: row['Keterangan'] || ''
          };
        });

        resolve(mappedData);
      } catch (error) {
        reject(error);
      }
    };
    
    reader.onerror = (error) => {
      reject(error);
    };
    
    reader.readAsBinaryString(file);
  });
};
