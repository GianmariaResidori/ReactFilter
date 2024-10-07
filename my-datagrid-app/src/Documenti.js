import React from 'react';
import './App.css';
import { DataGrid } from '@mui/x-data-grid';
import LinkIcon from '@mui/icons-material/Link';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const rows = [
  { id: 1, ragioneSociale: 'Azienda A', partitaIva: '12345678901', numeroDocumento: 'DOC001', dataDocumento: '2023-10-01', importoTotale: 1000, registrata: 'Si' },
  { id: 2, ragioneSociale: 'Azienda B', partitaIva: '98765432109', numeroDocumento: 'DOC002', dataDocumento: '2023-10-02', importoTotale: 2000, registrata: 'No' },
  { id: 3, ragioneSociale: 'Azienda C', partitaIva: '11223344556', numeroDocumento: 'DOC003', dataDocumento: '2023-10-03', importoTotale: 1500, registrata: 'Si' },
  { id: 4, ragioneSociale: 'Azienda D', partitaIva: '99887766554', numeroDocumento: 'DOC004', dataDocumento: '2023-10-04', importoTotale: 2500, registrata: 'No' },
  { id: 5, ragioneSociale: 'Azienda E', partitaIva: '55667788990', numeroDocumento: 'DOC005', dataDocumento: '2023-10-05', importoTotale: 3000, registrata: 'Si' },
];

const columns = [
  {
    field: 'link',
    headerName: '',
    width: 50,
    renderCell: (params) => (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
        <LinkIcon />
      </div>
    ),
  },
  {
    field: 'attach',
    headerName: '',
    width: 50,
    renderCell: (params) => (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
        <AttachFileIcon />
      </div>
    ),
  },
  { field: 'ragioneSociale', headerName: 'Ragione Sociale', flex: 1 },
  { field: 'partitaIva', headerName: 'Partita IVA', flex: 1 },
  { field: 'numeroDocumento', headerName: 'Numero Documento', flex: 1 },
  { field: 'dataDocumento', headerName: 'Data Documento', width: 150 },
  { field: 'importoTotale', headerName: 'Importo Totale', width: 150, type: 'number' },
  { field: 'registrata', headerName: 'Registrata', width: 100 },
  {
    field: 'actions',
    headerName: '',
    width: 50,
    renderCell: (params) => (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
        <MoreVertIcon />
      </div>
    ),
  },
];

function Documenti() {
  return (
    <div className="App">
      <header className="App-header">
        <h1 className="App-title">Documenti</h1>
        <div className="App-content">
          <div className="DataGrid-container">
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={5}
              checkboxSelection
              disableSelectionOnClick
              autoHeight
            />
          </div>
        </div>
      </header>
    </div>
  );
}

export default Documenti;