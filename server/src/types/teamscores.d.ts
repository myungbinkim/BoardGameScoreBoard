
export type Member = {
  id: number;
  name: string;
  score: number;
};

export type Team = {
  id: number;
  members: Array<Member>;
};

export type TeamScores = {
  teamlist: Array<Team>;
  maxscore: number;
};
