export interface Task {
  id: number;
  title: string;
  initiator: string;
  startDate: string;
  dueDate: string;
  status: string;
  content: string;
}

export interface UpdateTask {
  title: string;
  initiator: string;
  startDate: string;
  dueDate: string;
  status: string;
  content: string;
}
