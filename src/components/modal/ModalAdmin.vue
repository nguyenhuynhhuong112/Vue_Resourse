<template>
  <div
    class="border-2 w-1/2 h-1/2 rounded-md modal-admin-container bg-white border-blue-300 shadow-md"
  >
    <Notification
      :type="type"
      :message="message"
      v-if="showNotification"
      @close="handleCloseNotification"
    />
    <div class="flex flex-col items-center p-1">
      <div class="w-full flex items-end justify-end">
        <CloseOutlined
          class="text-gray-500 cursor-pointer hover:text-gray-900"
          @click="closeModalAdmin"
        />
      </div>
      <h1 class="text-xl font-semibold">Modal</h1>
      <FormInput :formFields="formFields" ref="formInput" />
      <button
        class="bg-blue-500 text-white p-3 rounded-md mt-2"
        @click="validatForm"
      >
        Submit
      </button>
    </div>
  </div>
</template>
<script>
import { loadDataUser } from "../../services/user.api";
import FormInput from "../form/FormInput.vue";
import Notification from "../notification/Notification.vue";
import { CloseOutlined } from "@ant-design/icons-vue";
import axios from "axios";
export default {
  name: "ModalAdmin",
  components: {
    FormInput,
    Notification,
    CloseOutlined,
  },
  methods: {
    async validatForm() {
      const isValid = this.$refs.formInput.validateFields();
      if (isValid) {
        const findUser = this.dataUser.find(
          (user) =>
            user.email === this.$refs.formInput.formValues.email ||
            user.username === this.$refs.formInput.formValues.username
        );
        if (findUser) {
          this.message = "User already exists";
          this.type = false;
          this.showNotification = true;
          setTimeout(() => {
            this.showNotification = false;
          }, 2000);
          return;
        }
        const response = await axios.post(
          "https://667054bc0900b5f8724a3ee9.mockapi.io/user/user",
          this.$refs.formInput.formValues
        );
        if (response.status === 201) {
          this.message = "Success";
          this.type = true;
          this.showNotification = true;
          setTimeout(() => {
            this.showNotification = false;
          }, 2000);
          this.$refs.formInput.resetFields();
        }
      } else {
        this.message = "Fail";
        this.type = false;
        this.showNotification = true;
      }
    },
    handleCloseNotification() {
      this.showNotification = false;
    },
    closeModalAdmin() {
      this.$emit("close");
    },
  },
  async mounted() {
    this.dataUser = await loadDataUser();
  },
  data() {
    return {
      message: "",
      type: false,
      showNotification: false,
      dataUser: [],
      formFields: [
        {
          name: "email",
          label: "Email",
          attributes: { type: "email", placeholder: "Enter your email" },
          required: true,
        },
        {
          name: "username",
          label: "User Name",
          attributes: { type: "text", placeholder: "Enter your username" },
          required: true,
        },
        {
          name: "password",
          label: "Password",
          attributes: { type: "password", placeholder: "Enter your password" },
          required: true,
        },
        {
          name: "role",
          label: "Role",
          type: "radio",
          options: [
            { value: "admin", label: "Admin" },
            { value: "user", label: "User" },
            { value: "product", label: "Product" },
          ],
          required: true,
        },
      ],
    };
  },
};
</script>
<style scoped>
.modal-admin-container {
  position: fixed;
  top: 60px;
  left: 450px;
  z-index: 1000;
}
</style>