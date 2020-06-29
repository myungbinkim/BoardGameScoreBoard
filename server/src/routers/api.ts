import express, { Response, Request, NextFunction } from 'express';
import { User } from 'user';
import db from '../models/db';

/* eslint-disable no-console */
async function getUser(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    const user = await db.getUser(id) as User | Array<User>;
    res.send(user);
  } catch (e) {
    res.status(404).send('something fail');
  }
}
async function getGroup(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const user = await db.getGroup(id) as Array<User>;
    res.send(user);
  } catch (e) {
    res.status(404).send('something fail');
  }
}

async function getRank(req: Request, res: Response) {
  try {
    // const teamType = req.query.team as string;
    const thisMonth = '202006';
    const rank = await db.getRank(thisMonth, 'single');
    console.log(rank);
    res.send(rank);
  } catch (e) {
    console.log(e);
    res.status(404).send('something fail');
  }
}

function insertScore(req: Request, res: Response) {
  try {
    res.status(201).end();
  } catch (e) {
    res.status(404).send('something fail');
  }
}

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
apiRouter.post('/scores', insertScore);

apiRouter.get('*', (req: Request, res: Response) => {
  res.status(404).send('invalid path');
});
/* eslint-enable no-console */

export default apiRouter;
