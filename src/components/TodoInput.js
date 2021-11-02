export default class TodoInput {
    constructor($target, addTodo) {
        $target.addEventListener("keypress", ({ key, target }) => {
            if (key === "Enter" && target.value) {
                addTodo(target.value);
                target.value = " ";
            }
        });
    }
}