export default class Task {

  constructor(title, description, date, id){
    this.title = title;
    this.description = description;
    this.date = date;
    this.id = id;
    this.priority = false;
    this.completed = false;
  }

  static fromJSON(json) {
    const task = new Task(json.title, json.description, new Date(json.date), json.id);
    task.completed = json.completed;
    task.priority = json.priority;
    return task;
  }
}