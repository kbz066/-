import React, { Component } from 'react'
import { Card, Form, Button, Select, DatePicker, Table, Modal, message } from 'antd';
import Axios from '../../axios/axios';
import FilterForm from "../../components/BaseForm"

const FormItem = Form.Item;
const Option = Select.Option;

export default class Order extends Component {


    state = {
        orderConfirmVisble: false,
        record: {},
        selectedRowKeys: [],
        closeOrderInfo: {}


    }

    componentDidMount() {
        this.getOrderList()
    }

    getOrderList = (parameter) => {


        Axios.ajax({
            type: "get",
            url: "order/list",
            data: {
                isShowLoading: true,
                parameter
            }


        }).then((res) => {


            this.setState({
                dataSource: res.data.result.item_list,
                total_count: res.data.result.total_count,
                page_size: res.data.result.page_size,

            })
        })
    }

    handleCloseOrder = () => {



        let { selectedRowKeys, record } = this.state
        let modalContent = {
            title: "温馨提示"
        }


        if (selectedRowKeys.length == 0) {
            modalContent.content = "请选择行程中的订单"
        } else if (record.status != 1) {
            modalContent.content = "该订单行程已结束"
        } else {

            Axios.ajax({
                type: "get",
                url: '/order/ebike_info',
                data: {
                    orderId: record.id
                }
            }).then((res) => {
                this.setState({
                    closeOrderInfo: res.data.result,
                    orderConfirmVisble: true,
                })
            })
            return
        }

        Modal.info({
            ...modalContent
        })

    }




    onRowClick = (record, index) => {
        console.log("index       ", index, "     ", record)
        this.setState({
            selectedRowKeys: [index],
            record
        })
    }


    handleCloseState=()=>{
        Axios.ajax({
            url: '/order/ebike_info',
        })
        .then((res)=>{
            this.setState({
                orderConfirmVisble:false
            })
            message.success("结束成功")
        })
    }

    handleOpenOrderDetails=()=>{

        window.open("/#/order/details/"+this.state.record.id,"_blank")

    }


    render() {


        const rowSelection = {
            type: "radio",
            onChange: (electedRowKeys, selectedRows) => {
                this.setState({
                    selectedRowKeys: electedRowKeys,
                    record: selectedRows[0]
                })
            },
            selectedRowKeys: this.state.selectedRowKeys
        }
        const columns = [
            {
                title: '订单编号',
                dataIndex: 'order_sn'
            },
            {
                title: '车辆编号',
                dataIndex: 'bike_sn'
            },
            {
                title: '用户名',
                dataIndex: 'user_name',
                
            },
            {
                title: '手机号',
                dataIndex: 'mobile'
            },
            {
                title: '里程',
                dataIndex: 'distance',
                render(distance) {
                    return distance / 1000 + 'Km';
                }
            },
            {
                title: '行驶时长',
                dataIndex: 'total_time'
            },
            {
                title: '状态',
                dataIndex: 'status',
                render: (status) => {
                    return status == 1 ? "进行中" : "行程结束"
                }
            },
            {
                title: '开始时间',
                dataIndex: 'start_time'
            },
            {
                title: '结束时间',
                dataIndex: 'end_time'
            },
            {
                title: '订单金额',
                dataIndex: 'total_fee'
            },
            {
                title: '实付金额',
                dataIndex: 'user_pay'
            }
        ]

        const formItemLayout = {
            labelCol:{
                span:5
            },
            wrapperCol:{
                span:19
            },
            labelAlign:"right",
        
      
        }
    

        const formList=[
            {
                id:0,
                type:"SELECT",
                placeholder:"全部",
                label:"城市",
                optionValues:[
                    {key:0,value:"全部"},
                    {key:1,value:"北京"},
                    {key:2,value:"天津"},
                    {key:3,value:"广州"},
                    {key:4,value:"上海"},
      
                ],
                width:100,
                field:"city_id",
                initialValue:0
  
            },
            {
                id:1,
                type:"TIME",
                // start_time:"2019-01-23",
                // end_time:"2019-12-26"
                startPlaceholder:"请选择开始时间",
                endPlaceholder:"请选择结束时间"
  
            },
            {
                id:2,
                type:"SELECT",
                placeholder:"全部",
                label:"订单状态",
                optionValues:[
                    {key:0,value:"全部"},
                    {key:1,value:"进行中"},
                    {key:2,value:"进行中(临时锁车)"},
                    {key:3,value:"行程结束"},
      
                ],
                width:100,
                field:"status",
                initialValue:0
  
            },
        ]
        return (
            <div>
                <Card >
                    <FilterForm  formList={formList} filterSubmit={this.getOrderList} />
                </Card>
                <Card style={{ marginTop: 10 }}>
                    <Button type="primary" onClick={this.handleOpenOrderDetails}>订单详情</Button>
                    <Button type="primary" style={{ marginLeft: 20 }} onClick={this.handleCloseOrder}>结束订单</Button>
                </Card>
                <div>
                    <Table
                        rowKey="id"
                        rowSelection={rowSelection}
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
                        onRow={(record, index) => {

                            return {
                                onClick: (event) => {
                                    this.onRowClick(record, index)

                                },       // 点击行

                            };
                        }}
                        dataSource={this.state.dataSource}

                    />

                </div>
                <Modal
                    title="结束订单"
                    visible={this.state.orderConfirmVisble}
                    width={600}
                    onOk={this.handleCloseState}
                    onCancel={() => {
                        this.setState({
                            orderConfirmVisble: false
                        })
                    }}
                >

                    <Form layout="horizontal"    {...formItemLayout} >
                        <FormItem label="车辆编号" >
                            {this.state.closeOrderInfo.bike_sn}
                        </FormItem>
                        <FormItem label="剩余电量">
                            {this.state.closeOrderInfo.battery + "%"}
                        </FormItem>
                        <FormItem label="行程开始时间" >
                            {this.state.closeOrderInfo.start_time}
                        </FormItem>
                        <FormItem label="当前位置">
                            {this.state.closeOrderInfo.location}
                        </FormItem>
                    </Form>

                </Modal>

            </div>
        );
    }
}


