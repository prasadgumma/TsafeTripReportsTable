import React from "react";
import { TextField } from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

const CustomDatePicker = (props) => {
  const { item, applyValue } = props;

  const handleDateChange = (newValue) => {
    // Format the selected date to YYYY-MM-DD and apply
    applyValue({
      ...item,
      value: newValue ? dayjs(newValue).format("YYYY-MM-DD") : null,
    });
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        value={item.value ? dayjs(item.value, "YYYY-MM-DD") : null}
        onChange={handleDateChange}
        format="YYYY-MM-DD"
        inputFormat="YYYY-MM-DD" // Enforces the display format in the input field
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            fullWidth
            size="small"
            placeholder="YYYY-MM-DD"
          />
        )}
      />
    </LocalizationProvider>
  );
};

export default CustomDatePicker;
