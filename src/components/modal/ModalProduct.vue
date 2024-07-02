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
import { createProduct, updateProduct } from "../../services/product.api";
import FormInput from "../form/FormInput.vue";
import Notification from "../notification/Notification.vue";
import { CloseOutlined } from "@ant-design/icons-vue";
export default {
  name: "ModalProduct",
  components: {
    FormInput,
    Notification,
    CloseOutlined,
  },
  props: {
    title: {
      type: String,
      default: "Modal Product",
    },
    dataProduct: {
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
      product: {},
      formValues: {},
      formFields: [
        {
          name: "name",
          label: "Product Name",
          attributes: { type: "text", placeholder: "Enter your product name" },
          required: true,
        },
        {
          name: "type",
          label: "Type",
          attributes: { type: "text", placeholder: "Enter your type product" },
          required: true,
        },
        {
          name: "price",
          label: "Price",
          attributes: { type: "number", placeholder: "Enter your price" },
          required: true,
        },
        {
          name: "website",
          label: "Website",
          attributes: { type: "text", placeholder: "Enter your website" },
          required: true,
        },
      ],
    };
  },
  mounted() {
    if (this.id) this.loadProductUpdate();
  },
  methods: {
    loadProductUpdate() {
      const product = this.dataProduct.find((product) => product.id === this.id);
      if (product) {
        this.formValues = { ...product };
      }
    },
    async createProduct() {
      const response = await createProduct(this.$refs.formInput.formValues);
      console.log("response create: ", response)
      if (response.status === 200) {
        this.message = "Success";
        this.type = true;
        this.showNotification = true;
        setTimeout(() => {
          this.showNotification = false;
        }, 2000);
        this.$refs.formInput.resetFields();
        this.$emit("product-created", response.data.data);
      }
    },
    async updateProduct() {
      const response = await updateProduct(
        this.id,
        this.$refs.formInput.formValues
      );
      if (response.status === 200) {
        this.message = "Success";
        this.type = true;
        this.showNotification = true;
        setTimeout(() => {
          this.showNotification = false;
        }, 2000);
        this.$emit("update-product", response.data.data);
      }
    },
    async validatForm() {
      const isValid = this.$refs.formInput.validateFields();
      if (isValid) {
        if (this.id) {
          await this.updateProduct();
        } else {
          await this.createProduct();
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
  