import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import {
  Typography,
  Button,
  Box,
  Grid,
  Card,
  CircularProgress,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { LocalizationProvider } from "@mui/x-date-pickers";
import FilterDrawer from "./filter-drawer";
import dayjs from "dayjs";
import TripDetailsDrawer from "./trip-details-drawer";
import CustomPagination from "./customPagination";
import ViewButton from "./view-link";
import MapButton from "./map-link";

const SafeTripTable = () => {
  const [data, setData] = useState([]);
  const [checkedBox, setCheckedBox] = useState(true);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 25,
  });

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedTripId, setSelectedTripId] = useState(null);
  const [globalSelectedRows, setGlobalSelectedRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDrawer, setOpenDrawer] = useState(false);
  const toggleDrawer = () => setOpenDrawer(!openDrawer);
  const [status, setStatus] = useState("1");
  const [searchType, setSearchType] = useState("");
  const [searchText, setSearchText] = useState("");
  const [checkDate, setCheckDate] = useState("2");
  const [dateFilter, setDateFilter] = useState(["", ""]);
  const [dateRange, setDateRange] = useState({
    startDate: null,
    endDate: null,
  });
  const { trip_gen_id, tripId } = useParams();
  console.log(tripId, "Trip");
  const tripGenId = trip_gen_id;
  console.log(tripGenId);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(25); // Default rows per page

  const totalRows = data?.length || 0; // Ensure data is not undefined
  const totalPages = pageSize === "All" ? 1 : Math.ceil(totalRows / pageSize);

  const startIndex = (currentPage - 1) * pageSize;
  const paginatedRows =
    pageSize === "All" ? data : data?.slice(startIndex, startIndex + pageSize);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handlePageSizeChange = (event) => {
    const value = event.target.value;
    setPageSize(value);
    setCurrentPage(1); // Reset to the first page
  };

  const sendStatus = (data) => {
    setStatus(data);
  };

  const sendSearchType = (data) => {
    setSearchType(data);
  };
  const sendCheckedDate = (data) => {
    setCheckDate(data);
  };
  const sendSearchText = (data) => {
    setSearchText(data);
  };

  const sendDateRange = (data) => {
    setDateRange(data);
  };

  const columns = [
    {
      field: "id",
      headerName: "S.No",
      headerAlign: "center",
      width: 100,
      align: "center",
    },
    {
      field: "trip_gen_id",
      headerName: "Trip Id",
      width: 150,
      renderCell: (params) => (
        // <span
        //   style={{
        //     color: "blue",
        //     textDecoration: "underline",
        //     cursor: "pointer",
        //   }}
        //   onClick={() => handleTripIdClick(params.value)}
        // >
        //   {params.value}
        // </span>
        <a
          href={`trip_view?k=${btoa(
            `${params.row.tripid}~${params.row.trip_genid}`
          )}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Typography sx={{ display: "inline" }}>{params.value}</Typography>
        </a>
      ),
    },

    {
      field: "mob",
      // type: "number",
      headerName: "Mobile",
      width: 150,

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
      width: 200,
    },
    {
      field: "triptypnm",
      headerName: "Trip Type",
      width: 150,
    },

    {
      field: "livsts",
      headerName: "Trip Status",
      width: 150,

      renderCell: (params) => (
        <Typography
          sx={{
            textAlign: "center",
            width: 80,
            backgroundColor: params.row.livsts === 1 ? "#4caf50" : "#f44336", // Green for enabled, red for disabled
            color: "white",
            padding: "2px 6px",
            borderRadius: "4px",
            display: "inline-block", // Ensures the background fits the text
          }}
        >
          {params.row.livsts === 1 ? "Started" : "End"}
        </Typography>
      ),
    },

    {
      field: "stm",
      headerName: "Start Time",
      width: 180,
    },

    {
      field: "etm",
      headerName: "End Time",
      width: 180,
    },
    {
      field: "tripenddispnm",
      headerName: "End Disposition",
      width: 200,
    },
    {
      field: "tripendesc",
      headerName: "End Discription",
      width: 200,
    },

    {
      field: "trip_dur_mins",
      headerName: "Duration(Mins)",
      width: 200,
    },
    {
      field: "lastloctm",
      headerName: "Last Sync",
      width: 180,
    },

    {
      field: "action",
      headerName: "Actions",
      width: 200,

      renderCell: (params) => (
        <Box display={"flex"} justifyContent={"space-between"} gap={2}>
          {/* View Icon with Name */}
          {/* <Box>
            <IconButton color="primary">
              <Visibility />
            </IconButton>
            <Typography sx={{ display: "inline" }}>View</Typography>
          </Box> */}
          <ViewButton
            tripId={params.row.tripid}
            tripGenId={params.row.trip_genid}
          />
          {/* <Box>
            
            <IconButton color="primary">
              <PlaceIcon />
            </IconButton>
            <Typography sx={{ display: "inline" }}>Map</Typography>
          </Box> */}
          <MapButton
            tripId={params.row.tripid}
            tripGenId={params.row.trip_genid}
          />
        </Box>
      ),
    },
  ];

  useEffect(() => {
    // Simulate data fetching
    setTimeout(() => {
      setLoading(false);
    }, 1000); // Simulates a 2-second API call
  }, []);

  useEffect(() => {
    // Get today's date
    const today = dayjs().format("DD-MM-YYYY");

    // Get yesterday's date
    const yesterday = dayjs().subtract(1, "day").format("DD-MM-YYYY");

    const lmlValue = localStorage.getItem("lml"); // Replace 'lml' with the key used in localStorage

    if (!lmlValue) {
      console.error("LML value not found in localStorage");
      return; // Optionally handle the case where 'lml' is not found
    }

    setDateFilter([today, yesterday]);
    console.log(dateFilter, "DateFilter");
    // Log the dates to the console
    console.log("Today's Date:", today);
    console.log("Yesterday's Date:", yesterday);
    const fetchTripDetails = async () => {
      console.log(`${dateFilter[0]} / ${dateFilter[1]}`);
      try {
        const response = await axios.post(
          // "https://madhavan.dev.salesquared.in/safe_travel_portal_ajax_apis/public/index.php/v1/trips_report", //Main
          "http://192.168.21.71/devenv/safe_travel_portal_ajax_apis/public/index.php/v1/trips_report", // Test
          {
            // lml: "6cb62f2760384da1b4a4fc20fc72b5ae",
            lml: lmlValue,
            dt: `${today}\/${yesterday}`,
            tripsts: status,
            chkdt: "2",
            srch: searchText,
            stype: searchType,
          }
        );
        console.log(response, "Res");
        const overAllData = response?.data?.resp?.trips_list?.map(
          (trip, index) => {
            return { ...trip, id: index + 1 };
          }
        );
        const todatDate = setData(overAllData);
      } catch (error) {
        console.error("Error fetching Trip Details:", error);
      }
    };

    fetchTripDetails();
  }, []);

  const applyHandler = async () => {
    console.log(`${dateFilter[0]} ${dateFilter[1]}`);
    console.log(searchText, searchType, "searchType");
    if (searchType !== 1 || searchType !== 2) {
      setSearchText("");
    }
    try {
      setLoading(true);
      const response = await axios.post(
        // "https://madhavan.dev.salesquared.in/safe_travel_portal_ajax_apis/public/index.php/v1/trips_report", // Main
        "http://192.168.21.71/devenv/safe_travel_portal_ajax_apis/public/index.php/v1/trips_report", //Test
        {
          lml: "6cb62f2760384da1b4a4fc20fc72b5ae",
          dt: `${dateFilter[0]}\/${dateFilter[1]}`,
          tripsts: status,
          chkdt: checkDate,
          srch: searchText,
          stype: searchType,
        }
      );
      console.log(response, "responce");
      const overAllData = response?.data?.resp?.trips_list?.map(
        (trip, index) => {
          return { ...trip, id: index + 1 };
        }
      );
      console.log(overAllData, "overAll");

      setOpenDrawer(false);
      setData(overAllData);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error("Error fetching members:", error);
    }
  };

  // const handleTripIdClick = (tripId) => {
  //   setSelectedTripId(tripId);
  //   setDrawerOpen(true);
  // };

  // Export to CSV function
  const exportToCSV = () => {
    const headers =
      columns
        .filter((col) => !col.hide)
        .map((col) => col.headerName)
        .join(",") + "\n";

    const rows = data
      .map((row) =>
        columns
          .filter((col) => !col.hide)
          .map((col) => row[col.field] || "")
          .join(",")
      )
      .join("\n");

    const csvContent = headers + rows;

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", "members_list.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleRemove = () => {
    setDrawerOpen(false); // Close the drawer after removal
    setOpenDrawer(false);
  };

  // const showThebottomButtons = globalSelectedRows.length > 0;
  const total = data?.length;
  console.log(globalSelectedRows);
  return (
    <LocalizationProvider>
      <Box ml={3}>
        <Grid container>
          <Grid item xs={12}>
            <Card sx={{ height: 800 }}>
              <Box m={2.5}>
                <Grid
                  container
                  spacing={2}
                  alignItems="right" // Vertically center the items
                >
                  <Grid
                    container
                    spacing={2}
                    alignItems="center" // Vertically center the items
                    justifyContent="space-between" // This will push items to the left and right
                  >
                    <Grid item xs={4} sx={{ ml: "25px", mt: "16px" }}>
                      <Typography
                        variant="h5"
                        color="#000"
                        align="left"
                        fontFamily={"serif"}
                        width={"50%"}
                      >
                        Trip List Reports
                      </Typography>
                    </Grid>

                    <Grid item>
                      <Box display="flex" alignItems="center" gap={2} m={2}>
                        <Button
                          variant="outlined"
                          color="#000"
                          onClick={exportToCSV}
                        >
                          Export to CSV
                        </Button>

                        <Button
                          variant="outlined"
                          color="#000"
                          onClick={toggleDrawer}
                        >
                          My Filters
                        </Button>
                      </Box>
                    </Grid>
                  </Grid>
                </Grid>
                <Box
                  sx={{
                    height: 250,
                    position: "relative",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    mt: 8,
                    borderRadius: "1px",

                    backgroundColor: "#f9f9f9",
                  }}
                >
                  {loading ? (
                    <Box
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      height="100%"
                    >
                      <CircularProgress />
                    </Box>
                  ) : (
                    <Box width={"100%"} mt={35}>
                      <DataGrid
                        rows={paginatedRows || []}
                        columns={columns}
                        disableSelectionOnClick={true} // Disable row selection on click
                        rowSelectionModel={globalSelectedRows}
                        loading={loading}
                        hideFooter
                        getRowHeight={() => "auto"}
                        rowCount={data?.length}
                        paginationMode="server" // Very Important Pagination
                        sx={{
                          height: 620,
                          width: "100%",

                          "& .MuiDataGrid-cell": {
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          },

                          "& .MuiDataGrid-columnHeaderCheckbox .MuiCheckbox-root":
                            {
                              color: "white",
                            },
                          "& .MuiDataGrid-columnHeader": {
                            backgroundColor: "#000",
                            color: "white",
                            maxHeight: 70,
                          },
                          "& .MuiDataGrid-columnHeaderTitle": {
                            color: "white",
                          },
                          "& .MuiDataGrid-columnMenuIcon": {
                            color: "#fffff !important",
                          },
                          "& .MuiDataGrid-menu": {
                            backgroundColor: "#1976d2",
                          },
                          "& .MuiMenuItem-root": {
                            color: "white",
                          },
                          "& .MuiDataGrid-menuItem-root:hover": {
                            backgroundColor: "#1565c0",
                          },
                          "& .MuiDataGrid-sortIcon": {
                            opacity: 1,
                            color: "white",
                          },
                          "& .MuiDataGrid-menuIconButton": {
                            opacity: 1,
                            color: "white",
                          },
                          "& .MuiDataGrid-filterIcon": {
                            opacity: 1,
                            color: "white",
                          },
                        }}
                      />

                      <CustomPagination
                        currentPage={currentPage}
                        totalRows={totalRows}
                        pageSize={pageSize}
                        handlePageSizeChange={handlePageSizeChange}
                        handlePreviousPage={handlePreviousPage}
                        handleNextPage={handleNextPage}
                        totalPages={totalPages}
                        data={data}
                        total={total}
                        startIndex={startIndex}
                      />
                    </Box>
                  )}
                </Box>
                {/* <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: 2,
                    backgroundColor: "#ffff",
                    borderTop: "1px solid #ccc",
                    mt: 45,
                  }}
                >
                  <span>
                    Selected Rows:
                    <strong>
                      {globalSelectedRows?.length === data?.length
                        ? "SelectedAll"
                        : globalSelectedRows?.length}
                    </strong>
                  </span>
                  <span>
                    Total Rows: <strong>{data?.length}</strong>
                  </span>
                </Box> */}
              </Box>
            </Card>
          </Grid>
        </Grid>

        {/* Drawer Component */}
        <FilterDrawer
          openDrawer={openDrawer}
          toggleDrawer={toggleDrawer}
          data={data}
          applyHandler={applyHandler}
          setData={setData}
          sendStatus={sendStatus}
          sendSearchType={sendSearchType}
          sendCheckedDate={sendCheckedDate}
          dateFilter={dateFilter}
          setDateFilter={setDateFilter}
          sendSearchText={sendSearchText}
          sendDateRange={sendDateRange}
          onRemove={handleRemove}
        />
        <TripDetailsDrawer
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          // onClose={toggleDrawer1}
          tripId={selectedTripId}
          setDrawerOpen={setDrawerOpen}
          onRemove={handleRemove}
        />
      </Box>
    </LocalizationProvider>
  );
};

export default SafeTripTable;
