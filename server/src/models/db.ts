import fs, { exists } from 'fs';
import path from 'path';
import { User, UserDoc } from 'user';

class DB {
  static userPath = path.join(__dirname, '../../data/user.json');

  getUser = (id?: number) => new Promise((resolve, reject) => {
    fs.exists(DB.userPath, (exists) => {
      if (exists) {
        fs.readFile(DB.userPath, 'utf-8', (err, data) => {
          if (err) {
            reject(err)
          } else {
            const obj = JSON.parse(data) as UserDoc;
            if (id) {
              const target = obj.users.filter((elem: User) => id === elem.id)[0];
              resolve(target);
            } else {
              resolve(obj.users);
            }
          }
        })
      } else {
        console.error("file not exists");
      }
    });
  });

  setUser = (data: JSON) => new Promise((resolve, rejects) => {
    fs.exists(DB.userPath, (exists) => {
      fs.writeFile(DB.userPath, JSON.stringify(data), 'utf-8', (err) => {
        if (err) rejects(err);
        resolve();
      });
    });
  }
  )
}

export default new DB();
