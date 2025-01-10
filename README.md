# ReactFilter

## Descrizione

**My Datagrid App** è un’applicazione React progettata per la gestione e visualizzazione di dati tabellari tramite un’interfaccia interattiva. L’app utilizza **Material-UI** per il design e la libreria **@mui/x-data-grid** per la gestione della griglia. Inoltre, integra un visualizzatore di file PDF che consente agli utenti di aprire i dettagli dei documenti direttamente dal DataGrid o dalla pagina di dettaglio.

---

## Funzionalità Principali

### 1. Visualizzazione dei Dati
- I dati vengono caricati dinamicamente da un file CSV tramite la libreria **Papaparse**.
- Ogni riga della griglia rappresenta un record con dettagli come ragione sociale, partita IVA, numero e data del documento, e importo totale.

### 2. DataGrid Interattivo
#### Azioni integrate:
- Icone per il collegamento a ulteriori dettagli (es. link, allegati).
- Menu per azioni rapide.

#### Filtri avanzati:
- Filtro per colonna con operatori come `Contiene`, `Non contiene`, `Uguale a`, `Diverso da`, `Maggiore di`, e altri.
- I filtri possono essere applicati contemporaneamente su più colonne.
- I filtri sono configurabili tramite un menu interattivo che consente di selezionare operatori e valori.
- Possibilità di rimuovere filtri specifici tramite un pulsante dedicato.

#### Ricerca rapida:
- Campo di testo per effettuare ricerche generiche.

#### Personalizzazione della riga:
- Altezza delle righe regolabile tramite pulsanti di controllo.

### 3. Dettagli Documento
- Cliccando su una riga del DataGrid, si accede a una pagina di dettaglio che mostra informazioni estese del documento selezionato.
- Include un visualizzatore PDF che carica il file relativo al documento corrente.

### 4. Visualizzatore PDF
#### Modal PDF Viewer:
- Visualizzatore integrato in un overlay modale.
- Attivabile cliccando su specifiche azioni nel DataGrid.
- Mostra un file PDF caricato staticamente o dinamicamente in base al documento selezionato.
- L’overlay è ancorato a destra, con larghezza pari a un terzo della finestra e altezza completa.
- La modale si chiude cliccando all’esterno o tramite interazioni dedicate.

---

## Struttura del Progetto

### Componenti Principali
1. **DataGrid**:
   - Configurazione delle colonne e gestione dei dati.
   - Integrazione di filtri e azioni personalizzate.
2. **Visualizzatore PDF**:
   - Basato su un iframe per il rendering dei file PDF dalla cartella `public`.
3. **Gestione del Filtro**:
   - I filtri sono definiti in uno stato globale e gestiti dinamicamente tramite eventi.
4. **Pagina di Dettaglio Documento**:
   - Utilizza il componente PDF Viewer per visualizzare il file associato a un documento selezionato.

---

## Configurazione

### Prerequisiti
- **Node.js v16+** e **npm** installati.

### Installazione
1. Clona il repository:
   ```bash
   git clone <repository-url>
   cd my-datagrid-app
   ```

2. Installa le dipendenze:
   ```bash
   npm install
   ```

3. Avvia l’applicazione:
   ```bash
   npm start
   ```

---

## Struttura dei File

- `src/Documenti.js`: Componente principale con DataGrid e gestione dei filtri.
- `public/document.pdf`: File PDF statico visualizzato nel viewer.
- `public/Data.csv`: File CSV contenente i dati da visualizzare.

---

## Come Usare

1. **Caricamento dei Dati**:
   - Il DataGrid carica automaticamente i dati dal file `Data.csv`.

2. **Interazioni con la Griglia**:
   - Usa il pulsante **“Filtra”** per applicare filtri personalizzati.
   - Clicca su una riga per accedere ai dettagli del documento.

3. **Visualizzatore PDF**:
   - Clicca su un’azione o accedi ai dettagli per visualizzare il file PDF associato.

---

## Tecnologie Utilizzate

- **React**: Framework principale per l’interfaccia utente.
- **Material-UI**: Libreria di componenti per il design.
- **@mui/x-data-grid**: Gestione avanzata della griglia dati.
- **Papaparse**: Parsing dei file CSV.
- **React Router DOM**: Navigazione tra le pagine.
- **PDF Viewer**: Rendering dei file PDF in un iframe.

---

## Personalizzazioni

- Per associare file PDF dinamicamente, aggiungi i percorsi corrispondenti nella colonna `pdf` durante il caricamento dei dati.
- Modifica i filtri predefiniti o aggiungi nuove opzioni modificando l’array `operators`.

