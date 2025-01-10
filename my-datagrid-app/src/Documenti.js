import React, { useState, useRef, useEffect } from "react";
import Papa from "papaparse";
import "./App.css";
import { DataGrid } from "@mui/x-data-grid";
import { Typography, TextField, Button, Box, Popover, List, ListItem, ListItemText, IconButton, Checkbox, MenuItem, Modal } from "@mui/material";
import LinkIcon from "@mui/icons-material/Link";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import ChevronDownIcon from "@mui/icons-material/ExpandMore";
import CloseIcon from "@mui/icons-material/Close";
import HeightIcon from "@mui/icons-material/Height";
import { useNavigate } from "react-router-dom";

const operators = [
  { label: "Contiene", value: "contains" },
  { label: "Non contiene", value: "notContains" },
  { label: "Uguale", value: "equals" },
  { label: "Diverso", value: "notEquals" },
  { label: "Maggiore di", value: "greaterThan" },
  { label: "Minore di", value: "lessThan" },
  { label: "Maggiore o uguale a", value: "greaterThanOrEqual" },
  { label: "Minore o uguale a", value: "lessThanOrEqual" },
];

const columns = [
  {
    field: "link",
    headerName: "",
    width: 50,
    renderCell: () => (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100%"
      >
        <LinkIcon />
      </Box>
    ),
  },
  {
    field: "attach",
    headerName: "",
    width: 50,
    renderCell: () => (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100%"
      >
        <AttachFileIcon />
      </Box>
    ),
  },
  { field: "ragioneSociale", headerName: "Ragione Sociale", flex: 1 },
  { field: "partitaIva", headerName: "Partita IVA", flex: 1 },
  { field: "numeroDocumento", headerName: "Numero Documento", flex: 1 },
  { field: "dataDocumento", headerName: "Data Documento", width: 150 },
  {
    field: "importoTotale",
    headerName: "Importo Totale",
    width: 150,
    type: "number",
  },
  {
    field: "actions",
    headerName: "",
    width: 50,
    renderCell: () => (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100%"
      >
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
  const [filterValue, setFilterValue] = useState("");
  const [currentOperator, setCurrentOperator] = useState("contains");
  const [, setPopoverPosition] = useState({ top: 0, left: 0 });
  const [rowHeight, setRowHeight] = useState(52);
  const filterRefs = useRef({});
  const navigate = useNavigate();

  useEffect(() => {
    Papa.parse("/Data.csv", {
      download: true,
      header: true,
      complete: (results) => {
        if (results.errors.length) {
          console.error("Error parsing CSV:", results.errors);
        } else {
          const dataWithId = results.data.map((row, index) => ({
            ...row,
            id: index + 1,
          }));
          setRows(dataWithId);
        }
      },
      error: (error) => {
        console.error("Error fetching CSV:", error);
      },
    });
  }, []);

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setCurrentFilter(null);
  };

  const handleFilterClick = (column) => {
    const existingFilter = filters.find(
      (filter) => filter.field === column.field
    );
    if (existingFilter) {
      setFilters(filters.filter((filter) => filter.field !== column.field));
    } else {
      setCurrentFilter(column);
      setFilterValue("");
      setFilters([...filters, { field: column.field, value: "" }]);
      setAnchorEl(null);

      setTimeout(() => {
        if (filterRefs.current[column.field]) {
          const filterBlock = filterRefs.current[column.field];
          if (filterBlock) {
            const rect = filterBlock.getBoundingClientRect();
            setPopoverPosition({
              top: rect.bottom + window.scrollY,
              left: rect.left,
            });
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
      setFilters(
        filters.map((filter) =>
          filter.field === currentFilter.field
            ? { ...filter, value: filterValue, operator: currentOperator }
            : filter
        )
      );
      setCurrentFilter(null);
      setFilterValue("");
      setCurrentOperator("contains");
      handleClose();
    }
  };

  const handleFilterClear = (field) => {
    setFilters(filters.filter((filter) => filter.field !== field));
  };

  const handleRowClick = (params) => {
    console.log("Row clicked:", params);
    navigate(`/documenti/${params.id}`);
  };

  // Rimuovi selectedPdf dallo stato
  const [selectedPdf, setSelectedPdf] = useState("/pdfs/document.pdf"); // Imposta il file statico

  // Funzione per aprire il PDF
  // const handleRowClick = () => {
  //   setSelectedPdf("/pdfs/document.pdf"); // Usa sempre il file statico
  // };

  // const handleCloseModal = () => {
  //   setSelectedPdf(null); // Chiudi la modale
  // };

  const open = Boolean(anchorEl);

  return (
    <div className="App-main">
      <Box padding={3} display="flex" flexDirection="column" flexGrow={1}>
        <Typography variant="h7" color="#0B416E" noWrap>
          Archiva S.r.l.
        </Typography>
        <Typography
          variant="h4"
          color="#0B416E"
          noWrap
          style={{ fontWeight: "bold" }}
        >
          Fatture Rise
        </Typography>
        <Box
          display="flex"
          alignItems="center"
          marginBottom={2}
          marginTop={2}
          style={{ height: "36px" }}
        >
          <IconButton onClick={() => setRowHeight(36)}>
            <HeightIcon fontSize="small" />
          </IconButton>
          <IconButton onClick={() => setRowHeight(52)}>
            <HeightIcon fontSize="medium" />
          </IconButton>
          <TextField
            variant="outlined"
            size="small"
            placeholder="Cerca..."
            InputProps={{ startAdornment: <SearchIcon /> }}
            style={{ marginLeft: 8, height: "40px" }}
          />
          <Button
            variant="outlined"
            startIcon={<FilterListIcon />}
            style={{
              marginLeft: 8,
              padding: "6px 12px",
              borderColor: "#0B416E",
              color: "#0B416E",
            }}
            onClick={handleOpen}
          >
            Filtra
          </Button>
          {filters.map((filter) => (
            <Box
              key={filter.field}
              ref={(el) => (filterRefs.current[filter.field] = el)}
              className="filter-block"
            >
              <Typography variant="body2" style={{ marginRight: 8 }}>
                {columns.find((col) => col.field === filter.field).headerName}:{" "}
                {filter.value}
              </Typography>
              <IconButton size="small" onClick={() => setCurrentFilter(filter)}>
                <ChevronDownIcon />
              </IconButton>
              <IconButton
                size="small"
                onClick={() => handleFilterClear(filter.field)}
              >
                <CloseIcon />
              </IconButton>
            </Box>
          ))}
        </Box>
        <div
          className="DataGrid-container"
          style={{ height: `${window.innerHeight - 200}px`, flexGrow: 1 }}
        >
          <DataGrid
            rows={rows.filter((row) =>
              filters.every((filter) => {
                const cellValue = row[filter.field]?.toString().toLowerCase();
                const filterValueLower = filter.value.toLowerCase();
                switch (filter.operator) {
                  case "contains":
                    return cellValue.includes(filterValueLower);
                  case "notContains":
                    return !cellValue.includes(filterValueLower);
                  case "equals":
                    return cellValue === filterValueLower;
                  case "notEquals":
                    return cellValue !== filterValueLower;
                  case "greaterThan":
                    return parseFloat(cellValue) > parseFloat(filterValueLower);
                  case "lessThan":
                    return parseFloat(cellValue) < parseFloat(filterValueLower);
                  case "greaterThanOrEqual":
                    return (
                      parseFloat(cellValue) >= parseFloat(filterValueLower)
                    );
                  case "lessThanOrEqual":
                    return (
                      parseFloat(cellValue) <= parseFloat(filterValueLower)
                    );
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
              pagination: { style: { justifyContent: "flex-end" } },
            }}
            pinnedColumns={{
              left: ["actions"],
              right: ["attach", "link"],
            }}
            rowHeight={rowHeight}
            onRowClick={handleRowClick}
          />
          
        </div>
      </Box>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        sx={{
          marginTop: "8px",
        }}
      >
        <List className="popover-list">
          {columns
            .filter((column, index) => index >= 2 && column.field !== "actions")
            .map((column) => (
              <ListItem
                button
                key={column.field}
                className="popover-list-item"
                onClick={() => handleFilterClick(column)}
              >
                <Checkbox
                  className="popover-checkbox"
                  checked={filters.some(
                    (filter) => filter.field === column.field
                  )}
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
            vertical: "bottom",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          sx={{
            marginTop: "4px",
          }}
        >
          <Box padding={3} borderRadius={8} border={1} borderColor="white">
            <Typography variant="h6">Imposta Filtro</Typography>

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

            <TextField
              fullWidth
              variant="outlined"
              size="small"
              value={filterValue}
              onChange={handleFilterChange}
              placeholder={`Filtra per ${currentFilter?.headerName}`}
              style={{ marginTop: 16 }}
            />

            <Button
              variant="contained"
              color="primary"
              onClick={handleApplyFilter}
              style={{ marginTop: 16 }}
            >
              Conferma
            </Button>
          </Box>
        </Popover>
      )}

      {/* <Modal
        open={!!selectedPdf}
        onClose={handleCloseModal}
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          backdropFilter: "blur(3px)", // Sfocatura per il resto della pagina
        }}
      >
        <Box
          sx={{
            width: "33%", // Un terzo della larghezza della pagina
            height: "100%", // Altezza completa
            backgroundColor: "#fff", // Sfondo bianco
            boxShadow: 24, // Ombra per risalto
            overflow: "hidden",
          }}
        >
          {selectedPdf && (
            <iframe
              src={selectedPdf}
              style={{ width: "100%", height: "100%", border: "none" }}
              title="PDF Viewer"
            />
          )}
        </Box>
      </Modal> */}
    </div>
  );
}

export default Documenti;
