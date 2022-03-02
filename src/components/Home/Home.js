import React from "react";
import { Col, Container, Row } from "react-bootstrap";

function Home() {
  return (
    <Container>
      <Row className="mt-5">
        <Col>
          <h3>Welcome Viewer!!!..</h3>
          <h4>Nice to see you here...</h4>
          <hr />
          <p>
            This web application is developed to create and maintain employee
            database.
          </p>
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
