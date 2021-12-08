<template id="Main">
  <div class="container">
    <H1 class="text-center">Todo</H1>
    <!-- task,tag Input -->
    <div class="text-center mt-5">
      <!--TaskInput-->
      <div class="d-flex">
        <input
          v-model="task"
          type="text"
          placeholder="Task here"
          class="form-control text-center"
        />
      </div>
      <br />
      <!--TagInput-->
      <div class="d-flex">
        <input
          v-model="tags"
          type="text"
          placeholder="Tag here,with space in between"
          class="form-control text-center center-block"
        />
      </div>
      <br />
      <!--DateInput-->
      <div class="d-flex">
        <input
          v-model="date"
          type="date"
          placeholder="Date here"
          class="form-control text-center center-block"
        />
      </div>
      <br />
      <button @click="submitTask" class="btn btn-warning">SUMBIT</button>
    </div>
    <!-- filter-->
    <div class="mt-5"><button @click="showAll" class="btn btn-warning">All</button><button @click="showTodo" class="btn btn-warning">Todo</button><button @click="showInProgress" class="btn btn-warning">In-progress</button></div>
    <!-- show tasks -->
    <table class="table table-bordered mt-1">
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
          <template v-if="viewState === 'ALL' || (viewState ==='TODO' && task.status === 'To-do') || (viewState === 'INPROGRESS' && task.status === 'In-progress')">
          <td>
            <!--date-->
            <span>{{ task.date }}</span>
          </td>
          <td>
            <!--name-->
            <span :class="{ taskDone: task.status === 'Done' }">{{
              task.name
            }}</span>
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
              <span v-for="(showtag, index) in task.tags" :key="index"
                >{{ showtag }}<br
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
export default {
  name: "Todo",
  props: {
    msg: String,
  },
  data() {
    return {
      editingTask: null,
      task: "",
      tags: "",
      date: "",
      allStatus: ["To-do", "In-progress", "Done"],
      viewState: "ALL",
      tasks: [],
    };
  },
  methods: {
    addTag() {},
    submitTask() {
      if (this.task.length === 0) {
        return;
      }
      if (this.editingTask !== null) {
        this.tasks[this.editingTask].name = this.task;
        this.tasks[this.editingTask].tags = this.tags.split(" ");
        this.tasks[this.editingTask].date = this.date.replaceAll("-","/");
        this.editingTask = null;
      } else {
        let newTag = this.tags;
        this.tasks.push({
          name: this.task,
          tags: newTag.split(" "),
          status: "To-do",
          date: this.date.replaceAll("-", "/"),
        });
      }
      this.task = "";
      this.tags = "";
      this.date = "";
    },
    deleteTask(index) {
      this.tasks.splice(index, 1);
    },
    editTask(index) {
      this.task = this.tasks[index].name;
      this.tags = this.tasks[index].tags.join(" ");
      this.date = this.tasks[index].date.replaceAll("/", "-");
      this.editingTask = index;
    },
    changeStatus(index) {
      let newIndex = this.allStatus.indexOf(this.tasks[index].status);
      this.tasks[index].status = this.allStatus[(newIndex + 1) % 3];
    },
    showAll()
    {
      this.viewState = "ALL";
    },
    showTodo()
    {
      this.viewState = "TODO";
    },
    showInProgress()
    {
      this.viewState = "INPROGRESS"
    },
  },
};
</script>

<style scoped>
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
.container > * {
  color: white;
}

.center-block {
  display: block;
  margin-right: auto;
  margin-left: auto;
}
</style>
