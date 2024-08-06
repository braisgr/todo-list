import Project from "./project";
import { getNextId } from "./utils";

export default class ProjectManager {
  constructor(){
    this.projects = [];
  }

  createProject(name){
    const id = getNextId("currentProjectId");
    const project = new Project(name, id);

    this.projects.push(project);

    return project;
  }

  getProject(id) {
    const project = this.projects.find(project => project.id === parseInt(id));
    if (project) {
      return Project.fromJSON(project);
    }
    return null;
  }

  updateProject(updatedProject) {
    const index = this.projects.findIndex(p => p.id === updatedProject.id);
    if (index !== -1) {
      this.projects[index] = updatedProject;
    }
  }

  get projects() {
    return this._projects;
  }

  set projects(projects){
    this._projects = projects;
  }
}