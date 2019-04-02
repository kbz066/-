import React, { Component } from 'react'
import { Card } from 'antd';
import { Chart, Axis, Tooltip, Geom, Legend } from 'bizcharts';
import DataSet from "@antv/data-set"

export default class Line extends Component {
    render() {

        const data = [
            {
                item: "周一",
                count: 1000
            },
            {
                item: "周二",
                count: 2000
            },
            {
                item: "周三",
                count: 1500
            },
            {
                item: "周四",
                count: 3000
            },
            {
                item: "周五",
                count: 900
            },
            {
                item: "周六",
                count: 1800
            },
            {
                item: "周日",
                count: 2200
            }
        ];

        const data2 = [
            {
                week: "周一",
                "OFO": 1200,
                "摩拜": 1000,
                "小蓝": 1000,
            },
            {
                week: "周二",
                "OFO": 3000,
                "摩拜": 3000,
                "小蓝": 1000,
            },
            {
                week: "周三",
                "OFO": 4500,
                "摩拜": 5500,
                "小蓝": 2000,
            },
            {
                week: "周四",
                "OFO": 6000,
                "摩拜": 6000,
                "小蓝": 2500,
            },
            {
                week: "周五",
                "OFO": 8000,
                "摩拜": 8000,
                "小蓝": 4000,
            },
            {
                week: "周六",
                "OFO": 12000,
                "摩拜": 10000,
                "小蓝": 6000,
            },
            {
                week: "周日",
                "OFO": 20000,
                "摩拜": 12000,
                "小蓝": 8000,
            }

        ];


        const ds = new DataSet();
        const dv = ds.createView().source(data2);



        console.log(dv)
        dv.transform({
            type: "fold",
            fields: ["摩拜", "OFO", "小蓝"],
            // 展开字段集
            key: "key",
            // key字段
            value: "temperature", // value字段

        });

        const cols = {
            value: {
              min: 500
            },
            item: {
              range: [0, 1]
            }
          };
        return (
            <div>
                <Card title="折线图表 一">
                    <Chart height={400} data={data} forceFit>
                        <Axis name="item" />
                        <Axis name="count" />
                        <Tooltip
                            crosshairs={{
                                type: "y"
                            }}
                        />
                        <Geom type="line" position="item*count" size={2} />
                        <Geom
                            type="point"
                            position="item*count"
                            size={4}
                            shape={"circle"}
                            style={{
                                stroke: "#fff",
                                lineWidth: 1
                            }}
                        />
                    </Chart>
                </Card>

                <Card title="折线图表 二">

                    <Chart height={500} data={dv} forceFit>
                        <Legend />
                        <Axis name="week" />
                        <Axis
                            name="temperature"

                        />
                        <Tooltip
                            crosshairs={{
                                type: "y"
                            }}
                        />
                        <Geom
                            type="line"
                            position="week*temperature"
                            size={2}
                            color={"key"}
                        />
                        <Geom
                            type="point"
                            position="week*temperature"
                            size={4}
                            shape={"circle"}
                            color={"key"}
                            style={{
                                stroke: "#fff",
                                lineWidth: 1
                            }}
                        />
                    </Chart>
                </Card>

                <Card title="折线图表 三">
                    <Chart height={500} data={data} scale={cols} forceFit>
                        <Axis name="item" />
                        <Axis
                            name="count"
                    
                        />
                        <Tooltip
                            crosshairs={{
                                type: "line"
                            }}
                        />
                        <Geom type="area" position="item*count" />
                        <Geom type="line" position="item*count" size={2} />
                    </Chart>
                </Card>
            </div>
        );
    }
}