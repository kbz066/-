import React, { Component } from 'react'
import { Card, Form, Select, Button, Modal, Table, Radio } from 'antd';
import Axios from '../../axios/axios';
import utils from '../../utils/utils';
import FilterForm from "../../components/BaseForm"


const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group

export default class City extends Component {

    state = {
        isShowOpenCityModal: false,
        dataSource: [],

    }

    componentDidMount() {
        this.getCityList()
    }



    getCityList = (parameter) => {

        Axios.ajax({
            type: "get",
            url: "city/list",
            data: {
                isShowLoading: true,
                parameter
            }


        }).then((res) => {
            this.setState({
                dataSource: res.data.result.list,
                page_count: res.data.result.page_count,
                page_size: res.data.result.page_size,
                total_count: res.data.result.total_count
            })
        })
    }

    handleOpenCity = () => {
        this.setState({
            isShowOpenCityModal: true,
        })
    }

    handleOk = () => {
        this.setState({
            isShowOpenCityModal: false,
        })


        let cityInfo = this.cityForm.props.form.getFieldsValue();
        Axios.ajax({
            type: "get",
            url: "city/list",
            isShowLoading: true,
            data: {
                isShowLoading: true,
                ...cityInfo

            }

        }).then((res) => {
            this.setState({
                dataSource: res.data.result.list,
                page_count: res.data.result.page_count,
                page_size: res.data.result.page_size,
                total_count: res.data.result.total_count
            })
        })
    }

    handleCancel = () => {
        this.setState({
            isShowOpenCityModal: false,
        })
    }


    render() {



        const columns = [
            {
                title: "城市id",
                dataIndex: "id",
            },
            {
                title: "城市名字",
                dataIndex: "name",
            },
            {
                title: "用车模式",
                dataIndex: "mode",
                render: (mode) => {
                    const config = {
                        "1": "指定停车点模式",
                        "2": "禁停区模式"
                    }
                    return config[mode]
                }
            },
            {
                title: "营运模式",
                dataIndex: "op_mode",
                render: (op_mode) => {
                    const config = {
                        "1": "自营",
                        "2": "加盟"
                    }
                    return config[op_mode]
                }
            },
            {
                title: "授权加盟商",
                dataIndex: "franchisee_name",
            },
            {
                title: "城市管理员",
                dataIndex: "city_admins",
                render: (city_admins) => {

                    return city_admins.map((item) => {
                        return item.user_name
                    }).join(",")

                }

            },
            {
                title: "城市开通时间",
                dataIndex: "open_time",



            },
            {
                title: '操作时间',
                dataIndex: 'update_time',
                render: (update_time) => utils.formatTime(new Date(Number(update_time)))
            },
            {
                title: '操作人',
                dataIndex: 'sys_user_name',

            }



        ]

        
        const formList=[
            {
                id:0,
                type:"SELECT",
                placeholder:"全部",
                label:"城市",
                optionValues:[
                    {key:0,value:"全部"},
                    {key:1,value:"北京市"},
                    {key:2,value:"天津市"},
                    {key:3,value:"广州市"},
      
                ],
                width:100,
                field:"city_id",
                initialValue:0
  
            },
            {
                id:1,
                type:"SELECT",
                placeholder:"全部",
                label:"用车模式",
                optionValues:[
                    {key:0,value:"全部"},
                    {key:1,value:"指定停车点模式"},
                    {key:2,value:"禁停区模式"},
        
                ],
                width:120,
                field:"mode",
                initialValue:0
            },
            {
                id:2,
                type:"SELECT",
                placeholder:"全部",
                label:"营运模式",
                optionValues:[
                    {key:0,value:"全部"},
                    {key:1,value:"自营"},
                    {key:2,value:"加盟"},
        
                ],
                width:80,
                field:"op_mode",
                initialValue:0
            },
            {
                id:3,
                type:"SELECT",
                placeholder:"全部",
                label:"加盟商授权状态",
                optionValues:[
                    {key:0,value:"全部"},
                    {key:1,value:"已授权"},
                    {key:2,value:"未授权"},
        
                ],
                width:100,
                field:"auth_status",
                initialValue:0
            }
        ]
        return (

            <div>

                <Card >
                    <FilterForm formList={formList} filterSubmit={this.getCityList}/>
                    {/* <TopForm getCityList={this.getCityList} /> */}
                </Card>

                <Card style={{ marginTop: 10 }}>
                    <Button type="primary" onClick={this.handleOpenCity}>开通城市</Button>
                </Card>
                <div>
                    <Table
                        rowKey="id"
                        bordered
                        pagination={
                            {
                                total: this.state.total_count,
                                pageSize: this.state.page_size,
                            }
                        }
                        columns={columns.map((item) => {
                            item.align = "center"
                            return item
                        })}
                        dataSource={this.state.dataSource

                        }

                    />

                </div>

                <Modal
                    title="开通城市"
                    visible={this.state.isShowOpenCityModal}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <OpenCityForm wrappedComponentRef={(inst) => this.cityForm = inst} />
                </Modal>
            </div>
        );
    }
}



class OpenCityForm extends Component {


    render() {
        const { getFieldDecorator } = this.props.form

        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 5 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 19 },
            },
        };
        return (
            <Form layout="horizontal">
                <FormItem label="选择城市"{...formItemLayout}>
                    {
                        getFieldDecorator("city_id", {
                            initialValue: "3"
                        })(


                            <Select style={{ width: 100 }}>
                                <Option value="0">全部</Option>
                                <Option value="1">北京市</Option>
                                <Option value="2">天津市</Option>
                                <Option value="3">广州市</Option>
                            </Select>
                        )
                    }
                </FormItem>

                <FormItem label="营运模式"{...formItemLayout}>
                    {
                        getFieldDecorator("op_mode", {
                            initialValue: "1"
                        })(

                            <RadioGroup>
                                <Radio value="0">自营</Radio>
                                <Radio value="1">加盟</Radio>
                            </RadioGroup>

                        )
                    }
                </FormItem>


                <FormItem label="用车模式"{...formItemLayout}>
                    {
                        getFieldDecorator("mode", {
                            initialValue: "1"
                        })(

                            <RadioGroup>
                                <Radio value="0">指定停车点模式</Radio>
                                <Radio value="1">禁停区模式</Radio>
                            </RadioGroup>

                        )
                    }
                </FormItem>
            </Form>
        );
    }
}

OpenCityForm = Form.create()(OpenCityForm)