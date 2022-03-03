import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
  Table,
} from "react-bootstrap";
import axios from "axios";
import env from "../Config/UrlSettings.js";
import Loading from "../Loading/Loading.js";
import ReactHTMLTableToExcel from "react-html-table-to-excel"; //npm package for html table to excel
import jsPDF from "jspdf"; // npm package for html to pdf
import "jspdf-autotable"; //mpm package for html to pdf

function Dashboard() {
  const [employeeList, setEmployeeList] = useState([]);
  const [departmentList, setDepartmentList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [result, setResult] = useState([]);

  //data for downloading as pdf
  const downloadPdf = () => {
    const pdf = new jsPDF();
    pdf.autoTable({ html: "#table-to-convert2" });
    pdf.save("searchdata.pdf");
  };

  // function to get data from server
  let getEmployee = async () => {
    let employees = await axios.get(`${env.api}/employees`);
    console.log(employees.data);
    setEmployeeList([...employees.data]);
    setIsLoading(false);
  };

  // function to get data from server
  let getDepartment = async () => {
    let departments = await axios.get(`${env.api}/departments`);
    console.log(departments.data);
    setDepartmentList([...departments.data]);
    setIsLoading(false);
  };

  useEffect(() => {
    try {
      getEmployee();
      getDepartment();
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      let searchData = {
        startDate,
        endDate,
      }; //destructured way of obj declaration only if keys should match object variable
      console.log(searchData);
      let searchResults = await axios.post(
        `${env.api}/employees/searchDate`,
        searchData
      );
      alert(searchResults.data.message);
      console.log(searchResults.data.data);
      setResult([...searchResults.data.data]);
    } catch (error) {
      console.log(error);
      setIsLoading(true);
    }
  };
  console.log(result);
  return (
    <Container>
      <Row className="mt-5">
        <Col xs={3}>
          <Card style={{ width: "14rem" }}>
            <Card.Body
              style={{
                backgroundColor: "tomato",
                textAlign: "center",
                borderRadius: "15px",
              }}
            >
              <h3>Employees</h3>
              <h3>{employeeList.length}</h3>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={3}>
          <Card style={{ width: "14rem" }}>
            <Card.Body
              style={{
                backgroundColor: "mediumslateblue",
                textAlign: "center",
                borderRadius: "15px",
              }}
            >
              <h3>Departments</h3>
              <h3>{departmentList.length}</h3>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Form onSubmit={handleSubmit}>
        <Row className="mt-5 align-items-center">
          <Col xs={2}>
            <Form.Group className="mb-3" controlId="formBasicStartDate">
              <Form.Label>Start Date</Form.Label>
              <Form.Control
                type="date"
                placeholder="Enter Start Date"
                name="startDate"
                value={startDate}
                onChange={(e) => {
                  setStartDate(e.target.value);
                }}
                required
              />
            </Form.Group>
          </Col>
          <Col xs={2}>
            <Form.Group className="mb-3" controlId="formBasicEndDate">
              <Form.Label>End Date</Form.Label>
              <Form.Control
                type="date"
                placeholder="Enter End Date"
                name="endDate"
                value={endDate}
                onChange={(e) => {
                  setEndDate(e.target.value);
                }}
                required
              />
            </Form.Group>
          </Col>
          <Col xs={6}>
            <Button variant="primary" type="submit">
              Get Report
            </Button>
          </Col>
          {result.length === 0 ? null : (
            <>
              <Col xs={1}>
                {/*Table data to excel download */}
                <ReactHTMLTableToExcel
                  id="test-table-xls-button"
                  className="download-table-xls-button btn btn-success"
                  table="table-to-convert2"
                  filename="searchdata"
                  sheet="searchreport"
                  buttonText="ToExcel"
                />
              </Col>
              <Col xs={1}>
                <Button onClick={downloadPdf}>ToPdf</Button>
              </Col>
            </>
          )}
        </Row>
      </Form>
      {result.length === 0 ? null : (
        <Row className="mt-2">
          <Card>
            <Card.Body>
              <Card.Header>
                <b>Search Results</b>
              </Card.Header>

              <Table
                responsive
                bordered
                hover
                variant="success"
                id="table-to-convert2"
              >
                <thead>
                  <tr>
                    <th>#</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Gender</th>
                    <th>Employee ID</th>
                    <th>Email</th>
                    <th>Department</th>
                    <th>Address</th>
                    <th>Joining Date</th>
                  </tr>
                </thead>
                <tbody>
                  {result.map((employee, Index) => {
                    return (
                      <tr key={Index + 1}>
                        <td>{Index + 1}</td>
                        <td>{employee.firstName}</td>
                        <td>{employee.lastName}</td>
                        <td>{employee.gender}</td>
                        <td>{employee.employeeId}</td>
                        <td>{employee.email}</td>
                        <td>{employee.department}</td>
                        <td>{employee.address}</td>
                        <td>{employee.joiningDate}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Row>
      )}
    </Container>
  );
}

export default Dashboard;
