import React, { useEffect } from "react";
import Header from "../../components/Header";
import { Card, CardHeader, CardBody, CardTitle, Row, Col } from "reactstrap";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button } from "@mui/material";
import { Add, RemoveRedEye } from "@mui/icons-material";
import { Link } from "react-router-dom";
import CustomeBtn from "components/FixedPlugin/CustomeBtn";
import { useEventGlobalContext } from "context/eventsContext";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Loader from "../../components/Loader";
import NotFound from "../../components/NotFound";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

function Events() {
  const { events, loading, getEvents, deleteSingleEvents } =
    useEventGlobalContext();

  const [open, setOpen] = React.useState(false);

  const handleDelete = (id) => {
    deleteSingleEvents(id);
    setOpen(false);
  };

  const handleClickOpen = (id) => {
    setOpen({ ...open, [id]: true });
  };

  const handleClose = (id) => {
    setOpen({ ...open, [id]: false });
  };

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "title", headerName: "Title", width: 200 },
    { field: "description", headerName: "Description", width: 700 },
    { field: "eventsDate", headerName: "Date of Event", width: 150 },
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
      field: "status",
      headerName: "Status",
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
      renderCell: (params) => (
        <>
          <Link to={`${params.id}`}>
            <EditIcon />
          </Link>
        </>
      ),
    },
    {
      field: "delete",
      headerName: "Delete",
      width: 80,
      renderCell: (params) => (
        <>
          <div>
            <DeleteIcon
              onClick={() => handleClickOpen(params.row.id)}
              className="cursor-pointer"
            />
            <Dialog
              open={open[params.row.id] || false}
              onClose={() => handleClose(params.row.id)}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description">
              <DialogTitle id="alert-dialog-title">
                {"Deleteing News"}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  Do you want to delete this events?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => handleClose(params.row.id)}>
                  Cancel
                </Button>
                <Button onClick={(e) => handleDelete(params.row.id)} autoFocus>
                  Delete
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        </>
      ),
    },
  ];

  useEffect(() => {
    getEvents();
  }, []);

  console.log(loading);

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
                {loading ? (
                  <Loader />
                ) : (
                  <>
                    {!events ? (
                      <NotFound />
                    ) : (
                      <DataGrid
                        rows={events ? events : []}
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
                    )}
                  </>
                )}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Events;
