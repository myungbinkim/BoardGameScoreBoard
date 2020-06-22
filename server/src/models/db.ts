import fs from 'fs';
import path from 'path';
import { User, UserDoc } from 'user';

class DB {
  static userPath = path.join(__dirname, '../../data/user.json');

  static gameResultPath = path.join(__dirname, '../../data/games');

  getUser = (id?: number) => new Promise((resolve, reject) => {
    fs.exists(DB.userPath, (exists) => {
      if (exists) {
        fs.readFile(DB.userPath, 'utf-8', (err, data) => {
          if (err) {
            reject(err);
          } else {
            const obj = JSON.parse(data) as UserDoc;
            if (id) {
              const target = obj.users.filter((elem: User) => id === elem.id)[0];
              resolve(target);
            } else {
              resolve(obj.users);
            }
          }
        });
      } else {
        /* eslint-disable no-console */
        console.error('file not exists');
        /* eslint-enable no-console */
      }
    });
  });

  setUser = (data: JSON) => new Promise((resolve, rejects) => {
    fs.exists(DB.userPath, (exists) => {
      if (exists) {
        fs.writeFile(DB.userPath, JSON.stringify(data), 'utf-8', (err) => {
          if (err) rejects(err);
          resolve();
        });
      } else {
        /* eslint-disable no-console */
        console.error('file not exists');
        /* eslint-enable no-console */
      }
    });
  });

  getGameResult = (yearAndMonth: string) => new Promise((resolve, rejects) => {
    const resultPath = path.join(DB.gameResultPath, yearAndMonth);

    fs.exists(resultPath, (exists) => {
      if (exists) {
        fs.readFile(DB.userPath, 'utf-8', (err, data) => {
          if (err) rejects(err);
          /* eslint-disable no-console */
          console.log(data);
          /* eslint-enable no-console */
          resolve();
        });
      } else {
        /* eslint-disable no-console */
        console.error('game result file not exists');
        /* eslint-enable no-console */
      }
    });
  });
}

export default new DB();
