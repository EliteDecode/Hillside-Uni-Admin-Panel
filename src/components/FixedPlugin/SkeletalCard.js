import React from "react";
import { Card, CardBody, CardFooter, Row, Col, CardTitle } from "reactstrap";

import { Skeleton } from "@mui/material";

const SkeletalCard = () => {
  return (
    <Card className="card-stats">
      <CardBody>
        <Row>
          <Col md="4" xs="5">
            <div className="icon-big text-center rounded-lg icon-warning">
              <Skeleton
                variant="circle"
                width={60}
                height={60}
                animation="wave"
              />
            </div>
          </Col>
          <Col md="8" xs="7">
            <div className="numbers">
              <Skeleton width={100} height={20} animation="wave" />
              <CardTitle>
                <Skeleton width={50} height={20} animation="wave" />
              </CardTitle>
              <Skeleton width={50} height={10} animation="wave" />
            </div>
          </Col>
        </Row>
      </CardBody>
      <CardFooter>
        <hr />
        <div className="stats">
          <Skeleton width={150} height={10} animation="wave" />
        </div>
      </CardFooter>
    </Card>
  );
};

export default SkeletalCard;
