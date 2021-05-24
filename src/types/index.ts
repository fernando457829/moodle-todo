export type User = {
  id: number;
  token: string;
};

export type Course = {
  id: number;
  name: string;
};

export type Attachment = {
  filename: string;
  fileurl: string;
  mimetype: string;
};

export type Assignment = {
  id: number;
  courseid: number;
  name: string;
  description: string;
  attachments?: Attachment[];
  duedate: number;
  done: boolean;
};

export type Data = {
  url: string;
  user: User;
  courses: Course[];
  assignments: Assignment[];
};

export type Plugin = {
  type: 'file' | 'onlinetext' | 'comments';
  name: string;
  text?: string;
  files?: Attachment[];
};

export type Submission = {
  status: 'submitted' | 'new';
  plugins: Plugin[];
};
