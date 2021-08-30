import TodoInput from "./components/TodoInput.js";
import TodoAllToggle from "./components/TodoAllToggle.js";
import TodoList from "./components/TodoList.js";
import TodoCount from "./components/TodoCount.js";
import LoadingSpinner from "./components/LoadingSpinner.js";

import { $ } from "./utils/selector.js";
import { todoAPI } from "./apis/todo.js";
import { ALL, ACTIVE, COMPLETED, PRIORITY } from "./constants/state.js";

class App {
  constructor() {
    this.create();  
  }

  async create() {
    this.loadingSpinner = new LoadingSpinner($('#overlay'), { isloading: false });
    this.loadingOn();
    this.state = {
      filter: ALL,
      todos: await todoAPI.fetchTodos()
    }
    this.loadingOff();
    this.todoInput = new TodoInput($('.new-todo'), this.addTodo);
    this.todoAllToggle = new TodoAllToggle($('.toggle-all'), this.toggleAllTodos);
    this.todoList = new TodoList(
      $('.todo-list'), 
      this.state,
      this.toggleTodo,
      this.editTodo,
      this.removeTodo,
      this.changePriority
    );
    this.todoCount = new TodoCount($('.footer'), this.state, this.changeFilter);
  }

  async setState(nextState) {
    this.state = { 
      ...this.state, 
      ...nextState,
      todos: await this.fetchTodos()
    };
    this.todoList.setState({
      ...this.state,
      todos: this.filteredTodos(this.state.todos)
    });
    this.todoCount.setState({
      ...this.state,
      todos: this.filteredTodos(this.state.todos)
    }); 
  }

  addTodo = async (title) => {
    this.loadingOn();
    await todoAPI.addTodo(title);
    this.loadingOff();
    this.setState();
  }

  editTodo = async (id, title) => {
    const todo = this.state.todos.find(todo => todo.id === id);
    this.loadingOn();
    await todoAPI.modifyTodo(id, { ...todo, title });
    this.loadingOff();
    this.setState();
  }

  removeTodo = async (id) => {
    this.loadingOn();
    await todoAPI.removeTodo(id);
    this.loadingOff();
    this.setState();
  }

  toggleTodo = async (id) => {
    const todo = this.state.todos.find(todo => todo.id === id);
    this.loadingOn();
    await todoAPI.modifyTodo(id, { ...todo, completed: !todo.completed });
    this.loadingOff();
    this.setState();
  }

  toggleAllTodos = async () => {
    this.loadingOn();
    if (this.state.todos.every(({ completed }) => completed))
      await todoAPI.modifyTodos({ completed: false })
    else
      await todoAPI.modifyTodos({ completed: true })  
    this.loadingOff();
    this.setState();
  }

  changeFilter = (filter) => {
    this.setState({ filter });
  }

  filteredTodos() {
    const priority = {
      'NONE': 0,
      'FIRST': 2,
      'SECOND': 1
    };

    return this.state.filter !== PRIORITY ? 
    this.state.todos
      .filter(({ completed }) => {
        switch (this.state.filter) {
          case ALL:
            return true;
          case ACTIVE:
            return !completed
          case COMPLETED:
            return completed
        }
      }) :
    this.state.todos.sort((a, b) => priority[b.priority] - priority[a.priority]);
  }

  async fetchTodos() {
    this.loadingOn();
    const todos = todoAPI.fetchTodos();
    this.loadingOff();
    return todos;
  }

  saveTodos(todos) {
    localStorage.setItem('todos', JSON.stringify(todos));
  }

  changePriority = async (id, priority) => {
    const todo = this.state.todos.find(todo => todo.id === id);
    this.loadingOn();
    await todoAPI.modifyTodo(id, { ...todo, priority });
    this.loadingOff();
    this.setState()
  }

  loadingOn() {
    this.loadingSpinner.setState({ isLoading: true });
  }

  loadingOff() {
    this.loadingSpinner.setState({ isLoading: false });
  }
}

window.onload = () => {
  new App();
};