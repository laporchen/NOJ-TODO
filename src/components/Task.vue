<template>
  <div class="d-flex justify-content-center">
    <table class="table table-bordered mt-1 table" style="width: 80%">
      <thead>
        <tr>
          <th scope="col" style="width: 10%">Due Date</th>
          <th scope="col" style="width: 45%">Task</th>
          <th scope="col" style="width: 20%">Status</th>
          <th scope="col" style="width: 15%">Tags</th>
          <th scope="col" class="text-center" style="width: 5%">#</th>
          <th scope="col" class="text-center" style="width: 5%">#</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(task, index) in tasks" :key="index">
          <template
            v-if="
              viewState === 'ALL' ||
              (viewState === 'TODO' && task.status === 'To-do') ||
              (viewState === 'INPROGRESS' && task.status === 'In-progress')
            "
          >
            <td>
              <!--date-->
              <span>{{ task.date }}</span>
            </td>
            <td>
              <!--name-->
              <span :class="{ taskDone: task.status === 'Done' }">{{ task.name }}</span>
            </td>
            <td>
              <!--status-->
              <span
                @click="changeStatus(index)"
                class="pointer"
                :class="{
                  TextTodo: task.status === 'To-do',
                  TextProgress: task.status === 'In-progress',
                  TextDone: task.status === 'Done',
                }"
                >{{ task.status }}</span
              >
            </td>
            <td>
              <!--tag-->
              <div class="text-center pointer">
                <span
                  @click="changeTagColor(idx, index)"
                  v-for="(showtag, idx) in task.tags"
                  :key="idx"
                  :style="{ color: colors[task.tags[idx].color] }"
                  >{{ showtag.tag }}<br
                /></span>
              </div>
            </td>
            <td>
              <!--edit-->
              <div class="text-center pointer" @click="editTask(index)">
                <span class="fa fa-pen"></span>
              </div>
            </td>
            <td>
              <!--delete-->
              <div class="text-center pointer" @click="deleteTask(index)">
                <span class="fa fa-trash"></span>
              </div>
            </td>
          </template>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import "../func/func.js";
export default {
  name: "TaskVue",
};
</script>
