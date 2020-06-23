
export type User = {
  id: number;
  name: string;
};

export type Group = {
  id: string;
  members: Array<number>;
};

export type UserDoc = {
  users: Array<User>;
  groups: Array<Group>;
};
