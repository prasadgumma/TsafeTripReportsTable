import React, { useState } from "react";
import { FormControl, InputLabel, MenuItem, Select, Grid } from "@mui/material";

export const columns = [
  {
    field: "id",
    headerName: "S.No",
    width: 70,
  },
  {
    field: "tripid",
    headerName: "Trip ID",
    width: 70,
  },

  {
    field: "mob",
    type: "number",
    headerName: "Mobile",
    width: 90,

    sortable: true,
  },
  {
    field: "tname",
    headerName: "Name",
    filterable: true,
    width: 150,
  },
  {
    field: "gend",
    headerName: "Gender",
    width: 130,
  },
  {
    field: "vno",
    headerName: "Vehicle",
    width: 150,
  },

  {
    field: "dest",
    headerName: "Destination",
    width: 150,
  },
  {
    field: "triptypnm",
    headerName: "Trip Type",
    width: 150,
  },
  {
    field: "livsts",
    headerName: "Trip Status",
    width: 100,
  },
  {
    field: "stm",
    headerName: "Start Time",
    width: 100,
  },
  {
    field: "etm",
    headerName: "End Time",
    width: 130,
  },
  {
    field: "tripenddispnm",
    headerName: "End Disposition",
    width: 200,
  },
  {
    field: "tripendesc",
    headerName: "End Discription",
    width: 100,
  },
  {
    field: "trip_dur_mins",
    headerName: "Duration(Mins)",
    width: 100,
  },
  {
    field: "lastloctm",
    headerName: "Last Sync",
    width: 100,
  },

  {
    field: "action",
    headerName: "Actions",
    width: 150,
  },
];
const TableBottomActions = () => {
  const [selectedValue, setSelectedValue] = useState("");
  const [secondDropdownVisible, setSecondDropdownVisible] = useState(false);
  const [secondDropdownValue, setSecondDropdownValue] = useState("");

  const handleChange = (event) => {
    const value = event.target.value;
    setSelectedValue(value);

    // Open Google when "Item 1" or "Item 3" is selected
    if (value === "id" || value === "Item 3") {
      window.open("https://www.google.com", "_blank"); // Open in a new tab
    }

    // Show second dropdown when "Item 1" is selected
    if (value === "tripid") {
      setSecondDropdownVisible(true);
    } else {
      setSecondDropdownVisible(false); // Hide it if another item is selected
    }
  };

  const handleSecondDropdownChange = (event) => {
    const value = event.target.value;
    setSecondDropdownValue(event.target.value);
    // You can handle the selected value of the second dropdown here
    console.log("Second dropdown value:", event.target.value);
    if (value === "Sub-item 1" || value === "Sub-item 2") {
      window.open("https://www.google.com", "_blank"); // Open in a new tab
    }
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <FormControl
          fullWidth
          variant="outlined"
          sx={{ minWidth: 180, mt: 1 }}
          size="small"
        >
          <InputLabel id="dropdown-label" sx={{ color: "#ffff" }}>
            Select Action
          </InputLabel>
          <Select
            labelId="dropdown-label"
            value={selectedValue}
            onChange={handleChange}
            sx={{
              height: "2.3rem",
              color: "white",
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "white",
              },
              "& .MuiSvgIcon-root": {
                color: "white",
              },
            }}
            label="Select Item"
          >
            {columns.map((column, index) => (
              <MenuItem key={index} value={column.field}>
                {column.headerName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      {/* Conditionally render second dropdown if Item 1 is selected */}
      {secondDropdownVisible && (
        <Grid item xs={12} md={6}>
          <FormControl
            fullWidth
            variant="outlined"
            sx={{ minWidth: 150, mt: 1 }}
            size="small"
          >
            <InputLabel id="second-dropdown-label" sx={{ color: "#ffff" }}>
              Select Sub-action
            </InputLabel>
            <Select
              labelId="second-dropdown-label"
              value={secondDropdownValue}
              onChange={handleSecondDropdownChange}
              sx={{
                height: "2.3rem",
                color: "white",
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "white",
                },
                "& .MuiSvgIcon-root": {
                  color: "white",
                },
              }}
              label="Select Sub-item"
            >
              {[...Array(5)].map((_, index) => (
                <MenuItem key={index} value={`Sub-item ${index + 1}`}>
                  Sub-item {index + 1}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      )}
    </Grid>
  );
};

export default TableBottomActions;
