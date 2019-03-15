import React, { Component } from 'react'

import { Card, Form, Input, Button, message, Icon, Checkbox, Radio, InputNumber, Select } from 'antd'


const FormItem = Form.Item;

class FormRegister extends Component {

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {


            console.log(this.props.form.getFieldsValue(["userName"]))
            if (!err) {
                message.success(`${this.props.form.getFieldsValue().userName} , 登录成功`)
            }
        });
    }
    render() {

        const { getFieldDecorator } = this.props.form;

        let formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 4 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 12 },
            },


        }
        let ageFormItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 2 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 4 },
            },


        }

        return (


            <div>

                <Card title="注册表单" >
                    <Form layout="horizontal" onSubmit={this.handleSubmit} {...formItemLayout}>

                        <FormItem label="用户名">

                            {
                                getFieldDecorator(

                                    "userName"

                                )(
                                    <Input placeholder="请输入用户名" />
                                )
                            }

                        </FormItem>


                        <FormItem label="密码">

                            {
                                getFieldDecorator(

                                    "password"

                                )(
                                    <Input placeholder="请输入密码" />
                                )
                            }

                        </FormItem>


                        <FormItem label="性别">

                            {
                                getFieldDecorator(

                                    "sex",
                                    {
                                        initialValue: "1"
                                    }

                                )(
                                    <Radio.Group>
                                        <Radio value="1">男</Radio>
                                        <Radio value="2">女</Radio>
                                    </Radio.Group>
                                )
                            }

                        </FormItem>
                        <FormItem label="年龄">

                            {
                                getFieldDecorator(

                                    "age",
                                    {
                                        initialValue: 18
                                    }

                                )(
                                    <InputNumber />
                                )
                            }

                        </FormItem>


                        <FormItem label="当前状态">

                            {
                                getFieldDecorator(

                                    "currentState",
                                    {
                                        initialValue: "2"
                                    }

                                )(
                                    <Select >

                                        <Select.Option value="1">初级工程师</Select.Option>
                                        <Select.Option value="2">中级工程师</Select.Option>
                                        <Select.Option value="3">高级工程师</Select.Option>
                                        <Select.Option value="4">资深工程师</Select.Option>
                                    </Select>

                                )
                            }

                        </FormItem>
                    </Form>
                </Card>
            </div>
        );
    }
}

export default Form.create()(FormRegister)
