export function saveProjects(projects){
  localStorage.setItem("allProjects", JSON.stringify(projects));
}

export function getProjects(){
  return JSON.parse(localStorage.getItem("allProjects")) || [];
}