import React, { useEffect } from "react";
import Header from "../../components/Header";
import { Card, CardHeader, CardBody, CardTitle, Row, Col } from "reactstrap";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button } from "@mui/material";
import { Add, RemoveRedEye } from "@mui/icons-material";
import { Link, useParams } from "react-router-dom";
import CustomeBtn from "components/FixedPlugin/CustomeBtn";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Loader from "../../components/Loader";
import NotFound from "../../components/NotFound";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useCalenderGlobalContext } from "context/calenderContext";

function ViewCalender() {
  const {
    calenderYear,
    loading,
    getCalenderByYear,
    deleteSingleCalenderCategory,
  } = useCalenderGlobalContext();

  const [open, setOpen] = React.useState(false);
  const { year } = useParams();

  const handleDelete = (id) => {
    deleteSingleCalenderCategory(id);
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
    { field: "description", headerName: "Description", width: 400 },
    {
      field: "startDate",
      headerName: "Start Date",
      width: 200,
      renderCell: (params) => (
        <Button
          size="small"
          variant="contained"
          disableElevation
          sx={{
            bgcolor: "#faf3e1",
            fontSize: "11px",
            color: "#664b01",
            borderRadius: "15px",
            "&:hover": {
              bgcolor: "#664b01",
              color: "#fff",
            },
          }}>
          {new Date(params.row.startDate).toLocaleString(undefined, {
            year: "numeric",
            month: "long",
            day: "numeric",

            hour12: true,
          })}
        </Button>
      ),
    },
    {
      field: "endDate",
      headerName: "End Date",
      width: 200,
      renderCell: (params) => (
        <Button
          size="small"
          variant="contained"
          disableElevation
          sx={{
            bgcolor: "#d2d6f7",
            fontSize: "11px",
            color: "#0416bd",
            borderRadius: "15px",
            "&:hover": {
              bgcolor: "#0416bd",
              color: "#fff",
            },
          }}>
          {new Date(params.row.endDate).toLocaleString(undefined, {
            year: "numeric",
            month: "long",
            day: "numeric",

            hour12: true,
          })}
        </Button>
      ),
    },
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
        const endDate = new Date(params.row.endDate); // Corrected the variable name
        const startDate = new Date(params.row.startDate); // Corrected the variable name

        return endDate > currentDate && startDate > currentDate ? (
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
        ) : endDate > currentDate && startDate < currentDate ? (
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
            Active
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
    getCalenderByYear(year);
  }, []);

  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Header title="All recent and upcoming events" />

            <Box className="mt-2 mb-5">
              <Link to="/admin/calender/add-calender">
                <CustomeBtn value="Add Calender" icon={<Add />} />
              </Link>
            </Box>

            <Card className="demo-icons">
              <CardBody className="all-icons">
                {loading ? (
                  <Loader />
                ) : (
                  <>
                    {!calenderYear ? (
                      <NotFound />
                    ) : (
                      <DataGrid
                        rows={calenderYear ? calenderYear : []}
                        columns={columns}
                        initialState={{
                          pagination: {
                            paginationModel: {
                              pageSize: 10,
                            },
                          },
                        }}
                        pageSizeOptions={[10]}
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

export default ViewCalender;
