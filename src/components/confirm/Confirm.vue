<template>
  <div class="border-2 rounded-md bg-gray-100 confirm-container shadow-xl">
    <div class="flex items-center justify-end p-1">
      <CloseOutlined
        class="text-gray-500 cursor-pointer hover:text-gray-900"
        @click="closeConfirm"
      />
    </div>
    <div class="flex items-center justify-center">
      <h1>{{ message }}</h1>
    </div>
    <div class="flex items-center justify-end my-2 flex-row">
      <div class="w-2/5 flex justify-evenly">
        <button
          class="px-2 py-1 rounded-md bg-blue-400 text-white"
          @click="okConfirm"
        >
          Ok
        </button>
        <button
          class="px-2 py-1 rounded-md bg-white border-gray-200 border-2"
          @click="closeConfirm"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
</template>
  
  <script>
import { CloseOutlined } from "@ant-design/icons-vue";

export default {
  name: "Confirm",
  components: {
    CloseOutlined,
  },
  methods: {
    closeConfirm() {
      this.$emit("close");
    },
    okConfirm() {
      this.$emit("ok", this.id);
    },
  },
  props: {
    id: {
      type: String,
    },
    message:{
        type: String,
        required: true,
    }
  },
};
</script>
  
  <style scoped>
.confirm-container {
  position: fixed;
  top: 160px;
  left: 500px;
  z-index: 1000;
  width: 500px;
}
</style>
  