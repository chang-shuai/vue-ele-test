export const tableOption = {
  'selection': true,
  'border': true,
  'index': false,
  'stripe': true,
  'menuAlign': 'center',
  'align': 'center',
  'editBtn': false,
  'delBtn': false,
  'addBtn': false,
  'searchShow': false,
  'refreshBtn': true,
  'columnBtn': false,
  'searchBtn': true,
  'column': [
    {
      label: '主题编码',
      prop: 'topicId'
    },
    {
      label: '主题名称',
      prop: 'topicName',
      search: true
    },
    {
      label: '标签',
      prop: 'topicTag'
    },
    {
      label: '描述',
      prop: 'topicDesc',
      overHidden: true
    },
    {
      label: '业务模块',
      prop: 'busiModule'
    },
    {
      label: '频次上限',
      prop: 'invokeDayLimit'
    },
    {
      label: '数量上限',
      prop: 'msgDayLimit'
    }
  ]
}
