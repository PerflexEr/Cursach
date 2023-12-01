import React from 'react';
import { TextField, Select, MenuItem, InputLabel, FormControl } from "@mui/material";

const AdminTextField = ({label, state, statePar, stateFunc, type = "text", options }) => {
  if (type === "select") {
    return (
      <FormControl variant="outlined">
        <InputLabel>{label}</InputLabel>
        <Select
          label={label}
          value={state[statePar]}
          onChange={(e) =>
            stateFunc({ ...state, [statePar]: e.target.value })
          }
        >
          {options.map((option, index) => (
            <MenuItem key={index} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    );
  } else {
    return (
      <TextField

        label={label}
        variant="outlined"
        type={type}
        value={state[statePar]}
        onChange={(e) =>
          stateFunc({ ...state, [statePar]: e.target.value })
        }
      />
    );
  }
};

export default AdminTextField;
