export default class LoadingSpinner {
    constructor($target) {
        this.state = {
            show: false,
        };



        this.$target = $target;
        this.render();
    }

    setState(nextState) {
        this.state = { ...this.state, ...nextState }
        this.render();
    }

    render() {
        this.$target.style.display = this.state.show ? "block" : "none";
    }
}