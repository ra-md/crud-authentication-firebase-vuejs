<template>
  <div class="todoListStyle">
    <div v-if="loading">
      <p>loading...</p>
    </div>
    <div v-else>
      <div v-for="todo in todos" :key="todo.id">
        <TodoItem :todo="todo"/>
      </div>
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
      todos: [],
      loading: true
    }
  },
  created() {
      todoCollection.orderBy('date', 'desc').onSnapshot(querySnapshot => {  
        
        this.todos = []
        
        querySnapshot.docs.forEach(doc => {
          this.loading = false
          
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