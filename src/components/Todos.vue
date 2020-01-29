<template>
  <div>
    <!-- name filenya ?????? -->
  </div>
</template>

<script>
// import TodoList from './TodoList.vue';
import { todoCollection } from '@/firebase.js';

export default {
  components: {
    // TodoList
  },
  data() {
    return {
      todos: []
    }
  },
  created() {
      todoCollection.onSnapshot(querySnapshot => {
        querySnapshot.forEach(doc => {
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