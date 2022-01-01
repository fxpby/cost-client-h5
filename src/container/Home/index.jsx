import React, { useState } from 'react'
import { Icon } from 'zarm'
import dayjs from 'dayjs'

import s from './style.module.less'
import BillItem from '@/components/BillItem'

const Home = () => {
  const [list, setList] = useState([
    {
      bills: [
        {
          amount: '25.00',
          date: '2021-12-30 02:33:09',
          id: 9111,
          pay_type: 1,
          remark: '',
          type_id: 1,
          type_name: '餐饮日常'
        },
      ],
      date: '2021-12-30 02:33:09'
    }
  ])

  return <div className={s.home}>
    <div className={s.header}>
      <div className={s.dataWrap}>
        <span className={s.expense}>总支出：
          <b>250$</b>
        </span>
        <span className={s.income}>总收入：
          <b>250$</b>
        </span>
      </div>
      <div className={s.typeWrap}>
        <div className={s.left}>
          <span className={s.title}>类型
            <Icon className={s.arrow} type='arrow-bottom'/>
          </span>
        </div>
        <div className={s.right}>
          <span className={s.time}>2022-06
            <Icon className={s.arrow} type='arrow-bottom'/>
          </span>
        </div>
      </div>
    </div>
    <div className={s.contentWrap}>
      {
        list.map((item, index) => <BillItem bill={item} key={index}/>)
      }
    </div>
  </div>
}

export default Home