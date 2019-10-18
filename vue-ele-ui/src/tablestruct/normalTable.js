import { getTopic } from '@/api/msg'
async function topicIsExist(rule, value, callback) {
  console.log(rule)
  const { data: { msg, code, data } } = await getTopic(value)
  if (msg === 'success' && code === 0) {
    if (data != null) {
      // 验证不通过, 存在此编码
      callback(new Error('主题编码已存在'))
    } else {
      // 验证通过
      callback()
    }
  }
}
export const tableOption = {
  'selection': true,
  'border': false,
  'index': false,
  'stripe': true,
  'menuAlign': 'center',
  'align': 'center',
  'editBtn': false,
  'delBtn': false,
  'addBtn': false,
  'searchShow': false,
  'saveBtnTitle': '申请',
  'refreshBtn': true,
  'columnBtn': false,
  'searchBtn': true,
  'menuWidth': 130,
  'menuType': 'text',
  'column': [
    {
      label: '主题编码',
      prop: 'topicId',
      vali: true,
      rules: [{
        required: true,
        message: '请输入编码',
        trigger: 'blur'
      }, {
        validator: topicIsExist,
        trigger: 'blur'
      }]

    },
    {
      label: '主题名称',
      prop: 'topicName',
      search: true,
      rules: [{
        required: true,
        message: '请输入名称',
        trigger: 'blur'
      }]
    },
    {
      label: '标签',
      prop: 'topicTag',
      hide: true,
      rules: [{
        required: true,
        message: '请输入标签',
        trigger: 'blur'
      }]
    },
    {
      label: '描述',
      prop: 'topicDesc',
      overHidden: true,
      rules: [{
        required: true,
        message: '请输入描述',
        trigger: 'blur'
      }]
    },
    {
      label: '状态',
      prop: 'topicStatus',
      valueDefault: '2',
      addVisdiplay: false,
      hide: true
    },
    {
      label: '业务模块',
      prop: 'busiModule',
      type: 'select',
      rules: [{
        required: true,
        message: '请选择业务模块',
        trigger: 'blur'
      }],
      dicData: [
        {
          label: '订货',
          value: 1
        }, {
          label: '消费者',
          value: 2
        }, {
          label: '贷款',
          value: 3
        }, {
          label: '支付',
          value: 4
        }, {
          label: '聚合',
          value: 5
        }, {
          label: '其他',
          value: 6
        }
      ]

    },
    {
      label: '频次',
      addVisdiplay: false,
      prop: 'invokeDayCount',
      hide: true
    },
    {
      label: '频次上限',
      prop: 'invokeDayLimit',
      width: 110,
      type: 'select',
      solt: true,
      rules: [{
        required: true,
        message: '请选择每日的频次上限',
        trigger: 'blur'
      }],
      dicData: [{
        label: '100/天',
        value: '100'
      }, {
        label: '1000/天',
        value: '1000'
      }]
    },
    {
      label: '数量',
      addVisdiplay: false,
      prop: 'msgDayCount',
      hide: true

    },
    {
      label: '数量上限',
      prop: 'msgDayLimit',
      width: 110,
      type: 'select',
      solt: true,
      rules: [{
        required: true,
        message: '请选择每日的数量上限',
        trigger: 'blur'
      }],
      dicData: [{
        label: '100/天',
        value: '100'
      }, {
        label: '1000/天',
        value: '1000'
      }]
    },
    {
      label: '消费进度',
      prop: 'consumerProcess',
      addVisdiplay: false
    },
    {
      label: '审核时间',
      prop: 'auditTime',
      addVisdiplay: false
    }
  ]
}
