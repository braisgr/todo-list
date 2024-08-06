import ".././css/style.css";
import { UI } from "./ui";
import ProjectManager from "./projectManager";
import { saveProjects, getProjects } from "./storage";
import Task from "./task";
import { generateTaskId } from "./utils";

//Instanciamos un nuevo ProjectManager y asignamos a su propiedad projects los proyectos almacenados en el localStorage, en caso de haberlo. Si no, recibe un array vacío
const projectManager = new ProjectManager();
projectManager.projects = getProjects();

//Event listeners
//Boton 'New Project'
const newProjectButton = document.getElementById("new-project-btn");
newProjectButton.addEventListener("click", () => {
  UI.renderForm(document.getElementById("add-project-dialog"));
});

//Boton 'Add Project'
const addProjectButton = document.getElementById("add-project-btn");
addProjectButton.addEventListener("click", (e) => {
  e.preventDefault();
  handleAddProject();
});

//Boton 'Add Task'
const addTaskButton = document.getElementById("add-task-btn");
addTaskButton.addEventListener("click", (e) => {
  e.preventDefault();
  handleAddTask();
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
    const tasksContainer = document.getElementById("tasks");
    const projectId = event.target.dataset.projectId;
    const project = projectManager.getProject(projectId);
    tasksContainer.dataset.projectId = projectId;

    UI.renderTasks(project.tasks, tasksContainer);
  }
}

function handleAddTask() {
  const title = document.getElementById("task-title").value;

  if (title.trim().length === 0) {
    UI.clearDialog();
    return;
  }

  const description = document.getElementById("task-description").textContent;
  const id = generateTaskId();
  const task = new Task(title, description, new Date(), id);

  const tasksContainer = document.getElementById("tasks");
  const projectId = tasksContainer.dataset.projectId;
  const project = projectManager.getProject(projectId);
  if (project) {
    project.addTask(task);
    projectManager.updateProject(project); // Asegúrate de tener este método en ProjectManager
    saveProjects(projectManager.projects);

    UI.renderTasks(project.tasks, tasksContainer);
    UI.closeDialog();
  } else {
    console.error("Project not found:", projectId);
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
