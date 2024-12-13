import React from "react";
import { Box, Drawer, Typography } from "@mui/material";
import FormComponent from "./form-component";

const TripDetailsDrawer = ({ open, onClose, tripId, setDrawerOpen }) => {
  console.log(tripId, "tripId");
  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box p={2} width={500}>
        <Typography variant="h6">Trip Details</Typography>
        {/* {tripId ? ( */}
        <Box>
          <Typography>Trip ID: {tripId}</Typography>
          <br />
          <FormComponent setDrawerOpen={setDrawerOpen} />
        </Box>
        {/* ) : (<Typography>No Trip Selected</Typography> */}
        {/* )} */}
        {/* Add additional content or API-driven details here */}
      </Box>
    </Drawer>
  );
};

export default TripDetailsDrawer;
