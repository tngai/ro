import { Box } from '@mui/material';
import { useData } from '../hooks/useData';
import { useAddShiftFormValidation } from '../hooks/useAddShiftFormValidation';
import ShiftForm from './ShiftForm';

export default function AddShift({ onClose }: { onClose?: () => void }) {
  const { addShift } = useData();

  const initialValues = {
    date: '',
    startTime: '',
    endTime: '',
    role: '',
    assignedUserId: ''
  };

  const validationSchema = useAddShiftFormValidation();

  return (
    <Box sx={{ mt: 1 }}>
      <ShiftForm
        mode="add"
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values: typeof initialValues) => {
          addShift(values);
          onClose?.();
        }}
      />
    </Box>
  );
}
