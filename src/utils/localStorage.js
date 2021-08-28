const getTodos = () => {
  const todos = JSON.parse(localStorage.getItem('todos')) ?? [];
  return todos;
}

const addTodos = (todo) => {
  const todos = JSON.parse(localStorage.getItem('todos'));
  localStorage.setItem('todos', JSON.stringify(todos.concat(todo)));
}

const removeTodos = (id) => {
  const todos = JSON.parse(localStorage.getItem('todos'));
  localStorage.setItem('todos', JSON.stringify(todos.filter(todo => todo.id !== id)));  
}