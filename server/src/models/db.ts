import fs from 'fs';
import path from 'path';


class DB {
  static userPath = path.join(__dirname, '../../data/user.json');

  getUser = () => new Promise((resolve, reject) => {
    fs.readFile(DB.userPath, 'utf-8', (err, data) => {
      if (err) reject(err);
      resolve(JSON.parse(data));
    });
  });

  setUser = (data: JSON) => new Promise((resolve, rejects) => {
    fs.writeFile(DB.userPath, JSON.stringify(data), 'utf-8', (err) => {
      if (err) rejects(err);
      resolve();
    });
  });
}

export default new DB();
