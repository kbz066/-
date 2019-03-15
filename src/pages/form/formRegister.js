import React, { Component } from 'react'

import { Card, Form, Input, Button, message, Icon, Checkbox, Radio, InputNumber, Select, Switch, DatePicker, TimePicker, Upload } from 'antd'
import moment from 'moment';

const FormItem = Form.Item;

class FormRegister extends Component {



    state = {}

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {


            console.log(this.props.form.getFieldsValue(["userName"]))
            if (!err) {
                message.success(`${this.props.form.getFieldsValue().userName} , 登录成功`)
            }
        });
    }


    getBase64 = (img, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    }


    handleChange = (info) => {
        if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
        }


        if (info.file.status === 'done') {
            // Get this url from response in real world.
            this.getBase64(info.file.originFileObj, imageUrl => this.setState({
                imageUrl,
                loading: false,
            }));
        }
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


        let offsetLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 0 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 12, offset: 4 },
            },
        }

        return (


            <div>

                <Card title="注册表单" >
                    <Form layout="horizontal"  {...formItemLayout}>

                        <FormItem label="用户名">

                            {
                                getFieldDecorator(

                                    "userName", {
                                        rules: [
                                            {
                                                required: true,
                                                message: '用户名不能为空'
                                            },
                                        ],
                                    }

                                )(
                                    <Input placeholder="请输入用户名" />
                                )
                            }

                        </FormItem>


                        <FormItem label="密码">

                            {
                                getFieldDecorator(

                                    "password", {
                                        rules: [
                                            {
                                                required: true,
                                                message: '密码不能为空'
                                            },

                                            {
                                                min: 6,
                                               
                                                message: '密码最少六位'
                                            }
                                        ],
                                    }

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
                                    <Select  >

                                        <Select.Option value="1">初级工程师</Select.Option>
                                        <Select.Option value="2">中级工程师</Select.Option>
                                        <Select.Option value="3">高级工程师</Select.Option>
                                        <Select.Option value="4">资深工程师</Select.Option>
                                    </Select>

                                )
                            }

                        </FormItem>

                        <FormItem label="爱好">

                            {
                                getFieldDecorator(

                                    "hobby",
                                    {
                                        initialValue: "2"
                                    }

                                )(
                                    <Select mode="multiple">

                                        <Select.Option value="1">玩游戏</Select.Option>
                                        <Select.Option value="2">写代码</Select.Option>
                                        <Select.Option value="3">唱歌</Select.Option>
                                        <Select.Option value="4">跳舞</Select.Option>
                                    </Select>

                                )
                            }

                        </FormItem>

                        <FormItem label="是否结婚">

                            {
                                getFieldDecorator(

                                    "married",
                                    {
                                        valuePropName: "checked",
                                        initialValue: true
                                    }

                                )(
                                    <Switch />

                                )
                            }

                        </FormItem>


                        <FormItem label="生日">

                            {
                                getFieldDecorator(

                                    "birthday",
                                    {

                                        initialValue: moment("1995-08-20")
                                    }

                                )(
                                    <DatePicker />

                                )
                            }

                        </FormItem>

                        <FormItem label="联系地址">

                            {
                                getFieldDecorator(

                                    "address",
                                    {

                                        initialValue: "广州市天河区"
                                    }

                                )(
                                    <Input.TextArea />

                                )
                            }

                        </FormItem>


                        <FormItem label="头像">

                            {
                                getFieldDecorator(

                                    "upTime",
                                    {

                                        initialValue: moment("08:30:00", 'HH:mm:ss')
                                    }

                                )(
                                    <Upload
                                        name="avatar"
                                        listType="picture-card"
                                        showUploadList={false}
                                        action="//jsonplaceholder.typicode.com/posts/"

                                        onChange={this.handleChange}
                                    >
                                        {this.state.imageUrl ? <img src={this.state.imageUrl} alt="avatar" /> : <Icon type='plus' />}
                                    </Upload>

                                )
                            }

                        </FormItem>



                        <FormItem {...offsetLayout}>

                            {
                                getFieldDecorator(

                                    "Agreement",
                                    {
                                        valuePropName: "checked",
                                        initialValue: true
                                    }

                                )(
                                    <Checkbox >我已阅读过<a href="#">协议</a></Checkbox>

                                )
                            }

                        </FormItem>

                        <FormItem {...offsetLayout}>
                            <Button type="primary" onClick={this.handleSubmit}>注册</Button>

                        </FormItem>
                    </Form>
                </Card>
            </div >
        );
    }
}

export default Form.create()(FormRegister)
