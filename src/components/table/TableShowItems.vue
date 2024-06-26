<template>
  <div class="table-container w-full flex-col">
    <div class="table-row header">
      <div
        v-for="(column, index) in columns"
        :key="index"
        class="table-cell flex-1 p-2 uppercase font-semibold"
      >
        <h1>{{ column }}</h1>
      </div>
    </div>

    <div v-for="(item, rowIndex) in data" :key="rowIndex" class="table-row">
      <div
        v-for="(column, colIndex) in columns"
        :key="colIndex"
        class="table-cell flex-1 p-2 text-ellipsis text-wrap"
      >
        <h1 v-if="column !== 'actions'">{{ item[column] }}</h1>
        <div v-else>
          <slot name="actions" :item="item"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TableShowItems",
  props: {
    columns: {
      type: Array,
      required: true,
    },
    data: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped>
.table-container {
  display: flex;
  flex-direction: column;
}

.table-row {
  display: flex;
  border-bottom: 1px solid #ccc;
}

.header {
  background-color: #f5f5f5;
}

.table-cell {
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #ddd;
  flex: 1;
}
</style>
