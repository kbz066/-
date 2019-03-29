import React, { Component } from 'react'
import { Card, Input, Form, Button, Table, Modal, Radio, Select, DatePicker, message } from 'antd';
import Axios from '../../axios/axios';
import moment from 'moment'


const FormItem = Form.Item
const RadioGroup = Radio.Group
const Option = Select.Option

class User extends Component {


    state = {}

    componentDidMount() {
        this.getUserList()
    }

    getUserList = () => {

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
                total: res.data.result.total,
                selectItem:null,
                selectedRowKeys:[]
            })
        })
    }

    handleButClick = (type) => {

        let item = this.state.selectItem
        let _this = this

        if (type == "create") {



            this.setState({
                selectItem: null,
                visible: true,
                type
            })

        } else if (type == "edit") {
            if (item == null) {
                Modal.info({
                    content: "请选择一个员工"
                })
                return
            }
            this.setState({
                visible: true,
                type
            })

        } else if (type == "detail") {
            if (item == null) {
                Modal.info({
                    content: "请选择一个员工"
                })
                return
            }
            this.setState({
                visible: true,
                type
            })
        } else if ("delete") {

            if (item == null) {
                Modal.info({
                    content: "请选择一个员工"
                })
                return
            }
            Modal.confirm({
                content: `确定要删除用户${item.user_name}吗?`,
                onOk: () => {
                    Axios.ajax({
                        url: "user/delete",
                        data: {
                            isShowLoading: true,

                        }
                    })
                        .then((res) => {
                            message.info("删除成功")
                            _this.getUserList()
                        })

                }
            })
        }
    }





    onRowClick = (selectItem, index) => {

        this.setState({
            selectedRowKeys: [index],
            selectItem
        })
    }

    handleSubmit = () => {
        let parameter = this.formRef.props.form.getFieldsValue()
        let type = this.state.type

        let _this = this

        Axios.ajax({
            url: type == "edit" ? "user/edit" : "user/add",
            data: {
                isShowLoading: true,
                parameter
            }
        })
            .then((res) => {
                if (type == "edit") {
                    message.info("编辑成功")
                } else if (type == "create") {
                    message.info("添加成功")

                }
                this.setState({
                    visible: false
                })

                _this.getUserList()
            })
    }

    render() {

        const { getFieldDecorator } = this.props.form


        let rowSelection = {

            type: "radio",
            onChange: (electedRowKeys, selectedRows) => {

                console.log("electedRowKeys      ", electedRowKeys)
                this.setState({
                    selectedRowKeys: electedRowKeys,
                    selectItem: selectedRows[0]
                })
            },
            selectedRowKeys: this.state.selectedRowKeys
        }
        const columns = [
            {
                title: "id",
                dataIndex: "id",
                align: "center",
                key: "id"
            },
            {
                title: "用户名",
                dataIndex: "user_name",
                align: "center",
                key: "user_name"
            },
            {
                title: "性别",
                dataIndex: "sex",
                align: "center",
                key: "sex",
                render(sex) {
                    return {
                        "0": "男",
                        "1": "女"

                    }[sex]
                }
            },
            {
                title: "状态",
                dataIndex: "states",
                align: "center",
                key: "states",
                render(states) {
                    return {
                        "0": "初级工程师",
                        "1": "中级工程师",
                        "2": "高级工程师",
                        "3": "资深工程师",

                    }[states]
                }
            },
            {
                title: "爱好",
                dataIndex: "interest",
                align: "center",
                key: "interest",
                render(interest) {
                    return {
                        "0": "打游戏",
                        "1": "写代码",
                        "2": "看书",
                        "3": "听歌",
                        "4": "下棋",
                        "5": "跑步",
                        "6": "踢球",

                    }[interest]
                }
            },
            {
                title: "是否已婚",
                dataIndex: "married",
                align: "center",
                key: "married",
                render(married) {
                    return {

                        "1": "已婚",
                        "2": "未婚",


                    }[married]
                }
            },
            {
                title: "生日",
                dataIndex: "birthday",
                align: "center",
                key: "birthday"
            },

            {
                title: "地址",
                dataIndex: "address",
                align: "center",
                key: "address"
            },
            {
                title: "早起时间",
                dataIndex: "time",
                align: "center",
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
                    <Button type="primary" style={{ marginRight: 20 }} onClick={() => { this.handleButClick("create") }}>创建员工</Button>
                    <Button type="primary" style={{ marginRight: 20 }} onClick={() => { this.handleButClick("edit") }}>编辑员工</Button>
                    <Button type="primary" style={{ marginRight: 20 }} onClick={() => { this.handleButClick("detail") }}>员工详情</Button>
                    <Button type="danger" onClick={() => { this.handleButClick("delete") }}>删除员工</Button>
                </Card>
                <Table
                    bordered
                    rowKey="id"
                    columns={columns}
                    dataSource={this.state.dataSource}
                    rowSelection={rowSelection}
                    pagination={{
                        total: this.state.total,
                        showQuickJumper: true
                    }}
                    onRow={(selectItem, index) => {

                        return {
                            onClick: (event) => {

                                this.onRowClick(selectItem, index)

                            },       // 点击行

                        };
                    }}
                />
                <Modal
                    title="创建员工"
                    width={800}
                    visible={this.state.visible}
                    onCancel={
                        () => {
                            this.setState({
                                visible: false
                            })
                        }
                    }
                    onOk={
                        this.handleSubmit
                    }

                >

                    <UserInfo wrappedComponentRef={(inst) => this.formRef = inst} selectItem={this.state.selectItem} type={this.state.type} />
                </Modal>

            </div>
        );
    }
}


class UserInfo extends Component {

    getState = (value) => {
        return {
            "0": "初级工程师",
            "1": "中级工程师",
            "2": "高级工程师",
            "3": "资深工程师",
        }[value]
    }
    render() {

        const { getFieldDecorator } = this.props.form

        let formLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 5 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        }




        let item = this.props.selectItem || {}
        let type = this.props.type

        return (

            <Form {...formLayout} >
                <FormItem label="姓名">
                    {

                        type == "detail" ? item.user_name :
                            getFieldDecorator("user_name", {
                                initialValue: item.user_name
                            })(
                                <Input placeholder="请输入姓名" />
                            )
                    }
                </FormItem>
                <FormItem label="性别">
                    {
                        type == "detail" ? item.sex == 1 ? '男' : '女' :
                            getFieldDecorator("sex", {
                                initialValue: item.sex ? item.sex.toString() : "0"
                            })(
                                <RadioGroup>
                                    <Radio value="0">男</Radio>
                                    <Radio value="1">女</Radio>
                                </RadioGroup>
                            )
                    }
                </FormItem>
                <FormItem label="状态">
                    {
                        type == "detail" ? this.getState(item.states) :
                            getFieldDecorator("states", {
                                initialValue: item.states ? item.states.toString() : "0"
                            })(
                                <Select>
                                    <Option value="0">初级工程师</Option>
                                    <Option value="1">中级工程师</Option>
                                    <Option value="2">高级工程师</Option>
                                    <Option value="3">资深工程师</Option>

                                </Select>
                            )
                    }
                </FormItem>
                <FormItem label="生日">
                    {
                        type == "detail" ? item.birthday :
                            getFieldDecorator("birthday", {
                                initialValue: item.birthday ? moment(item.birthday, "YYYY-MM-DD") : moment(moment(), "YYYY-MM-DD"),


                            })(
                                <DatePicker />
                            )
                    }
                </FormItem>
                <FormItem label="联系地址">
                    {
                        type == "detail" ? item.address :
                            getFieldDecorator("address", {
                                initialValue: item.address
                            })(
                                <Input.TextArea placeholder="请输入联系地址" autosize={{ minRows: 3 }} />

                            )
                    }
                </FormItem>
            </Form>
        );
    }
}


UserInfo = Form.create()(UserInfo)

export default Form.create()(User)