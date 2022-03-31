const todoList = document.querySelector(".todo-list")
const count = document.querySelector('#count');
const submitBtn = document.querySelector(".btn-submit")
const allBtn = document.querySelector(".btn-all")
const activeBtn = document.querySelector(".btn-active")
const completedBtn = document.querySelector(".btn-completed")
const clearBtn = document.querySelector(".btn-clear")
const btns = [allBtn, completedBtn, clearBtn]

const todoCount = () => {
  count.innerText = todoList.querySelectorAll('.display').length;
}

const deactivateBtns = () => {
  btns.forEach((btn) => {
    btn.classList.remove('active');
  });
}

const displayAllItems = () => {
  const todoItems = document.querySelectorAll(".todo-item");
  todoItems.forEach((item) => {
    item.style.display = 'block';
    item.classList.add('display');
  })
  deactivateBtns();
  allBtn.classList.add('active')
  todoCount();
}

displayAllItems();

allBtn.addEventListener("click", (event) => {
  event.preventDefault();
  displayAllItems();
})

activeBtn.addEventListener("click", (event) => {
  event.preventDefault();
  const todoItems = document.querySelectorAll(".todo-item");
  todoItems.forEach((item) => {
    item.style.display = 'block';
    item.classList.add('display')
  })
  const completedTodoItems = document.querySelectorAll(".completed");
  completedTodoItems.forEach((item) => {
    item.style.display = 'none';
    item.classList.remove('display')
  })
  deactivateBtns();
  activeBtn.classList.add('active')
  todoCount();
})

completedBtn.addEventListener("click", (event) => {
  event.preventDefault();
  const todoItems = document.querySelectorAll(".todo-item");
  todoItems.forEach((item) => {
    item.style.display = 'none';
    item.classList.remove('display')
  })
  const completedTodoItems = document.querySelectorAll(".completed");
  completedTodoItems.forEach((item) => {
    item.style.display = 'block';
    item.classList.add('display')
  })
  deactivateBtns();
  completedBtn.classList.add('active')
  todoCount();
})

clearBtn.addEventListener("click", (event) => {
  event.preventDefault();
  const completedTodoItems = document.querySelectorAll(".completed");
  completedTodoItems.forEach((item) => {
    item.remove();
  })
  displayAllItems();
})

const createTodo = (todoContent) => {
  const todoItem = document.createElement('div');
  todoItem.className = 'todo-item';
  todoItem.innerHTML = `
    <label for="status" class="todo-check-label">
    <input type="checkbox" name="status" class="todo-check">
    <h3>${todoContent}</h3>
    <button class="btn-delete">
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18"><path fill="#494C6B" fill-rule="evenodd" d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"/></svg>
    </button>
  `;
  const label = todoItem.querySelector('label');
  const deleteBtn = todoItem.querySelector('.btn-delete');
  return [todoItem, label, deleteBtn];
}

const addTodo = () => {
  const todoContent = document.querySelector(".todo-input").value;
  const [todoItem, label, deleteBtn] = createTodo(todoContent);
  todoList.append(todoItem)
  displayAllItems();

  todoItem.addEventListener('click', (event) => {
    if (event.target === label || label.querySelector('input')) {
        if (label.querySelector('input').checked) {
          todoItem.classList.add('completed');
          if (activeBtn.classList.contains('active')) {
            todoItem.style.display = 'none';
            todoItem.classList.remove('display')
            todoCount();
          }
        } else if (!label.querySelector('input').checked) {
          todoItem.classList.remove('completed');
          if (completedBtn.classList.contains('active')) {
            todoItem.style.display = 'none';
            todoItem.classList.remove('display')
            todoCount();
          }
        }
    }
    if (event.target === deleteBtn || event.target === deleteBtn.querySelector('svg')) {
      removeTodo(todoItem);
      todoCount();
    }
  });
}

const removeTodo = (todoItem) => {
  todoItem.remove();
}

submitBtn.addEventListener("click", (event) => {
  event.preventDefault();
  addTodo();
});
