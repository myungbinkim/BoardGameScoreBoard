import express, { Response, Request, NextFunction } from 'express';
import { User } from 'user';
import db from '../models/db';

/* eslint-disable no-console */
async function getUser(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    const user = await db.getUser() as any;
    const userArray: Array<User> = Object.values(user);
    if (id) {
      const target = userArray.filter((elem) => id === elem.id)[0];
      res.send(target);
    } else {
      res.send(user);
    }
  } catch (e) {
    res.status(404).send('something fail');
  }
}

function getRank(req: Request, res: Response) {
  try {
    // const teamType = req.query.team;
    const term = Number(req.query.last_days);
    if (!term || term == 0 || term > 365) {
      res.status(404).send('days is too long OR invalid value');
      return;
    }
    const tmpData = [
      { team: ['주현'], score: 67, ranking: 1 },
      { team: ['숭'], score: 32, ranking: 2 },
      { team: ['성우'], score: 15, ranking: 3 },
      { team: ['상현'], score: 11, ranking: 4 },
      { team: ['명빈'], score: 2, ranking: 5 },
      { team: ['주현'], score: 32, ranking: 1 },
      { team: ['상현'], score: 22, ranking: 2 },
      { team: ['명빈'], score: 15, ranking: 3 },
      { team: ['성우'], score: 10, ranking: 4 },
      { team: ['숭'], score: 0, ranking: 5 },
    ];
    res.send(tmpData);
  } catch (e) {
    res.status(404).send('something fail');
  }
}

const apiRouter = express.Router();

apiRouter.use((req: Request, res: Response, next: NextFunction) => {
  const time = Date.now();
  console.log(`api requested at ${time}`);
  next();
});

apiRouter.get('/user', getUser);
apiRouter.get('/user/:id', getUser);
apiRouter.get('/rank', getRank);

apiRouter.get('*', (req: Request, res: Response) => {
  res.status(404).send('invalid path');
});
/* eslint-enable no-console */

export default apiRouter;
