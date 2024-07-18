<template>
  <div
    class="border-2 w-1/2 rounded-md modal-admin-container bg-white border-blue-300 shadow-md"
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
      <h1 class="text-xl font-semibold">{{ title }}</h1>
      <FormInput
        :formFields="formFields"
        ref="formInput"
        :formValues="formValues"
      />
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
import FormInput from "../form/FormInput.vue";
import Notification from "../notification/Notification.vue";
import { CloseOutlined } from "@ant-design/icons-vue";
import userService from "../../services/user.services";
export default {
  name: "ModalAdmin",
  components: {
    FormInput,
    Notification,
    CloseOutlined,
  },
  props: {
    title: {
      type: String,
      default: "Modal Admin",
    },
    dataUser: {
      type: Array,
      required: true,
      default: () => [],
    },
    id: {
      type: String,
    },
  },
  data() {
    return {
      message: "",
      type: false,
      showNotification: false,
      user: {},
      prevUser: {},
      formValues: {},
      formFields: [
        {
          name: "email",
          label: "Email",
          attributes: { type: "email", placeholder: "Enter your email" },
          required: true,
        },
        {
          name: "userName",
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
          name: "roleId",
          label: "Role",
          type: "radio",
          options: [
            { value: "1", label: "Admin" },
            { value: "2", label: "User" },
            { value: "3", label: "Product" },
          ],
          required: true,
        },
      ],
    };
  },
  mounted() {
    if (this.id) this.loadUserUpdate();
  },
  methods: {
    loadUserUpdate() {
      const user = this.dataUser.find((user) => user.userId === this.id);
      if (user) {
        this.formValues = { ...user, roleId: user.UserRoles[0].roleId };
      }
    },
    async createUser() {
      const response = await userService.createUser(
        this.$refs.formInput.formValues
      );
      if (response.data.statusCode === 200) {
        this.message = "Success";
        this.type = true;
        this.showNotification = true;

        const newUser = {
          ...response.data.result,
          role:
            this.$refs.formInput.formValues.roleId === "1"
              ? "admin"
              : this.$refs.formInput.formValues.roleId === "2"
              ? "user"
              : "product",
        };
        this.$emit("user-created", newUser);
        this.$refs.formInput.resetFields();
      }
    },

    async updateUser() {
      const dataUpdate = {};
      for (const key in this.$refs.formInput.formValues) {
        if (this.$refs.formInput.formValues[key] !== this.prevUser[key]) {
          dataUpdate[key] = this.$refs.formInput.formValues[key];
        }
      }

      if (Object.keys(dataUpdate).length === 0) {
        this.message = "No data change";
        this.type = false;
        this.showNotification = true;
        return;
      }

      const response = await userService.updateUser(this.id, dataUpdate);
      if (response.data.statusCode === 200) {
        this.message = "Success";
        this.type = true;
        this.showNotification = true;
        const updatedUser = {
          ...this.$refs.formInput.formValues,
          role:
            this.$refs.formInput.formValues.roleId === "1"
              ? "admin"
              : this.$refs.formInput.formValues.roleId === "2"
              ? "user"
              : "product",
          UserRoles: [
            {
              Role: {
                roleName:
                  this.$refs.formInput.formValues.roleId === "1"
                    ? "admin"
                    : this.$refs.formInput.formValues.roleId === "2"
                    ? "user"
                    : "product",
              },
            },
          ],
        };
        this.$emit("update-user", updatedUser);
      }
    },

    async validatForm() {
      const isValid = this.$refs.formInput.validateFields();
      if (isValid) {
        if (this.id) {
          await this.updateUser();
        } else {
          await this.createUser();
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
