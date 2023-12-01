
import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const TypeTextField = ({ label, state, statePar, stateFunc, type, options, onChange }) => {
  return (
    <FormControl fullWidth variant="outlined">
      <InputLabel id={`${statePar}-label`}>{label}</InputLabel>
      <Select
        labelId={`${statePar}-label`}
        id={statePar}
        value={state[statePar]}
        label={label}
        onChange={onChange}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default TypeTextField;
