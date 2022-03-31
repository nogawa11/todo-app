const submitBtn = document.querySelector(".btn-submit")
const todoList = document.querySelector(".todo-list")
const count = document.querySelector('#count');
const allBtn = document.querySelector(".btn-all")
const activeBtn = document.querySelector(".btn-active")
const completedBtn = document.querySelector(".btn-completed")
const clearBtn = document.querySelector(".btn-clear")


const todoCount = (param) => {
  const allCount = todoList.querySelectorAll('.todo-item').length;
  const completedCount = todoList.querySelectorAll('.completed').length;
  if (param ==='all') {
    count.innerText = allCount;
  } else if (param === 'active') {
    count.innerText = (allCount - completedCount) || 0;
  } else if (param === 'completed') {
    count.innerText = completedCount;
  }
}

todoCount('all');
allBtn.classList.add('active')

submitBtn.addEventListener("click", (event) => {
  event.preventDefault();
  addTodo();
});

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
  const text = todoItem.querySelector('h3');
  const todoCheck = todoItem.querySelector('.todo-check');
  const deleteBtn = todoItem.querySelector('.btn-delete');
  return [todoItem, label, text, todoCheck, deleteBtn];
}

const addTodo = () => {
  const todoContent = document.querySelector(".todo-input").value;
  const [todoItem, label, text, todoCheck, deleteBtn] = createTodo(todoContent);
  todoList.append(todoItem)
  todoCount('all');
  allBtn.classList.add('active')
  activeBtn.classList.remove('active')
  completedBtn.classList.remove('active')

  const todoItems = document.querySelectorAll(".todo-item");
  todoItems.forEach((item) => {
    item.style.display = 'block';
  })

  todoItem.addEventListener('click', (event) => {
    if (event.target === label || label.querySelector('input')) {
        if (label.querySelector('input').checked) {
          todoItem.classList.add('completed');
          text.classList.add('strike');
        } else {
          text.classList.remove('strike');
          todoItem.classList.add('completed');
        }
    }
    if (event.target === deleteBtn || event.target === deleteBtn.querySelector('svg')) {
      removeTodo(todoItem);
      todoCount('all');
    }
  });
}

const removeTodo = (todoItem) => {
  todoItem.remove();
}

allBtn.addEventListener("click", (event) => {
  event.preventDefault();
  const todoItems = document.querySelectorAll(".todo-item");
  todoItems.forEach((item) => {
    item.style.display = 'block';
  })
  todoCount('all');
  allBtn.classList.add('active')
  activeBtn.classList.remove('active')
  completedBtn.classList.remove('active')
})

activeBtn.addEventListener("click", (event) => {
  event.preventDefault();
  const todoItems = document.querySelectorAll(".todo-item");
  todoItems.forEach((item) => {
    item.style.display = 'block';
  })
  const completedTodoItems = document.querySelectorAll(".completed");
  completedTodoItems.forEach((item) => {
    item.style.display = 'none';
  })
  todoCount('active');
  activeBtn.classList.add('active')
  allBtn.classList.remove('active')
  completedBtn.classList.remove('active')
})

completedBtn.addEventListener("click", (event) => {
  event.preventDefault();
  const todoItems = document.querySelectorAll(".todo-item");
  todoItems.forEach((item) => {
    item.style.display = 'none';
  })
  const completedTodoItems = document.querySelectorAll(".completed");
  completedTodoItems.forEach((item) => {
    item.style.display = 'block';
  })
  todoCount('completed');
  completedBtn.classList.add('active')
  activeBtn.classList.remove('active')
  allBtn.classList.remove('active')
})

clearBtn.addEventListener("click", (event) => {
  event.preventDefault();
  const completedTodoItems = document.querySelectorAll(".completed");
  completedTodoItems.forEach((item) => {
    item.remove();
  })
  todoCount('all');
  allBtn.classList.add('active')
  activeBtn.classList.remove('active')
  completedBtn.classList.remove('active')
})
