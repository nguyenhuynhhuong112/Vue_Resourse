<template>
  <div
    class="flex flex-col justify-start min-h-screen w-full mx-2 overflow-y-auto"
  >
    <div class="flex justify-between p-2">
      <h1 class="text-xl font-bold">User Management Page</h1>
      <ButtonAdd title="Add User" @click="handleModalAdmin" />
    </div>
    <ModalAdmin v-if="showModalAdmin" @close="handleModalAdmin" />
    <div class="w-[99%]">
      <TableShowItems />
    </div>
  </div>
</template>
<script>
import TableShowItems from "../components/table/TableShowItems.vue";
import ButtonAdd from "../components/buttonAdd/ButtonAdd.vue";
import ModalAdmin from "../components/modal/ModalAdmin.vue";
export default {
  name: "Admin",
  components: {
    TableShowItems,
    ButtonAdd,
    ModalAdmin,
  },
  data() {
    return {
      showModalAdmin: false,
    };
  },
  methods: {
    handleCloseNotification() {
      this.showNotification = false;
    },
    handleModalAdmin() {
      this.showModalAdmin = !this.showModalAdmin;
    },
  },
};
</script>