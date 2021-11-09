export default class TodoList {
    constructor($target) {
        this.state = {
            todos: [],
        }

        this.$target = $target;
        this.render();
    }

    setState(nextState) {
        this.state = { ...this.state, ...nextState };
        this.render();
    }

    render() {
        this.$target.innerHTML = this.state.todos
        .map(
            ({ id, title, completed }) =>
             `
            <li data-id="${id}">
                <div class="view">
                    <input class="toggle" type="checkbox">
                    <label>${title}</label>
                    <button class="destroy"></button>
                </div>
            </li>
             `
            )
           .join("");
    }
}