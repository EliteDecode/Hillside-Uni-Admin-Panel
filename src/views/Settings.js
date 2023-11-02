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

function Settings() {
  const { admin, changePassword } = useAuthGlobalContext();

  const handleSubmit = async (values) => {
    changePassword(values, admin?.data.id);
  };

  const formik = useFormik({
    initialValues: {
      oldPassword: "",
      newPassword: "",
      newPassword2: "",
    },
    validationSchema: Yup.object({
      oldPassword: Yup.string().required("Old Password is Required"),
      newPassword: Yup.string().required("New Password is Required"),
      newPassword2: Yup.string()
        .required("Confirm New Password")
        .test("passwords-match", "Passwords must match", function (value) {
          return value === this.parent.newPassword;
        }),
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
                        <label>Old Password</label>
                        <Input
                          type="password"
                          name="oldPassword"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.oldPassword}
                        />
                        {formik.touched.oldPassword &&
                          formik.errors.oldPassword && (
                            <div className="text-danger">
                              {formik.errors.oldPassword}
                            </div>
                          )}
                      </FormGroup>
                    </Col>
                    <Col className="pl-1" md="4">
                      <FormGroup>
                        <label>New Password</label>
                        <Input
                          type="password"
                          name="newPassword"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.newPassword}
                        />
                        {formik.touched.newPassword &&
                          formik.errors.newPassword && (
                            <div className="text-danger">
                              {formik.errors.newPassword}
                            </div>
                          )}
                      </FormGroup>
                    </Col>
                    <Col className="pl-1" md="4">
                      <FormGroup>
                        <label htmlFor="newPassword2">Confirm Password</label>
                        <Input
                          type="password"
                          name="newPassword2"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.newPassword2}
                        />
                        {formik.touched.newPassword2 &&
                          formik.errors.newPassword2 && (
                            <div className="text-danger">
                              {formik.errors.newPassword2}
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

export default Settings;
