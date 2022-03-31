const input = document.querySelector("input");
const todoList = document.querySelector(".todo-list");
const allComplete = document.querySelector(".all-complete");
const count = document.querySelector("#count");
const modeBtn = document.querySelector(".btn-mode");
const allBtn = document.querySelector(".btn-all");
const activeBtn = document.querySelector(".btn-active");
const completedBtn = document.querySelector(".btn-completed");
const clearBtn = document.querySelector(".btn-clear");
const btns = [allBtn, activeBtn, completedBtn];

input.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    const todoContent = document.querySelector(".todo-input").value;
    addTodo(todoContent, "active");
    input.value = "";
  }
});

const todoCount = () => {
  const allItems = document.querySelectorAll(".todo-item").length;
  const completedItems = document.querySelectorAll(".completed").length;
  if (allBtn.classList.contains("active")) {
    count.innerText = allItems;
  } else if (activeBtn.classList.contains("active")) {
    count.innerText = (allItems - completedItems);
  } else if (completedBtn.classList.contains("active")) {
    count.innerText = completedItems;
  }
  shouldDisplayNone(allItems);
}

const shouldDisplayNone = (num) => {
  if (num === 0) {
    allComplete.style.display = "flex";
  } else {
    allComplete.style.display = "none";
  }
}

const deactivateBtns = () => {
  btns.forEach((btn) => {
    btn.classList.remove("active");
  });
}

const displayAllItems = () => {
  const todoItems = document.querySelectorAll(".todo-item");
  todoItems.forEach((todoItem) => {
    todoItem.style.display = "flex";
  })
  deactivateBtns();
  allBtn.classList.add("active");
  todoCount();
}

allBtn.addEventListener("click", (event) => {
  event.preventDefault();
  displayAllItems();
})

activeBtn.addEventListener("click", (event) => {
  event.preventDefault();
  const todoItems = document.querySelectorAll(".todo-item");
  todoItems.forEach((item) => {
    item.style.display = "flex";
  })
  const completedTodoItems = document.querySelectorAll(".completed");
  completedTodoItems.forEach((item) => {
    item.style.display = "none";
  })
  deactivateBtns();
  activeBtn.classList.add("active");
  todoCount();
})

completedBtn.addEventListener("click", (event) => {
  event.preventDefault();
  const todoItems = document.querySelectorAll(".todo-item");
  todoItems.forEach((item) => {
    item.style.display = "none";
  })
  const completedTodoItems = document.querySelectorAll(".completed");
  completedTodoItems.forEach((item) => {
    item.style.display = "flex";
  })
  deactivateBtns();
  completedBtn.classList.add("active");
  todoCount();
})

clearBtn.addEventListener("click", (event) => {
  event.preventDefault();
  const completedTodoItems = document.querySelectorAll(".completed");
  completedTodoItems.forEach((item) => {
    item.remove();
    console.log(item.textContent);
  })
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    let results = JSON.parse(localStorage.getItem(key));
    if (results[1] === "completed") {
      localStorage.removeItem(key);
    }
  }
  displayAllItems();
})

const createTodo = (todoContent, status) => {
  const todoItem = document.createElement("div");
  let item = [];
  if (status === "active") {
    todoItem.className = "todo-item draggable";
    todoItem.innerHTML = `
      <div class="todo-left">
        <button class="btn-checkbox">
          <i class="fas fa-check" style="display: none;"></i>
        </button>
        <h4>${todoContent}</h4>
      </div>
      <button class="btn-delete" style="display: none;">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18"><path fill="#494C6B" fill-rule="evenodd" d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"/></svg>
      </button>
    `;
    item = [todoContent, "active"];
  } else if (status === "completed") {
    todoItem.className = "todo-item completed draggable";
    todoItem.innerHTML = `
      <div class="todo-left">
        <button class="btn-checkbox checked">
          <i class="fas fa-check" style="display: block;"></i>
        </button>
        <h4>${todoContent}</h4>
      </div>
      <button class="btn-delete" style="display: none;">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18"><path fill="#494C6B" fill-rule="evenodd" d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"/></svg>
      </button>
    `;
    item = [todoContent, "completed"];
  }
  const checkboxBtn = todoItem.querySelector(".btn-checkbox");
  const deleteBtn = todoItem.querySelector(".btn-delete");
  return [todoItem, checkboxBtn, deleteBtn, item];
}

const addTodo = (todoContent, status) => {
  const [todoItem, checkboxBtn, deleteBtn, item] = createTodo(todoContent, status);
  let updatedItem = item;
  todoList.append(todoItem);
  localStorage.setItem(todoContent, JSON.stringify(item));
  displayAllItems();

  todoItem.addEventListener("click", (event) => {
    if (event.target === checkboxBtn || checkboxBtn.querySelector("i")) {
        if (!checkboxBtn.classList.contains("checked")) {
          checkboxBtn.classList.add("checked");
          todoItem.classList.add("completed");
          checkboxBtn.querySelector("i").style.display = "block";
          updatedItem = JSON.parse(localStorage.getItem(todoContent));
          updatedItem[1] = "completed";
          localStorage.setItem(todoContent, JSON.stringify(updatedItem));
          if (activeBtn.classList.contains("active")) {
            todoItem.style.display = "none";
            todoCount();
          }
        } else if (checkboxBtn.classList.contains("checked")) {
          checkboxBtn.classList.remove("checked");
          todoItem.classList.remove("completed");
          checkboxBtn.querySelector("i").style.display = "none";
          updatedItem = JSON.parse(localStorage.getItem(todoContent));
          updatedItem[1] = "active";
          localStorage.setItem(todoContent, JSON.stringify(updatedItem));
          if (completedBtn.classList.contains("active")) {
            todoItem.style.display = "none";
            todoCount();
          }
        }
    }
    if (event.target === deleteBtn || event.target === deleteBtn.querySelector("svg")) {
      removeTodo(todoItem);
      localStorage.removeItem(todoContent);
      todoCount();
    }
  });
}

const removeTodo = (todoItem) => {
  todoItem.remove();
}

modeBtn.addEventListener("click", (event) => {
  const body = document.querySelector("body");
  body.classList.toggle("dark");
});

window.storageSession = () => {
  localStorage.clear();
}

window.addEventListener("DOMContentLoaded", (event) => {
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    let results = JSON.parse(localStorage.getItem(key));
    if (results[1] === "active") {
      addTodo(results[0], "active");
    } else if (results[1] === "completed") {
      addTodo(results[0], "completed");
    }
  }
  displayAllItems();
});
