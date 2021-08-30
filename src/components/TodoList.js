import { NONE, FIRST, SECOND } from "../constants/priority.js";

export default class TodoList {
  constructor($target, initialState, toggleTodo, editTodo, removeTodo, changePriority) {
    this.$target = $target;
    this.state = initialState;

    this.$target.addEventListener('click', ({ target }) => {
      const id = target.closest('[data-id]')?.dataset.id;
      if (target.closest('.toggle'))
        toggleTodo(+id);
      if (target.closest('.destroy'))
        removeTodo(+id);
    });

    this.$target.addEventListener('dblclick', ({ target }) => {
      const todoElement = target.closest('li');
      todoElement.classList.add('editing');
    });

    this.$target.addEventListener('keypress', ({ key, target }) => {
      if (key === 'Enter' && target.value !== '') {
        const { id } = target.closest('[data-id]').dataset;
        editTodo(+id, target.value);  
      }
    });

    this.$target.addEventListener('change', ({ target }) => {
      const { id } = target.closest('[data-id]').dataset;
      const { value } = target.options[target.selectedIndex];
      changePriority(id, value);
    });

    this.render();
  }

  setState(nextState) {
    this.state = { ...this.state, ...nextState };
    this.render();
  }

  render() {
    this.$target.innerHTML = this.state.todos
      .map(todo => 
        `
          <li data-id="${todo.id}" ${todo.completed ? 'class="completed"' : ''}>
            <div class="view">
              <input class="toggle" type="checkbox" ${todo.completed ? 'checked' : ''}>
              <label>
                <select class="chip ${todo.priority === FIRST ? 'primary' : todo.priority === SECOND ? 'secondary' : ''}">
                  <option value="NONE" ${todo.priority === NONE ? 'selected' : ''}>순위</option>
                  <option value="FIRST" ${todo.priority === FIRST ? 'selected' : ''}>1순위</option>
                  <option value="SECOND" ${todo.priority === SECOND ? 'selected' : ''}>2순위</option>
                </select>
                ${todo.title}
              </label>
              <button class="destroy"></button>
            </div>
            <input class="edit" value="${todo.title}" />
          </li>
        `  
      )
      .join('');
  }
}