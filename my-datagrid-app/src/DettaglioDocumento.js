import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Document, Page, Text, View, StyleSheet, PDFViewer } from '@react-pdf/renderer';
import Sidebar from './Sidebar';

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
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate('/documenti');
  };

  return (
    <div className="App-main">
      <Sidebar />
      <Box padding={3} display="flex" flexDirection="column" flexGrow={1}>
        <Box display="flex" alignItems="center" marginBottom={2}>
          <IconButton onClick={handleBackClick}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h4" style={{ fontWeight: 'bold', marginLeft: 8 }}>
            Dettaglio Documento
          </Typography>
        </Box>
        <PDFViewer style={{ width: '100%', height: '750px' }}>
          <MyDocument />
        </PDFViewer>
      </Box>
    </div>
  );
}

export default DettaglioDocumento; 