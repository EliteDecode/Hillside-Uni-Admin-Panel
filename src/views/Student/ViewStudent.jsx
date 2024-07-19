import React, { useEffect, useRef, useState } from "react";
import "../../assets/css/student.css";
import Header from "../../components/Header";
import SendIcon from "@mui/icons-material/Send";
import { Card, CardBody, Row, Col } from "reactstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Box, Button, Grid, Typography } from "@mui/material";
import { usePDF } from "react-to-pdf";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useStudentGlobalContext } from "context/studentContext";
import axios from "axios";
import DeclineIdCardModal from "components/Modals/DeclineIdCardModal";
import { Email, Phone } from "@mui/icons-material";
import qrcode_default from "../../assets/img/qrcode.png";
import { API_URL } from "context/api";

function ViewStudent() {
  const {
    getSingleStudent,
    singleStudent,
    loading,
    updateStudent,
    student,
    getStudent,
    declineStudentid,
  } = useStudentGlobalContext();
  const [message, setMessage] = useState();
  const [loader, setLoader] = useState(false);
  const [openDeclineModal, setOpenDeclineModal] = React.useState(false);
  const handleOpenDeclineModal = () => setOpenDeclineModal(true);
  const handleCloseDeclineModal = () => setOpenDeclineModal(false);

  const studentApproved = student?.filter(
    (singleStudent) => singleStudent.Approved == 1
  );

  const [loadingOes, setLoadingOes] = useState(false);

  const { studentId } = useParams();

  const qrCode = `https://online.hust.edu.ng/OESWebApp/images/code/${singleStudent?.qrcode}`;
  const img = `${API_URL}/uploads/idProfile/${singleStudent?.profilePicture}`;

  const pdfRef = useRef();

  const { toPDF, targetRef } = usePDF({
    filename: `Student_${singleStudent?.firstname}_${singleStudent?.lastname}.pdf`,
  });

  const IdCardDetails = [
    {
      title: "Firstname",
      value: singleStudent?.firstname,
    },
    {
      title: "Lastname",
      value: singleStudent?.lastname,
    },
    {
      title: "Blood Group",
      value: singleStudent?.bloodGroup,
    },
    {
      title: "Username",
      value: singleStudent?.username,
    },
    {
      title: "Matric Number",
      value: singleStudent?.matricNumber,
    },
    {
      title: "Email",
      value: singleStudent?.email,
    },
    {
      title: "Date of Birth",
      value: new Date(singleStudent?.year).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    },
    {
      title: "Sex",
      value: singleStudent?.sex,
    },
    {
      title: "College",
      value: singleStudent?.college,
    },
    {
      title: "Department",
      value: singleStudent?.department,
    },
    {
      title: "Program or Discipline",
      value: singleStudent?.programs,
    },
    {
      title: "Date of ID Application",
      value: new Date(singleStudent?.dateReg).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    },
    {
      title: "ID card Status",
      value: (
        <button
          className={` px-4 py-1 rounded-full ${
            singleStudent?.Approved === 1
              ? "bg-green-500 text-white"
              : "bg-red-500 text-white"
          }`}>
          {singleStudent?.Approved === 1 ? "Approved" : "Pending"}
        </button>
      ),
    },
  ];

  const handleApprove = async () => {
    setLoadingOes(true);
    const oesFormData = new FormData();

    oesFormData.append("firstname", singleStudent.firstname);
    oesFormData.append("lastname", singleStudent.lastname);
    oesFormData.append("username", singleStudent.username);
    oesFormData.append("email", singleStudent.email);
    oesFormData.append("schoolacro", "HUST");
    oesFormData.append("description", "HUST schools");
    oesFormData.append("phone", singleStudent.phone);
    oesFormData.append("sex", singleStudent.sex);
    oesFormData.append("rolename", "University-Student");
    oesFormData.append("other", "BSC");
    oesFormData.append("schoolClass", "Level 1");
    oesFormData.append("password", singleStudent.unHashedPassword);
    oesFormData.append("passwordAgain", singleStudent.unHashedPassword);
    oesFormData.append("channel", "OES-HUST2024");
    oesFormData.append("schoolname", "HUST");
    oesFormData.append("studentid", singleStudent?.matricNumber);
    oesFormData.append("passportstudent", singleStudent.profilePicture);

    try {
      if (singleStudent?.qrcode == "") {
        const response = await axios.post(
          "https://online.hust.edu.ng/OESWebApp/addstudenttolms.do",
          oesFormData
        );

        if (response !== null) {
          setLoadingOes(false);
          const data = {
            studentId,
            qrcode: response.data,
          };
          updateStudent(data);
        }
      } else {
        const data = {
          studentId,
          qrcode: singleStudent.qrcode,
        };
        updateStudent(data);
      }
    } catch (error) {
      toast.error(error);
      setLoadingOes(false);
    }
  };

  const handleDecline = () => {
    const data = {
      studentId,
      message,
    };
    handleCloseDeclineModal();
    declineStudentid(data);
  };

  useEffect(() => {
    getSingleStudent(studentId);
    getStudent();
  }, []);

  return (
    <>
      <DeclineIdCardModal
        openDeclineModal={openDeclineModal}
        handleCloseDeclineModal={handleCloseDeclineModal}
        handleDecline={handleDecline}
        setMessage={setMessage}
      />
      <div className="content">
        <Row>
          <Col md="12">
            <Header title="Edit Student" />
            <Card className="demo-icons">
              <CardBody className="all-icons">
                <Grid container>
                  <Grid sm={12} md={12} className="mb-10">
                    <Typography sx={{ opacity: 0.7 }}>
                      {" "}
                      Please Confirm your Student ID Card Information
                    </Typography>
                    <Grid container spacing={2} className="mt-2">
                      {IdCardDetails.map((item) => {
                        return (
                          <Grid item xs={12} md={4}>
                            <Typography
                              sx={{
                                fontSize: "11px",
                                background: "#f2f2f2",
                                padding: "14px 12px",
                                borderRadius: "5px",
                                margin: "0px 0px",
                                "@media (min-width: 0px) and (max-width: 575px)":
                                  {
                                    fontSize: "15px",
                                    padding: "13px 12px",
                                  },
                              }}>
                              {item.title}:{" "}
                              <Typography
                                variant="span"
                                sx={{ fontWeight: "bold" }}>
                                {item.value}
                              </Typography>
                            </Typography>
                          </Grid>
                        );
                      })}

                      {singleStudent?.Approved === 0 &&
                        singleStudent?.idCardStatus === 1 && (
                          <Box className="p-3">
                            <Button
                              onClick={handleApprove}
                              disableElevation
                              variant="contained"
                              disabled={loading || loadingOes}
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
                              {loading || loadingOes
                                ? "Please wait..."
                                : "Approve Student ID"}
                            </Button>

                            <Button
                              onClick={handleOpenDeclineModal}
                              disableElevation
                              disabled={loading || loadingOes}
                              variant="contained"
                              color="primary"
                              sx={{
                                background: "#fff",
                                color: "#5e0001",
                                border: "1px solid #5e0001",
                                "&:hover": {
                                  background: "#5e0001",
                                  color: "#fff",
                                  border: "1px solid #5e0001",
                                },
                              }}>
                              {loading || loadingOes
                                ? "Please wait..."
                                : "Decline Student ID"}
                            </Button>
                          </Box>
                        )}
                    </Grid>
                  </Grid>

                  {singleStudent?.idCardStatus === 1 && (
                    <Grid item xs={12} className=" bg-white">
                      <div
                        id="idpdf"
                        ref={targetRef}
                        className="bg-white h-screen  mb-4">
                        <div className="">
                          <Grid container spacing={4}>
                            <Grid item sm={12} md={12} className="">
                              <div className="flex items-center justify-center relative">
                                <div className="w-[470px] h-[280px] relative border ">
                                  <div className="faintLogo-sku">
                                    <img
                                      src={require("../../assets/img/faintLogo.png")}
                                      alt=""
                                    />
                                  </div>
                                  <div className="front">
                                    <div
                                      className={`header-stu flex items-center h-[10vh] space-x-2`}
                                      style={{
                                        background: singleStudent?.idCardColor,
                                      }}>
                                      <img
                                        src={require("../../assets/img/logo.png")}
                                        alt=""
                                        className="logo-stu "
                                      />

                                      <div className="text-stu">
                                        <h1 className="mt-4">
                                          HILLSIDE UNIVERSITY <br />
                                          <i>OF</i> SCIENCE & TECHNOLOGY <br />
                                          <span className="font-light">
                                            {" "}
                                            Oke-Mesi, Ekiti, Nigeria.
                                          </span>
                                        </h1>
                                      </div>
                                    </div>
                                    <div>
                                      <div className="px-2 py-1 flex mt-1 space-x-4">
                                        <div
                                          className="h-[133px] w-[175px]"
                                          style={{
                                            backgroundColor: "#5e0001", // Background color that you want to remove
                                            mixBlendMode: "multiply", // Multiply blend mode to remove background
                                            border: "2px solid #5e0001", // Border color
                                            display: "inline-block", // Ensures the background color is applied properly
                                          }}>
                                          <img
                                            src={img}
                                            className="h-full w-[175px]"
                                            alt="Profile Picture"
                                          />
                                        </div>
                                        <div className="w-full -mt-2">
                                          <div>
                                            <h1 className="text-[20px] font-semibold text-[#5e0001] mt-1 uppercase">
                                              {singleStudent?.lastname}
                                            </h1>
                                            <h2 className="text-[19px] -mt-8">
                                              {singleStudent?.firstname}
                                              {singleStudent?.middlename &&
                                                `, ${singleStudent?.middlename}`}
                                            </h2>
                                          </div>
                                          <div className="grid -mt-6 grid-cols-2 ">
                                            <div className="mb-1">
                                              <h5 className="text-[12px] text-[#5e0001]">
                                                Matric No
                                              </h5>
                                              <h6 className="font-semibold text-[11px] -mt-4">
                                                {singleStudent?.matricNumber}
                                              </h6>
                                            </div>
                                            <div className="mb-1">
                                              <h5 className="text-[12px] text-[#5e0001]">
                                                DOB
                                              </h5>
                                              <h6 className="font-semibold text-[11px] -mt-4">
                                                {new Date(
                                                  singleStudent?.dob
                                                ).toLocaleDateString("en-us", {
                                                  month: "short",
                                                  day: "2-digit",
                                                })}
                                              </h6>
                                            </div>
                                            <div className=" mb-1">
                                              <h5 className="text-[12px] text-[#5e0001]">
                                                Sex
                                              </h5>
                                              <h6 className="font-semibold text-[11px] -mt-4">
                                                {singleStudent?.sex}
                                              </h6>
                                            </div>
                                            <div className=" mb-1">
                                              <h5 className="text-[12px] text-[#5e0001]">
                                                Blood Group
                                              </h5>
                                              <h6 className="font-semibold text-[11px] -mt-4">
                                                {singleStudent?.bloodGroup}
                                              </h6>
                                            </div>
                                          </div>
                                          <div className="mb-1 ">
                                            <h5 className="text-[12px] text-[#5e0001]">
                                              College
                                            </h5>
                                            <h6 className="font-semibold text-[11px] -mt-4">
                                              {singleStudent?.college}
                                            </h6>
                                          </div>
                                          <div>
                                            <h5 className="text-[12px] text-[#5e0001]">
                                              Department
                                            </h5>
                                            <h6 className="font-semibold text-[11px] -mt-4">
                                              {singleStudent?.department}
                                            </h6>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <img
                                    src={require("../../assets/img/leaf2.png")}
                                    alt=""
                                    className="absolute bottom-0 left-0 "
                                  />
                                  <div
                                    className="absolute flex flex-col items-center justify-center px-3 py-2 border top-[77px] right-0"
                                    style={{
                                      background: singleStudent?.idCardColor,
                                    }}>
                                    <span className="-mt-1 text-white text-[13px] font-semibold">
                                      S
                                    </span>
                                    <span className="-mt-1 text-white text-[13px] font-semibold">
                                      T
                                    </span>
                                    <span className="-mt-1 text-white text-[13px] font-semibold">
                                      U
                                    </span>
                                    <span className="-mt-1 text-white text-[13px] font-semibold">
                                      D
                                    </span>
                                    <span className="-mt-1 text-white text-[13px] font-semibold">
                                      E
                                    </span>
                                    <span className="-mt-1 text-white text-[13px] font-semibold">
                                      N
                                    </span>
                                    <span className="-mt-1 text-white text-[13px] font-semibold">
                                      T
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </Grid>
                            {/* Back of card */}
                            <Grid item sm={12} md={12} className="bg-white ">
                              <div className="flex items-center flex-wrap justify-center relative">
                                <div className="h-[280px] w-[470px] relative border p-3">
                                  {/* Header */}
                                  <div className="absolute h-[420px] w-[270px] top-[10px] right-0">
                                    <img
                                      src={require("../../assets/img/faintLogo.png")}
                                      alt=""
                                    />
                                  </div>

                                  <div className="flex justify-between">
                                    <div className="w-full">
                                      <div>
                                        <h3 className="text-[12px] font-semibold">
                                          This card is the property of
                                        </h3>
                                        <h3 className="text-[15px] text-[#5e0001] -mt-8 font-bold ">
                                          HILLSIDE UNIVERSITY <br /> OF SCIENCE
                                          & TECHNOLOGY <br />
                                          <span className="font-semibold text-gray-900 text-[15px]">
                                            Oke-Mesi, Ekiti, Nigeria.
                                          </span>
                                        </h3>
                                        <h3 className="text-[10px] opacity-90 -mt-5 font-semibold">
                                          If found, please return to the above
                                          institution.
                                        </h3>
                                        <h3 className="text-[10px] opacity-90 -mt-6 font-semibold ">
                                          Visit us at www.hust.edu.ng or call
                                          (+)234-814-064-1124
                                        </h3>
                                      </div>
                                      <div className="">
                                        <h3 className="text-[12px] -mt-4 font-bold ">
                                          Disruptive Innovation Capacity
                                          Building in:
                                        </h3>

                                        <p className="font-semibold text-[11px] -mt-5">
                                          <span className="font-black text-black">
                                            S
                                          </span>
                                          ciences/Security
                                        </p>
                                        <p className="font-semibold text-[11px]">
                                          <span className="text-[#b75927] font-black">
                                            T
                                          </span>
                                          echnology/Engineering
                                        </p>
                                        <p className="font-semibold text-[11px]">
                                          <span className="font-black text-[#4172b4]">
                                            E
                                          </span>
                                          ducation/Environment
                                        </p>
                                        <p className="font-semibold text-[11px]">
                                          <span className="font-black text-[#577e39]">
                                            A
                                          </span>
                                          gribusiness/Vocational
                                        </p>
                                        <p className="font-semibold text-[11px]">
                                          <span className="font-black text-[#91a7d6]">
                                            M
                                          </span>
                                          edicine/Management
                                        </p>
                                      </div>
                                    </div>
                                    <div className="w-[30%] relative">
                                      <div className="flex justify-between items-center mt-2">
                                        <div></div>
                                        <div
                                          className="border p-2 rounded-md"
                                          style={{
                                            background:
                                              singleStudent?.idCardColor,
                                          }}>
                                          <img
                                            src={
                                              singleStudent?.qrcode
                                                ? qrCode
                                                : qrcode_default
                                            }
                                            alt=""
                                            className="w-[100%]"
                                          />
                                        </div>
                                      </div>

                                      <div className="absolute bottom-0 ">
                                        <div className="flex items-center justify-center flex-col">
                                          <img
                                            src={require("../../assets/img/vc_sign.png")}
                                            className="w-[55%] mt-2"
                                            alt=""
                                          />
                                          <h5 className="text-[15px] text-[#5e0001] font-semibold ">
                                            Registrar
                                          </h5>
                                        </div>
                                        <div className="flex items-center -ml-6 space-x-1">
                                          <Email
                                            fontSize="13px"
                                            style={{ fontSize: "12px" }}
                                          />
                                          <span className="text-[10px]">
                                            Registrar@hust.edu.ng
                                          </span>
                                        </div>
                                        <div className="flex items-center -ml-6 space-x-1">
                                          <Phone
                                            fontSize="13px"
                                            style={{ fontSize: "12px" }}
                                          />
                                          <span className="text-[10px]">
                                            09019202993
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </Grid>
                          </Grid>
                        </div>
                      </div>
                    </Grid>
                  )}
                </Grid>
                {singleStudent?.Approved == 1 && (
                  <Box className="">
                    <button
                      className="py-2 m-3 px-6 bg-[#5e0001] text-white rounded-md"
                      disabled={loader}
                      onClick={() => {
                        toPDF();
                      }}>
                      {loader ? "Please wait..." : "Download ID Card"}
                    </button>
                  </Box>
                )}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
      <ToastContainer />
    </>
  );
}

export default ViewStudent;
