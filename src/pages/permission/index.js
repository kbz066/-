import React, { Component } from 'react'
import { Card, Button, Table, Modal, Form, Input, Select, message, TreeSelect, Tree, Transfer } from 'antd';
import Axios from '../../axios/axios';
import MenuList from "../../config/menuConfig"
import { id } from 'postcss-selector-parser';

const FormItem = Form.Item

export default class Permission extends Component {


    state = {
        visible: false,
        isSetPermissions: false,

        isUserVisible: false
    }

    componentDidMount() {
        this.getRoleList()
    }


    getRoleList = () => {
        Axios.ajax({
            url: "role/list",
            data: {
                isShowLoading: true
            }
        })
            .then((res) => {

                this.setState({
                    dataSource: res.data.result.item_list,
                    menuCheckKeys: res.data.result.menus


                })
            })
    }
    
    onRowClick = (selectItem, index) => {
        let selectKey = [index];

   
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
        } else if (type == "set") {
            if (item == null) {
                Modal.info({
                    title: "温馨提示",
                    content: "请选择一个用户"
                })
                return
            }

            this.setState({
                isSetPermissions: true
            })

        }
    }


    handleCreate = () => {
        const _this = this

        this.setState({
            visible: false
        })

        let params = this.formRef.props.form.getFieldsValue()
        Axios.ajax({
            url: "role/create",
            data: {
                parameter: params
            }
        })
            .then(() => {
                _this.getRoleList()
                _this.showMessage("创建角色成功")
            })
    }
    handleCancel = () => {
        this.setState({
            visible: false
        })
    }

    showMessage = (msg) => {
        message.success(msg)


    }

    handleAuthorization = () => {

        let item = this.state.selectItem;

        if (item == null) {
            Modal.info({
                title: "温馨提示",
                content: "请选择一个用户"
            })
            return
        }

        Axios.ajax({
            url: "role/user_list",

        })
            .then((res) => {
                this.getAuthUserList(res.data.result)
            })

    }

    getAuthUserList = (list) => {


        const mockData = [];
        const targetKeys = [];

        list.forEach(element => {
            mockData.push({
                key: element.user_id,
                title: element.user_name,

            });

            if (element.status == 0) {
                targetKeys.push(element.user_id);
            }
        });



        this.setState({
            mockData,
            targetKeys,
            isUserVisible: true
        })
  
    }


    handlePermEditSubmit = () => {
        let params = this.roleForm.props.form.getFieldsValue();

        this.setState({
            isSetPermissions: false
        })
        Axios.ajax({
            url: "permission/edit",
            data: {
                parameter: params
            }
        })
            .then(() => {
                this.getRoleList()
                this.showMessage("设置成功")
            })
    }

    handleUserSubmit=()=>{
        let params = this.userAuthForm.props.form.getFieldsValue();

        this.setState({
            isUserVisible: false
        })
        Axios.ajax({
            url: "role/user_role_edit",
            data: {
                parameter: params
            }
        })
            .then(() => {
                this.getRoleList()
                this.showMessage("授权成功")
            })
    }


    patchTargetKeys=(targetKeys) =>{

  
        this.setState({
            targetKeys
        })

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

            },

        };
        return (

            <div>
                <Card>
                    <Button type="primary" onClick={() => this.handleButClick("create")}>创建角色</Button>
                    <Button type="primary" style={{ margin: "0 20px" }} onClick={() => this.handleButClick("set")}>设置权限</Button>
                    <Button type="primary" onClick={this.handleAuthorization} id="area">用户授权</Button>

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
                    <CreateForm wrappedComponentRef={(inst) => this.formRef = inst} />
                </Modal>

                <Modal
                    title="设置权限"
                    width={600}
                    destroyOnClose
                    visible={this.state.isSetPermissions}
                    onOk={this.handlePermEditSubmit}
                    onCancel={() => {
                        this.setState({
                            isSetPermissions: false
                        })
                    }}
                >
                    <SetPermissionsForm
                        wrappedComponentRef={(inst) => this.roleForm = inst}
                        selectItem={this.state.selectItem}
                    />
                </Modal>


                <Modal
                    title="用户授权"
                    visible={this.state.isUserVisible}
                    width={800}
                    onOk={this.handleUserSubmit}
                    onCancel={() => {
                        this.setState({
                            isUserVisible: false
                        })
                    }}>
                    <RoleAuthForm
                        wrappedComponentRef={(inst) => this.userAuthForm = inst}
                        patchTargetKeys={this.patchTargetKeys}
                        targetKeys={this.state.targetKeys}
                        mockData={this.state.mockData}

                    />
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
                        getFieldDecorator("states", {
                            initialValue: 0
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

class SetPermissionsForm extends Component {




    formatData = (list) => {

        let treeList = [{}]
        treeList[0].title = "平台权限"
        treeList[0].key = "platform_all"
        treeList[0].children = list.map((item) => {
            if (item.children) {
                item.children.map((_item) => {
                    _item.value = _item.key
                    return _item
                })

            }
            item.value = item.key
            return item
        })
        return treeList
    }
    render() {


        const formLayout = {
            labelCol: {
                span: 5
            },
            wrapperCol: {
                span: 15
            }
        }

        const { getFieldDecorator } = this.props.form

        const info = this.props.selectItem

        const menuCheckKeys = info.menus



        const tProps = {
            treeData: this.formatData(MenuList),
            treeDefaultExpandAll: true,
            treeCheckable: true,

        };
        return (
            <Form {...formLayout}>
                <FormItem label="角色名称">
                    {
                        getFieldDecorator("role_name")(
                            <Input disabled placeholder={info.role_name}></Input>
                        )
                    }
                </FormItem>
                <FormItem label="状态">
                    {
                        getFieldDecorator("states", {
                            initialValue: info.status
                        })(
                            <Select style={{ width: 80 }} >
                                <Select.Option value={0}>启用</Select.Option>
                                <Select.Option value={1}>关闭</Select.Option>
                            </Select>
                        )
                    }
                </FormItem>

                <FormItem label="菜单">
                    {
                        getFieldDecorator("menus", {
                            initialValue: menuCheckKeys
                        })(
                            <TreeSelect {...tProps} dropdownStyle={{ height: 300 }} />

                        )
                    }
                </FormItem>
            </Form>
        );
    }
}
SetPermissionsForm = Form.create()(SetPermissionsForm)


class RoleAuthForm extends Component {



    handleChange = (nextTargetKeys, direction, moveKeys) => {
        // this.setState({ targetKeys: nextTargetKeys });

        this.props.patchTargetKeys(nextTargetKeys)

    }
    render() {
        let { getFieldDecorator } = this.props.form;


        let mockData = this.props.mockData

        const formLayout = {
            labelCol: {
                span: 5
            },
            wrapperCol: {
                span: 19
            }
        }


        return (
            <Form {...formLayout}>
                <FormItem label="角色名称">
                    {
                        getFieldDecorator("role_name")(
                            <Input placeholder="请输入角色名称" />
                        )
                    }
                </FormItem>

                <FormItem>
                    {
                        getFieldDecorator("user_ids")(
                            <Transfer
                                dataSource={mockData}
                                titles={['Source', 'Target']}

                                targetKeys={this.props.targetKeys}
                                onChange={this.handleChange}
                                onSelectChange={this.handleSelectChange}
                                onScroll={this.handleScroll}
                                render={item => item.title}

                            />
                        )
                    }
                </FormItem>
            </Form>
        )
    }
}

RoleAuthForm = Form.create()(RoleAuthForm)