import React, { Component } from 'react'
import { Table, Card } from 'antd';
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
        fixed:"left",
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
        width: 90,
        fixed:"right",
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
        married: 1,
        "time": "23:15:29"
    }
]
export default class SeniorTable extends Component{


    
    state = {
      
    }

    componentDidMount() {
      // this.request()
    }



    request=()=>{
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
                total:res.data.result.total
            })
        })
    }

    render(){
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
                        dataSource={dataSource}
                        scroll={{ x: 1200 }}
                    />
                </Card>

                
            </div>
        );
    }
}