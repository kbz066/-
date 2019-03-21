import React, { Component } from 'react'
import { Card, Form, Button, Select, DatePicker, Table, Modal } from 'antd';
import Axios from '../../axios/axios';


const FormItem = Form.Item;
const Option = Select.Option;

export default class Order extends Component {


    state={}

    componentDidMount(){
        this.getOrderList()
    }

    getOrderList = (param) => {

        console.log("object          ",param)
        Axios.ajax({
            type: "get",
            url: "order/list",
            data: {
                isShowLoading: true,
                ...param
            }


        }).then((res) => {

        
            this.setState({
                dataSource: res.data.result.item_list,
                total_count: res.data.result.total_count,
                page_size: res.data.result.page_size,
      
            })
        })
    }

    render() {

        const columns = [
            {
                title:'订单编号',
                dataIndex:'order_sn'
            },
            {
                title: '车辆编号',
                dataIndex: 'bike_sn'
            },
            {
                title: '用户名',
                dataIndex: 'user_name'
            },
            {
                title: '手机号',
                dataIndex: 'mobile'
            },
            {
                title: '里程',
                dataIndex: 'distance',
                render(distance){
                    return distance/1000 + 'Km';
                }
            },
            {
                title: '行驶时长',
                dataIndex: 'total_time'
            },
            {
                title: '状态',
                dataIndex: 'status',
                render:(status)=>{
                    return status==1 ? "进行中":"行程结束"
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
        return (
            <div>
                <Card >
                    <TopForm handleQuery={this.getOrderList}/>
                </Card>
                <Card style={{ marginTop: 10 }}>
                    <Button type="primary">订单详情</Button>
                    <Button type="primary" style={{marginLeft:20}} >结束订单</Button>
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
                          title="Basic Modal"
                          visible={this.state.visible}
                          onOk={this.handleOk}
                          onCancel={()=>{
                              this.setState({
                                  
                              })
                          }}
                          content={this.state.errorContent}
                />

            </div>
        );
    }
}


class TopForm extends Component {


    handleReSet = () => {
        this.props.form.resetFields()
    }


    handleQuery = () => {
        let param=this.props.form.getFieldsValue()
        console.log(this.props.form.getFieldsValue())
        this.props.handleQuery(param)
    }


    render() {
  

        const { getFieldDecorator } = this.props.form
        return (
 
            <Form


                layout="inline">
                <FormItem label="城市">
                    {
                        getFieldDecorator("city_id",{
               
                        })(
                            <Select placeholder="全部" style={{ width: 100 }}>
                                <Option value="0">全部</Option>
                                <Option value="1">北京</Option>
                                <Option value="2">天津</Option>
                                <Option value="2">广州</Option>
                                <Option value="3">上海</Option>
                            </Select>
                        )
                    }
                </FormItem>

                <FormItem >
                    {
                        getFieldDecorator("start_time",{
                           
                        })(
                            <DatePicker placeholder="请选择开始时间"/>
                        )
                    }
                </FormItem>

                <FormItem >
                    {
                        getFieldDecorator("end_time")(
                            <DatePicker  placeholder="请选择结束时间"/>
                        )
                    }
                </FormItem>

                <FormItem label="订单状态">
                    {
                        getFieldDecorator("status")(
                            <Select placeholder="全部" style={{ width: 100 }}>
                                <Option value="0">全部</Option>
                                <Option value="1">进行中</Option>
                                <Option value="2">进行中(临时锁车)</Option>
                                <Option value="3">行程结束</Option>

                            </Select>
                        )
                    }
                </FormItem>

                <FormItem >
                    <Button type="primary" style={{ margin: '0 20px' }} onClick={this.handleQuery}>查询</Button>
                    <Button onClick={this.handleReSet}>重置</Button>
                </FormItem>
            </Form>
            
        );
    }
}
TopForm = Form.create()(TopForm)