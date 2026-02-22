import { useState, useEffect } from 'react';
import {
  Typography,
  Box,
  Button,
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
import AddShift from '../components/AddShift';
import AssignShift from '../components/AssignShift';
import Modal from '../components/Modal';
import ShiftSearchFilter from '../components/ShiftSearchFilter';
import type { ShiftType } from '../types/shifts';

const columnLabels = [
  {
    id: 'date',
    label: 'Date',
  },
  {
    id: 'startTime',
    label: 'Start Time',
  },
  {
    id: 'endTime',
    label: 'End Time',
  },
  {
    id: 'role',
    label: 'Role',
  },
  {
    id: 'assignedUserName',
    label: 'Assigned User',
  },
  {
    id: 'actions',
    label: 'Actions',
  }
];

export default function Shifts({ rowsPerPage, minWidth }: { rowsPerPage: number, minWidth: number }) {
  const { shifts, removeAssignmentById, getShiftById, filterShiftsByName, filterShiftsByRole, shiftSearchQuery, shiftFilterType } = useData();
  const [openAddShiftModal, setOpenAddShiftModal] = useState(false);
  const [shiftIdToAssign, setShiftIdToAssign] = useState<string>('');
  const [page, setPage] = useState(0);

  useEffect(() => {
    setPage(0);
  }, [shiftSearchQuery, shiftFilterType]);

  const filteredShifts = (): ShiftType[] => {
    if (!shiftSearchQuery) {
      return shifts;
    }
    return shiftFilterType === 'assignedUserName' ? filterShiftsByName(shiftSearchQuery) : filterShiftsByRole(shiftSearchQuery);
  }

  const pageSection: ShiftType[] = filteredShifts().slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  const emptyRows = Math.max(0, rowsPerPage - pageSection.length);

  const handleAssignment = ({ shiftId, assignmentRemoval }: { shiftId: string, assignmentRemoval: boolean }) => {
    if (assignmentRemoval) {
      removeAssignmentById(shiftId);
      return;
    }
    setShiftIdToAssign(shiftId);
  }

  const shiftToAssign = shiftIdToAssign ? getShiftById(shiftIdToAssign) : undefined;

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }}>
          Shifts Schedule
        </Typography>
        <Button variant="contained" color="primary" onClick={() => setOpenAddShiftModal(true)}>
          Add Shift
        </Button>
      </Box>

      <TableContainer component={Paper} elevation={3} sx={{ borderRadius: 2, overflow: 'hidden' }}>
        <MuiTable sx={{ minWidth: minWidth }}>
          <TableHead sx={{ backgroundColor: 'primary.main' }}>
            <TableRow>
              {columnLabels.map(({ id, label }) => (
                <TableCell key={id} align="center" sx={{ color: 'white', fontWeight: 'bold' }}>{label}</TableCell>
              ))}
              <TableCell align="center" sx={{ color: 'white', fontWeight: 'bold' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pageSection.map((shift) => (
              <TableRow key={shift.id}>
                {columnLabels.map(({ id }) => (
                  <TableCell key={id} align="center">{shift[id as keyof ShiftType]}</TableCell>
                ))}
                <TableCell align="center">
                  {
                    shift.assignedUserId ? (
                      <Button variant="contained" color="primary" onClick={() => handleAssignment({ shiftId: shift.id, assignmentRemoval: true })}>
                        Unassign
                      </Button>
                    ) : (
                      <Button variant="contained" color="primary" onClick={() => handleAssignment({ shiftId: shift.id, assignmentRemoval: false })}>
                        Assign
                      </Button>
                    )
                  }
                </TableCell>
              </TableRow>
            ))}

            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
        </MuiTable>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 1, borderTop: '1px solid rgba(224, 224, 224, 1)' }}>
          <ShiftSearchFilter />
          <TablePagination
            rowsPerPageOptions={[rowsPerPage]}
            component="div"
            count={filteredShifts().length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={(_, newPage) => setPage(newPage)}
          />
        </Box>
      </TableContainer>

      <Modal
        open={openAddShiftModal || Boolean(shiftToAssign)}
        onClose={() => {
          setOpenAddShiftModal(false);
          setShiftIdToAssign('');
        }}
        title={openAddShiftModal ? "Add New Shift" : "Assign User to Shift"}
      >
        {openAddShiftModal ? (
          <AddShift onClose={() => setOpenAddShiftModal(false)} />
        ) : (
          shiftToAssign && <AssignShift shift={shiftToAssign} onSubmit={() => setShiftIdToAssign('')} />
        )}
      </Modal>
    </Box >
  );
}
