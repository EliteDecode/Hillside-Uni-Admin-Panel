import { useAuthGlobalContext } from "context/authContext";
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
} from "reactstrap";

function User() {
  const { admin, editAdmin } = useAuthGlobalContext();

  const handleSubmit = async (values) => {
    const updates = [
      { columnName: "firstname", newValue: values.firstname },
      { columnName: "lastname", newValue: values.lastname },
      { columnName: "email", newValue: values.email },
    ].filter((update) => update.newValue !== "");
    editAdmin(updates, admin?.data.id);
  };

  const formik = useFormik({
    initialValues: {
      firstname: admin?.data?.firstname || "",
      lastname: admin?.data?.lastname || "",
      email: admin?.data?.email || "",
    },
    validationSchema: Yup.object({
      firstname: Yup.string(),
      lastname: Yup.string(),
      email: Yup.string().email("Invalid email address"),
    }),
    onSubmit: handleSubmit,
  });

  return (
    <>
      <div className="content">
        <Row>
          <Col md="4">
            <Card className="card-user">
              <div className="image">
                <img alt="..." src={require("assets/img/slider1.jpg")} />
              </div>
              <CardBody className="bg-[#f7f7f7]">
                <div className="author">
                  <img
                    alt="..."
                    className="avatar border-gray"
                    src={require("assets/img/logo.png")}
                  />
                  <h5 className="title">
                    {admin?.data?.firstname} {admin?.data?.lastname}
                  </h5>

                  <p className="description">@{admin?.data?.email}</p>
                </div>
                <p className="description text-center">Admin HUST</p>
              </CardBody>
            </Card>
          </Col>
          <Col md="8">
            <Card className="card-user">
              <CardHeader>
                <CardTitle tag="h5">Edit Profile</CardTitle>
              </CardHeader>
              <CardBody>
                <Form onSubmit={formik.handleSubmit}>
                  <Row>
                    <Col className="pr-1" md="4">
                      <FormGroup>
                        <label>First Name</label>
                        <Input
                          type="text"
                          name="firstname"
                          placeholder={admin?.data.firstname}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.firstname}
                        />
                        {formik.touched.firstname &&
                          formik.errors.firstname && (
                            <div className="text-danger">
                              {formik.errors.firstname}
                            </div>
                          )}
                      </FormGroup>
                    </Col>
                    <Col className="pl-1" md="4">
                      <FormGroup>
                        <label>Last Name</label>
                        <Input
                          type="text"
                          placeholder={admin?.data.lastname}
                          name="lastname"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.lastname}
                        />
                        {formik.touched.lastname && formik.errors.lastname && (
                          <div className="text-danger">
                            {formik.errors.lastname}
                          </div>
                        )}
                      </FormGroup>
                    </Col>
                    <Col className="pl-1" md="4">
                      <FormGroup>
                        <label htmlFor="email">Email address</label>
                        <Input
                          type="email"
                          placeholder={admin?.data.email}
                          name="email"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.email}
                        />
                        {formik.touched.email && formik.errors.email && (
                          <div className="text-danger">
                            {formik.errors.email}
                          </div>
                        )}
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <div className="update ml-auto mr-auto">
                      <Button
                        className="btn-round bg-[#5e0001]"
                        color="primary"
                        type="submit"
                        disabled={formik.isSubmitting}>
                        {formik.isSubmitting ? "Updating..." : "Update Profile"}
                      </Button>
                    </div>
                  </Row>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default User;
