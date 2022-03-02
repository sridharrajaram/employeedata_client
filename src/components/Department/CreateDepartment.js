import React, { useState } from "react";
import Loading from "../Loading/Loading.js";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import env from "../Config/UrlSettings.js";
import { Button, Col, Container, Form, Row } from "react-bootstrap";

function CreateDepartment() {
  
  const [isLoading, setIsLoading] = useState(false); // to show loading till data gets fetched from server

  const [departmentName, setDepartmentName]=useState("");

  const navigate = useNavigate(); //calling useNavigate function for redirection to other component


  const handleSubmit = async (e) => {
    e.preventDefault();
    let departmentData = { departmentName };
      try {
        setIsLoading(true);
        let departments = await axios.post(
          `${env.api}/create-department`,
          departmentData
        );
        alert(departments.data.message);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
      isLoading ? <Loading></Loading> : navigate("/departments"); //redirection command to employee component
    }

  return (
    <Container>
      <Row className="mt-2">
        <h4>Create Department</h4>
      </Row>

      <Form onSubmit={handleSubmit}>
        <Row className="mt-2">
          <Col xs={6}>
            <Form.Group className="mb-3" controlId="formBasicDepartmentName">
              <Form.Label>Department Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Department Name"
                name="departmentName"
                value={departmentName}
                onChange={(e)=>setDepartmentName(e.target.value)}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col xs={6}>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}

export default CreateDepartment;
