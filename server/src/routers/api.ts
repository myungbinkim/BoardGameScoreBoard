import express, { Response, Request, NextFunction } from 'express';
import { GameResult } from 'score';
import { TeamScores } from 'teamscores';
import db from '../models/db';
import scoreboard from '../models/scoreboard';

/* eslint-disable no-console */
function getApiWrapper(fn: (req: Request) => Promise<any>) {
  return (req: Request, res: Response) => {
    fn(req).then((data) => res.send(data)).catch((e) => {
      console.log(e);
      res.status(404).send('something fail');
    });
  };
}

function setApiWrapper(fn: (req: Request) => Promise<any>) {
  return (req: Request, res: Response) => {
    fn(req).then(() => res.status(201).end()).catch((e) => {
      console.log(e);
      res.status(404).send('something fail');
    });
  };
}

const getUser = getApiWrapper((req) => db.getUser(Number(req.params.id)));
const getGroup = getApiWrapper((req) => db.getGroup(req.params.id));
const getRank = getApiWrapper(() => db.getRank('202006', 'single'));
const getScoreBoard = getApiWrapper(() => scoreboard.getScoreBoard());

const insertGameResult = setApiWrapper((req) => {
  const result: GameResult = { date: 20200630, team: req.body.team, scores: req.body.scores };
  return db.insertGameResult(result);
});
const openScoreBoard = setApiWrapper((req) => {
  const data: TeamScores = { teamlist: req.body.teamlist, maxscore: req.body.maxscore };
  return scoreboard.open(data);
});
const reopenScoreBoard = setApiWrapper(() => scoreboard.reopen());
const setScoreBoardScore = setApiWrapper((req) => scoreboard.setScore(req.params.id, req.params.score));

const apiRouter = express.Router();

apiRouter.use((req: Request, res: Response, next: NextFunction) => {
  // const time = Date.now();
  // console.log(`api requested at ${time}`);
  next();
});

apiRouter.get('/user', getUser);
apiRouter.get('/user/:id', getUser);
apiRouter.get('/group/:id', getGroup);
apiRouter.get('/rank', getRank);
apiRouter.get('/scoreboard', getScoreBoard);
apiRouter.get('/scoreboard/reopen', reopenScoreBoard);
apiRouter.get('/scoreboard/score/:id&:score', setScoreBoardScore);
apiRouter.post('/scores', insertGameResult);
apiRouter.post('/scoreboard/open', openScoreBoard);

apiRouter.get('*', (req: Request, res: Response) => {
  res.status(404).send('invalid path');
});
/* eslint-enable no-console */

export default apiRouter;
