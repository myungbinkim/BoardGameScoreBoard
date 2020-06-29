import fs from 'fs';
import path from 'path';
import { User, UserDoc } from 'user';
import { GameResult, Rank } from 'score';

function readFile(filePath: string, callback: (data: string) => any) {
  return new Promise((resolve, rejects) => {
    fs.exists(filePath, (exists) => exists || rejects(Error('file doest not exists')));
    fs.readFile(filePath, 'utf-8', (err, data) => (err ? rejects(Error('something is fail')) : resolve(callback(data))));
  });
}

class DB {
  static userPath = path.join(__dirname, '../../data/user.json');

  static gameResultPath = path.join(__dirname, '../../data/games');

  getResultFilePath = (month: string) => path.join(DB.gameResultPath, `${month}.json`);

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

  getAllGameResult = (month: string, team?: string) => readFile(
    this.getResultFilePath(month), (data: string) => {
      const obj = JSON.parse(data) as { gameResults: Array<GameResult>; };
      const result = team ? obj.gameResults : obj.gameResults.filter((elem) => elem.team === team);
      return result;
    },
  );

  getRank = async (month: string, team: string) => {
    const users = await this.getUser() as Array<User>;
    users.sort((a, b) => a.id - b.id);
    const rank = [] as Array<Rank>;
    users.forEach((user) => rank.push({ team: [user.name], score: 0, ranking: 0 }));
    return this.getAllGameResult(month, team).then((gameResult) => {
      const results = gameResult as Array<GameResult>;
      results.forEach((game) => {
        game.scores.forEach((score) => {
          // id는 1 베이스
          rank[score.id - 1].score += score.score;
        });
      });
      return rank;
    });
  };

  /*
  getGameResult = (yearAndMonth: string) => new Promise((resolve, rejects) => {
    const resultPath = path.join(DB.gameResultPath, yearAndMonth);
    */
}

export default new DB();
