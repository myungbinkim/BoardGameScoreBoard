import fs from 'fs';
import path from 'path';
import { User, UserDoc } from 'user';

function readFile(filePath: string, callback: (data: string) => any) {
  return new Promise((resolve, rejects) => {
    fs.exists(filePath, (exists) => exists || rejects(Error('file doest not exists')));
    fs.readFile(filePath, 'utf-8', (err, data) => (err ? rejects(Error('something is fail')) : resolve(callback(data))));
  });
}

class DB {
  static userPath = path.join(__dirname, '../../data/user.json');

  static gameResultPath = path.join(__dirname, '../../data/games');

  getUser = (id?: number) => readFile(DB.userPath, (data: string) => {
    const obj = JSON.parse(data) as UserDoc;
    const target = id ? obj.users.filter((elem: User) => id === elem.id)[0] : obj.users;
    return target;
  });

  getGroup = (id: string) => readFile(DB.userPath, (data: string) => {
    const obj = JSON.parse(data) as UserDoc;
    const ids = obj.groups.filter((elem) => id === elem.id)[0].members;
    const target = obj.users.filter((elem: User) => ids.findIndex((v) => v === elem.id) !== -1);
    return target;
  });

  /*
  getGameResult = (yearAndMonth: string) => new Promise((resolve, rejects) => {
    const resultPath = path.join(DB.gameResultPath, yearAndMonth);
    */
}

export default new DB();
