
import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";

// reactstrap components
import {
  Button,
  ButtonGroup,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  Label,
  FormGroup,
  Input,
  Table,
  Row,
  Col,
  UncontrolledTooltip,
} from "reactstrap";

// core components
import {
  chartExample1,
  chartExample2,
  chartExample3,
  chartExample4,
} from "variables/charts.js";
import BarChart from "variables/BarChart.js"
import SalariesBarChart from "variables/SalariesBarChart";
import NewJobsChart from "variables/NewJobsChart";
import ITDomainsDoughnutChart from "variables/ITDomainsDoughnutChart";
import LocationsChart from "variables/LocationsChart";
import ExperienceLevelChart from "variables/ExperienceLevelChart";

function Dashboard(props) {
  const [bigChartData, setbigChartData] = React.useState("data1");
  const setBgChartData = (name) => {
    setbigChartData(name);
  };
  return (
    <>
      <div className="content">
        <Row>
          <Col xs="12">
            <Card className="card-chart">
              <CardHeader>
                <Row>
                  <Col className="text-left" sm="6">
                    <h5 className="card-category">IT Jobs</h5>
                    <CardTitle tag="h2"><i className="tim-icons icon-coins text-warning" /> IT Salaries</CardTitle>
                  </Col>
                  <Col sm="6">
                   
                  
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <div className="chart-area">
                  {/* <Line
                    data={chartExample1[bigChartData]}
                    options={chartExample1.options}
                  /> */}
                  <SalariesBarChart/>
                </div>
              </CardBody>
            </Card>
          </Col>
          {/* <Col lg="6">
            <Card className="card-chart">
              <CardHeader>
                <h5 className="card-category">Total Shipments</h5>
                <CardTitle tag="h3">
                  <i className="tim-icons icon-bell-55 text-info" /> 763,215
                </CardTitle>
              </CardHeader>
              <CardBody>
                <div className="chart-area">
                  {/* <Line
                    data={chartExample2.data}
                    options={chartExample2.options}
                  
                  <SalariesBarChart/>
                </div>
              </CardBody>
            </Card>
          </Col> */}
        </Row>
        <Row>
          <Col lg="4">
            <Card className="card-chart">
              <CardHeader>
                <h5 className="card-category">IT Jobs Market Shares</h5>
                <CardTitle tag="h3">
                  <i className="tim-icons icon-single-copy-04 text-info" /> IT Jobs Growth
                </CardTitle>
              </CardHeader>
              <CardBody>
                <div className="chart-area">
                  {/* <Line
                    data={chartExample2.data}
                    options={chartExample2.options}
                  /> */}
                  <NewJobsChart/>
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col lg="4">
            <Card className="card-chart">
              <CardHeader>
                <h5 className="card-category">Most Demanded Technologies</h5>
                <CardTitle tag="h3">
                  <i className="tim-icons icon-minimal-up text-success" />{" "}
                  Trending Technologies
                </CardTitle>
              </CardHeader>
              <CardBody>
                <div className="chart-area">
                  {/* <Bar
                    data={chartExample3.data}
                    options={chartExample3.options}
                  /> */}
                  <BarChart/>
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col lg="4">
            <Card className="card-chart">
              <CardHeader>
                <h5 className="card-category">Experience Levels</h5>
                <CardTitle tag="h3">
                  <i className="tim-icons icon-send text-success" /> IT Jobs Experiences
                </CardTitle>
              </CardHeader>
              <CardBody>
                <div className="chart-area">
                  {/* <Line
                    data={chartExample4.data}
                    options={chartExample4.options}
                  /> */}
                  <ExperienceLevelChart/>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
        <Col lg="6">
            <Card className="card-chart">
              <CardHeader>
                <h5 className="card-category">Most Active IT Domains</h5>
                <CardTitle tag="h3">
                  <i className="tim-icons icon-chart-pie-36 text-success" /> IT Domains Distribution %
                </CardTitle>
              </CardHeader>
              <CardBody>
                <div className="chart-area" style={{ height: '500px', width: '100%' }}>
                  <ITDomainsDoughnutChart/>
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col lg="6">
            <Card className="card-chart">
              <CardHeader>
                <h5 className="card-category">Most Active IT Locations</h5>
                <CardTitle tag="h3">
                  <i className="tim-icons icon-pin text-success" /> IT Jobs Locations %
                </CardTitle>
              </CardHeader>
              <CardBody>
                <div className="chart-area" style={{ height: '500px', width: '100%' }}>
                  <LocationsChart/>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
       
      </div>
    </>
  );
}

export default Dashboard;
