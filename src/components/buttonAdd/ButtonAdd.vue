<template>
  <button
    class="mr-2 p-2 rounded-md bg-blue-400 text-white hover:bg-blue-600 font-semibold"
  >
    {{ title }}
  </button>
</template>
<script>
export default {
  name: "ButtonAdd",
  props: {
    title: {
      type: String,
      default: "Add",
    },
  },
};
</script>