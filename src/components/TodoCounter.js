export default class TodoCounter {
    constructor($target) {
        this.$target = $target;
        this.render();

    }

    setState(nextState) {
        this.state = { ...this.state, ...nextState }
        this.render();
    }

    render() {
        this.$target.innerHTML = `
            <span class="todo-count">2 개</span>
            <ul class="filters">
                <li>
                    <a href="#/" class="selected">모두</a>
                </li>
                <li>
                    <a href="#/active">진행중</a>
                </li>
                <li>
                    <a href="#/completed">완료</a>
                </li>
            </ul>
        `;
    }
}