<template>
  <div
    class="border-2 w-full h-full items-center justify-center flex flex-col bg-white"
  >
    <Notification
      :type="type"
      :message="message"
      v-if="showNotification"
      @close="handleCloseNotification"
    />

    <div
      class="border-2 w-1/2 bg-gray-100 rounded-md flex items-center flex-col h-1/2 justify-center"
    >
      <img src="../assets/login.png" width="50px" class="mb-2" />
      <h1 class="font-bold text-xl text-blue-500">Login</h1>
      <FormInput :formFields="formFields" ref="formInput" />
      <span class="text-red-500">{{ errorMessage }}</span>
      <button
        class="bg-blue-500 text-white p-3 rounded-md mt-2"
        @click="validatForm"
      >
        Login
      </button>
    </div>
  </div>
</template>

<script>
import FormInput from "../components/form/FormInput.vue";
// import { loadDataUser, user } from "../services/user.services";
import Notification from "../components/notification/Notification.vue";
import * as userServices from "../services/user.services";
export default {
  name: "Login",
  components: {
    FormInput,
    Notification,
  },
  data() {
    return {
      dataUser: [],
      errors: {},
      message: "",
      type: false,
      showNotification: false,
      formFields: [
        {
          name: "email",
          label: "Email",
          attributes: { type: "email", placeholder: "Enter your email" },
          required: true,
        },
        {
          name: "password",
          label: "Password",
          attributes: { type: "password", placeholder: "Enter your password" },
          required: true,
        },
      ],
      errorMessage: "",
    };
  },
  async mounted() {
    this.dataUser = await loadDataUser();
    localStorage.clear();
  },
  methods: {
    async validatForm() {
      const isValid = this.$refs.formInput.validateFields();
      if (isValid) {
        const response = await userServices.loginUser(
          this.$refs.formInput.formValues.email,
          this.$refs.formInput.formValues.password
        );
        if (response.data.statusCode === 200) {
          localStorage.setItem("email", this.$refs.formInput.formValues.email);
          localStorage.setItem(
            "role",
            response.data.result.UserRoles[0].Role.roleName
          );
          this.showNotification = true;
          this.message = "Login success!";
          this.type = true;
          this.errorMessage = "";
          this.showNotification = false;
          this.$router.push({ name: "Dashboard" });
        }
      }
    },
    handleCloseNotification() {
      this.showNotification = false;
    },
  },
};
</script>
