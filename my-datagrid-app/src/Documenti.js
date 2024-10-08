import React, { useState, useRef, useEffect } from 'react';
import Papa from 'papaparse';
import './App.css';
import { DataGrid } from '@mui/x-data-grid';
import { Typography, TextField, Button, Box, Popover, List, ListItem, ListItemText, IconButton, Checkbox, MenuItem } from '@mui/material';
import LinkIcon from '@mui/icons-material/Link';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import ChevronDownIcon from '@mui/icons-material/ExpandMore';
import CloseIcon from '@mui/icons-material/Close';

const operators = [
  { label: 'Contiene', value: 'contains' },
  { label: 'Non contiene', value: 'notContains' },
  { label: 'Uguale', value: 'equals' },
  { label: 'Diverso', value: 'notEquals' },
  { label: 'Maggiore di', value: 'greaterThan' },
  { label: 'Minore di', value: 'lessThan' },
  { label: 'Maggiore o uguale a', value: 'greaterThanOrEqual' },
  { label: 'Minore o uguale a', value: 'lessThanOrEqual' },
];

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


function Documenti() {
  const [rows, setRows] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [filters, setFilters] = useState([]);
  const [currentFilter, setCurrentFilter] = useState(null);
  const [filterValue, setFilterValue] = useState('');
  const [currentOperator, setCurrentOperator] = useState('contains'); // Stato per l'operatore
  const filterRefs = useRef({});
  const [popoverPosition, setPopoverPosition] = useState({ top: 0, left: 0 });

  useEffect(() => {
    // Leggi il file CSV
    Papa.parse('/Data.csv', {
      download: true,
      header: true,
      complete: (results) => {
        if (results.errors.length) {
          console.error("Error parsing CSV:", results.errors);
        } else {
          const dataWithId = results.data.map((row, index) => ({
            ...row,
            id: index + 1, // Imposta un ID unico
          }));
          setRows(dataWithId);
        }
      },
      error: (error) => {
        console.error("Error fetching CSV:", error);
      }
    });
  }, []);


  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
    
    // Memorizza la posizione del pulsante "Filtra"
    const buttonRect = event.currentTarget.getBoundingClientRect();

    // Imposta la posizione del popover della lista dei filtri
    const popoverPosition = { 
      top: buttonRect.bottom + window.scrollY + 8, // Considera lo scroll della pagina
      left: buttonRect.left
    };

    setPopoverPosition(popoverPosition);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setCurrentFilter(null);
  };

  const handleFilterClick = (column) => {
    const existingFilter = filters.find(filter => filter.field === column.field);
    if (existingFilter) {
      setFilters(filters.filter(filter => filter.field !== column.field));
    } else {
      setCurrentFilter(column);
      setFilterValue('');
      setFilters([...filters, { field: column.field, value: '' }]);
      setAnchorEl(null); // Chiudi il popover della lista

      // Aspetta che il blocchetto del filtro sia visibile prima di aprire il popover
      setTimeout(() => {
        if (filterRefs.current[column.field]) {
          const filterBlock = filterRefs.current[column.field];
          if (filterBlock) {
            const rect = filterBlock.getBoundingClientRect();
            setPopoverPosition({ top: rect.bottom, left: rect.left });
          }
        }
      }, 0);
    }
  };

  const handleFilterChange = (event) => {
    setFilterValue(event.target.value);
  };

  const handleApplyFilter = () => {
    if (currentFilter && filterValue) {
      setFilters(filters.map(filter =>
        filter.field === currentFilter.field ? { ...filter, value: filterValue, operator: currentOperator } : filter
      ));
      setCurrentFilter(null);
      setFilterValue('');
      setCurrentOperator('contains'); // Resetta l'operatore
      handleClose(); // Chiudi il popover dopo aver applicato il filtro
    }
  };

  const handleFilterClear = (field) => {
    setFilters(filters.filter(filter => filter.field !== field));
  };

  const open = Boolean(anchorEl);

  return (
    <div className="App-main">
      <Box padding={3} display="flex" flexDirection="column" flexGrow={1}>
        <Typography variant="h6" color="inherit" noWrap>
          Archiva S.r.l.
        </Typography>
        <Typography variant="h4" color="inherit" noWrap>
          Fatture Rise
        </Typography>
        <Box display="flex" alignItems="center" marginBottom={2} marginTop={2} style={{ height: '36px' }}>
          <TextField
            variant="outlined"
            size="small"
            placeholder="Cerca..."
            InputProps={{ startAdornment: <SearchIcon /> }}
          />
          <Button
            variant="outlined"
            startIcon={<FilterListIcon />}
            style={{ marginLeft: 8, padding: '6px 12px' }}
            onClick={handleOpen}
          >
            Filtra
          </Button>
          {filters.map(filter => (
            <Box
              key={filter.field}
              ref={el => filterRefs.current[filter.field] = el}
              className="filter-block"
            >
              <Typography variant="body2" style={{ marginRight: 8 }}>
                {columns.find(col => col.field === filter.field).headerName}: {filter.value}
              </Typography>
              <IconButton size="small" onClick={() => setCurrentFilter(filter)}>
                <ChevronDownIcon />
              </IconButton>
              <IconButton size="small" onClick={() => handleFilterClear(filter.field)}>
                <CloseIcon />
              </IconButton>
            </Box>
          ))}
        </Box>
        <div className="DataGrid-container" style={{ height: `${window.innerHeight - 200}px`, flexGrow: 1 }}>
          <DataGrid
            rows={rows.filter(row =>
              filters.every(filter => {
                switch (filter.operator) {
                  case 'contains':
                    return row[filter.field].toString().includes(filter.value);
                  case 'notContains':
                    return !row[filter.field].toString().includes(filter.value);
                  case 'equals':
                    return row[filter.field].toString() === filter.value;
                  case 'notEquals':
                    return row[filter.field].toString() !== filter.value;
                  case 'greaterThan':
                    return row[filter.field] > filter.value;
                  case 'lessThan':
                    return row[filter.field] < filter.value;
                  case 'greaterThanOrEqual':
                    return row[filter.field] >= filter.value;
                  case 'lessThanOrEqual':
                    return row[filter.field] <= filter.value;
                  default:
                    return true;
                }
              })
            )}
            columns={columns}
            pageSize={5}
            checkboxSelection
            disableSelectionOnClick
            autoSize
            componentsProps={{
              pagination: { style: { justifyContent: 'flex-end' } },
            }}
            pinnedColumns={{
              left: ['actions'],
              right: ['attach', 'link'],
            }}
          />
        </div>
      </Box>

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ 
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        sx={{ 
          marginTop: '8px',
        }}  
      >
        <List className="popover-list">
          {columns
            .filter((column, index) => index >= 3 && column.field !== 'actions')
            .map((column) => (
              <ListItem button key={column.field} className="popover-list-item" onClick={() => handleFilterClick(column)}>
                <Checkbox
                  className="popover-checkbox"
                  checked={filters.some(filter => filter.field === column.field)}
                  tabIndex={-1}
                  disableRipple
                />
                <ListItemText primary={column.headerName || column.field} />
              </ListItem>
            ))}
        </List>
      </Popover>

      {currentFilter && (
        <Popover
          open={Boolean(currentFilter)}
          anchorEl={filterRefs.current[currentFilter.field]}
          onClose={() => setCurrentFilter(null)}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          sx={{
            marginTop: '4px',
          }}
        >
          <Box padding={3} borderRadius={4} boxShadow={3}>
            <Typography variant="h6">Imposta Filtro</Typography>
            
            {/* Campo per scegliere l'operatore */}
            <TextField
              select
              fullWidth
              variant="outlined"
              size="small"
              label="Operatore"
              value={currentOperator}
              onChange={(e) => setCurrentOperator(e.target.value)}
              style={{ marginTop: 16 }}
            >
              {operators.map((operator) => (
                <MenuItem key={operator.value} value={operator.value}>
                  {operator.label}
                </MenuItem>
              ))}
            </TextField>

            {/* Campo per inserire il valore del filtro */}
            <TextField
              fullWidth
              variant="outlined"
              size="small"
              value={filterValue}
              onChange={handleFilterChange}
              placeholder={`Filtra per ${currentFilter?.headerName}`}
              style={{ marginTop: 16 }}
            />
            
            <Button variant="contained" color="primary" onClick={handleApplyFilter} style={{ marginTop: 16 }}>
              Conferma
            </Button>
          </Box>
        </Popover>
      )}
    </div>
  );
}

export default Documenti;