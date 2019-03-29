import React, { Component } from 'react'
import { Card } from 'antd';

import FilterForm from '../../components/BaseForm'


export default class BikeMap extends Component{
    render(){


        const formList=[
            {
                id:0,
                type:"SELECT",
                placeholder:"全部",
                label:"城市",
                optionValues:[
                    {key:0,value:"全部"},
                    {key:1,value:"北京"},
                    {key:2,value:"天津"},
                    {key:3,value:"广州"},
                    {key:4,value:"上海"},
      
                ],
                width:100,
                field:"city_id",
                initialValue:0
  
            },
            {
                id:"1",
                type:"TIME",
                startPlaceholder:"请选择开始时间",
                endPlaceholder:"请选择结束时间"
     
            },
            {
                id:"2",
                type:"SELECT",
                label:"订单状态",
                field:"states",
                width:150,
                initialValue:0,
                optionValues:[
                    {
                        key:0,
                        value:"全部"
                    },
                    {
                        key:1,
                        value:"进行中"
                    },
                    {
                        key:2,
                        value:"进行中(临时锁车)"
                    },
                    {
                        key:3,
                        value:"行程结束"
                    },

                ]

            }
        ]
        return(
           <div>
               <Card>
                   <FilterForm formList={formList}/>
               </Card>
           </div>
        )
    }
}