// 编写好规则
export const rules = {
  name: [
    {
      required: true,
      message: '请输入用户名~',
      trigger: 'blur'
    }
  ],
  password: [
    {
      required: true,
      message: '请输入密码~',
      trigger: 'blur'
    }
  ],
  validation: [
    {
      required: true,
      message: '请输入验证码~',
      trigger: 'blur'
    }
  ]
}
