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

const apiRouter = express.Router();

apiRouter.use((req: Request, res: Response, next: NextFunction) => {
  const time = Date.now();
  console.log(`api requested at ${time}`);
  next();
});

apiRouter.get('/user', getUser);
apiRouter.get('/user/:id', getUser);

apiRouter.get('*', (req: Request, res: Response) => {
  res.status(404).send('invalid path');
})
/* eslint-enable no-console */

export default apiRouter;
