import React, { useState } from 'react';
import PropTypes from 'prop-types'
import { TabBar } from 'zarm';
import { useNavigate, useLocation } from 'react-router-dom';
import CustomIcon from '../CustomIcon'
import s from './style.module.less';

const NavBar = ({ showNav }) => {
  const [activeKey, setActiveKey] = useState(useLocation().pathname);
  const navigateTo = useNavigate()

  const changeTab = (path) => {
    setActiveKey(path)
    navigateTo(path)
  }

  return (
    <TabBar visible={showNav} className={s.tab} activeKey={activeKey} onChange={changeTab}>
      <TabBar.Item
        itemKey="/"
        title="账单"
        icon={<CustomIcon type="icon-accountbook" />}
      />
      <TabBar.Item
        itemKey="/data"
        title="统计"
        icon={<CustomIcon type="icon-piechart" />}
      />
      <TabBar.Item
        itemKey="/user"
        title="我的"
        icon={<CustomIcon type="icon-user" />}
      />
    </TabBar>
  )
}

NavBar.propTypes = {
  showNav: PropTypes.bool
}

export default NavBar