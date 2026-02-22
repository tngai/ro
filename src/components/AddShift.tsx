import { Box } from '@mui/material';
import * as Yup from 'yup';
import { useData } from '../hooks/useData';
import ShiftForm from './ShiftForm';

export default function AddShift({ onClose }: { onClose?: () => void }) {
  const { addShift, isUserIdValid } = useData();

  const initialValues = {
    date: '',
    startTime: '',
    endTime: '',
    role: '',
    assignedUserId: ''
  };

  const validationSchema = Yup.object({
    date: Yup.string()
      .required('Date is required')
      .test('is-not-past-date', 'Date cannot be in the past', function (value) {
        if (!value) {
          return true;
        }
        ;
        const [year, month, day] = value.split('-');
        const selectedDate = new Date(Number(year), Number(month) - 1, Number(day));
        const today = new Date();

        today.setHours(0, 0, 0, 0);

        return selectedDate >= today;
      }),
    startTime: Yup.string()
      .required('Start time is required')
      .test('is-not-past-time', 'Start time cannot be in the past', function (value) {
        const { date } = this.parent;
        if (!value || !date) {
          return true;
        }

        const [year, month, day] = (date as string).split('-');
        const [hours, minutes] = value.split(':');
        const selectedDateTime = new Date(Number(year), Number(month) - 1, Number(day), Number(hours), Number(minutes));
        const now = new Date();

        return selectedDateTime > now;
      }),
    endTime: Yup.string()
      .required('End time is required')
      .test('is-valid-end-time', 'End time must be after start time and not in the past', function (value) {
        const { startTime, date } = this.parent;

        if (!value || !date) {
          return true;
        }

        const [year, month, day] = (date as string).split('-');
        const [hours, minutes] = value.split(':');
        const endDateTime = new Date(Number(year), Number(month) - 1, Number(day), Number(hours), Number(minutes));
        const now = new Date();

        if (endDateTime <= now) {
          return this.createError({ message: 'End time cannot be in the past' });
        }

        if (startTime && value <= startTime) {
          return this.createError({ message: 'End time must be after start time' });
        }

        return true;
      }),
    role: Yup.string().required('Role is required'),
    assignedUserId: Yup.string()
      .optional()
      .test('is-valid-user', 'User ID does not exist', (value) => !value || isUserIdValid(value)),
  });

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
