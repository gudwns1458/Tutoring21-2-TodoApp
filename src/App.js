import TodoInput from "./components/TodoInput.js";
import TodoAllToggle from "./components/TodoAllToggle.js";
import TodoList from "./components/TodoList.js";
import TodoCount from "./components/TodoCount.js";

import { $ } from "./utils/selector.js";
import { ALL, ACTIVE, COMPLETED } from "./constants/state.js";

class App {
  constructor() {
    this.state = {
      todos: [],
      filter: ALL
    };

    this.todoInput = new TodoInput($('.new-todo'), this.addTodo);
    this.todoAllToggle = new TodoAllToggle($('.toggle-all'), this.toggleAllTodos);
    this.todoList = new TodoList(
      $('.todo-list'), 
      this.state, 
      this.toggleTodo,
      this.editTodo,
      this.removeTodo
    );
    this.todoCount = new TodoCount($('.footer'), this.state, this.changeFilter); 
  }

  setState(nextState) {
    this.state = { ...this.state, ...nextState };
    this.todoList.setState({
      ...this.state,
      todos: this.filteredTodos(this.state.todos)
    });
    this.todoCount.setState({
      ...this.state,
      todos: this.filteredTodos(this.state.todos)
    }); 
  }

  addTodo = (title) => {
    const newTodo = { id: +Date.now(), title, completed: false };
    this.setState({ todos: this.state.todos.concat(newTodo) });
  }

  editTodo = (id, title) => {
    this.setState({
      todos: this.state.todos.map(todo => todo.id !== id ? todo : { ...todo, title })
    });
  }

  removeTodo = (id) => {
    this.setState({
      todos: this.state.todos.filter(todo => todo.id !== id)
    });
  }

  toggleTodo = (id) => {
    this.setState({
      todos: this.state.todos.map(todo => todo.id !== id ? todo : { ...todo, completed: !todo.completed })
    });
  }

  toggleAllTodos = () => {
    this.setState({
      todos: this.state.todos.every(({ completed }) => completed) ?
      this.state.todos.map(todo => ({ ...todo,  completed: false })) :
      this.state.todos.map(todo => ({ ...todo,  completed: true }))
    });
  }

  changeFilter = (filter) => {
    this.setState({ filter });
  }

  filteredTodos() {
    return this.state.todos
      .filter(({ completed }) => {
        switch (this.state.filter) {
          case ALL:
            return true;
          case ACTIVE:
            return !completed
          case COMPLETED:
            return completed
        }
      });
  }
}

window.onload = () => {
  new App();
}