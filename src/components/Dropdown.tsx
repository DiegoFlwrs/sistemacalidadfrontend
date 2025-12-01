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
  [key: string]: any;
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
  estadoKey?: string;
}

export const Dropdown: React.FC<DropdownProps> = ({
  value,
  onChange,
  data,
  placeholder = "Seleccionar...",
  borderRadius = "8px",
  borderColor = "#ccc",
  background = "white",
  fullWidth = true,
  estadoKey 
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
        {data.map((option) => {
          const isDisabled = estadoKey ? option[estadoKey] !== "A" : false;
          return (
            <MenuItem key={option.value} value={option.value} disabled={isDisabled} >
              {option.label}
            </MenuItem>
          )
        }
        )}
      </Select>
    </FormControl>
  );
};
