import React, { Component } from 'react'

import { Card, Form, Input, Button, message, Icon, Checkbox } from 'antd'


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

        let formItemLayout ={
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
              },
              wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
              },
        }

        return (

            
            <div>
  
                <Card title="注册表单" >
                    <Form layout="horizontal"  onSubmit={this.handleSubmit} >
                        <FormItem label="用户名">

                            {
                                getFieldDecorator(
                                    "userName"
                                    
                                    )(
                                    <Input  placeholder="请输入用户名"/>
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
