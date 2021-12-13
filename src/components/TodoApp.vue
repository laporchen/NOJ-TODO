<template id="Main">
  <div class="container">
    <H1 class="text-center">Todo</H1>
    <!-- task,tag Input -->
    <div class="text-center mt-5">
      <!--TaskInput-->
      <div class="d-flex justify-content-center">
        <input
          v-model="task"
          type="text"
          placeholder="Task here"
          style="width: 60%"
          class="form-control text-center"
          @keydown.enter="submitTask"
        />
      </div>
      <br />
      <!--TagInput-->
      <div class="d-flex justify-content-center">
        <input
          v-model="tags"
          type="text"
          style="width: 60%"
          placeholder="Tag here,with space in between"
          class="form-control text-center center-block"
        />
      </div>
      <br />
      <!--DateInput-->
      <div class="d-flex justify-content-center">
        <input
          v-model="date"
          type="date"
          style="width: 60%"
          placeholder="Date here"
          class="form-control text-center center-block"
        />
      </div>
      <br />
      <button @click="submitTask" class="btn btn-warning">SUMBIT</button>
    </div>
    <!-- filter-->
    <div class="mt-5 d-flex justify-content-center">
      <div class="d-flex" style="width: 80%">
        <button @click="showAll" style="width: 15%" class="btn btn-warning">All</button>
        <button @click="showTodo" style="width: 15%" class="btn btn-warning">Todo</button>
        <button @click="showInProgress" style="width: 15%" class="btn btn-warning">
          In-progress
        </button>
        <button @click="save" style="width: 15%" class="ms-auto btn btn-warning">
          Save
        </button>
      </div>
    </div>
    <!-- show tasks -->
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
  </div>
</template>

<script>
import axios from "axios";
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
      colors: ["white", "red", "green", "yellow"],
      colorCount: 4,
    };
  },
  mounted() {
    const that = this;
    axios.get("http://127.0.0.1:8080/get_data", {}).then(function (response) {
      if (response.data.status == "success") {
        response.data.response.forEach((element) => {
          that.tasks.push(element);
        });
      }
    });
  },
  methods: {
    submitTask() {
      if (this.task.length === 0) {
        return;
      }
      if (this.editingTask !== null) {
        let editing = this.tasks[this.editingTask];
        editing.name = this.task;
        let newTagObj = [];
        let tagObj = editing.tags;
        this.tags.split(" ").forEach(function (tagKey) {
          let tagIdx = tagObj.findIndex((ele) => ele.tag === tagKey);
          if (tagIdx === -1) {
            newTagObj.push({
              tag: tagKey,
              color: 0,
            });
          } else {
            newTagObj.push({
              tag: tagKey,
              color: editing.tags[tagIdx].color,
            });
          }
        });

        editing.tags = newTagObj;
        editing.date = this.date.replaceAll("-", "/");
        this.editingTask = null;
      } else {
        if (this.tasks.find((x) => x.name === this.task) != undefined) {
          alert("You had this thing in your list already.");
          return;
        }
        let newTag = this.tags.split(" ");
        let tagObj = [];
        newTag.forEach((checkTag) => {
          if (tagObj.find((existTag) => existTag.tag == checkTag) === undefined) {
            tagObj.push({
              tag: checkTag,
              color: 0,
            });
          }
        });
        this.tasks.push({
          name: this.task,
          tags: tagObj,
          status: "To-do",
          date: this.date.replaceAll("-", "/"),
        });
      }
      this.task = "";
      this.tags = "";
      this.date = "";
      this.save();
    },
    deleteTask(index) {
      this.tasks.splice(index, 1);
      this.save();
    },
    editTask(index) {
      let editing = this.tasks[index];
      let tagSTR = editing.tags
        .map(function (element) {
          return element.tag;
        })
        .join(" ");
      this.task = this.tasks[index].name;
      this.tags = tagSTR;
      this.date = this.tasks[index].date.replaceAll("/", "-");
      this.editingTask = index;
    },
    changeTagColor(tagidx, index) {
      console.log(tagidx, index);
      let assignTag = this.tasks[index].tags[tagidx];
      let newColor = (assignTag.color + 1) % this.colorCount;
      assignTag.color = newColor;
    },
    changeStatus(index) {
      let newIndex = this.allStatus.indexOf(this.tasks[index].status);
      this.tasks[index].status = this.allStatus[(newIndex + 1) % 3];
    },
    showAll() {
      this.viewState = "ALL";
    },
    showTodo() {
      this.viewState = "TODO";
    },
    showInProgress() {
      this.viewState = "INPROGRESS";
    },
    save() {
      axios
        .post("http://127.0.0.1:8080/savetoserver", {
          info: JSON.stringify(this.tasks),
        })
        .then(function (response) {
          var status = response.data.status;
          if (status != "success") {
            alert("Error!");
          }
        });
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
.container {
  color: white;
  top: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100vh;
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
