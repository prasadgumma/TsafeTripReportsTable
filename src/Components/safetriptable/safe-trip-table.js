import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import {
  Typography,
  Button,
  Box,
  Grid,
  Card,
  IconButton,
  Checkbox,
  CircularProgress,
} from "@mui/material";
import { Edit, Delete, Visibility } from "@mui/icons-material"; // Import icons
import { DataGrid } from "@mui/x-data-grid";
import { v4 as uuidv4 } from "uuid";
import { LocalizationProvider } from "@mui/x-date-pickers";
import FilterDrawer from "./filter-drawer";
import TableBottomActions from "./bottom-table-actions";
import dayjs from "dayjs";
import TripDetailsDrawer from "./trip-details-drawer";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import TextField from "@mui/material/TextField";

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
  const { trip_gen_id } = useParams();

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
      width: 100,
    },
    {
      field: "trip_gen_id",
      headerName: "Trip Id",
      width: 150,
      renderCell: (params) => (
        <span
          style={{
            color: "blue",
            textDecoration: "underline",
            cursor: "pointer",
          }}
          onClick={() => handleTripIdClick(params.value)}
        >
          {params.value}
        </span>
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
      renderCell: (params) => (
        <Typography
          sx={{
            textAlign: "center",
            width: 80,
            backgroundColor:
              params.row.livsts === 1
                ? "#4caf50"
                : params.row.livsts === 2
                ? "#f44336"
                : "#e0e0e0", // Green for "Started", Red for "End", Grey for undefined
            color: "white",
            padding: "2px 6px",
            borderRadius: "4px",
            display: "inline-block", // Ensures the background fits the text
          }}
        >
          {params.row.livsts === 1
            ? "Started"
            : params.row.livsts === 2
            ? "End"
            : "Unknown"}
        </Typography>
      ),
      renderEditCell: (params) => {
        return (
          <select
            value={params.value}
            onChange={(e) => {
              const value = e.target.value;
              // Assuming a method to update the row's livsts field based on selection
              params.api.getEditingCell().setValue(value);
            }}
          >
            <option value={-1}>Any</option>
            <option value={1}>Started</option>
            <option value={2}>End</option>
          </select>
        );
      },
      type: "singleSelect",
      valueOptions: [
        { value: 1, label: "Started" },
        { value: 2, label: "End" },
      ],
      width: 150,
      editable: true,
    },
    // {
    //   field: "livsts",
    //   headerName: "Trip Status",
    //   width: 150,

    //   renderCell: (params) => (
    //     <Typography
    //       sx={{
    //         textAlign: "center",
    //         width: 80,
    //         backgroundColor: params.row.livsts === 1 ? "#4caf50" : "#f44336", // Green for enabled, red for disabled
    //         color: "white",
    //         padding: "2px 6px",
    //         borderRadius: "4px",
    //         display: "inline-block", // Ensures the background fits the text
    //       }}
    //     >
    //       {params.row.livsts === 1 ? "Started" : "End"}
    //     </Typography>
    //   ),
    // },

    {
      field: "stm",
      headerName: "Start Time",
      width: 180,
    },

    // {
    //   field: "stm",
    //   headerName: "Date",
    //   width: 150,
    //   filterOperators: [
    //     {
    //       label: "Filter by Date",
    //       value: "date",
    //       getApplyFilterFn: (filterItem) => {
    //         console.log(filterItem, "filterItem");
    //         if (!filterItem.value) {
    //           return null;
    //         }

    //         return ({ rows }) => console.log(rows, "row");
    //       },
    //       InputComponent: ({ item, applyValue }) => (
    //         <input
    //           type="date"
    //           value={item.value || ""}
    //           onChange={(e) => applyValue({ ...item, value: e.target.value })}
    //           style={{ width: "100%" }}
    //         />
    //       ),
    //     },
    //   ],
    // },

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

      renderCell: (params) => (
        <Box>
          <IconButton color="primary" sx={{ mr: 1 }}>
            <Edit />
          </IconButton>
          <IconButton color="error">
            <Delete />
          </IconButton>
          <IconButton sx={{ mr: 1 }}>
            <Visibility />
          </IconButton>
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
    setDateFilter([today, yesterday]);
    console.log(dateFilter, "DateFilter");
    // Log the dates to the console
    console.log("Today's Date:", today);
    console.log("Yesterday's Date:", yesterday);
    const fetchTripDetails = async () => {
      console.log(`${dateFilter[0]} / ${dateFilter[1]}`);
      try {
        const response = await axios.post(
          // "http://192.168.21.126/safe_travel_portal_ajax_apis/public/index.php/v1/trips_report",
          "http://192.168.21.71/devenv/safe_travel_portal_ajax_apis/public/index.php/v1/trips_report",
          {
            lml: "894951d2ed1a413290f94a33b0dc12df",
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
        // "http://192.168.21.126/safe_travel_portal_ajax_apis/public/index.php/v1/trips_report",
        "http://192.168.21.71/devenv/safe_travel_portal_ajax_apis/public/index.php/v1/trips_report",
        {
          lml: "894951d2ed1a413290f94a33b0dc12df",
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

  const handleTripIdClick = (tripId) => {
    setSelectedTripId(tripId);
    setDrawerOpen(true);
  };

  const toggleDrawer1 = () => {
    setDrawerOpen(!drawerOpen);
  };

  // Delete Functionality...
  const deleteHandle = (id) => {
    if (window.confirm("Would you like to delete this row?")) {
      axios.delete(`http://localhost:7779/members/${id}`).then(() => {
        setData((prevData) => prevData.filter((member) => member.id !== id));
      });
    }
  };

  const handlePaginationChange = (newPaginationModel) => {
    setPaginationModel(newPaginationModel);
  };

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

  const handleApplyClick = () => {
    if (globalSelectedRows.length > 0) {
      alert(`Selected row IDs: ${globalSelectedRows.join(", ")}`);
    } else {
      alert("No rows selected.");
    }
  };

  const handleSelectionChange = (newSelection) => {
    console.log(newSelection, "newSelection");
    // Get the rows visible on the current page
    const visibleRows = data.slice(
      paginationModel.page * paginationModel.pageSize,
      (paginationModel.page + 1) * paginationModel.pageSize
    );
    const visibleRowIds = visibleRows.map((row) => row.id);
    // Filter the selected IDs to include only those in visible rows
    const updatedSelection = newSelection.filter((id) =>
      visibleRowIds.includes(id)
    );
    setGlobalSelectedRows(updatedSelection);
    // Update the "select all" checkbox state for the current page
    if (visibleRowIds === 25) {
      setCheckedBox(true);
    } else {
      setCheckedBox(false);
    }
  };

  const handleSelection = (eventOrIds) => {
    if (typeof eventOrIds === "object" && eventOrIds.target) {
      // Handle "Select All" checkbox change
      const { checked } = eventOrIds.target;
      const allIds = data.map((row) => row.id);
      if (checked) {
        console.log(checked, "Checked");
        // Select all rows across the filtered data
        setGlobalSelectedRows((prev) =>
          Array.from(new Set([...prev, ...allIds]))
        );
        setGlobalSelectedRows(allIds); // Select all rows on the current page
        setCheckedBox(checked);
        alert(
          `Action will be applied to all items selected by the filter  ${allIds.length} rows.`
        );
      } else {
        // Deselect all rows
        setGlobalSelectedRows(
          (prev) => prev.filter((id) => !allIds.includes(id)) // Remove filtered rows from global selection
        );
        setCheckedBox((prev) => !prev); // Reset local selection for the current page
        alert("Deselected all rows.");
      }
    }
  };

  const handleShowButton = () => {
    setDrawerOpen(true);
  };

  const showThebottomButtons = globalSelectedRows.length > 0;
  return (
    <LocalizationProvider>
      <Box ml={3}>
        <Grid container>
          <Grid item xs={12}>
            <Card sx={{ height: 735 }}>
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
                        color="#787879"
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
                          color="#787879"
                          onClick={handleShowButton}
                        >
                          Show
                        </Button>
                        <Button
                          variant="outlined"
                          color="#787879"
                          onClick={exportToCSV}
                        >
                          Export to CSV
                        </Button>

                        <Button
                          variant="outlined"
                          color="#787879"
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
                    height: 480, // Set a fixed height for consistent appearance
                    position: "relative", // Ensures proper placement of the loader
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    mt: 8,
                    borderRadius: "1px",

                    backgroundColor: "#f9f9f9", // Optional background color
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
                    <DataGrid
                      rows={data}
                      columns={columns}
                      checkboxSelection={true}
                      disableSelectionOnClick={false}
                      rowSelectionModel={globalSelectedRows}
                      onRowSelectionModelChange={handleSelectionChange}
                      pagination
                      loading={loading}
                      pageSize={paginationModel.pageSize}
                      page={paginationModel.page}
                      initialState={{
                        pagination: {
                          paginationModel: { page: 0, pageSize: 25 },
                        },
                      }}
                      disableRowSelectionOnClick
                      pageSizeOptions={[5, 10, 25, { value: -1, label: "All" }]}
                      rowCount={data?.length} // Make sure this reflects the total number of members
                      onPaginationModelChange={handlePaginationChange}
                      paginationMode="client" // Client-side pagination
                      sx={{
                        height: 600, // Set a fixed height
                        width: "100%",
                        // overflowY: "auto", // Enable vertical scrolling
                        "& .MuiDataGrid-columnHeaderCheckbox .MuiCheckbox-root":
                          {
                            color: "white",
                          },
                        "& .MuiDataGrid-columnHeader": {
                          backgroundColor: "#787877",
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
                  )}
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: 2,
                    backgroundColor: "#ffff",
                    borderTop: "1px solid #ccc",
                    mt: 8,
                  }}
                >
                  <span>
                    Selected Rows:{" "}
                    <strong>
                      {globalSelectedRows?.length === data?.length
                        ? "SelectedAll"
                        : globalSelectedRows?.length}
                    </strong>
                  </span>
                  <span>
                    Total Rows: <strong>{data?.length}</strong>
                  </span>
                </Box>
              </Box>

              {showThebottomButtons && (
                <Box
                  key={uuidv4()}
                  sx={{
                    display: "flex",
                    justifyContent: "start",
                    m: 2,
                    position: "fixed",
                    bottom: 5,
                    width: "96%",
                    backgroundColor: "#787877",
                    gap: 2,
                    zIndex: 100,
                    // p: ,
                    mr: "530px",
                    borderRadius: "7px", // Set the border radius here
                    boxShadow: 3, // Optional: add shadow for better visibility
                    mb: 6,
                  }}
                >
                  <Button
                    variant="outlined"
                    color="white"
                    onClick={handleApplyClick}
                    sx={{ maxHeight: 35, mt: 1.2, color: "#ffff", ml: 2 }}
                  >
                    Apply
                  </Button>
                  <Button
                    variant="outlined"
                    color="white"
                    sx={{ maxHeight: 35, mt: 1.2, color: "#ffff" }}
                    onClick={() => setGlobalSelectedRows([])} // Reset selection on cancel
                  >
                    Cancel
                  </Button>
                  <Box mb={0.5}>
                    <TableBottomActions />
                  </Box>

                  <Box display={"flex"} mt={1} mb={1}>
                    <Checkbox
                      checked={checkedBox}
                      onChange={handleSelection}
                      value="checkedBox"
                      sx={{
                        color: "white", // Set the checkbox color to white
                        "&.Mui-checked": {
                          color: "white", // Set checked state color to white
                        },
                      }}
                    />
                    <Typography variant="h6" color="#ffff" sx={{ mt: 0.7 }}>
                      For All
                    </Typography>
                  </Box>
                </Box>
              )}
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
        />
        <TripDetailsDrawer
          open={drawerOpen}
          onClose={toggleDrawer1}
          tripId={selectedTripId}
          setDrawerOpen={setDrawerOpen}
        />
      </Box>
    </LocalizationProvider>
  );
};

export default SafeTripTable;
