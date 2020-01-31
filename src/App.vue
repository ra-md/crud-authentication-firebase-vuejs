<template>
  <div id="app">
    <AddTodo />
    <TodoList />
  </div>
</template>

<script>
import TodoList from './components/TodoList.vue'
import AddTodo from './components/AddTodo.vue';

export default {
  name: 'app',
  components: {
    AddTodo,
    TodoList
  }
}
</script>

<style>
  button {
    font-size: 1.25em;
    border: none;
    background: none;
    outline-color: #2196F3;
  }

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: auto;
  width: 720px;
}
</style>
