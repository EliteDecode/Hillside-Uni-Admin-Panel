import React, { useRef, useState } from "react";
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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  TextareaAutosize,
} from "@mui/material";
import { UploadFile } from "@mui/icons-material";
import { useNewsGlobalContext } from "context/newsContext";

const validationSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  newsImage: Yup.mixed().required("News Image is required"),
  publishNews: Yup.string().required(
    "You must confirm if the news is published or not"
  ),
});

function AddNews() {
  const [imageURL, setImageURL] = useState(null);
  const { addNews, loading } = useNewsGlobalContext();
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",

      newsImage: null,
      publishNews: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const newsData = new FormData();

      newsData.append("title", values.title);
      newsData.append("description", values.description);
      newsData.append("cover_Image", values.newsImage);
      newsData.append("publish", values.publishNews);

      addNews(newsData);
    },
  });

  const fileInputRef = useRef();

  const handleFileInputChange = (news) => {
    const file = news.target.files[0];
    formik.setFieldValue("newsImage", file);
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
            <Header title="Add News" />

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
                        id="title"
                        name="title"
                        value={formik.values.title}
                        onChange={formik.handleChange}
                        error={
                          formik.touched.title && Boolean(formik.errors.title)
                        }
                        helperText={formik.touched.title && formik.errors.title}
                      />

                      <FormControl fullWidth>
                        <TextareaAutosize
                          minRows={5} // You can adjust the number of rows as needed
                          placeholder="Description"
                          id="description"
                          name="description"
                          value={formik.values.description}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          className={
                            formik.touched.description &&
                            formik.errors.description
                              ? "error border p-3" // You can define a CSS class for error styling
                              : "border p-3"
                          }
                        />
                        {formik.touched.description &&
                          formik.errors.description && (
                            <FormHelperText className="text-red-400">
                              {formik.errors.description}
                            </FormHelperText>
                          )}
                      </FormControl>

                      <FormControl
                        className="w-full"
                        error={
                          formik.touched.publishNews &&
                          formik.errors.publishNews
                        }>
                        <InputLabel id="publishNews-label">
                          Publication Status
                        </InputLabel>
                        <Select
                          labelId="publishNews-label"
                          label="publishNews-label"
                          id="publishNews"
                          name="publishNews"
                          value={formik.values.publishNews}
                          onChange={formik.handleChange}>
                          <MenuItem value="">Select</MenuItem>
                          <MenuItem value="1">Published</MenuItem>
                          <MenuItem value="0">Unpublished</MenuItem>
                        </Select>
                        <FormHelperText>
                          {formik.touched.publishNews &&
                            formik.errors.publishNews}
                        </FormHelperText>
                      </FormControl>
                      <Box>
                        <input
                          type="file"
                          accept="image/*"
                          style={{ display: "none" }}
                          ref={fileInputRef}
                          onChange={handleFileInputChange}
                          id="newsImage"
                          name="newsImage"
                        />
                        {imageURL ? (
                          <label
                            htmlFor="newsImage"
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
                                Change News Image
                              </Typography>
                            </Box>
                          </label>
                        ) : (
                          <label
                            htmlFor="newsImage"
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
                                Select News Image
                              </Typography>
                            </Box>
                          </label>
                        )}

                        {formik.touched.newsImage &&
                          formik.errors.newsImage && (
                            <Typography color="error" variant="body2">
                              {formik.errors.newsImage}
                            </Typography>
                          )}
                      </Box>
                      <Button
                        type="submit"
                        disableElevation
                        variant="contained"
                        disabled={loading}
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
                        {loading ? "Please wait..." : "Add News"}
                      </Button>
                    </form>
                  </Grid>
                  <Grid sm={12} md={6} className="">
                    {imageURL && <img src={imageURL} alt="Selected News" />}
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

export default AddNews;
