
export type Score = {
  id: number;
  team: number;
  score: number;
};

export type GameResult = {
  date: number;
  team: string;
  scores: Array<Score>;
};

export type Rank = {
  team: Array<string>;
  score: number;
  ranking: number;
};
