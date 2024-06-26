<template>
  <div class="notification-container">
    <div :class="notificationContentClass">
      <div class="items-center flex justify-end p-2">
        <CloseOutlined class="text-gray-500 cursor-pointer hover:text-gray-900" @click="closeNotification" />
      </div>
      <div class="w-full flex flex-col items-center">
        <CheckCircleOutlined v-if="type" class="text-green-500 text-5xl" />
        <CloseCircleOutlined v-if="!type" class="text-red-500 text-5xl" />
        <h1>{{ message }}</h1>
      </div>
    </div>
  </div>
</template>

<script>
import { CheckCircleOutlined, CloseOutlined, CloseCircleOutlined } from "@ant-design/icons-vue";

export default {
  name: "Notification",
  components: {
    CheckCircleOutlined,
    CloseOutlined,
    CloseCircleOutlined,
  },
  props: {
    message: {
      type: String,
      required: true,
    },
    type: {
      type: Boolean,
      required: true,
    },
  },
  computed: {
    notificationContentClass() {
      return {
        'notification-content': true,
        'border-green': this.type,
        'border-red': !this.type,
      };
    },
  },
  methods: {
    closeNotification() {
      this.$emit('close');
    },
  },
};
</script>

<style scoped>
.notification-container {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1000;
  width: 400px;
}

.notification-content {
  background-color: #ffffff;
  border-radius: 0.375rem;
  display: flex;
  flex-direction: column;
  height: 10rem;
}

.border-green {
  border: 2px solid #3CB371;
}

.border-red {
  border: 2px solid #FF0000;
}
</style>
