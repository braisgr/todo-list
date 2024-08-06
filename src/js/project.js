import Task from "./task";
export default class Project {

  constructor(name, id){
    this.name = name;
    this.id = id;
    this.tasks = [];
  }

  addTask(task){
    this.tasks.push(task);
  }

  // Método estático para recrear instancias de Project
  static fromJSON(json) {
    const project = new Project(json.name, json.id);
    project.tasks = json.tasks.map(taskJson => Task.fromJSON(taskJson));
    return project;
  }
}