import ".././css/style.css";
import { UI } from "./ui";
import ProjectManager from "./projectManager";
import { saveProjects, getProjects } from "./storage";

//Instanciamos un nuevo ProjectManager y asignamos a su propiedad projects los proyectos almacenados en el localStorage, en caso de haberlo. Si no, recibe un array vacío
const projectManager = new ProjectManager();
projectManager.projects = getProjects();

//Event listeners
//Boton 'New Project'
const newProjectButton = document.getElementById("new-project-btn");
newProjectButton.addEventListener("click", UI.renderProjectForm);

//Boton 'Add Project'
const addProjectButton = document.getElementById("add-project-btn");
addProjectButton.addEventListener("click", (e) => {
  e.preventDefault();
  handleAddProject();
});

//Elementos 'li' del contenedor de proyectos
const projectsContainer = document.getElementById("projects");
projectsContainer.addEventListener("click", handleProjectClick);

//Cierra los dialog al pulsar fuera de ellos
document.addEventListener("click", handleDialogClick);

//Botones 'Cancel' de los formularios
const cancelButtons = document.querySelectorAll(".cancel-btn");
cancelButtons.forEach((button) =>
  button.addEventListener("click", handleCloseForm)
);

//Maneja la lógica del botón add project
function handleAddProject() {
  const name = document.getElementById("project-name").value;

  if (name.trim().length === 0) {
    UI.clearDialog();
    return;
  }

  projectManager.createProject(name);
  saveProjects(projectManager.projects);
  UI.closeDialog();
  UI.renderProjects(
    projectManager.projects,
    document.getElementById("projects")
  );
}

//Maneja la lógica del click de cada proyecto
function handleProjectClick(event) {
  if (event.target.tagName === "LI") {
    const projectId = event.target.dataset.projectId;
    const project = projectManager.getProject(projectId);
    console.log(project);

    UI.renderTasks(project.tasks, document.getElementById("tasks"));
  }
}

//Cierra el dialog cuando el usuario hace click fuera de el
function handleDialogClick(e) {
  if (e.target.tagName !== "DIALOG") return;

  const rect = e.target.getBoundingClientRect();

  const clickedInDialog =
    rect.top <= e.clientY &&
    e.clientY <= rect.top + rect.height &&
    rect.left <= e.clientX &&
    e.clientX <= rect.left + rect.width;

  if (clickedInDialog === false) e.target.close();

  UI.clearDialog();
}

//Cierra el dialog cuando el usuario hace click en el boton 'Cancel'
function handleCloseForm() {
  const dialogs = document.querySelectorAll(".dialog");
  for (const dialog of dialogs) {
    if (dialog.open) {
      dialog.close();
    }
  }
}

UI.renderProjects(projectManager.projects, document.getElementById("projects"));
