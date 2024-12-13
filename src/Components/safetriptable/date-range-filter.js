// import React, { useEffect, useState } from "react";
// import { TextField, Box, Typography } from "@mui/material";
// import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import dayjs from "dayjs";

// const DateRangeFilter = ({ dateFilter, setDateFilter }) => {
//   const [fromDate, setFromDate] = useState(null);
//   const [toDate, setToDate] = useState(null);

//   // Update states when dateFilter changes
//   useEffect(() => {
//     setFromDate(
//       dateFilter.fromDate ? dayjs(dateFilter.fromDate, "DD-MM-YYYY") : null
//     );
//     setToDate(
//       dateFilter.toDate ? dayjs(dateFilter.toDate, "DD-MM-YYYY") : null
//     );
//   }, [dateFilter]);

//   console.log(dateFilter, "DateFiler");

//   // Handle From Date change
//   const handleFromDateChange = (newValue) => {
//     const formattedDate = newValue ? newValue.format("DD-MM-YYYY") : null;
//     setDateFilter((prev) => ({ ...prev, fromDate: formattedDate }));
//   };

//   // Handle To Date change
//   const handleToDateChange = (newValue) => {
//     const formattedDate = newValue ? newValue.format("DD-MM-YYYY") : null;
//     setDateFilter((prev) => ({ ...prev, toDate: formattedDate }));
//   };

//   return (
//     <LocalizationProvider dateAdapter={AdapterDayjs}>
//       <Box mb={2}>
//         <Typography gutterBottom mb={2}>
//           Date Filters
//         </Typography>
//         <Box sx={{ display: "flex", gap: 2 }}>
//           {/* From Date Picker */}
//           <DatePicker
//             label="From Date"
//             value={fromDate}
//             format="DD-MM-YYYY" // Set the input format to DD-MM-YYYY
//             onChange={handleFromDateChange}
//             renderInput={(params) => (
//               <TextField
//                 {...params}
//                 fullWidth
//                 sx={{
//                   "& .MuiInputBase-input": {
//                     color: "#787877",
//                     backgroundColor: "#f9f9f9",
//                   },
//                   "& .MuiOutlinedInput-notchedOutline": {
//                     borderColor: "#787877",
//                   },
//                   "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
//                     {
//                       borderColor: "#000",
//                     },
//                 }}
//               />
//             )}
//           />

//           {/* To Date Picker */}
//           <DatePicker
//             label="To Date"
//             value={toDate}
//             format="DD-MM-YYYY" // Set the input format to DD-MM-YYYY
//             onChange={handleToDateChange}
//             renderInput={(params) => (
//               <TextField
//                 {...params}
//                 fullWidth
//                 sx={{
//                   "& .MuiInputBase-input": {
//                     color: "#787877",
//                     backgroundColor: "#f9f9f9",
//                   },
//                   "& .MuiOutlinedInput-notchedOutline": {
//                     borderColor: "#787877",
//                   },
//                   "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
//                     {
//                       borderColor: "#000",
//                     },
//                 }}
//               />
//             )}
//           />
//         </Box>
//       </Box>
//     </LocalizationProvider>
//   );
// };

// export default DateRangeFilter;

//=================================================================================================

// import React, { useEffect, useState } from "react";
// import DatePicker from "react-datepicker";
// import moment from "moment";
// import "react-datepicker/dist/react-datepicker.css";
// import { TextField } from "@mui/material";
// import { Card } from "react-bootstrap";
// import "./datePicker.css";

// const DateRangeFilter = ({ dateFilter, setDateFilter }) => {
//   const [dates, setDates] = useState([null, null]); // [startDate, endDate]
//   console.log(dateFilter, "DateF");
//   useEffect(() => {
//     if (dateFilter && dateFilter[0] && dateFilter[1]) {
//       // Format the dates properly when the component mounts
//       const startDate = moment(dateFilter[1], "DD/MM/YYYY").toDate();
//       const endDate = moment(dateFilter[0], "DD/MM/YYYY").toDate();
//       setDates([startDate, endDate]);
//     }
//   }, [dateFilter]);

//   const handleDateChange = (selectedDates) => {
//     setDates(selectedDates);
//     if (selectedDates[0] && selectedDates[1]) {
//       // Format both dates to DD/MM/YYYY when updating the state
//       const formattedDates = [
//         moment(selectedDates[1]).format("DD-MM-YYYY"),
//         moment(selectedDates[0]).format("DD-MM-YYYY"),
//       ];
//       setDateFilter(formattedDates); // Update parent state with formatted dates
//     }
//   };

//   // Formatting the displayed date range
//   const formattedDateRange =
//     dates[0] && dates[1]
//       ? `${moment(dates[0]).format("DD/MM/YYYY")}` /
//         `${moment(dates[1]).format("DD/MM/YYYY")}`
//       : "";

//   return (
//     <div
//       style={{
//         zIndex: 1000,
//         justifyContent: "center",
//         alignItems: "center",
//         margin: "auto",
//       }}
//     >
//       {/* Date range picker */}
//       <DatePicker
//         selected={dates[0]} // Start date
//         onChange={handleDateChange} // Handle both start and end date change
//         startDate={dates[0]}
//         endDate={dates[1]}
//         selectsRange // Enable range selection
//         dateFormat="dd/MM/yyyy" // Use dd/MM/yyyy format for the input
//         placeholderText="Select Date Range"
//         customInput={
//           <TextField
//             variant="outlined"
//             fullWidth
//             label="Date Range Picker"
//             npm
//             value={formattedDateRange} // Display formatted date range
//             readOnly
//           />
//         }
//       />
//     </div>
//   );
// };

// export default DateRangeFilter;

//==============================================================================================================

import React, { useState } from "react";
import { DateRangePicker } from "react-date-range";
import { addDays, format } from "date-fns";
import "react-date-range/dist/styles.css"; // Default styles
import "react-date-range/dist/theme/default.css"; // Default theme
import "./datePicker.css";
import moment from "moment";
import { Box, Button, TextField } from "@mui/material";

const DateRangeFilter = ({ dateFilter, setDateFilter }) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectionRange, setSelectionRange] = useState({
    startDate: addDays(new Date(), -1),
    endDate: new Date(), // Example: 1 day range
    key: "selection",
  });
  console.log(selectionRange, "selectionRange");
  const [originalRange, setOriginalRange] = useState(selectionRange); // Store original range for reset
  const [count, setCount] = useState(0);

  const handleSelect = (ranges) => {
    setSelectionRange(ranges.selection);
    setCount((prevCount) => prevCount + 1);
  };

  const handleApply = () => {
    const formattedDates = [
      moment(selectionRange.startDate).format("DD-MM-YYYY"),
      moment(selectionRange.endDate).format("DD-MM-YYYY"),
    ];
    setDateFilter(formattedDates);
    setShowCalendar(false);
    setCount(0); // Reset count to 0 after closing the calendar
  };

  const handleCancel = () => {
    setSelectionRange(originalRange); // Revert to original range
    setShowCalendar(false);
    setCount(0); // Reset count to 0 after closing the calendar
  };

  return (
    <Box>
      {/* Input field to display the selected date range */}
      <TextField
        variant="outlined"
        fullWidth
        label="Date Range Picker"
        // type="text"
        readOnly
        value={`${format(selectionRange.startDate, "dd-MM-yyyy")} / ${format(
          selectionRange.endDate,
          "dd-MM-yyyy"
        )}`}
        onClick={() => setShowCalendar(!showCalendar)} // Toggle calendar visibility
      />

      {/* Show calendar when the input field is clicked */}
      {showCalendar && (
        <div
          className="custom-date-range-picker"
          style={{
            position: "fixed",
            zIndex: 10,
            width: "580px",
            background: "#fff",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            height: "400px",
          }}
        >
          <DateRangePicker
            ranges={[selectionRange]}
            onChange={handleSelect}
            months={2}
            direction="horizontal"
            showSelectionPreview={true}
            moveRangeOnFirstSelection={false}
            rangeColors={["#3d91ff"]}
            className="dateRangePickerClass"
            style={{ width: "200px", Height: "100%" }}
          />

          {/* Custom Apply and Cancel buttons */}
          <Box
            style={{
              display: "flex",
              justifyContent: "right",
              marginTop: "130px",
              marginRight: "50px",
              gap: 20,
            }}
          >
            <Button
              onClick={handleCancel}
              style={{
                backgroundColor: "#f44336",
                color: "white",
                border: "none",
                padding: "8px 16px",
                cursor: "pointer",
                borderRadius: "4px",
                height: 34,
                fontSize: 12,
                width: 80,
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleApply}
              style={{
                backgroundColor: "#3d91ff",
                color: "white",
                border: "none",
                padding: "8px 16px",
                cursor: "pointer",
                borderRadius: "4px",
                height: 34,
                fontSize: 12,
                width: 80,
              }}
            >
              Apply
            </Button>
          </Box>
        </div>
      )}
    </Box>
  );
};

export default DateRangeFilter;
