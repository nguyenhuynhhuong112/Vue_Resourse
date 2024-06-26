<template>
  <div class="flex w-full items-center justify-center">
    <div class="flex w-full flex-col">
      <template v-if="Array.isArray(formFields)">
        <div
          v-for="(field, index) in formFields"
          :key="index"
          class="flex flex-row items-center mt-2 justify-center"
        >
          <label :for="field.name" class="w-1/6 flex flex-row"
            >{{ field.label }}
            <h1 class="text-red-500" v-if="field.required">*</h1></label
          >
          <div class="w-2/5 flex flex-col justify-center">
            <template v-if="field.type === 'radio'">
              <div class="flex flex-row space-x-4">
                <div
                  v-for="option in field.options"
                  :key="option.value"
                  class="flex items-center"
                >
                  <input
                    type="radio"
                    :id="`${field.name}-${option.value}`"
                    :name="field.name"
                    :value="option.value"
                    v-model="formValues[field.name]"
                    class="mr-2"
                  />
                  <label :for="`${field.name}-${option.value}`">{{
                    option.label
                  }}</label>
                </div>
              </div>
            </template>
            <template v-else>
              <input
                v-model="formValues[field.name]"
                :type="field.attributes.type"
                :placeholder="field.attributes.placeholder"
                :id="field.name"
                class="border-2 focus:outline-none border-blue-300 w-full rounded-md p-1"
                @blur="validateField(field)"
              />
            </template>
            <span v-if="errors[field.name]" class="text-red-500 text-sm ml-2">{{
              errors[field.name]
            }}</span>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: "FormInput",
  props: {
    formFields: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      formValues: {},
      errors: {},
    };
  },
  methods: {
    validateFields() {
      this.errors = {};
      let isValid = true;

      this.formFields.forEach((field) => {
        if (field.required && !this.formValues[field.name]) {
          this.errors[field.name] = `${field.label} is required.`;
          isValid = false;
        } else if (field.name === "email") {
          if (!this.validateEmailFormat(this.formValues[field.name])) {
            this.errors[field.name] = `Email must have format @gmail.com.`;
            isValid = false;
          }
        } else if (field.name === "password") {
          if (this.formValues[field.name].length < 8) {
            this.errors[
              field.name
            ] = `Password must have at least 8 characters.`;
            isValid = false;
          }
        }
      });

      return isValid;
    },
    validateEmailFormat(email) {
      const regex = /\S+@\S+\.\S+/;
      return regex.test(email) && email.endsWith("@gmail.com");
    },
    validateField(field) {
      if (field.name === "email") {
        this.validateEmail(field.name);
      } else if (field.name === "password") {
        this.validatePassword(field.name);
      }
    },
    validateEmail(fieldName) {
      if (!this.validateEmailFormat(this.formValues[fieldName])) {
        this.errors[fieldName] = `Email must have format @gmail.com.`;
      } else {
        this.errors[fieldName] = "";
      }
    },
    validatePassword(fieldName) {
      if (this.formValues[fieldName].length < 8) {
        this.errors[fieldName] = `Password must have at least 8 characters.`;
      } else {
        this.errors[fieldName] = "";
      }
    },
    resetFields() {
      this.formValues = {};
      this.errors = {};
    },
  },
};
</script>
