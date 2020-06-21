/* react */
import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

/* react-bootstrap */
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Badge from 'react-bootstrap/Badge';

const Header = (props) => {
  const { round } = props;
  const maxScore = useSelector((state) => state.game.maxScore);
  
  return (
    <Container>
      <Row>
        <Col className="text-left">
          <Badge variant="secondary">
            {'Round '}
            {round}
          </Badge>
        </Col>
        <Col className="text-right">
          <Badge variant="secondary">
            {'Max Score: '}
            {maxScore}
          </Badge>
        </Col>
      </Row>
    </Container>
  );
};
Header.propTypes = {
  round: PropTypes.number.isRequired,
};

export default Header;
