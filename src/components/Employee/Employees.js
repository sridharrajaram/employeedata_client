import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Loading from "../Loading/Loading.js";
import env from "../Config/UrlSettings.js";
import ReactHTMLTableToExcel from "react-html-table-to-excel"; //npm package for html table to excel
import jsPDF from "jspdf"; // npm package for html to pdf
import "jspdf-autotable"; //mpm package for html to pdf

function Employees() {
  const [employeeList, setEmployeeList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const downloadPdf = () => {
    const pdf = new jsPDF();
    pdf.autoTable({ html: "#table-to-convert" });
    pdf.save("employeedata.pdf");
  };

  // function to get data from server
  let getEmployee = async () => {
    let employees = await axios.get(`${env.api}/employees`);
    console.log(employees.data);
    setEmployeeList([...employees.data]);
    setIsLoading(false);
  };

  useEffect(() => {
    try {
      getEmployee();
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }, []);

  return (
    <Container>
      <Row className="mt-2">
        <h1>Employees</h1>
      </Row>
      <Row className="mt-2">
        <Col xs={8}>
          <Link to="/create-employee">
            <Button>
              <FontAwesomeIcon icon={faDownload} /> &nbsp; Create Employee
            </Button>
          </Link>
        </Col>

        <Col xs={2}>
          {/*Table data to excel download */}
          <ReactHTMLTableToExcel
            id="test-table-xls-button"
            className="download-table-xls-button btn btn-success"
            table="table-to-convert"
            filename="employeedata"
            sheet="employeerecords"
            buttonText="Data2Excel"
          />
        </Col>
        <Col xs={2}>
          <Button onClick={downloadPdf}>Data2Pdf</Button>
        </Col>
      </Row>
      <Row className="mt-5">
        <Card>
          <Card.Body>
            <Card.Header>
              <b>Employee Details</b>
            </Card.Header>

            <Table
              responsive
              bordered
              hover
              variant="success"
              id="table-to-convert"
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
                {employeeList.map((employee, Index) => {
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
    </Container>
  );
}

export default Employees;
