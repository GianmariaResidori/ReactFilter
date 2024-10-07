import React from 'react';
import './App.css';
import { DataGrid } from '@mui/x-data-grid';
import { Checkbox, Link, AttachFile, MoreVert } from '@mui/icons-material';

const rows = [
  { id: 1, ragioneSociale: 'Azienda A', partitaIva: '12345678901', numeroDocumento: 'DOC001', dataDocumento: '2023-10-01', importoTotale: 1000, registrata: 'Si' },
  { id: 2, ragioneSociale: 'Azienda B', partitaIva: '98765432109', numeroDocumento: 'DOC002', dataDocumento: '2023-10-02', importoTotale: 2000, registrata: 'No' },
  { id: 3, ragioneSociale: 'Azienda C', partitaIva: '11223344556', numeroDocumento: 'DOC003', dataDocumento: '2023-10-03', importoTotale: 1500, registrata: 'Si' },
  { id: 4, ragioneSociale: 'Azienda D', partitaIva: '99887766554', numeroDocumento: 'DOC004', dataDocumento: '2023-10-04', importoTotale: 2500, registrata: 'No' },
  { id: 5, ragioneSociale: 'Azienda E', partitaIva: '55667788990', numeroDocumento: 'DOC005', dataDocumento: '2023-10-05', importoTotale: 3000, registrata: 'Si' },
];

const columns = [
  {
    field: 'select',
    headerName: '',
    width: 50,
    renderCell: (params) => <Checkbox />,
  },
  {
    field: 'link',
    headerName: '',
    width: 50,
    renderCell: (params) => <Link />,
  },
  {
    field: 'attach',
    headerName: '',
    width: 50,
    renderCell: (params) => <AttachFile />,
  },
  { field: 'ragioneSociale', headerName: 'Ragione Sociale', width: 150 },
  { field: 'partitaIva', headerName: 'Partita IVA', width: 150 },
  { field: 'numeroDocumento', headerName: 'Numero Documento', width: 150 },
  { field: 'dataDocumento', headerName: 'Data Documento', width: 150 },
  { field: 'importoTotale', headerName: 'Importo Totale', width: 150, type: 'number' },
  { field: 'registrata', headerName: 'Registrata', width: 100 },
  {
    field: 'actions',
    headerName: '',
    width: 50,
    renderCell: (params) => <MoreVert />,
  },
];

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>DataGrid con Material UI</h1>
        <div style={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={5}
            checkboxSelection
            disableSelectionOnClick
          />
        </div>
      </header>
    </div>
  );
}

export default App;
