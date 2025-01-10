import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Sidebar from './Sidebar';

function DettaglioDocumento() {
  const navigate = useNavigate(); // Hook per la navigazione tra pagine

  // Funzione per gestire il click sul pulsante "Indietro"
  const handleBackClick = () => {
    navigate('/documenti'); // Naviga alla pagina precedente
  };

  return (
    <div className="App-main" style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Sidebar /> {/* Componente per la barra laterale */}
      <Box padding={3} display="flex" flexDirection="column" flexGrow={1}>
        {/* Autolayout orizzontale */}
        <Box display="flex" alignItems="center" marginBottom={2}>
          <IconButton onClick={handleBackClick}> {/* Pulsante per tornare indietro */}
            <ArrowBackIcon />
          </IconButton>

          {/* Autolayout verticale */}
          <Box display="flex" flexDirection="column" marginLeft={2}>
            <Typography variant="h7" color="#0B416E" noWrap>
              Documenti - Fatture Rise
            </Typography>
            <Typography variant="h4" color="#0B416E" noWrap style={{ fontWeight: 'bold' }}>
              Documento
            </Typography>
          </Box>
        </Box>

        {/* Viewer PDF che carica il file statico dalla cartella public */}
        <Box style={{ flexGrow: 1, height: '100%' }}>
          <iframe
            src={`${process.env.PUBLIC_URL}/document.pdf`}
            title="Documento"
            style={{ width: '100%', height: '100%', border: 'none' }}
          />
        </Box>
      </Box>
    </div>
  );
}

export default DettaglioDocumento;