<template>
  <div>
    <div v-for="todo in todos" :key="todo.id">
      <TodoItem :todo="todo"/>
    </div>
  </div>
</template>

<script>
import { todoCollection } from '@/firebase.js';

import TodoItem from './TodoItem.vue';

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
        
        this.todos = []
        
        querySnapshot.docs.forEach(doc => {
          let obj = {
            id: doc.id,
            title: doc.data().title,
            completed: doc.data().completed
          }

          this.todos.push(obj)
        })

      })
  }
}
</script>