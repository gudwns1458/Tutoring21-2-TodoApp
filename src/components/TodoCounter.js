import {ALL, ACTIVE, COMPLETED} from "../constants/todo.js"

export default class TodoCounter {
    constructor($target, changeFilter) {
        this.state ={
            count: 0,
            filter: ALL,
        };
        this.$target = $target;
        this.$target.addEventListener('click', ({ target }) => {
            const filterEl = target.closest("[data-filter]");
            if (filterEl) {
                const { filter } = filterEl.dataset;               
                changeFilter(filter);
            }
        });


        this.render();

    }

    setState(nextState) {
        this.state = { ...this.state, ...nextState }
        this.render();
    }

    render() {
        this.$target.innerHTML = `
            <span class="todo-count">${this.state.count} 개</span>
            <ul class="filters">
                <li data-filter="ALL">
                    <a href="#/" ${
                        this.state.filter === ALL ? 'class="selected"' : ""
                }>모두</a>
                </li>
                <li data-filter="ACTIVE">
                    <a href="#/active" ${
                        this.state.filter === ACTIVE ? 'class="selected"' : ""
                    }>진행중</a>
                </li>
                <li data-filter="COMPLETED">
                    <a href="#/completed" ${
                        this.state.filter === COMPLETED ? 'class="selected"' : ""
                    }>완료</a>
                </li>
            </ul>
        `;
    }
}