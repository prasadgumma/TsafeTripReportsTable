import React from "react";
import { Box, IconButton, Typography } from "@mui/material";
import PlaceIcon from "@mui/icons-material/Place";

const MapButton = ({ tripId, tripGenId }) => {
  // Generate the PHP link dynamically
  const generateLink = () =>
    `safe_tracking?k=${btoa(`${tripId}~${tripGenId}`)}`;
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
          <PlaceIcon />
        </IconButton>
        <Typography sx={{ display: "inline" }}>Map</Typography>
      </a>
    </Box>
  );
};

export default MapButton;
