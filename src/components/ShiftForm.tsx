import { Formik, Form } from 'formik';
import { Box, TextField, Button, MenuItem } from '@mui/material';

export interface ShiftFormProps {
  initialValues: any;
  validationSchema: any;
  onSubmit: (values: any) => void;
  mode: 'add' | 'assign';
}

export default function ShiftForm({ initialValues, validationSchema, onSubmit, mode }: ShiftFormProps) {
  const isAssign = mode === 'assign';

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ values, handleChange, handleBlur, errors, touched }) => (
        <Form>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <TextField
              fullWidth
              id="date"
              name="date"
              label="Date"
              type={isAssign ? undefined : "date"}
              slotProps={{ inputLabel: { shrink: true }, input: { readOnly: isAssign } }}
              value={values.date}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.date && Boolean(errors.date)}
              helperText={touched.date && (errors.date as string)}
            />

            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                fullWidth
                id="startTime"
                name="startTime"
                label="Start Time"
                type={isAssign ? undefined : "time"}
                slotProps={{ inputLabel: { shrink: true }, input: { readOnly: isAssign } }}
                value={values.startTime}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.startTime && Boolean(errors.startTime)}
                helperText={touched.startTime && (errors.startTime as string)}
              />
              <TextField
                fullWidth
                id="endTime"
                name="endTime"
                label="End Time"
                type={isAssign ? undefined : "time"}
                slotProps={{ inputLabel: { shrink: true }, input: { readOnly: isAssign } }}
                value={values.endTime}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.endTime && Boolean(errors.endTime)}
                helperText={touched.endTime && (errors.endTime as string)}
              />
            </Box>

            <TextField
              fullWidth
              select={!isAssign}
              id="role"
              name="role"
              label="Role"
              slotProps={{ input: { readOnly: isAssign } }}
              value={values.role}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.role && Boolean(errors.role)}
              helperText={touched.role && (errors.role as string)}
            >
              {!isAssign && [
                <MenuItem key="Admin" value="Admin">Admin</MenuItem>,
                <MenuItem key="Manager" value="Manager">Manager</MenuItem>,
                <MenuItem key="Server" value="Server">Server</MenuItem>,
                <MenuItem key="Cook" value="Cook">Cook</MenuItem>,
                <MenuItem key="Cashier" value="Cashier">Cashier</MenuItem>
              ]}
            </TextField>

            <TextField
              fullWidth
              id="assignedUserId"
              name="assignedUserId"
              label={isAssign ? "Assign User ID" : "Assigned User (Optional)"}
              placeholder="Enter User ID"
              value={values.assignedUserId}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.assignedUserId && Boolean(errors.assignedUserId)}
              helperText={touched.assignedUserId && (errors.assignedUserId as string)}
            />

            <Button
              color="primary"
              variant="contained"
              fullWidth
              type="submit"
              size="large"
              sx={{ mt: 1 }}
            >
              {isAssign ? 'Assign User' : 'Add Shift'}
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
}
