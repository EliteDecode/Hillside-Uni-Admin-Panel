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
import { useEventGlobalContext } from "context/eventsContext";
import { useParams } from "react-router-dom";
import DisplayCards from "components/DisplayCards";
import { API_URL } from "context/api";

const validationSchema = Yup.object({
  title: Yup.string(),
  description: Yup.string(),
  date: Yup.date(),
  publishEvent: Yup.string().required(
    "You must confirm if the event is published or not"
  ),
});

function EditEvents() {
  const [imageURL, setImageURL] = useState(null);
  const { getSingleEvents, event, editEvents } = useEventGlobalContext();

  const { eventId } = useParams();
  console.log(`${API_URL}/uploads/images/${event?.image}`);

  useEffect(() => {
    getSingleEvents(eventId);
  }, []);

  const img = `${API_URL}/uploads/images/${event?.image}`;

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      date: "",
      eventImage: null,
      publishEvent: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const eventData = new FormData();
      eventData.append("cover_Image", values.eventImage);

      const updates = [
        { columnName: "title", newValue: values.title },
        { columnName: "description", newValue: values.description },
        { columnName: "publish", newValue: values.publishEvent },
        { columnName: "eventsDate", newValue: values.date },
      ].filter((update) => update.newValue !== "");
      eventData.append("updates", JSON.stringify(updates));

      console.log(updates);
      editEvents(eventData, eventId);
    },
  });

  const fileInputRef = useRef();

  const handleFileInputChange = (event) => {
    const file = event?.target.files[0];
    formik.setFieldValue("eventImage", file);
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
            <Header title="Edit Events" />
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
                        placeholder={event?.title}
                        focused={event ? true : false}
                        id="title"
                        name="title"
                        value={formik.values.title}
                        onChange={formik.handleChange}
                        error={
                          formik.touched.title && Boolean(formik.errors.title)
                        }
                        helperText={formik.touched.title && formik.errors.title}
                      />

                      <TextField
                        label="Description"
                        variant="outlined"
                        fullWidth
                        placeholder={event?.description}
                        focused={event ? true : false}
                        id="description"
                        name="description"
                        value={formik.values.description}
                        onChange={formik.handleChange}
                        error={
                          formik.touched.description &&
                          Boolean(formik.errors.description)
                        }
                        helperText={
                          formik.touched.description &&
                          formik.errors.description
                        }
                      />

                      <TextField
                        label="Event's Date"
                        variant="outlined"
                        fullWidth
                        focused={event ? true : false}
                        id="date"
                        type="date"
                        name="date"
                        value={formik.values.date || event?.eventsDate}
                        onChange={formik.handleChange}
                        error={
                          formik.touched.date && Boolean(formik.errors.date)
                        }
                        helperText={formik.touched.date && formik.errors.date}
                      />

                      <FormControl
                        className="w-full"
                        error={
                          formik.touched.publishEvent &&
                          formik.errors.publishEvent
                        }>
                        <InputLabel id="publishEvent-label">
                          Publication Status
                        </InputLabel>
                        <Select
                          labelId="publishEvent-label"
                          label="publishEvent-label"
                          id="publishEvent"
                          name="publishEvent"
                          value={formik.values.publishEvent}
                          onChange={formik.handleChange}>
                          <MenuItem value="">Select</MenuItem>
                          <MenuItem value="1">Published</MenuItem>
                          <MenuItem value="0">Unpublished</MenuItem>
                        </Select>
                        <FormHelperText>
                          {formik.touched.publishEvent &&
                            formik.errors.publishEvent}
                        </FormHelperText>
                      </FormControl>

                      <Box>
                        {imageURL && (
                          <img src={imageURL} alt="Selected Event" />
                        )}
                        <input
                          type="file"
                          accept="image/*"
                          style={{ display: "none" }}
                          ref={fileInputRef}
                          onChange={handleFileInputChange}
                          id="eventImage"
                          name="eventImage"
                        />
                        {imageURL ? (
                          <label
                            htmlFor="eventImage"
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
                                Change Event Image
                              </Typography>
                            </Box>
                          </label>
                        ) : (
                          <label
                            htmlFor="eventImage"
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
                                Select Event Image
                              </Typography>
                            </Box>
                          </label>
                        )}

                        {formik.touched.eventImage &&
                          formik.errors.eventImage && (
                            <Typography color="error" variant="body2">
                              {formik.errors.eventImage}
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
                        Edit Event
                      </Button>
                    </form>
                  </Grid>
                  <Grid sm={12} md={6} className="">
                    <DisplayCards
                      title={event?.title}
                      description={event?.description}
                      date={event?.eventsDate}
                      isPublished={event?.publish === 1 ? true : false}
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

export default EditEvents;
