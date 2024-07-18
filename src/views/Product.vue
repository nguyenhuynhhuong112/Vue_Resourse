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
      <h1 class="text-xl font-bold">Product Management Page</h1>
      <ButtonAdd title="Add Product" @click="handleModalProduct" />
    </div>
    <ModalProduct
      :title="title"
      v-if="showModalAdmin"
      @close="handleModalProduct"
      :dataProduct="dataProduct"
      @product-created="addProductToTable"
      :id="idProduct"
      @update-product="updateProductToTable"
    />
    <div class="w-[99%]">
      <TableShowItems :columns="columns" :data="dataProduct">
        <template v-slot:actions="{ item }">
          <button
            class="p-1 rounded-md mr-2 bg-blue-500 text-white"
            @click="handleUpdate(item.productId)"
          >
            Update
          </button>
          <button
            class="bg-red-500 text-white p-1 rounded-md"
            @click="handleDelete(item.productId)"
          >
            Delete
          </button>
        </template>
      </TableShowItems>
    </div>
    <Confirm
      @close="handleCloseConfirm"
      v-if="showConfirm"
      :id="deletingProductId"
      @ok="handleConfirm"
      :message="messageConfirm"
    />
  </div>
</template>

<script>
import TableShowItems from "../components/table/TableShowItems.vue";
import ButtonAdd from "../components/buttonAdd/ButtonAdd.vue";
import ModalProduct from "../components/modal/ModalProduct.vue";
import Notification from "../components/notification/Notification.vue";
import Confirm from "../components/confirm/Confirm.vue";
import productService from "../services/product.services";

export default {
  name: "Product",
  components: {
    TableShowItems,
    ButtonAdd,
    ModalProduct,
    Notification,
    Confirm,
  },
  data() {
    return {
      showModalAdmin: false,
      columns: [
        "productId",
        "productName",
        "price",
        "type",
        "website",
        "actions",
      ],
      dataProduct: [],
      message: "",
      type: false,
      showNotification: false,
      showConfirm: false,
      deletingProductId: null,
      messageConfirm: "",
      idProduct: null,
      title: "",
    };
  },
  async mounted() {
    this.dataProduct = await productService.loadDataProduct();
  },
  methods: {
    handleModalProduct() {
      this.showModalAdmin = !this.showModalAdmin;
      this.idProduct = null;
      this.title = "Add Product";
    },
    handleCloseNotification() {
      this.showNotification = false;
    },
    handleCloseConfirm() {
      this.showConfirm = false;
      this.deletingProductId = null;
    },
    addProductToTable(newProduct) {
      this.dataProduct.push(newProduct);
    },
    updateProductToTable(productUpdate) {
      this.dataProduct = this.dataProduct.map((product) => {
        if (product.productId === productUpdate.productId) {
          return productUpdate;
        }
        return product;
      });
    },
    handleUpdate(id) {
      this.idProduct = id;
      this.showModalAdmin = !this.showModalAdmin;
      this.title = "Update Product";
    },
    handleDelete(id) {
      this.deletingProductId = id;
      this.showConfirm = true;
      this.messageConfirm = "Are you sure want to delete this product?";
    },
    async handleConfirm(id) {
      const response = await productService.deleteProduct(id);
      if (response.status === 200) {
        this.dataProduct = this.dataProduct.filter(
          (product) => product.productId !== id
        );
        this.message = "Delete Success";
        this.type = true;
        this.showNotification = true;
      }
      this.showConfirm = false;
      this.deletingProductId = null;
    },
  },
};
</script>
