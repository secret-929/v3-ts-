<template>
  <div class="content">
    <div class="content">
      <div class="header">
        <h3 class="title">{{ contentConfig?.header?.title ?? '数据列表' }}</h3>
        <el-button v-if="isCreate" type="primary" @click="handleNewUserClick">
          {{ contentConfig?.header?.btnTitle ?? '新建数据' }}
        </el-button>
      </div>
      <div class="table">
        <el-table :data="pageList" border style="width: 100%" v-bind="contentConfig.children">
          <template v-for="item in contentConfig.propsList" :key="item.prop">
            <template v-if="item.type === 'timer'">
              <el-table-column align="center" v-bind="item">
                <template #default="scope">
                  {{ formatUTC(scope.row[item.prop]) }}
                </template>
              </el-table-column>
            </template>
            <template v-else-if="item.type === 'option'">
              <el-table-column align="center" v-bind="item">
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
            </template>
            <template v-else-if="item.type === 'custom'">
              <el-table-column align="center" v-bind="item">
                <template #default="scope">
                  <slot :name="item.slotName" v-bind="scope" :prop="item.prop"></slot>
                </template>
              </el-table-column>
            </template>
            <template v-else>
              <el-table-column align="center" v-bind="item" />
            </template>
          </template>
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
import usePermissions from '@/hooks/usePermissions'

export interface IProps {
  contentConfig: {
    pageName: string
    header?: {
      title?: string
      btnTitle?: string
    }
    propsList: any[]
    children?: any
  }
}

const props = defineProps<IProps>()

const emit = defineEmits(['newClick', 'editClick'])

// 0.获取事否有对应的增删改查的权限
const isCreate = usePermissions(`${props.contentConfig.pageName}:create`)
const isDelete = usePermissions(`${props.contentConfig.pageName}:delete`)
const isUpdate = usePermissions(`${props.contentConfig.pageName}:update`)
const isQuery = usePermissions(`${props.contentConfig.pageName}:query`)

// 1.发起actin，请求usersList数据
const systemStore = useSystemStore()
// 页码
const currentPage = ref(1)
const pageSize = ref(10)

// 监听systemStore中的actions执行
systemStore.$onAction(({ name, after }) => {
  after(() => {
    if (
      name === 'deletePageByIdAction' ||
      name === 'editPageDataAction' ||
      name === 'newPageDataAction'
    ) {
      currentPage.value = 1
    }
  })
})

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
  if (!isQuery) return

  // 获取页码
  const size = pageSize.value
  const offset = (currentPage.value - 1) * size
  const pageInfo = { size, offset }
  const queryInfo = { ...pageInfo, ...formData }
  systemStore.postPageListAction(props.contentConfig.pageName, queryInfo)
}

// 删除
function handleDeleteClick(id: number) {
  systemStore.deletePageByIdAction(props.contentConfig.pageName, id)
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
