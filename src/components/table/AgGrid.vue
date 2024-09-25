<!-- src/components/UserTable.vue -->
<template>
    <ag-grid-vue
      style="width: 100%; height: 500px"
      :class="themeClass"
      :columnDefs="colDefs"
      :rowData="store.tableData.data"
      :defaultColDef="defaultColDef"
      :pagination="true"
      :rowHeight="rowHeight"
      @cell-value-changed="onCellValueChanged"
    />
</template>

<script setup>
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { onMounted, ref } from 'vue';
import { AgGridVue } from 'ag-grid-vue3';
import ImageProfile from './ImageProfile.vue'
import Action from './Action.vue'
import Role from './Role.vue'
import userStore from '/@/store/module/user';

const store = userStore();

const colDefs = [
    { field: 'profile_picture_url', headerName: '', minWidth: 100, maxWidth: 200, flex: 1, cellRenderer: ImageProfile },
    { field: 'name', headerName: 'Nama' },
    { field: 'email' },
    { field: 'role_name', headerName: 'Role', cellRenderer: Role },
    { field: 'action', width: 100, cellRenderer: Action, pinned: 'right' },
];

const defaultColDef = {
    filter: true,
    cellStyle: {
        'height': '100%',
        'display': 'flex ',
        'align-items': 'center ',

    },
    minWidth: 200, maxWidth: 400, flex: 2
};

const onCellValueChanged = (event) => {
    console.log(`New Cell Value: ${event.value}`);
};

onMounted(async () => {
    await store.fetchDataTable();
});

const themeClass = 'ag-theme-quartz';
const rowHeight = 72;
</script>

<style scoped>
.ag-theme-quartz {
    --ag-foreground-color: rgb(46, 46, 46);
    --ag-background-color: rgb(255, 255, 255);
    --ag-header-foreground-color: rgb(255, 255, 255);
    --ag-header-background-color: rgb(19, 102, 88);
    --ag-odd-row-background-color: rgb(0, 0, 0, 0.03);
    --ag-header-column-resize-handle-color: rgb(255, 123, 0);
    --ag-icon-font-color-menu: rgb(255, 255, 255);

    --ag-font-size: 13px;
}
</style>
  