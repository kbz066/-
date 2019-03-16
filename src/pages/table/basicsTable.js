import React, { Component } from 'react'
import { Table, Card } from 'antd';
import Axios from '../../axios/axios';


const columns = [
    {
        title: "id",
        dataIndex: "id",
        align: "center"
    },
    {
        title: "用户名",
        dataIndex: "userName",
        align: "center"

    },
    {
        title: "性别",
        dataIndex: "sex",
        align: "center",

        render: (sex) => {
            let config = {
                "1": "男",
                "2": "女"

            }
            return config[sex]
        }

    },
    {
        title: "状态",
        dataIndex: "state",
        align: "center",
        render: (state) => {
            let config = {
                "0": "初级工程师",
                "1": "中级工程师",
                "2": "高级工程师",
                "3": "资深工程师",

            }
            return config[state]
        }
    },

    {
        title: "爱好",
        dataIndex: "interest",
        render: (interest) => {
            let config = {
                "0": "打游戏",
                "1": "写代码",
                "2": "看书",
                "3": "听歌",
                "4": "下棋",
                "5": "跑步",
                "6": "踢球",

            }
            return config[interest]
        }
    },
    {
        title: "是否以婚",
        dataIndex: "married",
        render: (married) => {
            let config = {

                "1": "已婚",
                "2": "未婚",


            }
            return config[married]
        }
    },
    {
        title: "生日",
        dataIndex: "birthday"
    },
    {
        title: "联系地址",
        dataIndex: "address"
    },
    {
        title: "早起时间",
        dataIndex: "time"
    },
]

const dataSource = [
    {
        "id": 0,
        "userName": "田娟",
        "sex": 1,
        "state": 0,
        "interest": "1",
        "birthday": "1970-11-12",
        "address": "山东省 东营市",
        married: 2,
        "time": "18:22:35"
    },
    {
        "id": 1,
        "userName": "袁丽",
        "sex": 1,
        "state": 2,
        "interest": "1",
        "birthday": "1993-07-15",
        "address": "黑龙江省 双鸭山市",
        married: 2,
        "time": "12:14:07"
    },
    {
        "id": 2,
        "userName": "陈艳",
        "sex": 2,
        "state": 1,
        "interest": "1",
        "birthday": "1999-08-18",
        "address": "澳门特别行政区 澳门半岛",
        married: 2,
        "time": "23:15:29"
    }
]




export default class BasicsTable extends Component {

    state = {}

    componentDidMount() {
        Axios.ajax({
            url: "/table/list",
            type: "get",
            data: {
                page: 1,
                isShowLoading: true
            }
        }).then((res) => {
            this.setState({
                dataSource: res.data.result
            })
        })
    }

    render() {


        return (

            <div>
                <Card title="基础表格" >
                    <Table
                        bordered
                        rowKey="id"
                        columns={columns}
                        dataSource={dataSource}
                        pagination={false}
                    />
                </Card>

                <Card title="Mock表格">
                    <Table
                        rowKey="id"
                        bordered

                        columns={columns}
                        dataSource={this.state.dataSource}
                    />
                </Card>
            </div>
        );
    }
}