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
import { useGalleryGlobalContext } from "context/galleryContext";

function Gallery() {
  const { gallery, singleGallery, loading, getGallery, deleteSingleGallery } =
    useGalleryGlobalContext();
  console.log(gallery);

  const [open, setOpen] = React.useState(false);

  const handleDelete = (id) => {
    deleteSingleGallery(id);
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
    { field: "title", headerName: "Title", width: 300 },
    {
      field: "createdAt",
      headerName: "Date Added",
      width: 150,
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
          {new Date(params.row.createdAt).toLocaleString(undefined, {
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
        params.row.publish === "1" ? (
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
                  Do you want to delete this gallery?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => handleClose(params.row.id)}>
                  Cancel
                </Button>
                <Button onClick={(e) => handleDelete(params.row.id)} autoFocus>
                  Delete {params.row.id}
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        </>
      ),
    },
  ];

  useEffect(() => {
    getGallery();
  }, []);

  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Header title="All News" />

            <Box className="mt-2 mb-5">
              <Link to="/admin/gallery/add-gallery">
                <CustomeBtn value="Add Image to Gallery" icon={<Add />} />
              </Link>
            </Box>

            <Card className="demo-icons">
              <CardBody className="all-icons">
                {loading ? (
                  <Loader />
                ) : (
                  <>
                    {!gallery ? (
                      <NotFound />
                    ) : (
                      <DataGrid
                        rows={gallery ? gallery : []}
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

export default Gallery;
