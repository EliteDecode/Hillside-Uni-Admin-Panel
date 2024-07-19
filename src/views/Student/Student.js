import React, { useEffect } from "react";
import Header from "../../components/Header";
import { Card, CardBody, Row, Col } from "reactstrap";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import Loader from "../../components/Loader";
import NotFound from "../../components/NotFound";
import { useStudentGlobalContext } from "context/studentContext";

function Student() {
  const { student, loading, getStudent, getSingleStudent } =
    useStudentGlobalContext();

  const [open, setOpen] = React.useState(false);

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "firstname", headerName: "Firstname", width: 155 },
    { field: "lastname", headerName: "Lastname", width: 155 },
    { field: "email", headerName: "Email", width: 185 },
    { field: "matricNumber", headerName: "Matri Number", width: 185 },
    { field: "sex", headerName: "Gender", width: 135 },

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
    getStudent();
  }, []);

  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Header title="All Students" />

            <Card className="demo-icons">
              <CardBody className="all-icons">
                {loading ? (
                  <Loader />
                ) : (
                  <>
                    {!student ? (
                      <NotFound />
                    ) : (
                      <DataGrid
                        rows={student ? student : []}
                        sortingMode="client"
                        columns={columns}
                        initialState={{
                          pagination: {
                            paginationModel: {
                              pageSize: 10,
                            },
                          },
                        }}
                        pageSizeOptions={[15]}
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

export default Student;
