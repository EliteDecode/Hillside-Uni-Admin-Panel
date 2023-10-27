import React from "react";
import Header from "../components/Header";
import { Card, CardHeader, CardBody, CardTitle, Row, Col } from "reactstrap";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button } from "@mui/material";
import { Add, AddIcCallOutlined } from "@mui/icons-material";
import { Link } from "react-router-dom";
import CustomeBtn from "components/FixedPlugin/CustomeBtn";
import { useEventGlobalContext } from "context/eventsContext";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const columns = [
  { field: "id", headerName: "ID", width: 90 },
  { field: "title", headerName: "Title", width: 200 },
  { field: "description", headerName: "Description", width: 850 },
  {
    field: "publish",
    headerName: "Publish",
    width: 120,
    renderCell: (params) =>
      params.row.publish === 1 ? (
        <Button
          size="small"
          variant="contained"
          disableElevation
          sx={{
            bgcolor: "#e0ebdf",
            fontSize: "11px",
            color: "#205419",
            borderRadius: "15px",
            "&:hover": {
              bgcolor: "#205419",
              color: "#fff",
            },
          }}>
          Published
        </Button>
      ) : (
        <Button
          size="small"
          variant="contained"
          disableElevation
          sx={{
            bgcolor: "#e0dcc5",
            fontSize: "11px",
            color: "#382f04",
            borderRadius: "15px",
            "&:hover": {
              bgcolor: "#382f04",
              color: "#fff",
            },
          }}>
          Unpublished
        </Button>
      ),
  },
  {
    field: "date",
    headerName: "Date",
    width: 100,
    renderCell: (params) => {
      const currentDate = new Date();
      const eventDate = new Date(params.row.eventsDate); // Corrected the variable name

      return eventDate > currentDate ? (
        <Button
          size="small"
          variant="contained"
          disableElevation
          sx={{
            bgcolor: "#e0dcc5",
            fontSize: "11px",
            color: "#382f04",
            borderRadius: "15px",
            "&:hover": {
              bgcolor: "#382f04",
              color: "#fff",
            },
          }}>
          Upcoming
        </Button>
      ) : (
        <Button
          size="small"
          variant="contained"
          disableElevation
          sx={{
            bgcolor: "#f28e8a",
            fontSize: "11px",
            color: "#470b09",
            borderRadius: "15px",
            "&:hover": {
              bgcolor: "#470b09",
              color: "#fff",
            },
          }}>
          Past
        </Button>
      );
    },
  },
  {
    field: "edit",
    headerName: "Edit",
    width: 50,
    renderCell: (params) => <EditIcon />,
  },
  {
    field: "delete",
    headerName: "Delete",
    width: 80,
    renderCell: (params) => <DeleteIcon />,
  },
];

function Events() {
  const { events } = useEventGlobalContext();
  console.log(events);
  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Header title="All recent and upcoming events" />

            <Box className="mt-2 mb-5">
              <Link to="/admin/events/add-events">
                <CustomeBtn value="Add Event" icon={<Add />} />
              </Link>
            </Box>

            <Card className="demo-icons">
              <CardBody className="all-icons">
                <DataGrid
                  rows={events}
                  columns={columns}
                  initialState={{
                    pagination: {
                      paginationModel: {
                        pageSize: 5,
                      },
                    },
                  }}
                  pageSizeOptions={[5]}
                  checkboxSelection
                  disableRowSelectionOnClick
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Events;
