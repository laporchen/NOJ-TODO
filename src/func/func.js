import axios from "axios";
import Task from "../taskClass";
import * as TAG from "../tagClass";
export default {
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
        axios.get("http://127.0.0.1:8081/get_data", {}).then(function (response) {
          if (response.data.status == "success") {
            //console.log(response.data.response);
            response.data.response.forEach((element) => {
              that.tasks.push(Task.from(element));
            });
          }
        });
      },
      methods: {
        submitEdit() {
          let editing = this.tasks[this.editingTask];
          editing.changeName(this.task);
          editing.changeDate(this.date);
          editing.updateTag(TAG.newTags(this.tags));
          this.editingTask = null;
        },
        submitTask() {
          if (this.task.length === 0) {
            return;
          }
          if (this.editingTask !== null) {
            this.submitEdit();
          } else {
            if (this.tasks.find((x) => x.name === this.task) != undefined) {
              alert("You had this thing in your list already.");
              return;
            }
            let tag = TAG.newTags(this.tags);
            this.tasks.push(
              new Task(this.task, this.date.replaceAll("-", "/"), tag, "To-do")
            );
          }
          this.task = "";
          this.tags = "";
          this.date = "";
          this.save();
        },
        deleteTask(index) {
          this.tasks.splice(index, 1);
          this.editingTask = null;
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
          this.tasks[index].tags[tagidx].changeColor(this.colorCount);
          this.save();
        },
        changeStatus(index) {
          let newIndex = this.allStatus.indexOf(this.tasks[index].status);
          this.tasks[index].status = this.allStatus[(newIndex + 1) % 3];
          this.save();
        },
        showStatus(stat) {
          this.viewState = stat;
        },
        async save() {
          let response = await axios.post("http://127.0.0.1:8081/savetoserver", {
            info: JSON.stringify(this.tasks),
          });
          if (response?.data?.status !== "success") {
            throw new Error();
          }
        },
      }
}
