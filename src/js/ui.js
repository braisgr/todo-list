export class UI {
  //Función que renderiza el menú lateral de proyectos 
  static renderProjects(projects, container) {
    container.textContent = "";
  
    projects.forEach((project) => {
      const projectElement = document.createElement("li");
      projectElement.textContent = project.name;
      projectElement.dataset.projectId = project.id;
  
      container.appendChild(projectElement);
    });
  }
  
  //Renderiza el formulario de nuevo proyecto
  static renderProjectForm() {
    const dialog = document.getElementById("add-project-dialog");
    dialog.showModal();
  }
  
  //Resetea todos los inputs de los dialog
  static clearDialog() {
    const forms = document.querySelectorAll(".form-input");
    for (const form of forms) {
      for (const child of form.children) {
        if (child.tagName === "INPUT") {
          child.value = "";
        }
      }
    }
  }
  
  //Cierra el dialog abierto
  static closeDialog() {
    const dialogs = document.querySelectorAll(".dialog");
    for (const dialog of dialogs) {
      if (dialog.open) {
        dialog.close();
      }
    }
  }
  
  //Renderiza las tareas del proyecto seleccionado
  static renderTasks(tasks, container) {
    container.textContent = "";
    for (let task of tasks) {
      console.log(task);
        const taskContainer = document.createElement("div");
        const taskTitle = document.createElement("p");
        taskTitle.textContent = task.title;
        taskContainer.appendChild(taskTitle);
        container.appendChild(taskContainer);
    }

    const newTaskButton = document.createElement("button");
    newTaskButton.innerText = "New Task";
    container.appendChild(newTaskButton);
  }
}

