import React, { useEffect, useRef, useState } from "react";
import Header from "../../components/Header";
import SendIcon from "@mui/icons-material/Send";
import { Card, CardBody, Row, Col } from "reactstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Box, Button, Grid, Typography } from "@mui/material";
import { UploadFile } from "@mui/icons-material";
import { useNewsGlobalContext } from "context/newsContext";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import JsPDF from "jspdf";
import domtoimage from "dom-to-image";
import { useStaffGlobalContext } from "context/staffContext";
import axios from "axios";

function ViewStaff() {
  const { getSingleStaff, singleStaff, loading, updateStaff } =
    useStaffGlobalContext();

  const [loadingOes, setLoadingOes] = useState(false);

  const { staffId } = useParams();

  const qrCode = `https://online.hust.edu.ng/OESWebApp/images/code/${singleStaff?.qrcode}`;
  const img = `${process.env.REACT_APP_API_URL}/uploads/staffProfile/${singleStaff?.profilePicture}`;

  const pdfRef = useRef();
  const downloadPdfDocument = () => {
    const node = pdfRef.current;

    var options = {
      quality: 0.99,
      width: 700,
      height: 700,
    };

    domtoimage.toPng(node, options).then(function (imgData) {
      const pdf = new JsPDF("p", "mm", "a4", true);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      // Create a temporary image element to get its dimensions
      const tempImg = new Image();
      tempImg.src = imgData;
      tempImg.onload = function () {
        const imgWidth = tempImg.width;
        const imgHeight = tempImg.height;

        const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
        const newImgWidth = imgWidth * ratio;
        const newImgHeight = imgHeight * ratio;
        const imgX = (pdfWidth - newImgWidth) / 2;
        const imgY = (pdfHeight - newImgHeight) / 2;

        pdf.addImage(imgData, "JPEG", imgX, imgY, newImgWidth, newImgHeight);
        pdf.save("id.pdf");
      };
    });
  };

  const IdCardDetails = [
    {
      title: "Firstname",
      value: singleStaff?.firstname,
    },
    {
      title: "Lastname",
      value: singleStaff?.lastname,
    },
    {
      title: "Blood Group",
      value: singleStaff?.bloodGroup,
    },
    {
      title: "Username",
      value: singleStaff?.username,
    },
    {
      title: "Staff Id",
      value: singleStaff?.staffId,
    },
    {
      title: "Email",
      value: singleStaff?.email,
    },
    {
      title: "Resumption Date",
      value: new Date(singleStaff?.year).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    },
    {
      title: "Sex",
      value: singleStaff?.sex,
    },
    {
      title: "Phone Number",
      value: singleStaff?.phone,
    },
    {
      title: "Role",
      value: singleStaff?.rolename,
    },
    {
      title: "Current position",
      value: singleStaff?.currentPosition,
    },
    {
      title: "Program or Discipline",
      value: singleStaff?.programs,
    },
    {
      title: "Date of ID Application",
      value: new Date(singleStaff?.dateReg).toLocaleDateString("en-US", {
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
            singleStaff?.Approved === 1
              ? "bg-green-500 text-white"
              : "bg-red-500 text-white"
          }`}>
          {singleStaff?.Approved === 1 ? "Approved" : "Pending"}
        </button>
      ),
    },
  ];

  // console.log(
  //   `${process.env.REACT_APP_API_URL}/uploads/staffProfile/${singleStaff?.profilePicture}`
  // );

  const handleApprove = async () => {
    setLoadingOes(true);
    const oesFormData = new FormData();

    oesFormData.append("firstname", singleStaff.firstname);
    oesFormData.append("lastname", singleStaff.lastname);
    oesFormData.append("username", singleStaff.username);
    oesFormData.append("email", singleStaff.email);
    oesFormData.append("schoolacro", "HUST");
    oesFormData.append("description", "HUST schools");
    oesFormData.append("phone", singleStaff.phonenumber);
    oesFormData.append("sex", singleStaff.sex);
    oesFormData.append("rolename", singleStaff.rolename);
    oesFormData.append("other", "BSC");
    oesFormData.append("schoolClass", "Level 1");
    oesFormData.append("password", singleStaff.unHashedPassword);
    oesFormData.append("passwordAgain", singleStaff.unHashedPassword);
    oesFormData.append("channel", "OES-HUST2024");
    oesFormData.append("schoolname", "HUST");
    // oesFormData.append("passport", singleStaff.profilePicture);

    try {
      if (singleStaff?.qrcode == "") {
        const response = await axios.post(
          "https://online.hust.edu.ng/OESWebApp/addstafftolms.do",
          oesFormData
        );

        if (response) {
          setLoadingOes(false);
          const data = {
            staffId,
            year: singleStaff.year,
            sex: singleStaff.sex,
            qrcode: response.data,
          };
          updateStaff(data);
        }
      } else {
        const data = {
          staffId,
          year: singleStaff.year,
          sex: singleStaff.sex,
          qrcode: singleStaff.qrcode,
        };
        updateStaff(data);
      }
    } catch (error) {
      toast.error(error);
      setLoadingOes(false);
    }
  };

  useEffect(() => {
    getSingleStaff(staffId);
  }, []);

  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Header title="Edit Staff" />
            <Card className="demo-icons">
              <CardBody className="all-icons">
                <Grid container>
                  <Grid sm={12} md={5} className="mb-10">
                    <Typography sx={{ opacity: 0.7 }}>
                      {" "}
                      Please Confirm your Staff ID Card Information
                    </Typography>
                    <Grid container spacing={2} className="mt-2">
                      {IdCardDetails.map((item) => {
                        return (
                          <Grid item xs={12} md={6}>
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

                      {singleStaff?.Approved === 0 && (
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
                              : "Approve Staff ID"}
                          </Button>
                        </Box>
                      )}
                    </Grid>
                  </Grid>
                  <Grid
                    item
                    sm={12}
                    md={7}
                    className="px-4 sm:border-l-2  border-none">
                    <Grid container>
                      <Grid item sm={12} md={12} className=""></Grid>
                      <Grid item sm={12} md={12} className="bg-white">
                        <div id="idpdf" ref={pdfRef} className="bg-white  mb-4">
                          <div className=" space-x-4">
                            <Grid container spacing={2}>
                              <Grid item sm={12} md={6} className="bg-white">
                                <div className="idcard border">
                                  <div className="faintLogo">
                                    <img
                                      src={require("../../assets/img/faintLogo.png")}
                                      alt=""
                                    />
                                  </div>
                                  <div className="front">
                                    <div className="header">
                                      <div className="logo">
                                        <img
                                          src={require("../../assets/img/logo.png")}
                                          alt=""
                                        />
                                      </div>
                                      <div className="text">
                                        <h1>
                                          HILLSIDE UNIVERSITY OF SCIENCE &
                                          TECHNOLOGY
                                        </h1>
                                        <h6>Oke-Mesi, Ekiti, Nigeria.</h6>
                                      </div>
                                    </div>
                                    <div className="middle">
                                      <div className="img">
                                        <img src={img} alt="" />
                                      </div>
                                      <div className="staff">
                                        <p>STAFF</p>
                                      </div>
                                    </div>
                                    <div className="details">
                                      <div className="right-details">
                                        <div className="row-names">
                                          <div className="names surname">
                                            <h5>SURNAME</h5>
                                            <h6>{singleStaff?.lastname}</h6>
                                          </div>
                                          <div className="names">
                                            <h5>OTHER NAMES</h5>
                                            <h6>{singleStaff?.firstname}</h6>
                                          </div>
                                        </div>
                                        <div className="namess">
                                          <h5>ID NUMBER</h5>
                                          <h6>{singleStaff?.staffId}</h6>
                                        </div>
                                        <div className="namess">
                                          <h5>ISSUED DATE</h5>
                                          <h6> {singleStaff?.createdAt}</h6>
                                        </div>
                                        <div className="namess">
                                          <h5>BLOOD GROUP</h5>
                                          <h6> {singleStaff?.bloodGroup}</h6>
                                        </div>
                                        <div className="sign">
                                          <h6>.......................</h6>
                                          <h5>Staff Signature</h5>
                                        </div>
                                      </div>
                                      <div className="left-details">
                                        <span className="rotate">
                                          {singleStaff?.currentPosition.toUpperCase()}
                                        </span>
                                        <img
                                          src={require("../../assets/img/leaf.png")}
                                          alt=""
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </Grid>
                              {/* Back of card */}
                              <Grid item sm={12} md={6} className="bg-white">
                                <div className="flex items-center justify-center relative">
                                  <div className="h-[470px] w-[280px] border p-3">
                                    {/* Header */}
                                    <div className="absolute h-[450px] w-[270px] top-[100px]">
                                      <img
                                        src={require("../../assets/img/faintLogo.png")}
                                        alt=""
                                      />
                                    </div>

                                    <div>
                                      <h3 className="text-[12px] font-semibold">
                                        This card is the property of
                                      </h3>
                                      <h3 className="text-[15px] text-[#5e0001] font-bold -mt-7">
                                        HILLSIDE UNIVERSITY <br /> OF SCIENCE &
                                        TECHNOLOGY <br />
                                        <span className="font-semibold text-gray-900 text-[15px]">
                                          Oke-Mesi, Ekiti, Nigeria.
                                        </span>
                                      </h3>
                                      <h3 className="text-[12px] -mt-7 font-semibold">
                                        If found, please return to the above
                                        institution.
                                      </h3>
                                      <h3 className="text-[12px] font-semibold -mt-5">
                                        Visit us at www.hust.edu.ng
                                      </h3>
                                    </div>
                                    <div className="">
                                      <h3 className="text-[13px] font-semibold">
                                        Disruptive Innovation Capacity Building
                                        in:
                                      </h3>

                                      <p className="font-semibold text-[13px] -mt-4">
                                        <span className="font-black text-black">
                                          S
                                        </span>
                                        ciences/Security
                                      </p>
                                      <p className="font-semibold text-[13px] ">
                                        <span className="text-[#5e0001] font-black">
                                          T
                                        </span>
                                        echnology/Engineering
                                      </p>
                                      <p className="font-semibold text-[13px] ">
                                        <span className="font-black text-[#75a2d6]">
                                          E
                                        </span>
                                        ducation/Environment
                                      </p>
                                      <p className="font-semibold text-[13px] ">
                                        <span className="font-black text-[#677e56]">
                                          A
                                        </span>
                                        gribusiness/Vocational
                                      </p>
                                      <p className="font-semibold text-[13px] ">
                                        <span className="font-black text-[#c1203b]">
                                          M
                                        </span>
                                        edicine/Management
                                      </p>
                                    </div>

                                    <div className="flex justify-between items-center w-[100%] mt-2">
                                      <div></div>
                                      <div className="border p-2 bg-[#5e0001] w-[38%] rounded-md">
                                        <img
                                          src={qrCode}
                                          alt=""
                                          className="w-[100%]"
                                        />
                                      </div>
                                    </div>

                                    <div className="sign2">
                                      <h6>.......................</h6>
                                      <h5>President/Vice-Chancellor</h5>
                                    </div>
                                  </div>
                                </div>
                              </Grid>
                            </Grid>
                          </div>
                        </div>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
      <ToastContainer />
    </>
  );
}

export default ViewStaff;
