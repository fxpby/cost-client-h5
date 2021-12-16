import React, { useState, useEffect } from 'react'
import '@/App.css'
import {
  Routes,
  Route,
  useLocation
} from 'react-router-dom'
import routes from '@/router'
import {ConfigProvider} from 'zarm'
import zhCN from 'zarm/lib/config-provider/locale/zh_CN'
import NavBar from '@/components/NavBar'

function App() {
  // 获取 location 实例
  const location = useLocation()

  // 获取当前路径
  const {pathname} = location

  // 需要底部导航栏的路径
  const needNav = ['/', '/data', '/user']

  const [showNav, setShowNav] = useState(false)

  useEffect(() => {
    setShowNav(needNav.includes(pathname))
  }, [pathname])

  return <>
    <ConfigProvider primaryColor={'#007fff'} locale={zhCN}>
      <Routes>
        {
          routes.map(route => 
            <Route exact key={route.path} path={route.path} element={<route.component />} />
          )
        }
      </Routes>
    </ConfigProvider>
    <NavBar showNav={showNav}/>
  </>
}

export default App
