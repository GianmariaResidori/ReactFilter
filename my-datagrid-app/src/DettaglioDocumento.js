import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Document, Page, Text, View, StyleSheet, PDFViewer } from '@react-pdf/renderer';
import Sidebar from './Sidebar';

// Stili per la generazione del PDF
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#E4E4E4',
    padding: 20,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});

// Componente che definisce il contenuto del documento PDF
const MyDocument = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text>Dettaglio Documento</Text>
      </View>
      <View style={styles.section}>
        <Text>Questo è un esempio di PDF generato con @react-pdf/renderer.</Text>
      </View>
    </Page>
  </Document>
);

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
        <Box display="flex" flexDirection="flex" alignItems="center" marginBottom={2}>
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

        {/* Viewer PDF aggiornato per occupare tutta la pagina in altezza */}
        <PDFViewer style={{ width: '100%', height: 'calc(100vh - 100px)' }}>
          <MyDocument />
        </PDFViewer>
      </Box>
    </div>
  );
}

export default DettaglioDocumento;