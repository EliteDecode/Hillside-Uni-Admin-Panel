import { Box } from "@mui/material";
import React from "react";
import img from "../../assets/img/notfound.svg";

const index = () => {
  return (
    <Box
      style={{ display: "Grid", placeItems: "center" }}
      className="p-5 h-min-screen">
      <img src={img} alt="not found" width="30%" />
      <h1 className="mt-3 text-[20px]">No Data Found</h1>
    </Box>
  );
};

export default index;
