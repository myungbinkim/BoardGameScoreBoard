import { Response, Request } from 'express';
import { User } from 'user';
import db from '../models/db';

export function setUser(user: any) {
  /* eslint-disable no-console */
  console.log(user);
  /* eslint-enable no-console */
}

export async function getUser(req: Request, res: Response) {
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
/*
export async function getUser(req: Request, res: Response) {
  try {
    const user = await db.getUser();
    res.json(user);
  } catch (e) {
    res.status(404).send('Something fail');
  }
}
*/
