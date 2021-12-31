import React,{ useState, useCallback } from 'react'
import { Cell, Input, Button, Checkbox, Toast } from 'zarm'
import CustomIcon from '@/components/CustomIcon'
import Captcha from 'react-captcha-code'
import { post } from '@/utils'
import cx from 'classnames'

import s from './style.module.less'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [verify, setVerify] = useState('')
  const [captcha, setCaptcha] = useState('')

  // 登录/注册类型切换
  const [pageType, setPageType] = useState('login')

  const handleChange = useCallback((captcha) => {
    setCaptcha(captcha)
  }, [])

  const onSubmit = async () => {
    if (pageType === 'login') {
      try {
        const { data } = await post('/api/user/login', {
          username,
          password
        })
        localStorage.setItem('token', data.token)
      } catch (e) {
        Toast.show(e && e.msg)
        return
      }
    } else {
      if (!username) {
        Toast.show('请输入账号')
        return
      }
  
      if (!password) {
        Toast.show('请输入密码')
        return
      }
  
      if (!verify) {
        Toast.show('请输入验证码')
        return
      }
  
      if (verify !== captcha) {
        Toast.show('验证码错误')
        return
      }
  
      try {
        const {data} = await post('/api/user/register', {
          username,
          password
        })
        Toast.show('注册成功🎈')
        setPageType('login')
      } catch (e) {
        Toast.show(e && e.msg)
      }
    }
  }

  return <div className={s.auth}>
    <div className={s.head}></div>
    <div className={s.tab}>
      <span className={cx({ [s.active]: pageType === 'login' })} onClick={() => setPageType('login')}>登录</span>
      <span className={cx({ [s.active]: pageType === 'register' })} onClick={() => setPageType('register')}>注册</span>
    </div>
    <div className={s.form}>
      <Cell icon={<CustomIcon type="icon-user"/>}>
        <Input
          clearable
          type="text"
          placeholder="请输入账号"
          onChange={(value) => setUsername(value)}
        />
      </Cell>
      <Cell icon={<CustomIcon type="icon-password"/>}>
        <Input
          clearable
          type="password"
          placeholder="请输入密码"
          onChange={(value) => setPassword(value)}
        />
      </Cell>
      {
        pageType === 'register' 
        ? <Cell icon={<CustomIcon type="icon-password"/>}>
            <Input
              clearable
              type="text"
              placeholder="请输入验证码"
              onChange={(value) => setVerify(value)}
            />
            <Captcha charNum={4} onChange={handleChange} />
          </Cell>
        : null
      }
    </div>
    <div className={s.operation}>
      {
        pageType === 'register'
        ? <div className={s.agree}>
            <Checkbox />
            <label className="text-light">阅读并同意
              <a>阅读条款啦啦啦</a>
            </label>
          </div>
        : null
      }
      <Button block theme="primary" onClick={onSubmit}>{pageType === 'register' ? '注册' : '登录'}</Button>
    </div>
  </div>
}

export default Login