import { Box } from "@mui/material";
import React from "react";
import { Audio, Hourglass } from "react-loader-spinner";

const index = () => {
  return (
    <Box
      style={{ display: "Grid", placeItems: "center" }}
      className="p-5 h-min-screen">
      <Hourglass
        visible={true}
        height="40"
        width="40"
        ariaLabel="hourglass-loading"
        wrapperStyle={{}}
        wrapperClass=""
        colors={["#5e0001", "#72a1ed"]}
      />
    </Box>
  );
};

export default index;
