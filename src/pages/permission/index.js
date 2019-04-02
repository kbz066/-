import React, { Component } from 'react'
import { Card, Button, Table, Modal, Form, Input, Select, message } from 'antd';
import Axios from '../../axios/axios';


const FormItem = Form.Item

export default class Permission extends Component {


    state = {
        visible: false
    }

    componentDidMount() {
        this.getRoleList()
    }


    getRoleList = () => {
        Axios.ajax({
            url: "role/list",
            data:{
                isShowLoading:true
            }
        })
            .then((res) => {
                console.log(res.data.result)
                this.setState({
                    dataSource: res.data.result.item_list
                })
            })
    }
    onRowClick = (selectItem, index) => {
        let selectKey = [index];

        console.log("选择的index        ", index)
        this.setState({
            selectedRowKeys: selectKey,
            selectItem: selectItem

        })

    }

    handleButClick = (type) => {

        let item = this.state.selectItem;
        if (type == "create") {
            this.setState({
                visible: true
            })
        }else if(type == "set"){
            if(item==null){
                Modal.info({
                    content: "请选择一个员工"
                })
                return
            }
            
        }
    }


    handleCreate = () => {
        const _this=this

        this.setState({
            visible: false
        })

        let params=this.formRef.props.form.getFieldsValue()
        Axios.ajax({
            url:"role/create",
            data:{
                parameter:params
            }
        })
        .then(()=>{
            _this.getRoleList()
            _this.showMessage("创建角色成功")
        })
    }
    handleCancel = () => {
        this.setState({
            visible: false
        })
    }

    showMessage=(msg)=>{
        message.success(msg)
    }
    render() {


        const columns = [
            {
                title: "id",
                dataIndex: "id",
                align: "center"

            },
            {
                title: "角色名称",
                dataIndex: "role_name",
                align: "center"
            },

            {
                title: "创建时间",
                dataIndex: "create_time",
                align: "center"
            },

            {
                title: "使用状态",
                dataIndex: "status",
                align: "center",
                render(status) {
                    return status == 0 ? "启用" : "停用"
                }
            },
            {
                title: "授权时间",
                dataIndex: "authorize_time",
                align: "center"
            },
            {
                title: "授权人",
                dataIndex: "authorize_user_name",
                align: "center"
            }
        ]

        let rowSelection = {

            type: 'radio',
            selectedRowKeys: this.state.selectedRowKeys,
            onChange: (selectedRowKeys, selectedRows) => {
                this.setState({
                    selectedRowKeys: selectedRowKeys,
                    selectItem: selectedRows[0]
                })
                console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            },

        };
        return (
            <div>
                <Card>
                    <Button type="primary" onClick={() => this.handleButClick("create")}>创建角色</Button>
                    <Button type="primary" style={{ margin: "0 20px" }}  onClick={() => this.handleButClick("set")}>设置权限</Button>
                    <Button type="primary">用户授权</Button>

                    <Table
                        rowKey="id"
                        bordered
                        columns={columns}
                        rowSelection={rowSelection}
                        dataSource={this.state.dataSource}
                        style={{
                            marginTop: 20
                        }}

                        onRow={(record, index) => {
                            return {
                                onClick: (event) => {
                                    this.onRowClick(record, index)

                                },       // 点击行

                            };
                        }}
                    />
                </Card>

                <Modal
                    title="创建角色"
                    visible={this.state.visible}
                    onOk={this.handleCreate}
                    onCancel={this.handleCancel}
                >
                    <CreateForm  wrappedComponentRef={(inst) => this.formRef = inst}/>
                </Modal>
            </div>
        );
    }
}

class CreateForm extends Component {


    render() {


        const formLayout = {
            labelCol: {
                span: 5
            },
            wrapperCol: {
                span: 15
            }
        }
        let { getFieldDecorator } = this.props.form;
        return (
            <Form {...formLayout}>
                <FormItem label="角色名称">
                    {
                        getFieldDecorator("user_name")(
                            <Input placeholder="请输入角色名称" />
                        )
                    }
                </FormItem>

                <FormItem label="状态">
                    {
                        getFieldDecorator("states",{
                            initialValue:0
                        })(
                            <Select>
                                <Select.Option value={0}>开启</Select.Option>
                                <Select.Option value={1}>关闭</Select.Option>
                            </Select>
                        )
                    }
                </FormItem>
            </Form>
        );
    }
}

CreateForm = Form.create()(CreateForm)