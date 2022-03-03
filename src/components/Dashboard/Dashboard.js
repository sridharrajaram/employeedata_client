import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import axios from "axios";
import env from "../Config/UrlSettings.js";
import Loading from "../Loading/Loading.js";

function Dashboard() {
  const [employeeList, setEmployeeList] = useState([]);
  const [departmentList, setDepartmentList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [result, setResult] = useState([]);
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
      <Row className="mt-5">
        <Form onSubmit={handleSubmit}>
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
          <Form.Group className="mb-3" controlId="formBasicEndDate">
            <Form.Label>Last Date</Form.Label>
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
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Row>
    </Container>
  );
}

export default Dashboard;
