import React from "react";
import { Card, CardHeader, CardTitle } from "reactstrap";

const index = ({ title }) => {
  return (
    <Card className="demo-icons">
      <CardHeader className="mb-3">
        <CardTitle tag="h5">
          Hillside University of Science and Technology
        </CardTitle>
        <p className="card-category">{title}</p>
      </CardHeader>
    </Card>
  );
};

export default index;
