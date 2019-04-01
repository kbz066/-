import React, { Component } from 'react'
import { Card } from 'antd';
import { Chart, Coord, Axis, Legend, Tooltip, Geom, Label } from 'bizcharts';

import DataSet from "@antv/data-set"

export default class Pie extends Component {
    render() {


        const data = [
            {
                item: "周一",
                count: 1000
            },
            {
                item: "周二",
                count: 1000
            },
            {
                item: "周三",
                count: 2000
            },
            {
                item: "周四",
                count: 1500
            },
            {
                item: "周五",
                count: 3000
            },
            {
                item: "周六",
                count: 2000
            },
            {
                item: "周日",
                count: 1200
            }
        ];

        const ds = new DataSet();
        const dv = ds.createView().source(data);
        dv.transform({
            type: "percent",
            field: "count",
            dimension: "item",
            as: "percent"
        });


        return (
            <div>
                <Card title="饼形图表 一" >
                    <Chart
                        height={500}
                        data={dv}

                        padding={[80, 100, 80, 80]}
                        forceFit
                    >
                        <Coord type="theta" radius={0.75} />
                        <Axis name="percent" />
                        <Legend
                            position="right"
                            offsetY={-120}
                            offsetX={-100}
                        />
                        <Tooltip
                            showTitle={true}


                            itemTpl="<li><span style=&quot;background-color:{color};&quot; class=&quot;g2-tooltip-marker&quot;></span>{name}: {value}</li>"

                        // containerTpl= '<div class="g2-tooltip"  style="background:red!important"><div class="g2-tooltip-title" style="margin-bottom: 4px;"></div><ul class="g2-tooltip-list" ></ul></div>'

                        />

                        <Geom
                            type="intervalStack"
                            position="percent"
                            color="item"
                            tooltip={[
                                "item*percent*count",
                                (item, percent, count) => {
                                    percent = percent * 100;
                                    return {
                                        title: "订单量",
                                        name: item,
                                        value: count + `(${percent.toFixed(2)})%`
                                    };
                                }
                            ]}
                            style={{
                                lineWidth: 1,
                                stroke: "#fff"
                            }}



                        >
                            <Label
                                content="percent"
                                formatter={(val, item) => {
                                    return item.point.item;
                                }}
                            />
                        </Geom>
                    </Chart>
                </Card>


                <Card title="饼形图表 二" >
                    <Chart
                        height={500}
                        data={dv}

                        padding={[80, 100, 80, 80]}
                        forceFit
                    >
                        <Coord type="theta" radius={0.75} innerRadius={0.6} />
                        <Axis name="percent" />
                        <Legend
                            position="right"
                            offsetY={-200}
                            offsetX={-50}
                        />
                        <Tooltip
                            showTitle={true}


                            itemTpl="<li><span style=&quot;background-color:{color};&quot; class=&quot;g2-tooltip-marker&quot;></span>{name}: {value}</li>"

                        // containerTpl= '<div class="g2-tooltip"  style="background:red!important"><div class="g2-tooltip-title" style="margin-bottom: 4px;"></div><ul class="g2-tooltip-list" ></ul></div>'

                        />

                        <Geom
                            type="intervalStack"
                            position="percent"
                            color="item"
                            tooltip={[
                                "item*percent*count",
                                (item, percent, count) => {
                                    percent = percent * 100;
                                    return {
                                        title: "订单量",
                                        name: item,
                                        value: count + `(${percent.toFixed(2)})%`
                                    };
                                }
                            ]}
                            style={{
                                lineWidth: 1,
                                stroke: "#fff"
                            }}



                        >
                            <Label
                                content="percent"
                                formatter={(val, item) => {
                                    return item.point.item;
                                }}
                            />
                        </Geom>
                    </Chart>
                </Card>


                <Card title="饼形图表 三">
                    <Chart height={500} data={dv} padding="auto" forceFit>
                        <Coord type="polar" startAngle={0} endAngle={2* Math.PI }/>
                        <Tooltip />
                        <Legend
                            position="right"
                            offsetY={- 180}
                            offsetX={-160}
                        />
                        <Geom
                            type="interval"
                            color="item"
                            position="item*count"
                            tooltip={[
                                "item*percent*count",
                                (item, percent, count) => {
                                    percent = percent * 100;
                                    return {
                                        title: "订单量",
                                        name: item,
                                        value: count + `(${percent.toFixed(2)})%`
                                    };
                                }
                            ]}
                            style={{
                                lineWidth: 1,
                                stroke: "#fff"
                            }}
                        />
                    </Chart>
                </Card>
            </div>
        );
    }
}