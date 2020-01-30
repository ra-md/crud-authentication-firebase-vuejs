<template>
  <div>
    <div v-for="todo in todos" :key="todo.id">
      <TodoItem :todo="todo"/>
    </div>
  </div>
</template>

<script>
import TodoItem from './TodoItem.vue';
import { todoCollection } from '@/firebase.js';

export default {
  components: {
    TodoItem
  },
  data() {
    return {
      todos: []
    }
  },
  created() {
      todoCollection.onSnapshot(querySnapshot => {

        querySnapshot.docs.forEach(doc => {
          let obj = {
            id: doc.id,
            title: doc.data().title,
            completed: doc.data().completed
          }

          this.todos.unshift(obj)
        })

      })
  }
}
</script>