import { Button, Skeleton } from "@mui/material";
import SkeletalCard from "components/FixedPlugin/SkeletalCard";
import { useAuthGlobalContext } from "context/authContext";
import { useCalenderGlobalContext } from "context/calenderContext";
import { useEventGlobalContext } from "context/eventsContext";
import { useNewsGlobalContext } from "context/newsContext";
import React, { useEffect } from "react";
// react plugin used to create charts
import { Line, Pie } from "react-chartjs-2";
import { Link, useNavigate } from "react-router-dom";
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Row,
  Col,
  Table,
} from "reactstrap";

function Dashboard() {
  const { getEvents, events } = useEventGlobalContext();
  const { news, getNews } = useNewsGlobalContext();
  const { calenderYear, loading, getCalenderByYear } =
    useCalenderGlobalContext();

  const { admin, changePassword } = useAuthGlobalContext();

  const navigate = useNavigate();

  useEffect(() => {
    if (admin?.data?.email == "hr@admin.com") {
      navigate("/admin/staff");
    }
  }, []);

  const numRows = 3;
  const loadingRows = Array.from({ length: numRows }, (_, index) => (
    <tr key={index}>
      <td>
        <Skeleton animation="wave" />
      </td>
      <td>
        <Skeleton animation="wave" />
      </td>
      <td>
        <Skeleton animation="wave" />
      </td>
      <td>
        <Skeleton animation="wave" />
      </td>
      <td>
        <Skeleton animation="wave" />
      </td>
    </tr>
  ));

  function getCurrentYear() {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    return currentYear.toString();
  }

  useEffect(() => {
    getEvents();
    getNews();
    getCalenderByYear(getCurrentYear());
  }, []);

  console.log(calenderYear);
  return (
    <>
      <div className="content">
        <Row>
          <Col lg="3" md="6" sm="6">
            {loading ? (
              <SkeletalCard />
            ) : (
              <Card className="card-stats">
                <CardBody>
                  <Row>
                    <Col md="4" xs="5">
                      <div className="icon-big text-center icon-warning">
                        <i className="nc-icon nc-paper text-warning" />
                      </div>
                    </Col>
                    <Col md="8" xs="7">
                      <div className="numbers">
                        <p className="card-category">Upcoming Events</p>
                        <CardTitle tag="p">{events?.length}</CardTitle>
                        <p />
                      </div>
                    </Col>
                  </Row>
                </CardBody>
                <CardFooter>
                  <hr />
                  <Link to="/admin/events">
                    <div className="stats">
                      <i className="fas fa-eye" /> View all events
                    </div>
                  </Link>
                </CardFooter>
              </Card>
            )}
          </Col>
          <Col lg="3" md="6" sm="6">
            {loading ? (
              <SkeletalCard />
            ) : (
              <Card className="card-stats">
                <CardBody>
                  <Row>
                    <Col md="4" xs="5">
                      <div className="icon-big text-center icon-warning">
                        <i className="fa fa-newspaper text-success" />
                      </div>
                    </Col>
                    <Col md="8" xs="7">
                      <div className="numbers">
                        <p className="card-category">News</p>
                        <CardTitle tag="p">{news?.length}</CardTitle>
                        <p />
                      </div>
                    </Col>
                  </Row>
                </CardBody>
                <CardFooter>
                  <hr />
                  <Link to="/admin/news">
                    <div className="stats">
                      <i className="far fa-calendar" /> View all news
                    </div>
                  </Link>
                </CardFooter>
              </Card>
            )}
          </Col>
          <Col lg="3" md="6" sm="6">
            {loading ? (
              <SkeletalCard />
            ) : (
              <Card className="card-stats">
                <CardBody>
                  <Row>
                    <Col md="4" xs="5">
                      <div className="icon-big text-center icon-warning">
                        <i class="fa fa-calendar text-danger"></i>
                      </div>
                    </Col>
                    <Col md="8" xs="7">
                      <div className="numbers">
                        <p className="card-category">Academic Calender</p>
                        <CardTitle tag="p">{getCurrentYear()}</CardTitle>
                        <p />
                      </div>
                    </Col>
                  </Row>
                </CardBody>
                <CardFooter>
                  <hr />
                  <Link to={`/admin/calender/${getCurrentYear()}`}>
                    <div className="stats">
                      <i className="far fa-clock" /> View academic calendar
                    </div>
                  </Link>
                </CardFooter>
              </Card>
            )}
          </Col>
          <Col lg="3" md="6" sm="6">
            {loading ? (
              <SkeletalCard />
            ) : (
              <Card className="card-stats">
                <CardBody>
                  <Row>
                    <Col md="4" xs="5">
                      <div className="icon-big text-center icon-warning">
                        <i class="fa fa-graduation-cap text-primary"></i>
                      </div>
                    </Col>
                    <Col md="8" xs="7">
                      <div className="numbers">
                        <p className="card-category">Academics/Colleges</p>
                        <CardTitle tag="p">3</CardTitle>
                        <p />
                      </div>
                    </Col>
                  </Row>
                </CardBody>
                <CardFooter>
                  <hr />
                  <div className="stats">
                    <i className="fas fa-graduation-cap" /> View Academics
                  </div>
                </CardFooter>
              </Card>
            )}
          </Col>
        </Row>

        <Row>
          <Col md="5">
            <Card>
              <CardHeader>
                <CardTitle tag="h5">Academic Calender</CardTitle>
                <p className="card-category">
                  Hillside University {getCurrentYear()} Academic Calender
                </p>
              </CardHeader>
              <CardBody style={{ height: "266px" }}>
                <Table striped>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Title</th>
                      <th>Start Date</th>
                      <th>End Date</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      loadingRows
                    ) : (
                      <>
                        {calenderYear?.slice(0, 4).map((item, index) => (
                          <tr key={index}>
                            <th scope="row">{index + 1}</th>
                            <td>{item.title}</td>
                            <td>{item.startDate}</td>
                            <td>{item.endDate}</td>
                            <td>
                              {new Date(item.endDate) > new Date() &&
                              new Date(item.startDate) > new Date() ? (
                                <Button
                                  size="small"
                                  variant="contained"
                                  disableElevation
                                  sx={{
                                    bgcolor: "#e0dcc5",
                                    fontSize: "11px",
                                    color: "#382f04",
                                    borderRadius: "15px",
                                    "&:hover": {
                                      bgcolor: "#382f04",
                                      color: "#fff",
                                    },
                                  }}>
                                  Upcoming
                                </Button>
                              ) : new Date(item.endDate) > new Date() &&
                                new Date(item.startDate) < new Date() ? (
                                <Button
                                  size="small"
                                  variant="contained"
                                  disableElevation
                                  sx={{
                                    bgcolor: "#e0dcc5",
                                    fontSize: "11px",
                                    color: "#382f04",
                                    borderRadius: "15px",
                                    "&:hover": {
                                      bgcolor: "#382f04",
                                      color: "#fff",
                                    },
                                  }}>
                                  Active
                                </Button>
                              ) : (
                                <Button
                                  size="small"
                                  variant="contained"
                                  disableElevation
                                  sx={{
                                    bgcolor: "#f28e8a",
                                    fontSize: "11px",
                                    color: "#470b09",
                                    borderRadius: "15px",
                                    "&:hover": {
                                      bgcolor: "#470b09",
                                      color: "#fff",
                                    },
                                  }}>
                                  Past
                                </Button>
                              )}
                            </td>
                          </tr>
                        ))}
                      </>
                    )}
                  </tbody>
                </Table>
              </CardBody>
              <CardFooter>
                <div className="legend py-2">
                  <i className="fa fa-circle text-[#f28e8a]" /> Completed{" "}
                  <i className="fa fa-circle text-warning mx-2" /> Upcoming{" "}
                </div>
                <hr />
              </CardFooter>
            </Card>
          </Col>
          <Col md="7">
            <Card className="card-chart">
              <CardHeader>
                <CardTitle tag="h5"> EVENTS</CardTitle>
                <p className="card-category">Hillside University Events</p>
              </CardHeader>
              <CardBody>
                <Table striped>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Title</th>
                      <th>Description</th>
                      <th>Date</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      loadingRows
                    ) : (
                      <>
                        {events?.map((event, index) => (
                          <tr key={index}>
                            <th scope="row">{index + 1}</th>
                            <td>{event.title}</td>
                            <td>
                              {event.description.length > 50
                                ? `${event.description.substring(0, 50)} ...`
                                : event.description}
                            </td>
                            <td>
                              {" "}
                              {new Date(event.eventsDate).toLocaleString(
                                undefined,
                                {
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",

                                  hour12: true,
                                }
                              )}
                            </td>
                            <td>
                              {new Date(event.eventsDate) > new Date() ? (
                                <Button
                                  size="small"
                                  variant="contained"
                                  disableElevation
                                  sx={{
                                    bgcolor: "#e0dcc5",
                                    fontSize: "11px",
                                    color: "#382f04",
                                    borderRadius: "15px",
                                    "&:hover": {
                                      bgcolor: "#382f04",
                                      color: "#fff",
                                    },
                                  }}>
                                  Upcoming
                                </Button>
                              ) : (
                                <Button
                                  size="small"
                                  variant="contained"
                                  disableElevation
                                  sx={{
                                    bgcolor: "#f28e8a",
                                    fontSize: "11px",
                                    color: "#470b09",
                                    borderRadius: "15px",
                                    "&:hover": {
                                      bgcolor: "#470b09",
                                      color: "#fff",
                                    },
                                  }}>
                                  Past
                                </Button>
                              )}
                            </td>
                          </tr>
                        ))}
                      </>
                    )}
                  </tbody>
                </Table>
              </CardBody>
              <CardFooter>
                <div className="chart-legend py-2">
                  <i className="fa fa-circle text-info mx-2" /> Upcoming
                  <i className="fa fa-circle text-warning mx-2" /> Completed
                </div>
                <hr />
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Dashboard;
