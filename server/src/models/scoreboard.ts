import fs from 'fs';
import path from 'path';
import { TeamScores, Team } from 'teamscores';

class ScoreBoard {
  static defaultPath = path.join(__dirname, '../../data/scoreboard/lastgame.json');
  
  getScoreBoard = () => {
    return new Promise((resolve) => {
      fs.readFile(ScoreBoard.defaultPath, 'utf-8', (err, data) => {
        if (err) throw err;
        return resolve(data);
      });
    });
  }

  write = (teamScores: TeamScores) => {
    fs.writeFile(ScoreBoard.defaultPath, JSON.stringify(teamScores), (err) => {
      if (err) throw err;
      console.log('The file has been saved!');
    });
    return new Promise((resolve) => resolve());
  }

  open = (teamScores: TeamScores) => {
    for (let team of teamScores.teamlist) {
      for (let member of team.members) {
        member.score = 0;
      }
    }
    this.write(teamScores);
    return new Promise((resolve) => resolve());
  }

  reopen = () => {
    fs.readFile(ScoreBoard.defaultPath, 'utf-8', (err, data) => {
      if (err) throw err;
      let teamScores = JSON.parse(data) as TeamScores;
      this.open(teamScores);
    });
    return new Promise((resolve) => resolve());
  }

  setScore = (id: string, score: string) => {
    fs.readFile(ScoreBoard.defaultPath, 'utf-8', (err, data) => {
      if (err) throw err;
      let teamScores = JSON.parse(data) as TeamScores;
      for (let team of teamScores.teamlist) {
        for (let member of team.members) {
          if (member.id == parseInt(id)) {
            member.score = parseInt(score);
          }
        }
      }
      this.write(teamScores); 
    });
    return new Promise((resolve) => resolve());
  }
}

export default new ScoreBoard();
