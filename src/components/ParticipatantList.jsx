import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Jumbotron from 'react-bootstrap/Jumbotron';
import { Link } from 'react-router-dom';
import Participatant from './Participatant';
import { setPlayers } from '../redux/players';
import { setMaxScore, setPlayersPerTeam } from '../redux/game';
import { setPartInfo } from '../redux/participatants';


const PartList = () => {
  const [check1, setCheck1] = useState(false);
  const [check2, setCheck2] = useState(false);
  const [check3, setCheck3] = useState(false);
  const playersPerTeam = useSelector((state) => state.game.playersPerTeam);
  const partInfo = useSelector((state) => state.participatants.partInfo);
  const dispatch = useDispatch();
  const setGameState = (score, count) => {
    window.console.log(score);
    dispatch(setMaxScore(score));
    window.console.log(count);
    dispatch(setPlayersPerTeam(count));
    if (count === 1) {
      setCheck1(true);
      setCheck2(false);
      setCheck3(false);
    } else if (count === 2) {
      setCheck1(false);
      setCheck2(true);
      setCheck3(false);
    } else {
      setCheck1(false);
      setCheck2(false);
      setCheck3(true);
    }
  };
  const decideNext = () => {
    const numOfPlayers = partInfo.filter((part) => part.selected === true).length;
    return ((check1 || check2 || check3)
      && ((numOfPlayers
      % playersPerTeam) === 0)
      && (numOfPlayers !== 0)
    );
  };

  return (
    <>
      <Jumbotron>
        <Row>
          <Col>
            <Button
              variant={check1 ? 'success' : 'secondary'}
              onClick={() => setGameState(67, 1)}
            >
              개인전
            </Button>
          </Col>
          <Col>
            <Button
              variant={check2 ? 'success' : 'secondary'}
              onClick={() => setGameState(77, 2)}
            >
              듀-오
            </Button>
          </Col>
          <Col>
            <Button
              variant={check3 ? 'success' : 'secondary'}
              onClick={() => setGameState(104, 3)}
            >
              트리오
            </Button>
          </Col>
        </Row>
      </Jumbotron>
      { (check1 || check2 || check3)
        && (
        <Jumbotron>
          <Row
            style={{
              height: '90px',
            }}
          >
            {partInfo.filter((part) => part.id < 3).map((part) => (
              <Col>
                <Participatant key={part.id} part={part} />
              </Col>
            ))}
          </Row>
          <Row
            style={{
              height: '90px',
            }}
          >
            {partInfo.filter((part) => part.id > 2 && part.id < 5).map((part) => (
              <Col>
                <Participatant key={part.id} part={part} />
              </Col>
            ))}
          </Row>
          <Row
            style={{
              height: '90px',
            }}
          >
            {partInfo.filter((part) => part.id > 4 && part.id < 7).map((part) => (
              <Col>
                <Participatant key={part.id} part={part} />
              </Col>
            ))}
          </Row>
          <Row
            style={{
              height: '90px',
            }}
          >
            {partInfo.filter((part) => part.id > 6 && part.id < 9).map((part) => (
              <Col>
                <Participatant key={part.id} part={part} />
              </Col>
            ))}
          </Row>
          <Row
            style={{
              height: '90px',
            }}
          >
            {partInfo.filter((part) => part.id > 8).map((part) => (
              <Col>
                <Participatant key={part.id} part={part} />
              </Col>
            ))}
          </Row>
          <Row
            style={{
              height: '50px',
            }}
          >
            <Col>
              {decideNext() && (
                <Link to="/admin/team-matching">
                  <Button
                    variant="success"
                    size="lg"
                    block
                    onClick={() => dispatch(
                      setPlayers(
                        partInfo
                          .filter((part) => part.selected === true)
                          .map((part) => ({ id: part.id, name: part.name })),
                      ),
                    )}
                  >
                    NEXT
                  </Button>
                </Link>
              )}
            </Col>
          </Row>
        </Jumbotron>
        )}
    </>
  );
};

const ParticipatantList = () => {
  const dispatch = useDispatch();
  const playerList = [];
  const request = () => {
    return (fetch('/api/group/DB1-4', {
      method: 'GET',
    }).then((response) => {
      return response.json();
    }));
  };
  useEffect(() => {
    request().then((value) => (value.map((player) => (playerList.push({
      id: player.id,
      name: player.name,
      selected: true,
    })))));
    dispatch(setPartInfo(playerList));
  }, []);
  return (
    <>
      <div>
        <PartList />
      </div>
    </>
  );
};

export default ParticipatantList;
