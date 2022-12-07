<template>
  <div class="content">
    <div class="content">
      <div class="header">
        <h3 class="title">部门列表</h3>
        <el-button type="primary" @click="handleNewUserClick"> 新建部门 </el-button>
      </div>
      <div class="table">
        <el-table :data="pageList" border style="width: 100%">
          <el-table-column align="center" type="selection" />
          <el-table-column align="center" type="index" label="序号" width="60px" />
          <el-table-column align="center" prop="name" label="部门名称" width="120px" />
          <el-table-column align="center" prop="leader" label="部门领导" width="120px" />
          <el-table-column align="center" prop="parentId" label="上级部门" width="120px" />
          <el-table-column align="center" prop="createAt" label="创建时间">
            <template #default="scope">
              {{ formatUTC(scope.row.createAt) }}
            </template>
          </el-table-column>
          <el-table-column align="center" prop="updateAt" label="更新时间">
            <template #default="scope">
              {{ formatUTC(scope.row.updateAt) }}
            </template>
          </el-table-column>
          <el-table-column align="center" label="操作" width="150px">
            <template #default="scope">
              <el-button
                size="small"
                icon="Edit"
                text
                type="primary"
                @click="handelEditClick(scope.row)"
              >
                编辑
              </el-button>
              <el-button
                size="small"
                icon="Delete"
                text
                type="danger"
                @click="handleDeleteClick(scope.row.id)"
              >
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="pagination">
        <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :page-sizes="[10, 20, 30, 40]"
          small="small"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pageTotalCount"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import useSystemStore from '@/store/main/system/system'
import { storeToRefs } from 'pinia'
import { formatUTC } from '@/utils/formart'
import { ref } from 'vue'

const emit = defineEmits(['newClick', 'editClick'])

// 1.发起actin，请求usersList数据
const systemStore = useSystemStore()
// 页码
const currentPage = ref(1)
const pageSize = ref(10)

fetchPageListData()
// 获取list数据展示
const { pageList, pageTotalCount } = storeToRefs(systemStore)

const handleSizeChange = () => {
  fetchPageListData()
}
function handleCurrentChange() {
  fetchPageListData()
}

// 定义函数，发送网络请求
function fetchPageListData(formData: any = {}) {
  // 获取页码
  const size = pageSize.value
  const offset = (currentPage.value - 1) * size
  const pageInfo = { size, offset }
  const queryInfo = { ...pageInfo, ...formData }
  systemStore.postPageListAction('department', queryInfo)
}

// 删除
function handleDeleteClick(id: number) {
  systemStore.deletePageByIdAction('department', id)
}

// 新建用户
function handleNewUserClick() {
  emit('newClick')
}

// 编辑
function handelEditClick(itemData: any) {
  emit('editClick', itemData)
}

defineExpose({ fetchPageListData })
</script>

<style lang="less" scoped>
.content {
  margin-top: 20px;
  padding: 20px;
  background-color: #fff;
  margin-bottom: 10px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  .title {
    font-size: 22px;
  }
}
.table {
  margin-top: 20px;
  .el-button {
    margin-left: 0;
    padding: 5px 8px;
  }
}
.pagination {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}
</style>
