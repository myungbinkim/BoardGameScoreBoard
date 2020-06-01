import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Jumbotron from 'react-bootstrap/Jumbotron';
import { Link } from 'react-router-dom';
import Participatant from './Participatant';
import Absentee from './Absentee';


const PartList = ({ partInfo, selectPart }) => {
  let a = 1;
  const b = a;
  a = b;
  return (
    <div>
      <Jumbotron fluid>
        <Row>
          <Col>
            <h1>참가자</h1>
          </Col>
          <Col>
            <Link to="/team-matching">
              <Button variant="success">NEXT</Button>
            </Link>
          </Col>
        </Row>
        <Container>
          <Row>
            {partInfo.map((part) => (
              <Col xs={5} key={part.id}>
                <Participatant
                  key={part.id}
                  part={part}
                  selectPart={selectPart}
                />
              </Col>
            ))}
          </Row>
        </Container>
      </Jumbotron>
      <Jumbotron fluid>
        <h1>불참자</h1>
        <Container>
          <Row>
            {partInfo.map((part) => (
              <Col xs={5} key={part.id}>
                <Absentee key={part.id} part={part} selectPart={selectPart} />
              </Col>
            ))}
          </Row>
        </Container>
      </Jumbotron>
    </div>
  );
};

PartList.propTypes = {
  partInfo: PropTypes.arrayOf(PropTypes.shape).isRequired,
  selectPart: PropTypes.func.isRequired,
};

const ParticipatantList = ({ partInfo, selectPart }) => {
  const [clicked, setClicked] = useState(false);
  return (
    <>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home">참가자 선택</Navbar.Brand>
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          onClick={() => {
            setClicked(false);
          }}
        />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Accordion>
              <Accordion.Toggle
                as={Card.Header}
                variant="link"
                eventKey="0"
                onClick={() => {
                  setClicked(false);
                }}
              >
                디폴트 설정
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="0">
                <Card.Body
                  onClick={() => {
                    setClicked(!clicked);
                  }}
                >
                  DB1-4
                </Card.Body>
              </Accordion.Collapse>
              <Accordion.Toggle
                as={Card.Header}
                variant="link"
                eventKey="1"
                onClick={() => {
                  setClicked(false);
                }}
              >
                직접 입력
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="1">
                <Card.Body>
                  <Form inline>
                    <FormControl
                      type="text"
                      placeholder="User Name"
                      className="mr-sm-2"
                    />
                    <Button variant="outline-success">Insert</Button>
                  </Form>
                </Card.Body>
              </Accordion.Collapse>
            </Accordion>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <div>
        {clicked && <PartList partInfo={partInfo} selectPart={selectPart} />}
      </div>
    </>
  );
};
ParticipatantList.propTypes = {
  partInfo: PropTypes.arrayOf(PropTypes.shape).isRequired,
  selectPart: PropTypes.func.isRequired,
};

export default ParticipatantList;
