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
import { useStaffGlobalContext } from "context/staffContext";

function Staff() {
  const { staff, loading, getStaff, getSingleStaff } = useStaffGlobalContext();

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = (id) => {
    setOpen({ ...open, [id]: true });
  };

  const handleClose = (id) => {
    setOpen({ ...open, [id]: false });
  };
  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "firstname", headerName: "Firstname", width: 155 },
    { field: "lastname", headerName: "Lastname", width: 155 },
    { field: "email", headerName: "Email", width: 155 },
    { field: "staffId", headerName: "Staff ID", width: 155 },
    { field: "sex", headerName: "Sex", width: 135 },
    { field: "phone", headerName: "Phone", width: 155 },
    { field: "rolename", headerName: "Role", width: 155 },
    {
      field: "Approved",
      headerName: "Status",
      width: 120,
      renderCell: (params) =>
        params.row.Approved === 1 ? (
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
            Approved
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
            Pending
          </Button>
        ),
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
  ];

  useEffect(() => {
    getStaff();
  }, []);

  console.log(loading);

  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Header title="All Staffs" />

            <Card className="demo-icons">
              <CardBody className="all-icons">
                {loading ? (
                  <Loader />
                ) : (
                  <>
                    {!staff ? (
                      <NotFound />
                    ) : (
                      <DataGrid
                        rows={staff ? staff : []}
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

export default Staff;
