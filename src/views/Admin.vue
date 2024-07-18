<template>
  <div
    class="flex flex-col justify-start min-h-screen w-full mx-2 overflow-y-auto"
  >
    <Notification
      :type="type"
      :message="message"
      v-if="showNotification"
      @close="handleCloseNotification"
    />
    <div class="flex justify-between p-2">
      <h1 class="text-xl font-bold">User Management Page</h1>
      <ButtonAdd title="Add User" @click="handleModalAdmin" />
    </div>
    <ModalAdmin
      :title="title"
      v-if="showModalAdmin"
      @close="handleModalAdmin"
      :dataUser="dataUser"
      @user-created="addUserToTable"
      :id="idUser"
      @update-user="updateUserToTable"
    />
    <div class="w-[99%]">
      <TableShowItems :columns="columns" :data="dataUser">
        <template v-slot:actions="{ item }">
          <button
            class="p-1 rounded-md mr-2 bg-blue-500 text-white"
            @click="handleUpdate(item.userId)"
          >
            Update
          </button>
          <button
            class="bg-red-500 text-white p-1 rounded-md"
            @click="handleDelete(item.userId)"
          >
            Delete
          </button>
        </template>
      </TableShowItems>
    </div>
    <Confirm
      @close="handleCloseConfirm"
      v-if="showConfirm"
      :id="deletingUserId"
      @ok="handleConfirm"
      :message="messageConfirm"
    />
  </div>
</template>

<script>
import TableShowItems from "../components/table/TableShowItems.vue";
import ButtonAdd from "../components/buttonAdd/ButtonAdd.vue";
import ModalAdmin from "../components/modal/ModalAdmin.vue";
import userService from "../services/user.services";
import Notification from "../components/notification/Notification.vue";
import Confirm from "../components/confirm/Confirm.vue";

export default {
  name: "Admin",
  components: {
    TableShowItems,
    ButtonAdd,
    ModalAdmin,
    Notification,
    Confirm,
  },
  data() {
    return {
      showModalAdmin: false,
      columns: ["userId", "role", "userName", "email", "actions"],
      dataUser: [],
      message: "",
      type: false,
      showNotification: false,
      showConfirm: false,
      deletingUserId: null,
      messageConfirm: "",
      idUser: null,
      title: "",
    };
  },
  async mounted() {
    this.dataUser = (await userService.loadDataUser()).map((user) => {
      return {
        ...user,
        role: user.UserRoles[0].Role.roleName,
      };
    });
  },
  methods: {
    handleModalAdmin() {
      this.showModalAdmin = !this.showModalAdmin;
      this.idUser = null;
      this.title = "Add User";
    },
    handleCloseNotification() {
      this.showNotification = false;
    },
    handleCloseConfirm() {
      this.showConfirm = false;
      this.deletingUserId = null;
    },
    addUserToTable(newUser) {
      this.dataUser.push(newUser);
    },
    updateUserToTable(userUpdate) {
      this.dataUser = this.dataUser.map((user) => {
        if (user.userId === userUpdate.userId) {
          return userUpdate;
        }
        return user;
      });
    },
    handleUpdate(id) {
      this.idUser = id;
      this.showModalAdmin = !this.showModalAdmin;
      this.title = "Update User";
    },
    handleDelete(id) {
      this.deletingUserId = id;
      this.showConfirm = true;
      this.messageConfirm = "Are you sure want to delete this user?";
    },
    async handleConfirm(id) {
      const findUser = this.dataUser.find((user) => user.userId === id);
      if (findUser.role === "admin") {
        this.message = "You are not authorized";
        this.type = false;
        this.showNotification = true;

        return;
      }
      const response = await userService.deleteUser(id);
      if (response.data.statusCode === 200) {
        this.dataUser = this.dataUser.filter((user) => user.userId !== id);
        this.message = "Delete Success";
        this.type = true;
        this.showNotification = true;
      }
      this.showConfirm = false;
      this.deletingUserId = null;
    },
  },
};
</script>
