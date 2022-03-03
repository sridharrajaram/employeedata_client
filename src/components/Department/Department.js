import React, { useEffect, useState } from "react";
import { Button, Card, Container, Row, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Loading from "../Loading/Loading.js";
import env from "../Config/UrlSettings.js";

function Department() {
  const [departmentList, setDepartmentList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // function to get data from server
  let getDepartment = async () => {
    let departments = await axios.get(`${env.api}/departments`);
    console.log(departments.data);
    setDepartmentList([...departments.data]);
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

  return (
    <Container>
      <Row className="mt-2">
        <h1>Department</h1>
      </Row>
      <Row className="mt-2">
        <Link to="/create-department">
          <Button>
            <FontAwesomeIcon icon={faDownload} /> &nbsp; Create Department
          </Button>
        </Link>
      </Row>
      {departmentList.length === 0 ? null : (
        <Row className="mt-5">
          <Card>
            <Card.Body>
              <Card.Header>
                <b>Department Details</b>
              </Card.Header>
              <Table bordered hover variant="success">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Department Name</th>
                  </tr>
                </thead>
                <tbody>
                  {departmentList.map((obj, Index) => {
                    return (
                      <tr key={Index + 1}>
                        <td>{Index + 1}</td>
                        <td>{obj.departmentName}</td>
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

export default Department;
