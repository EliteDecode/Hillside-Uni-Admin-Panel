import React, { useEffect, useRef, useState } from "react";
import Header from "../../components/Header";
import SendIcon from "@mui/icons-material/Send";
import { Card, CardBody, Row, Col } from "reactstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  TextField,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from "@mui/material";

import { useCalenderGlobalContext } from "context/calenderContext";
import { useParams } from "react-router-dom";
import DisplayCards from "components/DisplayCards";
import CalenderCard from "components/DisplayCards/CalenderCard";

const validationSchema = Yup.object({
  title: Yup.string(),
  description: Yup.string(),
  publish: Yup.string().required(
    "You must confirm if the news is published or not"
  ),
  calenderYear: Yup.date(),
  startDate: Yup.date(),
  endDate: Yup.date(),
});

function EditCalender() {
  const { getSingleCalender, singleCalender, editSingleCalender } =
    useCalenderGlobalContext();
  const { id } = useParams();

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
      const updates = [
        { columnName: "title", newValue: values.title },
        { columnName: "description", newValue: values.description },
        { columnName: "calenderYear", newValue: values.calenderYear },
        { columnName: "startDate", newValue: values.startDate },
        { columnName: "endDate", newValue: values.endDate },
      ].filter((update) => update.newValue !== "");

      editSingleCalender(updates, id);
    },
  });

  useEffect(() => {
    getSingleCalender(id);
  }, []);

  console.log(singleCalender);

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
                        focused
                        variant="outlined"
                        placeholder={singleCalender ? singleCalender.title : ""}
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
                        focused
                        variant="outlined"
                        placeholder={
                          singleCalender ? singleCalender.description : ""
                        }
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
                        placeholder={
                          singleCalender ? singleCalender.calenderYear : ""
                        }
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
                        placeholder={
                          singleCalender ? singleCalender.startDate : ""
                        }
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
                        placeholder={
                          singleCalender ? singleCalender.endDate : ""
                        }
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
                        Edit Calender
                      </Button>
                    </form>
                  </Grid>
                  <Grid sm={12} md={4} className="">
                    <CalenderCard
                      title={singleCalender?.title}
                      description={singleCalender?.description}
                      year={singleCalender?.calenderYear}
                      isPublished={singleCalender?.publish === 1 ? true : false}
                      start={singleCalender?.startDate}
                      end={singleCalender?.endDate}
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

export default EditCalender;
