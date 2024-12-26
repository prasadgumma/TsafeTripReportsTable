import React from "react";
import { Box, IconButton, Typography } from "@mui/material";
import { Visibility } from "@mui/icons-material";

const ViewButton = ({ tripId, tripGenId }) => {
  console.log(tripId, "Tripid");
  // Generate the PHP link dynamically
  const generateLink = () => `trip_view?k=${btoa(`${tripId}~${tripGenId}`)}`;

  return (
    <Box>
      {/* IconButton to open the link */}
      <a
        href={generateLink()}
        target="_blank"
        rel="noopener noreferrer"
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <IconButton color="primary">
          <Visibility />
        </IconButton>
        <Typography sx={{ display: "inline" }}>View</Typography>
      </a>
    </Box>
  );
};

export default ViewButton;
