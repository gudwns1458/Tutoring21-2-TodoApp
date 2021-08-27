import { ACTIVE, ALL, COMPLETED } from "../constants/state.js";

export default class TodoCount {
  constructor($target, initialState, changeFilter) {
    this.$target = $target;
    this.state = initialState;

    this.$target.addEventListener('click', e => {
      e.preventDefault();
      const { filter } = e.target.closest('[data-filter]').dataset;
      changeFilter(filter);
    })

    this.render();
  }

  setState(nextState) {
    this.state = { ...this.state, ...nextState };
    this.render();
  }

  render() {
    this.$target.innerHTML = 
    `
      <span class="todo-count">${this.state.todos.length} 개</span>
      <ul class="filters">
        <li data-filter="ALL">
          <a href="#/" ${this.state.filter === ALL ? 'class="selected"' : ''}>모두</a>
        </li>
        <li data-filter="ACTIVE">
          <a href="#/active" ${this.state.filter === ACTIVE ? 'class="selected"' : ''}>진행중</a>
        </li>
        <li data-filter="COMPLETED">
          <a href="#/completed" ${this.state.filter === COMPLETED ? 'class="selected"' : ''}>완료</a>
        </li>
      </ul>
    `;
  }
}