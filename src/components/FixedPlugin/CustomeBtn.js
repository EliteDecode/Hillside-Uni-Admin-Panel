import { Button } from "@mui/material";
import React from "react";

const CustomeBtn = ({ value, icon }) => {
  return (
    <Button
      variant="contained"
      disableElevation
      sx={{
        bgcolor: "#e3caca",
        color: "#5e0001",
        "&:hover": {
          bgcolor: "#5e0001",
          color: "#fff",
        },
      }}
      endIcon={icon}>
      {value}
    </Button>
  );
};

export default CustomeBtn;
