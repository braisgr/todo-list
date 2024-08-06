import Project from "./project";

export function saveProjects(projects){
  localStorage.setItem("allProjects", JSON.stringify(projects));
}

export function getProjects(){
  const projectsJSON = JSON.parse(localStorage.getItem("allProjects")) || [];
  return projectsJSON.map(projectJSON => Project.fromJSON(projectJSON));
}