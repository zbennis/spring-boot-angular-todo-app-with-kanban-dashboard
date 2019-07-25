export class TodoEntry {
  id: number;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  dueDate: Date;
  state: string;
  userId: number;

  constructor(id: number, description: string, createdAt: Date, updatedAt: Date, dueDate: Date, state: string, userId: number) {
    this.id = id;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.description = description;
    this.dueDate = dueDate;
    this.state = state;
    this.userId = userId;
  }
}
