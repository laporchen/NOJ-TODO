<template>
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
</template>

<script>
import "../func/func.js";
export default {
  name: "InputVue",
};
</script>
