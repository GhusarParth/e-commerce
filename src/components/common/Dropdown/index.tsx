import React from "react";
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";

const Dropdown = ({
  label,
  options,
  value,
  onChange,
  error,
  helperText,
  ...props
}: any) => {
  return (
    <FormControl fullWidth error={error}>
      <InputLabel id="demo-simple-select-label">{label}</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        label={label}
        value={value}
        onChange={onChange}
        {...props}
      >
        {options.map((option: any) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText>{helperText}</FormHelperText>
    </FormControl>
  );
};

export default Dropdown;
