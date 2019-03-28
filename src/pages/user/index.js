import React, { Component } from 'react'
import { Card, Input, Form, Button, Table } from 'antd';
import Axios from '../../axios/axios';


const FormItem = Form.Item

class User extends Component {


    state={}

    getUserList=()=>{
        Axios.ajax({
            url: "/user/list",
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

    render() {

        const { getFieldDecorator } = this.props.form


        const columns = [
            {
                title: "id",
                dataIndex: "id",
                key: "id"
            },
            {
                title: "用户名",
                dataIndex: "user_name",
                key: "user_name"
            },
            {
                title: "性别",
                dataIndex: "sex",
                key: "sex"
            },
            {
                title: "状态",
                dataIndex: "states",
                key: "states"
            },
            {
                title: "爱好",
                dataIndex: "hobby",
                key: "hobby"
            },
            {
                title: "是否已婚",
                dataIndex: "marriage",
                key: "marriage"
            },
            {
                title: "生日",
                dataIndex: "birthday",
                key: "birthday"
            },
     
            {
                title: "地址",
                dataIndex: "address",
                key: "address"
            },
            {
                title: "早起时间",
                dataIndex: "time",
                key: "time"
            },
      
        ]
        return (
            <div>

                <Card>

                    <Form layout="inline">
                        <FormItem>
                            {
                                getFieldDecorator("user_name")(
                                    <Input placeholder="请输入用户名" />
                                )
                            }
                        </FormItem>
                        <FormItem>
                            {
                                getFieldDecorator("user_password")(
                                    <Input placeholder="请输入密码" />
                                )
                            }
                        </FormItem>
                        <FormItem>
                            <Button type="primary" >登录</Button>
                        </FormItem>

                    </Form>


                </Card>
                <Card>
                    <Button type="primary" style={{ marginRight: 20 }}>创建员工</Button>
                    <Button type="primary" style={{ marginRight: 20 }}>编辑员工</Button>
                    <Button type="primary" style={{ marginRight: 20 }}>员工详情</Button>
                    <Button type="danger" >删除员工</Button>
                </Card>
                <Table

                    columns={columns}
                />
            </div>
        );
    }
}

export default Form.create()(User)