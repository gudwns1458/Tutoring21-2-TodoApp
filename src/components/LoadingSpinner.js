export default class LoadingSpinner {
  constructor($target, initialState) {
    this.$target = $target;
    this.state = initialState;
  }

  setState(nextState) {
    this.state = { ...this.state, ...nextState };
    this.render();
  }

  render() {
    this.$target.style.display = this.state.isLoading ? 'block' : 'none';
  }
}