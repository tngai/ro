import { Box, TextField, FormLabel, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import { useData } from '../hooks/useData';

export default function ShiftSearchFilter() {
  const { shiftSearchQuery, setShiftSearchQuery, shiftFilterType, setShiftFilterType } = useData();

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, pl: 2 }}>
      <TextField
        placeholder="Search..."
        variant="outlined"
        size="small"
        value={shiftSearchQuery}
        onChange={(e) => {
          setShiftSearchQuery(e.target.value);
        }}
        sx={{ width: 200 }}
      />
      <Box component="fieldset" sx={{ display: 'flex', alignItems: 'center', gap: 1, border: 'none', m: 0, p: 0 }}>
        <FormLabel component="legend" sx={{ m: 0, fontSize: '0.875rem' }}>Filter by:</FormLabel>
        <RadioGroup
          row
          value={shiftFilterType}
          onChange={(e) => {
            setShiftFilterType(e.target.value as 'assignedUserName' | 'role');
          }}
        >
          <FormControlLabel value="assignedUserName" control={<Radio size="small" />} label={<p>Assigned User</p>} />
          <FormControlLabel value="role" control={<Radio size="small" />} label={<p>Role</p>} />
        </RadioGroup>
      </Box>
    </Box>
  );
}
