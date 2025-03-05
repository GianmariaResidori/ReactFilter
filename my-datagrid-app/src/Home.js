import React from 'react';
import { Box, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import LinkIcon from '@mui/icons-material/Link';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Numeriche from './Numeriche';
import Card from './Card';

function Home() {
  const columns = [
    {
      field: 'link',
      headerName: '',
      width: 50,
      renderCell: () => (
        <Box display="flex" justifyContent="center" alignItems="center" height="100%">
          <LinkIcon />
        </Box>
      ),
    },
    {
      field: 'attach',
      headerName: '',
      width: 50,
      renderCell: () => (
        <Box display="flex" justifyContent="center" alignItems="center" height="100%">
          <AttachFileIcon />
        </Box>
      ),
    },
    { field: 'ragioneSociale', headerName: 'Ragione Sociale', flex: 1 },
    { field: 'partitaIva', headerName: 'Partita IVA', flex: 1 },
    { field: 'numeroDocumento', headerName: 'Numero Documento', flex: 1 },
    { field: 'dataDocumento', headerName: 'Data Documento', width: 150 },
    { field: 'importoTotale', headerName: 'Importo Totale', width: 150, type: 'number' },
    {
      field: 'actions',
      headerName: '',
      width: 50,
      renderCell: () => (
        <Box display="flex" justifyContent="center" alignItems="center" height="100%">
          <MoreVertIcon />
        </Box>
      ),
    },
  ];

  const rows = [
    { id: 1, ragioneSociale: 'Azienda A', partitaIva: '12345678901', numeroDocumento: '001', dataDocumento: '2023-01-01', importoTotale: 1000 },
    { id: 2, ragioneSociale: 'Azienda B', partitaIva: '10987654321', numeroDocumento: '002', dataDocumento: '2023-02-01', importoTotale: 2000 },
    { id: 3, ragioneSociale: 'Azienda C', partitaIva: '11223344556', numeroDocumento: '003', dataDocumento: '2023-03-01', importoTotale: 3000 },
  ];

  return (
    <>
      <div className="App-main">
        <Box padding={3} display="flex" flexDirection="column" flexGrow={1}>
          <Typography variant="h7" color="#0B416E" noWrap>
            Archiva S.r.l.
          </Typography>
          <Typography variant="h4" color="#0B416E" noWrap style={{ fontWeight: 'bold' }}>
            Home
          </Typography>
          <Box
            sx={{
              borderRadius: '8px',
              border: '1px solid #ccc',
              padding: 2,
              flexGrow: 1,
              marginTop: 2,
              backgroundColor: 'white',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            }}
          >
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
              disableSelectionOnClick
            />
          </Box>
        </Box>
      </div>
      <div>
        <Card/>
      </div>
      <div className="App">
        <Numeriche />
      </div>
    </>
  );
}

export default Home;