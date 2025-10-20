import React from "react";
import {
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  SelectChangeEvent
} from "@mui/material";

interface DropdownOption {
  value: string | number;
  label: string | number;
}

interface DropdownProps {
  value: string | number;
  onChange: (event: SelectChangeEvent<string | number>) => void;
  data: DropdownOption[];
  placeholder?: string;
  borderRadius?: string;
  borderColor?: string;
  background?: string;
  fullWidth?: boolean;
}

export const Dropdown: React.FC<DropdownProps> = ({
  value,
  onChange,
  data,
  placeholder = "Seleccionar...",
  borderRadius = "8px",
  borderColor = "#ccc",
  background = "white",
  fullWidth = true
}) => {
  return (
    <FormControl fullWidth={fullWidth} size="small">
      <InputLabel>{placeholder}</InputLabel>
      <Select
        value={value}
        label={placeholder}
        onChange={onChange}
        sx={{
          borderRadius,
          background,
          borderColor,
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: borderColor
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#1976d2"
          }
        }}
      >
        {data.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
