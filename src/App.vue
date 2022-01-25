<template>
  <div id="app">
      <todo-app></todo-app>
  </div>
</template>

<script>
import TodoApp from './components/TodoApp.vue'

export default {
  name: 'App',
  components: {
    TodoApp
  }
}
</script>
<style scoped>
#app
{
  background: #003865;
  height: 100vh;
}
</style>

