const todoList = document.querySelector(".todo-list")
const count = document.querySelector('#count');
const allBtn = document.querySelector(".btn-all")
const activeBtn = document.querySelector(".btn-active")
const completedBtn = document.querySelector(".btn-completed")
const clearBtn = document.querySelector(".btn-clear")
const btns = [allBtn, activeBtn, completedBtn]
const input = document.querySelector("input")
const allComplete = document.querySelector(".all-complete")

input.addEventListener("keyup", (event) => {
  if (event.key === 'Enter') {
    event.preventDefault();
    addTodo();
  }
});

const todoCount = () => {
  count.innerText = todoList.querySelectorAll('.display').length;
  if (todoList.querySelectorAll('.display').length === 0) {
    allComplete.style.display = 'flex';
  } else {
    allComplete.style.display = 'none';
  }
}

const deactivateBtns = () => {
  btns.forEach((btn) => {
    btn.classList.remove('active');
  });
}

const displayAllItems = () => {
  const todoItems = document.querySelectorAll(".todo-item");
  todoItems.forEach((item) => {
    item.style.display = 'flex';
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
    item.style.display = 'flex';
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
    item.style.display = 'flex';
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
    <div class="todo-left">
      <button class="btn-checkbox">
        <i class="fas fa-check"></i>
      </button>
      <h4>${todoContent}</h4>
    </div>
    <button class="btn-delete">
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18"><path fill="#494C6B" fill-rule="evenodd" d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"/></svg>
    </button>
  `;
  const checkboxBtn = todoItem.querySelector('.btn-checkbox');
  const deleteBtn = todoItem.querySelector('.btn-delete');
  return [todoItem, checkboxBtn, deleteBtn];
}

const addTodo = () => {
  const todoContent = document.querySelector(".todo-input").value;
  const [todoItem, checkboxBtn, deleteBtn] = createTodo(todoContent);
  todoList.append(todoItem)
  displayAllItems();

  todoItem.addEventListener('click', (event) => {
    if (event.target === checkboxBtn || checkboxBtn.querySelector('i')) {
        if (!checkboxBtn.classList.contains('checked')) {
          checkboxBtn.classList.add('checked')
          todoItem.classList.add('completed');
          console.log('checked!')
          if (activeBtn.classList.contains('active')) {
            todoItem.style.display = 'none';
            todoItem.classList.remove('display')
            todoCount();
          }
        } else if (checkboxBtn.classList.contains('checked')) {
          checkboxBtn.classList.remove('checked')
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
