// import React from "react";
// import { Box, Drawer, Typography } from "@mui/material";
// import FormComponent from "./form-component";

// const TripDetailsDrawer = ({ open, onClose, tripId, setDrawerOpen }) => {
//   // console.log(tripId, "tripId");
//   return (
//     <Drawer anchor="right" open={open} onClose={onClose}>
//       <Box p={2} width={500}>
//         <Typography variant="h6">Trip Details</Typography>
//         {/* {tripId ? ( */}
//         <Box>
//           <Typography>Trip ID: {tripId}</Typography>
//           <br />
//           <FormComponent setDrawerOpen={setDrawerOpen} />
//         </Box>
//         {/* ) : (<Typography>No Trip Selected</Typography> */}
//         {/* )} */}
//         {/* Add additional content or API-driven details here */}
//       </Box>
//     </Drawer>
//   );
// };

// export default TripDetailsDrawer;

import React from "react";
import { Box, Drawer, Typography, Button } from "@mui/material";
import FormComponent from "./form-component";
import CancelIcon from "@mui/icons-material/Cancel";

const TripDetailsDrawer = ({
  open,
  onClose,
  tripId,
  setDrawerOpen,
  onRemove,
}) => {
  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box p={2} width={500}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">Trip Details</Typography>
          <CancelIcon
            sx={{ cursor: "pointer" }}
            variant="contained"
            color="#000"
            onClick={onRemove} // Trigger remove functionality
            // startIcon={<CancelIcon />}
          />
        </Box>
        <Box mt={2}>
          {tripId ? (
            <>
              <Typography>Trip ID: {tripId}</Typography>
              <FormComponent setDrawerOpen={setDrawerOpen} />
            </>
          ) : (
            <Typography>No Trip Selected</Typography>
          )}
        </Box>
      </Box>
    </Drawer>
  );
};

export default TripDetailsDrawer;
