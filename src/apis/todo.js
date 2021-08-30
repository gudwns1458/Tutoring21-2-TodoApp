import { http } from "./index.js";

export const todoAPI = {
  fetchTodos() {
    return http.get('todos');
  },

  getOneTodo(id) {
    return http.get(`todos/${id}`);
  },

  getTodosCount() {
    return http.get('todos/count');
  },

  addTodo(title) {
    return http.post('todos', { title });
  },

  modifyTodos(todo) {
    return http.put('todos', todo);
  },

  modifyTodo(id, todo) {
    return http.put(`todos/${id}`, todo);
  },

  removeTodo(id) {
    return http.delete(`todos/${id}`);
  }
}