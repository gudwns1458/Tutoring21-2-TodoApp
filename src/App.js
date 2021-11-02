import TodoInput from "./components/todoInput.js";
import TodoList from "./components/todoList.js";
import TodoCounter from "./components/TodoCounter.js";
import LoadingSpinner from "./components/LoadingSpinner.js";

import { $, $$ } from "./utils/dom.js"
import { ALL, ACTIVE, COMPLETED } from "./constants/todo.js";

class App {
    constructor() {
        this.state = {
            todos: [],
            filter: ALL,
        }

        this.todoinput = new TodoInput($("input.new-todo"), this.addTodo);
        this.todoList = new TodoList($("ul.todo-list"));
        this.todoCounter = new TodoCounter($("footer.footer"), this.filterTodos);
        this.loadingSpinner = new LoadingSpinner($("div#overlay"));
    }

    addTodo = (title) => {
        const newTodo = { id: Date.now(), title, completed: false };
        this.setState({ todos: this.state.todos.concat(newTodo) });
    };

    toggleTodo = () => {};
 
    editTodo = () => {};

    removeTodo = () => {};

    filterTodos = () => {};

    setState(nextState) {
        this.state = { ...this.state, ...nextState };
        this.todoList.setState({ ...this.state });
    }
}

window.onload = () => {
    new App();
};