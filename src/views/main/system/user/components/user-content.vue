<template>
  <div class="content">
    <div class="content">
      <div class="header">
        <h3 class="title">用户列表</h3>
        <el-button v-if="isCreate" type="primary" @click="handleNewUserClick"> 新建用户 </el-button>
      </div>
      <div class="table">
        <el-table :data="usersList" border style="width: 100%">
          <el-table-column align="center" type="selection" />
          <el-table-column align="center" type="index" label="序号" width="60px" />
          <el-table-column align="center" prop="name" label="用户名" width="120px" />
          <el-table-column align="center" prop="realname" label="真实姓名" width="120px" />
          <el-table-column align="center" prop="cellphone" label="电话号码" width="120px" />
          <el-table-column align="center" prop="enable" label="状态" width="80px">
            <!-- 作用域插槽 -->
            <template #default="scope">
              <el-button size="small" :type="scope.row.enable ? 'primary' : 'danger'" plain>
                {{ scope.row.enable ? '启用' : '禁用' }}
              </el-button>
            </template>
          </el-table-column>
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
                v-if="isUpdate"
                size="small"
                icon="Edit"
                text
                type="primary"
                @click="handelEditClick(scope.row)"
              >
                编辑
              </el-button>
              <el-button
                v-if="isDelete"
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
          :total="usersTotalCount"
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
import usePermissions from '@/hooks/usePermissions'

const emit = defineEmits(['newClick', 'editClick'])

// 用户权限判断
const isCreate = usePermissions('users:create')
const isDelete = usePermissions('users:delete')
const isUpdate = usePermissions('users:update')
const isQuery = usePermissions('users:query')

// 1.发起actin，请求usersList数据
const systemStore = useSystemStore()
// 页码
const currentPage = ref(1)
const pageSize = ref(10)

fetchUserListData()
// 获取list数据展示
const { usersList, usersTotalCount } = storeToRefs(systemStore)

const handleSizeChange = () => {
  fetchUserListData()
}
function handleCurrentChange() {
  fetchUserListData()
}

// 定义函数，发送网络请求
function fetchUserListData(formData: any = {}) {
  if (!isQuery) return
  // 获取页码
  const size = pageSize.value
  const offset = (currentPage.value - 1) * size
  const pageInfo = { size, offset }
  const queryInfo = { ...pageInfo, ...formData }
  systemStore.postUsersListAction(queryInfo)
}

// 删除
function handleDeleteClick(id: number) {
  systemStore.deleteUserByIdAction(id)
}

// 新建用户
function handleNewUserClick() {
  emit('newClick')
}

// 编辑
function handelEditClick(itemData: any) {
  emit('editClick', itemData)
}

defineExpose({ fetchUserListData })
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
