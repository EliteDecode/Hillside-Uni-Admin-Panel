import React, { useEffect, useRef, useState } from "react";
import Header from "../../components/Header";
import SendIcon from "@mui/icons-material/Send";
import { Card, CardBody, Row, Col } from "reactstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
  Box,
  Typography,
  Grid,
  Select,
  InputLabel,
  MenuItem,
  FormControl,
  FormHelperText,
} from "@mui/material";
import { UploadFile } from "@mui/icons-material";
import { useGalleryGlobalContext } from "context/galleryContext";
import { useParams } from "react-router-dom";
import DisplayCards from "components/DisplayCards";

const validationSchema = Yup.object({
  title: Yup.string(),
  publishGallery: Yup.string().required(
    "You must confirm if the image is published or not"
  ),
});

function EditGallery() {
  const [imageURL, setImageURL] = useState(null);
  const { getSingleGallery, singleGallery, editGallery } =
    useGalleryGlobalContext();

  const { galleryId } = useParams();

  console.log(
    `${process.env.REACT_APP_API_URL}/uploads/images/${singleGallery?.image}`
  );

  console.log(singleGallery);

  useEffect(() => {
    getSingleGallery(galleryId);
  }, []);

  const img = `${process.env.REACT_APP_API_URL}/hust/api/v1/uploads/images/${singleGallery?.image}`;

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      galleryImage: null,
      publishGallery: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const galleryData = new FormData();
      galleryData.append("cover_Image", values.galleryImage);

      const updates = [
        { columnName: "title", newValue: values.title },
        { columnName: "publish", newValue: values.publishGallery },
      ].filter((update) => update.newValue !== "");
      galleryData.append("updates", JSON.stringify(updates));

      editGallery(galleryData, galleryId);
    },
  });

  const fileInputRef = useRef();

  const handleFileInputChange = (gallery) => {
    const file = gallery?.target.files[0];
    formik.setFieldValue("galleryImage", file);
    if (file) {
      // Display the selected image
      const url = URL.createObjectURL(file);
      setImageURL(url);
    }
  };
  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Header title="Edit Gallery" />
            <Card className="demo-icons">
              <CardBody className="all-icons">
                <Grid container>
                  <Grid sm={12} md={6} className="sm:p-4 p-1">
                    <form
                      onSubmit={formik.handleSubmit}
                      className="sm:p-4 p-1 space-y-4">
                      <TextField
                        label="Title"
                        variant="outlined"
                        fullWidth
                        placeholder={singleGallery?.title}
                        focused={singleGallery ? true : false}
                        id="title"
                        name="title"
                        value={formik.values.title}
                        onChange={formik.handleChange}
                        error={
                          formik.touched.title && Boolean(formik.errors.title)
                        }
                        helperText={formik.touched.title && formik.errors.title}
                      />

                      <FormControl
                        className="w-full"
                        error={
                          formik.touched.publishGallery &&
                          formik.errors.publishGallery
                        }>
                        <InputLabel id="publishGallery-label">
                          Publication Status
                        </InputLabel>
                        <Select
                          labelId="publishGallery-label"
                          label="publishGallery-label"
                          id="publishGallery"
                          name="publishGallery"
                          value={formik.values.publishGallery}
                          onChange={formik.handleChange}>
                          <MenuItem value="">Select</MenuItem>
                          <MenuItem value="1">Published</MenuItem>
                          <MenuItem value="0">Unpublished</MenuItem>
                        </Select>
                        <FormHelperText>
                          {formik.touched.publishGallery &&
                            formik.errors.publishGallery}
                        </FormHelperText>
                      </FormControl>

                      <Box>
                        {imageURL && (
                          <img src={imageURL} alt="Selected Gallery" />
                        )}
                        <input
                          type="file"
                          accept="image/*"
                          style={{ display: "none" }}
                          ref={fileInputRef}
                          onChange={handleFileInputChange}
                          id="galleryImage"
                          name="galleryImage"
                        />
                        {imageURL ? (
                          <label
                            htmlFor="galleryImage"
                            className="sm:w-[38%] w-[100%] cursor-pointer">
                            <Box
                              className=" flex items-center space-x-2 px-2 justify-center rounded-sm shadow-md mt-2  py-2 w-full"
                              sx={{
                                bgcolor: "#e3caca",
                                color: "#5e0001",
                                "&:hover": {
                                  bgcolor: "#5e0001",
                                  color: "#fff",
                                },
                              }}>
                              <UploadFile />
                              <Typography variant="body1">
                                Change Image
                              </Typography>
                            </Box>
                          </label>
                        ) : (
                          <label
                            htmlFor="galleryImage"
                            className="w-full cursor-pointer">
                            <Box
                              className=" py-28 w-full"
                              style={{
                                display: "grid",
                                placeItems: "center",
                                border: "2px dashed #5e0001",
                              }}>
                              <UploadFile />
                              <Typography variant="body1">
                                Select Image
                              </Typography>
                            </Box>
                          </label>
                        )}

                        {formik.touched.galleryImage &&
                          formik.errors.galleryImage && (
                            <Typography color="error" variant="body2">
                              {formik.errors.galleryImage}
                            </Typography>
                          )}
                      </Box>
                      <Button
                        type="submit"
                        disableElevation
                        variant="contained"
                        color="primary"
                        sx={{
                          background: "#5e0001",
                          border: "1px solid #fff",
                          "&:hover": {
                            background: "transparent",
                            color: "#5e0001",
                            border: "1px solid #5e0001",
                          },
                        }}>
                        Edit Gallery
                      </Button>
                    </form>
                  </Grid>
                  <Grid sm={12} md={6} className="">
                    <DisplayCards
                      title={singleGallery?.title}
                      description={singleGallery?.description}
                      date={singleGallery?.singleGalleryDate}
                      isPublished={
                        singleGallery?.publish === "1" ? true : false
                      }
                      img={img}
                    />
                  </Grid>
                </Grid>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default EditGallery;
