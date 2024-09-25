<template>
    <div class="flex gap-0">
        <el-tooltip
            class="box-item"
            effect="dark"
            content="View Data"
            placement="top"
        >
            <el-button
            type="success"
            :icon="View"
            size="small"
            class="w-6 h-6"
            @click="$router.push({name: 'DetailUser', params: { id:columnVal.id }})"
            />
        </el-tooltip>
        <el-tooltip
            class="box-item"
            effect="dark"
            content="Update Data"
            placement="top"
        >
            <el-button
            type="primary"
            :icon="Edit"
            size="small"
            class="w-6 h-6"
                
            @click="$router.push({name: 'UpdateUser', params: { id:columnVal.id }})"
            />
        </el-tooltip>

        <el-tooltip
            class="box-item"
            effect="dark"
            content="Remove Data"
            placement="top"
        >
            <el-button
            type="danger"
            :icon="Delete"
            size="small"
            class="w-6 h-6"
                
            @click="handleDelete(columnVal.id)"
            />
        </el-tooltip>
    </div>
    <remove-data-dialog
      :api-route="apiRoute"
      :id="deletedId"
      :visible="dialogVisible"
      v-on:update:visible="(e) => { dialogVisible = e}"
      @reloadData="emit('reloadData')"
    />
</template>

<script setup lang="ts">
import {ref} from 'vue'
import {
  Delete,
  Edit,
  View,
} from '@element-plus/icons-vue'

import RemoveDataDialog from '/@/components/dialog/RemoveDataDialog.vue'
import { apiRoute } from '../../pages/master/user/components/FormHelper'
import useEventsBus from '/@/composables/useEventsBus';

const dialogVisible = ref(false)
const deletedId = ref()
const { emit } = useEventsBus()

/**
 * Show delete confirmation
 * @param rowId
 */
 const handleDelete = (rowId: number) => {
  dialogVisible.value = true
  deletedId.value = rowId
}

const props = defineProps(['params'])
const columnVal = ref(props.params.data)
</script>