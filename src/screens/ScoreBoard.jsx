import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

const EmptyGrid = () => <Col className="empty-grid" />;

const PlayerButton = (props) => {
  const { name } = props;
  const [score, setScore] = useState(0);
  const handleClick = (e) => {
    setScore(score + e.target.value);
  };
  return <Button variant="primary" onClick={(e) => handleClick(e)}> {name} </Button>;
};

const TeamGrid = (props) => {
  const { player1, player2 } = props;
  return (
    <Col className="grid">
      <Container fluid>
        <Row style={{ height: "100px" }}>
          <Col style={{ marginTop: "30px" }}>
            <PlayerButton name={player1} />
          </Col>
          <Col style={{ marginTop: "30px" }}>
            <PlayerButton name={player2} />
          </Col>
        </Row>
        <p style={{ textAlign: "center", color: "darkgrey" }}> 현재점수: 68 </p>
      </Container>
    </Col>
  );
};

const ScoreBoard = () => (
  <Container fluid>
    <Row className="header">
      <Col className="show-round">Round #N</Col>
      <Col className="show-max-score">Max Score: 77</Col>
    </Row>
    <Row>
      <TeamGrid player1="장" player2="명" />
      <TeamGrid player1="숭" player2="우" />
    </Row>
    <Row>
      <TeamGrid player1="윤" player2="남" />
      <TeamGrid player1="박" player2="안" />
    </Row>
    <Row>
      <TeamGrid player1="양" player2="이" />
      <EmptyGrid />
    </Row>
  </Container>
);

export default ScoreBoard;
