export default class TodoAllToggle {
  constructor($target, toggleAllTodos) {
    $target.addEventListener('click', () => toggleAllTodos());
  }
}