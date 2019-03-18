import React, { Component } from 'react'
import { Table, Card, Badge, Modal, message } from 'antd';
import Axios from '../../axios/axios';




const columns = [
    {
        title: "id",
        dataIndex: "id",
        width: 90,
        align: "center"
    },
    {
        title: "用户名",
        dataIndex: "userName",
        width: 90,
        align: "center"

    },
    {
        title: "性别",
        dataIndex: "sex",
        width: 90,
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
        width: 120,
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
        width: 90,
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
        width: 90,
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
        width: 120,
        dataIndex: "birthday"
    },
    {
        title: "联系地址",
        width: 120,
        dataIndex: "address"
    },
    {
        title: "早起时间",
        width: 90,
        dataIndex: "time"
    },
]



const columns2 = [
    {
        title: "id",
        dataIndex: "id",
        width: 90,
        fixed: "left",
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
        title: "年龄",
        width: 90,
        align: "center",
        dataIndex: "age",
        sorter: (a, b) => {

            return a.age - b.age
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
        width: 90,
        fixed: "right",
        dataIndex: "time"
    },

]





export default class SeniorTable extends Component {



    state = {

    }
    columns3 = [
        {
            title: "id",
            dataIndex: "id",
            width: 90,
            fixed: "left",
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
                    "0": <Badge status="success" text="打游戏" />,
                    "1": <Badge status="error" text="写代码" />,
                    "2": <Badge status="default" text="看书" />,
                    "3": <Badge status="processing" text="听歌" />,
                    "4": <Badge status="warning" text="下棋" />,
                    "5": <Badge status="error" text="跑步" />,
                    "6": <Badge status="success" text="踢球" />,
    
    
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
            title: "年龄",
            width: 90,
            align: "center",
            dataIndex: "age",
            sorter: (a, b) => {
    
                return a.age - b.age
            }
        },
        {
            title: "生日",
            align: "center",
            dataIndex: "birthday"
        },
        {
            title: "联系地址",
            align: "center",
            dataIndex: "address"
        },
        {
            title: "操作",
            align: "center",
            render: (text, record) => {
                return <a onClick={() => {this.handleDelete(record) }}>删除</a>
            }
        },
    
    ]

    componentDidMount() {
        this.request()
    }



    request = () => {
        Axios.ajax({
            url: "/table/list",
            type: "get",
            data: {
                page: this.currentPage,
                isShowLoading: true
            }
        }).then((res) => {
            this.setState({
                dataSource: res.data.result.list,
                total: res.data.result.total
            })
        })
    }


     handleDelete = (record) => {
         const _this=this

        Modal.confirm(
            {
                title: "删除",
                content: `你确定要删除${record.userName}吗?`,
                okText: "确定",
                cancelText: "取消",
                onOk() {
    
                    _this.request();
                    message.success("删除成功")
                },
      
            })
    }

    render() {
        return (

            <div>


                <Card title="头部固定">
                    <Table
                        rowKey="id"
                        bordered

                        columns={columns}
                        dataSource={this.state.dataSource}
                        scroll={{ y: 240 }}
                    />
                </Card>

                <Card title="列固定">
                    <Table
                        rowKey="id"
                        bordered

                        columns={columns2}
                        dataSource={this.state.dataSource}
                        scroll={{ x: 1200 }}
                    />
                </Card>

                <Card title="筛选和排序">
                    <Table
                        rowKey="id"
                        bordered

                        columns={columns2}
                        dataSource={this.state.dataSource}

                    />
                </Card>

                <Card title="删除操作">
                    <Table
                        rowKey="id"
                        bordered

                        columns={this.columns3}
                        dataSource={this.state.dataSource}

                    />
                </Card>

            </div>
        );
    }
}