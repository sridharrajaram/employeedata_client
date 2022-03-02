import React, { useState, useEffect } from "react";
import Loading from "../Loading/Loading.js";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import env from "../Config/UrlSettings.js";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import {
  GeoapifyGeocoderAutocomplete,
  GeoapifyContext,
} from "@geoapify/react-geocoder-autocomplete"; // Address AutoComplete Api feature npm package
import "@geoapify/geocoder-autocomplete/styles/minimal.css"; // Address AutoComplete Api style feature npm package

function CreateEmployee() {
  const [isLoading, setIsLoading] = useState(false); // to show loading till data gets fetched from server

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("");
  const [address, setAddress] = useState("");
  const [joiningDate, setJoiningDate] = useState("");

  const [departList, setDepartList] = useState([]);

  // Used GeoApify.com API for Address AutoComplete process

  // below function will give us exact selected option
  function onPlaceSelect(value) {
    //console.log(value);
    //console.log(value.properties.formatted);
    setAddress(value.properties.formatted);
  }

  // below function will give us options out of search
  function onSuggectionChange(value) {
    console.log(value);
  }

  // function to get departments from server
  let getDepartment = async () => {
    let departments = await axios.get(`${env.api}/departments`);
    console.log(departments.data);
    setDepartList([...departments.data]);
    setIsLoading(false);
  };

  useEffect(() => {
    try {
      getDepartment();
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }, []);

  const navigate = useNavigate(); //calling useNavigate function for redirection to other component

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      let employeeData = {
        firstName,
        lastName,
        gender,
        employeeId,
        email,
        department,
        address,
        joiningDate,
      }; //destructured way of obj declaration only if keys should match object variable
      let employees = await axios.post(
        `${env.api}/create-employee`,
        employeeData
      );
      alert(employees.data.message);
    } catch (error) {
      console.log(error);
      setIsLoading(true);
    }

    isLoading ? <Loading></Loading> : navigate("/employees"); //redirection command to employee component
  };

  return (
    <Container>
      <Row className="mt-2">
        <h4>Create Employee</h4>
      </Row>

      <Form onSubmit={handleSubmit}>
        <Row className="mt-2">
          <Col xs={6}>
            <Form.Group className="mb-3" controlId="formBasicFirstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter FirstName"
                name="firstName"
                value={firstName}
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicLastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter LastName"
                name="lastName"
                value={lastName}
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicGender">
              <Form.Label>Gender</Form.Label>
              <Form.Select
                aria-label="Default select example"
                name="gender"
                value={gender}
                onChange={(e) => {
                  setGender(e.target.value);
                }}
                required
              >
                <option>Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Others">Others</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmployeeId">
              <Form.Label>Employee ID</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Employee ID"
                name="employeeId"
                value={employeeId}
                onChange={(e) => {
                  setEmployeeId(e.target.value);
                }}
                required
              />
            </Form.Group>
          </Col>
          <Col xs={6}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicDepartment">
              <Form.Label>Department</Form.Label>
              <Form.Select
                aria-label="Default select example"
                name="department"
                value={department}
                onChange={(e) => {
                  setDepartment(e.target.value);
                }}
                required
              >
                <option>Select</option>
                {departList.map((d, i) => {
                  return (
                    <option key={i} value={d.departmentName}>
                      {d.departmentName}
                    </option>
                  );
                })}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicAddress">
              <Form.Label>Address</Form.Label>
              {/* <Form.Control
                as="textarea"
                rows={2}
                placeholder="Enter your address"
                name="address"
                value={address}
                onChange={(e) => {
                  setAddress(e.target.value);
                }}
                required
              /> */}
              <GeoapifyContext apiKey={env.GEOAPIFY_APIKEY}>
                <GeoapifyGeocoderAutocomplete
                  placeholder="Enter address here"
                  value={address}
                  onChange={(e) => {
                    setAddress(e.target.value);
                  }}
                  placeSelect={onPlaceSelect}
                  suggestionsChange={onSuggectionChange}
                  required
                />
              </GeoapifyContext>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicJoiningDate">
              <Form.Label>Joining Date</Form.Label>
              <Form.Control
                type="date"
                placeholder="Enter date"
                name="joiningDate"
                value={joiningDate}
                onChange={(e) => {
                  setJoiningDate(e.target.value);
                }}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mt-3 text-center">
          <Col xs={12}>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}

export default CreateEmployee;
