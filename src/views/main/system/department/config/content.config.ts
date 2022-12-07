const contentCofig = {
  pageName: 'department',
  header: {
    title: '部门列表',
    btnTitle: '新建部门'
  },
  propsList: [
    { type: 'selection' },
    { type: 'index', label: '序号', width: '60px' },
    { type: 'normal', label: '部门名称', prop: 'name', width: '120px' },
    { type: 'normal', label: '部门领导', prop: 'leader', width: '120px' },
    { type: 'normal', label: '上级部门', prop: 'parentId', width: '120px' },
    {
      type: 'custom',
      label: '部门领导',
      prop: 'leader',
      width: '120px',
      slotName: 'leader'
    },
    { type: 'timer', label: '创建时间', prop: 'createAt' },
    { type: 'timer', label: '更新时间', prop: 'updateAt' },
    { type: 'option', label: '操作', width: '150px' }
  ]
}
export default contentCofig
