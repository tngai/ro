import { Box } from '@mui/material';
import * as Yup from 'yup';
import { useData } from '../hooks/useData';
import type { ShiftType } from '../types/shifts';
import ShiftForm from './ShiftForm';

export default function AssignShift({ shift, onSubmit }: { shift: ShiftType, onSubmit?: () => void }) {
  const { assignShiftByIdName, isUserIdValid, isUserQualifiedForRole, getUserById } = useData();

  const validationSchema = Yup.object({
    assignedUserId: Yup.string()
      .required('User ID is required to assign.')
      .test('is-valid-user', 'User ID does not exist', (value) => !value || isUserIdValid(value))
      .test('is-valid-role', 'User is not qualified for this role', (value) => !value || isUserQualifiedForRole(value, shift.role)),
  });

  return (
    <Box sx={{ mt: 1 }}>
      <ShiftForm
        mode="assign"
        initialValues={{
          date: shift.date,
          startTime: shift.startTime,
          endTime: shift.endTime,
          role: shift.role,
          assignedUserId: '',
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          const username = getUserById(values.assignedUserId)?.name ?? '';
          assignShiftByIdName(shift.id, values.assignedUserId, username);
          onSubmit?.();
        }}
      />
    </Box>
  );
}
