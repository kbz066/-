import React, { Component } from 'react'
import { Card } from 'antd';
import { Chart, Axis, Tooltip, Geom, Legend } from 'bizcharts';

import DataSet from "@antv/data-set"


export default class Bar extends Component {
    render() {

        const data = [
            {
                week: "周一",
                sales: 1000
            },
            {
                week: "周二",
                sales: 2000
            },
            {
                week: "周三",
                sales: 1500
            },
            {
                week: "周四",
                sales: 3000
            },
            {
                week: "周五",
                sales: 2000
            },
            {
                week: "周六",
                sales: 1200
            },
            {
                week: "周日",
                sales: 800
            },

        ];


        const data2 = [
            {
                name: 'OFO',
                "周一": 2000,
                "周二": 3000,
                "周三": 5500,
                "周四": 7000,
                "周五": 8000,
                "周六": 12000,
                "周日": 20000,
            },
            {
                name: '摩拜',
                "周一": 1500,
                "周二": 3000,
                "周三": 4500,
                "周四": 6000,
                "周五": 8000,
                "周六": 10000,
                "周日": 15000,

            },
            {
                name: '小蓝',
                "周一": 1000,
                "周二": 2000,
                "周三": 2500,
                "周四": 4000,
                "周五": 6000,
                "周六": 7000,
                "周日": 8000,

            },
        ];

        const ds = new DataSet();
        const dv = ds.createView().source(data2);

        dv.transform({
            type: "fold",
            fields: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
            // 展开字段集
            key: "key",
            // key字段
            value: "value", // value字段

        });



        return (
            <div>
                <Card title="柱形图 1">
                    <Chart height={500} data={data} forceFit>
                        <Axis name="week" />
                        <Axis name="sales" />
                        <Tooltip
                            crosshairs={{
                                type: "y"
                            }}
                        />
                        <Geom
                            type="interval"
                            position="week*sales"
                            tooltip={['week*sales', (week, sales) => {
                                return {
                                    //自定义 tooltip 上显示的 title 显示内容等。
                                    name: '订单量',
                                    title: week,
                                    value: sales
                                };
                            }]}

                            
                     
                        />
                    </Chart>

                </Card>


                <Card title="柱形图 2">
                    <Chart height={500} data={dv} forceFit>
                        <Axis name="key" />
                        <Axis name="value" />
                        <Tooltip
                            crosshairs={{
                                type: "y"
                            }}
                        />
                        <Legend position="top-center"/>
                        <Geom
                            type="interval"
                            color={"name"}
                            position="key*value"
                            tooltip={['key*value', (week, sales) => {
                                return {
                                    //自定义 tooltip 上显示的 title 显示内容等。
                                    name: '订单量',
                                    title: week,
                                    value: sales
                                };
                            }]}
                            adjust={[
                                {
                                  type: "dodge",
                                  marginRatio: 1 / 32
                                }
                              ]}
                        />
                    </Chart>

                </Card>
            </div>
        );
    }
}

