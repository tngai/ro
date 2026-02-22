import { useState } from 'react';
import {
  Typography,
  Box,
  Table as MuiTable,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination
} from '@mui/material';
import { useData } from '../hooks/useData';
import type { UserType } from '../types/users';

const columnLabels = [
  {
    id: 'id',
    label: 'User ID',
  },
  {
    id: 'name',
    label: 'Name',
  },
  {
    id: 'role',
    label: 'Role',
  },
];

export default function Users({ rowsPerPage, minWidth }: { rowsPerPage: number, minWidth: number }) {
  const { users } = useData();
  const [page, setPage] = useState(0);

  const pageSection: UserType[] = users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  const emptyRows = Math.max(0, rowsPerPage - pageSection.length);

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 3, fontWeight: 'bold' }}>
        Users Directory
      </Typography>

      <TableContainer component={Paper} elevation={3} sx={{ borderRadius: 2, overflow: 'hidden' }}>
        <MuiTable sx={{ minWidth: minWidth }}>
          <TableHead sx={{ backgroundColor: 'primary.main' }}>
            <TableRow>
              {columnLabels.map(({ id, label }) => (
                <TableCell key={id} align="center" sx={{ color: 'primary.contrastText', fontWeight: 'bold' }}>{label}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {pageSection
              .map((user) => (
                <TableRow key={user.id}>
                  {columnLabels.map(({ id }) => (
                    <TableCell key={id} align="center">{user[id as keyof UserType]}</TableCell>
                  ))}
                </TableRow>
              ))}

            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={3} />
              </TableRow>
            )}
          </TableBody>
        </MuiTable>
        <TablePagination
          rowsPerPageOptions={[rowsPerPage]}
          component="div"
          count={users.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(_, newPage) => setPage(newPage)}
        />
      </TableContainer>
    </Box>
  );
}
