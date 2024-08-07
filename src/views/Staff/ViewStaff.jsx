import React, { useEffect, useRef, useState } from "react";
import "../../assets/css/staff.css";
import Header from "../../components/Header";
import SendIcon from "@mui/icons-material/Send";
import { Card, CardBody, Row, Col } from "reactstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Box, Button, Grid, Typography } from "@mui/material";
import { usePDF } from "react-to-pdf";

import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import JsPDF from "jspdf";
import domtoimage from "dom-to-image";
import { useStaffGlobalContext } from "context/staffContext";
import axios from "axios";
import DeclineIdCardModal from "components/Modals/DeclineIdCardModal";
import { API_URL } from "context/api";

function ViewStaff() {
  const {
    getSingleStaff,
    singleStaff,
    loading,
    updateStaff,
    staff,
    getStaff,
    declineStaffid,
  } = useStaffGlobalContext();
  const [message, setMessage] = useState();
  const [loader, setLoader] = useState(false);
  const [openDeclineModal, setOpenDeclineModal] = React.useState(false);
  const handleOpenDeclineModal = () => setOpenDeclineModal(true);
  const handleCloseDeclineModal = () => setOpenDeclineModal(false);

  const staffApproved = staff?.filter(
    (singleStaff) => singleStaff.Approved == 1
  );

  const [loadingOes, setLoadingOes] = useState(false);

  const { staffId } = useParams();

  const qrCode = `https://online.hust.edu.ng/OESWebApp/images/code/${singleStaff?.qrcode}`;
  const img = `${API_URL}/uploads/idProfile/${singleStaff?.profilePicture}`;

  const pdfRef = useRef();
  const downloadPdfDocument = () => {
    const node = pdfRef.current;
    setLoader(true);
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
        setLoader(false);
      };
    });
  };

  const { toPDF, targetRef } = usePDF({
    filename: `Staff_${singleStaff?.firstname}_${singleStaff?.lastname}.pdf`,
  });

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

  console.log(singleStaff);

  let currentCounter = 1; // Initial counter value

  function generateCode(year, sex) {
    let staffCount = staffApproved?.length + 1;
    let counterStr = String(staffCount).padStart(3, "0"); // Updated to include currentCounter
    let sexInitial = sex?.charAt(0).toUpperCase();
    let yearStr = String(year).split("-")[0]; // Extracting the last two digits of the year

    let codeNumber = `HUST/${yearStr}/${sexInitial}${counterStr}`; // Updated code format to include year as 'yy'
    currentCounter++;

    return codeNumber;
  }

  const handleApprove = async () => {
    setLoadingOes(true);
    const oesFormData = new FormData();

    oesFormData.append("firstname", singleStaff.firstname);
    oesFormData.append("lastname", singleStaff.lastname);
    oesFormData.append("username", singleStaff.username);
    oesFormData.append("email", singleStaff.email);
    oesFormData.append("schoolacro", "HUST");
    oesFormData.append("description", "HUST schools");
    oesFormData.append("phone", singleStaff.phone);
    oesFormData.append("sex", singleStaff.sex);
    oesFormData.append("rolename", singleStaff.rolename);
    oesFormData.append("other", "BSC");
    oesFormData.append("schoolClass", "Level 1");
    oesFormData.append("password", singleStaff.unHashedPassword);
    oesFormData.append("passwordAgain", singleStaff.unHashedPassword);
    oesFormData.append("channel", "OES-HUST2024");
    oesFormData.append("schoolname", "HUST");
    oesFormData.append(
      "staffid",
      generateCode(singleStaff?.year, singleStaff?.sex)
    );
    oesFormData.append("passportstaff", singleStaff.profilePicture);

    try {
      if (singleStaff?.qrcode == "") {
        console.log("hhh");
        const response = await axios.post(
          "https://online.hust.edu.ng/OESWebApp/addstafftolms.do",
          oesFormData
        );

        if (response !== null) {
          setLoadingOes(false);
          console.log(response);
          const data = {
            staffId,
            year: singleStaff.year,
            sex: singleStaff.sex,
            qrcode: response.data,
            generatedStaffId: generateCode(singleStaff?.year, singleStaff?.sex),
          };
          updateStaff(data);
        }
      } else {
        const data = {
          staffId,
          year: singleStaff.year,
          sex: singleStaff.sex,
          qrcode: singleStaff.qrcode,
          generatedStaffId: generateCode(singleStaff?.year, singleStaff?.sex),
        };
        updateStaff(data);
      }
    } catch (error) {
      toast.error(error);
      setLoadingOes(false);
    }
  };

  const handleDecline = () => {
    const data = {
      staffId,
      message,
    };
    handleCloseDeclineModal();
    declineStaffid(data);
  };

  useEffect(() => {
    getSingleStaff(staffId);
    getStaff();
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
            <Header title="Edit Staff" />
            <Card className="demo-icons">
              <CardBody className="all-icons">
                <Grid container>
                  <Grid sm={12} md={12} className="mb-10">
                    <Typography sx={{ opacity: 0.7 }}>
                      {" "}
                      Please Confirm your Staff ID Card Information
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

                      {singleStaff?.Approved === 0 &&
                        singleStaff?.IdCardStatus === 1 && (
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
                                : "Decline Staff ID"}
                            </Button>
                          </Box>
                        )}

                      {/* <Box className="p-3">
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
                      </Box> */}
                    </Grid>
                  </Grid>

                  {singleStaff?.IdCardStatus === 1 && (
                    <Grid
                      item
                      sm={12}
                      md={12}
                      className="px-4 sm:border-l-2  border-none">
                      <Grid container>
                        <Grid item sm={12} md={12} className="bg-white">
                          <div
                            id="idpdf"
                            ref={targetRef}
                            className="bg-white mb-4">
                            <div className="flex items-center flex-wrap space-y-2 sm:space-x-4 space-x-0">
                              <div className="idcard border">
                                <div className="faintLogo">
                                  <img
                                    src={require("../../assets/img/faintLogo.png")}
                                    alt=""
                                  />
                                </div>
                                <div className="front">
                                  <div className="header">
                                    <div className="logoheader">
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
                                    <div className="staff relative">
                                      <p className=" top-1 absolute">STAFF</p>
                                    </div>
                                  </div>
                                  <div className="details">
                                    <div className="right-details -mt-8">
                                      <div className="namess">
                                        <h5>SURNAME</h5>
                                        <h6>{singleStaff?.lastname}</h6>
                                      </div>
                                      <div className="namess">
                                        <h5>OTHER NAMES</h5>
                                        <h6>{singleStaff?.firstname}</h6>
                                      </div>
                                      <div className="namess ">
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
                                        <img
                                          src={JSON.parse(
                                            singleStaff?.signature
                                          )}
                                          alt=""
                                          className="w-[15%] mt-5"
                                        />
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

                              {/* Back of card */}
                              {/* <div className="flex flex-col items-center justify-center relative">
                                <div className="h-[470px] w-[280px] border p-3">
                                 
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
                                      Visit us at www.hust.edu.ng or call
                                      +234-814-064-1124
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
                                      <span className="text-[#b75927] font-black">
                                        T
                                      </span>
                                      echnology/Engineering
                                    </p>
                                    <p className="font-semibold text-[13px] ">
                                      <span className="font-black text-[#4172b4]">
                                        E
                                      </span>
                                      ducation/Environment
                                    </p>
                                    <p className="font-semibold text-[13px] ">
                                      <span className="font-black text-[#577e39]">
                                        A
                                      </span>
                                      gribusiness/Vocational
                                    </p>
                                    <p className="font-semibold text-[13px] ">
                                      <span className="font-black text-[#91a7d6]">
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
                                    <img
                                      src={require("../../assets/img/vc_sign.png")}
                                      className="w-[40%]"
                                      alt=""
                                    />
                                    <h5>President/Vice-Chancellor</h5>
                                  </div>
                                </div>
                              </div> */}
                            </div>
                          </div>
                        </Grid>
                      </Grid>
                    </Grid>
                  )}
                </Grid>
                {singleStaff?.Approved == 1 && (
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

export default ViewStaff;
