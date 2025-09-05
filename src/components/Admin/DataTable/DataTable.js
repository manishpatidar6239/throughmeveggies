import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Box,
  CircularProgress,
  Typography,
  TableFooter,
  useTheme
} from '@mui/material';

const DataTable = ({
  columns = [],
  data = [],
  loading = false,
  emptyMessage = 'No data available',
  page = 0,
  rowsPerPage = 10,
  totalRows = 0,
  onPageChange = () => {},
  onRowsPerPageChange = () => {}
}) => {
  const theme = useTheme();

  const renderCellContent = (row, column) => {
    if (!row) return '-';
    if (column.render) return column.render(row);
    if (!column.field) return '-';
    return row[column.field] ?? '-';
  };

  const StyledTableRow = ({ children, ...props }) => (
    <TableRow 
      hover 
      sx={{ 
        '&:nth-of-type(odd)': { 
          backgroundColor: theme.palette.grey[50] 
        },
        '&:last-child td, &:last-child th': { 
          border: 0 
        }
      }}
      {...props}
    >
      {children}
    </TableRow>
  );

  const StyledTableCell = ({ children, ...props }) => (
    <TableCell
      sx={{
        padding: '12px 16px',
      }}
      {...props}
    >
      {children}
    </TableCell>
  );

  const StyledHeaderCell = ({ children, ...props }) => (
    <TableCell
      sx={{
        padding: '12px 16px',
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        fontWeight: 600,
      }}
      {...props}
    >
      {children}
    </TableCell>
  );

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" p={4}>
        <CircularProgress />
      </Box>
    );
  }

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - (data?.length || 0)) : 0;
  const displayData = data || [];

  return (
    <Paper elevation={0} sx={{ 
      width: '100%', 
      overflow: 'hidden', 
      border: `1px solid ${theme.palette.divider}`, 
      borderRadius: 1 
    }}>
      <TableContainer>
        <Table stickyHeader aria-label="data table" size="medium">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <StyledHeaderCell
                  key={column.field}
                  align={column.align || 'left'}
                >
                  {column.headerName}
                </StyledHeaderCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {displayData?.length === 0 ? (
              <StyledTableRow>
                <StyledTableCell colSpan={columns.length} align="center" sx={{ py: 3 }}>
                  <Typography variant="body2" color="text.secondary">
                    {emptyMessage}
                  </Typography>
                </StyledTableCell>
              </StyledTableRow>
            ) : (
              displayData
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .filter(Boolean) // Filter out any null/undefined rows
                .map((row, index) => (
                  <StyledTableRow key={row.id || index}>
                    {columns.map((column) => (
                      <StyledTableCell 
                        key={`${row.id || index}-${column.field}`}
                        align={column.align || 'left'}
                      >
                        {renderCellContent(row, column)}
                      </StyledTableCell>
                    ))}
                  </StyledTableRow>
                ))
            )}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <StyledTableCell colSpan={columns.length} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, 50]}
                count={totalRows || displayData.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={(e, newPage) => onPageChange ? onPageChange(e, newPage) : {}}
                onRowsPerPageChange={(e) => onRowsPerPageChange ? onRowsPerPageChange(parseInt(e.target.value, 10)) : {}}
                sx={{
                  '& .MuiTablePagination-toolbar': {
                    padding: '16px',
                  },
                  '& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows': {
                    marginBottom: 0,
                  },
                }}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default DataTable;
