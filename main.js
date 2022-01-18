// fetching data
const baseURL = "https://jsonplaceholder.typicode.com/todos?userId=";

const getTodos = async (name) => {
  const person = teamMembers.indexOf(name) + 1;
  const response = await fetch(baseURL + person);
  const data = await response.json();
  return data;
};

//Array of team members names - based on html structure
const teamMembers = Array.from(document.querySelectorAll(".photo")).map(
  (person) => person.id
);

//listeners on team members avatars
const teamAvatars = document.querySelectorAll(".photo");

teamAvatars.forEach((photo) =>
  photo.addEventListener("click", (e) => {
    teamAvatars.forEach((person) => person.classList.remove("active"));
    e.target.tagName === "DIV"
      ? e.target.classList.add("active")
      : e.target.parentElement.classList.add("active");

    getTodos(e.target.id ? e.target.id : e.target.parentElement.id)
      .then((data) => showTodos(data))
      .catch((err) => console.log(err));
  })
);

// showing data in the DOM
const todoList = document.getElementsByClassName("todoList")[0];
const showTodos = (todos) => {
  todoList.innerHTML = ``;
  todos.forEach((todo) => {
    const html = `
    <div class="card" style="width: 12.5rem;">
        <img src=${
          todo.completed ? "img/green.png" : "img/red.png"
        } class="card-img-top" alt="todo status">
        <div class="card-body" style="position: relative">
          <h5 class="card-title">${todo.title}</h5>
          <p class="card-text">${todo.completed ? "done" : "to be done"}</p>
        </div>
      </div>
    `;
    todoList.innerHTML += html;
  });
};
