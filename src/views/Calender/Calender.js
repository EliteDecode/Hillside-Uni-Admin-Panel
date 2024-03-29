import React, { useEffect } from "react";
import Header from "../../components/Header";
import { Card, CardHeader, CardBody, CardTitle, Row, Col } from "reactstrap";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button } from "@mui/material";
import { Add, RemoveRedEye } from "@mui/icons-material";
import { Link } from "react-router-dom";
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

function Calender() {
  const { calender, loading, getAllCalender, deleteSingleCalender } =
    useCalenderGlobalContext();
  console.log(calender);

  const [open, setOpen] = React.useState(false);

  const handleDelete = (year) => {
    deleteSingleCalender(year);
    setOpen(false);
  };
  const handleClickOpen = (id) => {
    setOpen({ ...open, [id]: true });
  };

  const handleClose = (id) => {
    setOpen({ ...open, [id]: false });
  };

  const data = [];
  calender?.map((ca, index) => {
    data.push({
      id: index + 1,
      year: ca.year,
    });
  });
  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "year", headerName: "Year", width: 200 },
    {
      field: "view",
      headerName: "View",
      width: 150,
      renderCell: (params) => (
        <>
          <Link to={`${params.row.year}`}>
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
              View
            </Button>
          </Link>
        </>
      ),
    },
    {
      field: "delete",
      headerName: "Delete",
      width: 180,
      renderCell: (params) => (
        <>
          <div>
            <DeleteIcon
              onClick={() => handleClickOpen(params.row.year)}
              className="cursor-pointer"
            />
            <Dialog
              open={open[params.row.year] || false}
              onClose={() => handleClose(params.row.year)}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description">
              <DialogTitle id="alert-dialog-title">
                {"Deleteing Calender"}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  Do you want to delete this calender?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => handleClose(params.row.year)}>
                  Cancel
                </Button>
                <Button
                  onClick={(e) => handleDelete(params.row.year)}
                  autoFocus>
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
    getAllCalender();
  }, []);

  console.log(loading);

  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Header title="All Calender" />

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
                    {!calender ? (
                      <NotFound />
                    ) : (
                      <DataGrid
                        rows={data ? data : []}
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

export default Calender;
