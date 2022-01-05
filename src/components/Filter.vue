<template>
 <div class="mt-5 d-flex justify-content-center">
      <div class="d-flex" style="width: 80%">
        <button
          @click="showStatus('ALL')"
          style="width: 15%"
          class="btn btn-warning"
        >
          All
        </button>
        <button
          @click="showStatus('TODO')"
          style="width: 15%"
          class="btn btn-warning"
        >
          Todo
        </button>
        <button
          @click="showStatus('INPROGRESS')"
          style="width: 15%"
          class="btn btn-warning"
        >
          In-progress
        </button>
        <button
          @click="save"
          style="width: 15%"
          class="ms-auto btn btn-warning"
        >
          Save
        </button>
      </div>
    </div>
</template>

<script>
import '../func/func.js'
 export default {
   name :"FilterVue"
 }
</script>