<template>
  <div id="app">
  <div class="container">
  <H1 color="white" class="text-center">Todo</H1>
  <input-vue></input-vue>
  <filter-vue></filter-vue>
  <task-vue></task-vue>
  </div>
  </div>
</template>

<script>
import InputVue from './components/Input.vue'
import FilterVue from './components/Filter.vue'
import TaskVue from './components/Task.vue'
export default {
  name: 'App',
  components: {
    InputVue,
    FilterVue,
    TaskVue
  }
}
</script>
<style>
#app
{
  background: #003865;
  height: 100vh;
}
.container {
  color: white;
  top: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100vh;
}
.pointer {
  cursor: pointer;
}
.taskDone {
  text-decoration: line-through;
}
.TextTodo {
  color: red;
}
.TextProgress {
  color: orange;
}
.TextDone {
  color: rgb(0, 202, 0);
}

.center-block {
  display: block;
  margin-right: auto;
  margin-left: auto;
}
th {
  color: white;
}
table * {
  color: white;
}
</style>

