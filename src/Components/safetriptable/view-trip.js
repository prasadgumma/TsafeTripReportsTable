import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Box, Typography, Grid, Paper } from "@mui/material";

// TripView Component
const TripView = () => {
  // State to hold the trip details
  const [tripDetails, setTripDetails] = useState(null);
  const { tripId } = useParams(); // Get the tripId from the URL parameters

  useEffect(() => {
    const fetchTripDetails = async () => {
      try {
        // Make a request to fetch the details of the trip based on the tripId
        const response = await axios.post(
          `http://192.168.21.71/devenv/safe_travel_portal_ajax_apis/public/index.php/v1/trip_details/${tripId}`
        );
        console.log(response, "Trip Details Response");
        setTripDetails(response?.data?.trip); // Set the fetched trip details to state
      } catch (error) {
        console.error("Error fetching Trip Details:", error);
      }
    };

    fetchTripDetails();
  }, [tripId]); // Refetch when the tripId changes

  if (!tripDetails) {
    return <Typography>Loading trip details...</Typography>; // Display loading message if no trip data yet
  }

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        Trip Details
      </Typography>
      <Paper sx={{ padding: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6">Trip ID:</Typography>
            <Typography>{tripDetails.trip_gen_id}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6">Name:</Typography>
            <Typography>{tripDetails.tname}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6">Mobile:</Typography>
            <Typography>{tripDetails.mob}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6">Gender:</Typography>
            <Typography>{tripDetails.gend}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6">Vehicle No:</Typography>
            <Typography>{tripDetails.vno}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6">Destination:</Typography>
            <Typography>{tripDetails.dest}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6">Trip Type:</Typography>
            <Typography>{tripDetails.triptypnm}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6">Trip Status:</Typography>
            <Typography>
              {tripDetails.livsts === 1 ? "Started" : "Ended"}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6">Start Time:</Typography>
            <Typography>{tripDetails.stm}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6">End Time:</Typography>
            <Typography>{tripDetails.etm}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6">End Disposition:</Typography>
            <Typography>{tripDetails.tripenddispnm}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6">End Description:</Typography>
            <Typography>{tripDetails.tripendesc}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6">Duration (Mins):</Typography>
            <Typography>{tripDetails.trip_dur_mins}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6">Last Sync:</Typography>
            <Typography>{tripDetails.lastloctm}</Typography>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default TripView;
