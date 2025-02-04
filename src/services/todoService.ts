export class TodoService {
  private _id: number;
  private _task: string;
  private _complete: boolean;

  constructor(id: number, task: string, complete: boolean = false) {
    this._id = id;
    this._task = task;
    this._complete = complete;
  }

  get id() {
    return this._id;
  }

  get task() {
    return this._task;
  }

  get complete() {
    return this._complete;
  }

  toggleComplete() {
    this._complete = !this._complete;
  }

  updateTask(newTask: string) {
    this._task = newTask;
  }
}
