import React, { useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button } from "@mui/material";
import { useAuthGlobalContext } from "context/authContext";
import { useNavigate } from "react-router-dom";

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const initialValues = {
  email: "",
  password: "",
};

const Login = () => {
  const { loginAdmin, loading } = useAuthGlobalContext();
  const admin = localStorage.getItem("Admin");
  const Navigate = useNavigate();

  useEffect(() => {
    if (admin) {
      Navigate("/admin/dashboard");
    }
  }, []);

  const handleSubmit = (values, { setSubmitting }) => {
    loginAdmin(values);
  };

  return (
    <div className="min-h-screen bg-[#f7f7f7] flex items-center justify-center">
      <div className="w-full max-w-md p-4 bg-white rounded shadow-md">
        <div className="w-full">
          <div style={{ display: "grid", placeItems: "center" }}>
            <img
              src={require("../assets/img/logo.png")}
              alt="Company Logo"
              className="w-[30%]"
            />
            <h1 className="text-2xl mt-3 font-bold">HUST ADMIN</h1>
          </div>
          {/* Add your company logo and name here */}
        </div>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}>
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              <div>
                <label className="block text-gray-700">Email</label>
                <Field
                  type="text"
                  name="email"
                  className="w-full p-2 border rounded"
                  placeholder="Email"
                />
                <ErrorMessage
                  name="email"
                  component="p"
                  className="text-red-500"
                />
              </div>
              <div>
                <label className="block text-gray-700">Password</label>
                <Field
                  type="password"
                  name="password"
                  className="w-full p-2 border rounded"
                  placeholder="Password"
                />
                <ErrorMessage
                  name="password"
                  component="p"
                  className="text-red-500"
                />
              </div>
              <div>
                {loading ? (
                  <Button
                    variant="contained"
                    size="large"
                    disabled={loading}
                    disableElevation
                    sx={{
                      bgcolor: "#5e0001",
                      width: "100%",
                      color: "#fff",
                      "&:hover": {
                        bgcolor: "#e3caca",
                        color: "#fff",
                      },
                    }}>
                    Please wait...
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    type="submit"
                    size="large"
                    disableElevation
                    sx={{
                      bgcolor: "#5e0001",
                      width: "100%",
                      color: "#fff",
                      "&:hover": {
                        bgcolor: "#e3caca",
                        color: "#fff",
                      },
                    }}>
                    Login
                  </Button>
                )}
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Login;
