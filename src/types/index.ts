export type User = {
  id: number;
  token: string;
};

export type Course = {
  id: number;
  name: string;
};

export type Assignment = {
  id: number;
  courseid: number;
  name: string;
  done: boolean;
};

export type Data = {
  url: string;
  user: User;
  courses: Course[];
  assignments: Assignment[];
};
