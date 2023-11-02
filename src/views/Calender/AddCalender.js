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
} from "@mui/material";

import { useCalenderGlobalContext } from "context/calenderContext";

const validationSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  publish: Yup.string().required(
    "You must confirm if the news is published or not"
  ),
  calenderYear: Yup.date().required("The calender is required"),
  startDate: Yup.date().required("The starting date is required"),
  endDate: Yup.date().required("The ending date is required"),
});

function AddCalender() {
  const { addCalender } = useCalenderGlobalContext();
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      publish: "",
      calenderYear: "",
      startDate: "",
      endDate: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const calendarData = [
        {
          title: values.title,
          description: values.description,
          publish: values.publishEvent,
          startDate: values.startDate,
          calenderYear: values.calenderYear,
          endDate: values.endDate,
        },
      ];

      addCalender(calendarData);
      console.log(calendarData);
    },
  });

  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Header title="Add Calender" />

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
                      <TextField
                        label="Description"
                        variant="outlined"
                        fullWidth
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
                        label="Calendar Year"
                        variant="outlined"
                        focused
                        fullWidth
                        id="calenderYear"
                        type="string" // Set the input type to "number"
                        name="calenderYear"
                        value={formik.values.calenderYear}
                        onChange={formik.handleChange}
                        error={
                          formik.touched.calenderYear &&
                          Boolean(formik.errors.calenderYear)
                        }
                        helperText={
                          formik.touched.calenderYear &&
                          formik.errors.calenderYear
                        }
                        InputProps={{
                          inputProps: {
                            min: 1900, // Set the minimum calenderYear as needed
                            max: new Date().getFullYear(), // Set the maximum calenderYear as the current calenderYear
                          },
                        }}
                      />
                      <TextField
                        label="Start Date"
                        variant="outlined"
                        fullWidth
                        focused
                        id="startDate"
                        type="date"
                        name="startDate"
                        value={formik.values.startDate}
                        onChange={formik.handleChange}
                        error={
                          formik.touched.startDate &&
                          Boolean(formik.errors.startDate)
                        }
                        helperText={
                          formik.touched.startDate && formik.errors.startDate
                        }
                      />
                      <TextField
                        label="End Date"
                        variant="outlined"
                        fullWidth
                        focused
                        id="endDate"
                        type="date"
                        name="endDate"
                        value={formik.values.endDate}
                        onChange={formik.handleChange}
                        error={
                          formik.touched.endDate &&
                          Boolean(formik.errors.endDate)
                        }
                        helperText={
                          formik.touched.endDate && formik.errors.endDate
                        }
                      />
                      <FormControl
                        className="w-full"
                        error={formik.touched.publish && formik.errors.publish}>
                        <InputLabel id="publish-label">
                          Publication Status
                        </InputLabel>
                        <Select
                          labelId="publish-label"
                          label="publish-label"
                          id="publish"
                          name="publish"
                          value={formik.values.publish}
                          onChange={formik.handleChange}>
                          <MenuItem value="">Select</MenuItem>
                          <MenuItem value="1">Published</MenuItem>
                          <MenuItem value="0">Unpublished</MenuItem>
                        </Select>
                        <FormHelperText>
                          {formik.touched.publish && formik.errors.publish}
                        </FormHelperText>
                      </FormControl>
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
                        Add Calender
                      </Button>
                    </form>
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

export default AddCalender;
