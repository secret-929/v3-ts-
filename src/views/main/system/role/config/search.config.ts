const searchConfig = {
  pageName: 'role',
  labelWidth: '100px',
  formItems: [
    {
      type: 'input',
      prop: 'name',
      label: '角色名称',
      placeholder: '请输入查询角色名称'
    },
    {
      type: 'input',
      prop: 'intro',
      label: '权限介绍',
      placeholder: '请输入查询角色名称'
    },
    {
      type: 'date-picker',
      prop: 'createAt',
      label: '创建事件'
    }
  ]
}

export default searchConfig
