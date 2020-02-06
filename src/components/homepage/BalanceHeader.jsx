import React from "react";
import { Container, Row, Col } from "reactstrap";

const Header = props => {
  const { income, spendings } = props;
  const balanceLeft = (Number(income) - Number(spendings)).toFixed(2);
  return (
    <Container className="themed-container balance-header" fluid={true}>
      <Row>
        <Col>
          <p className="pl-15 balance-title">Balance</p>
        </Col>
      </Row>
      <Row>
        <Col>
          <h2 className="pl-15">{balanceLeft} CZK</h2>
        </Col>
      </Row>
      <Row className="mt-15">
        <Col xs="6" sm="6" md="4">
          <h5 className="pl-15 text-success">Income: {income} Kc</h5>
        </Col>
        <Col xs="6" sm="6" md="4">
          <h5 className="text-danger">Spendings: {spendings} Kc</h5>
        </Col>
      </Row>
    </Container>
  );
};

export default Header;
