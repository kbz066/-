import React, { Component } from 'react'

import "./login.less"

import ReactCanvasNest from 'react-canvas-nest';

import {withRouter} from  'react-router-dom'

import { Form, Input, Row, Col, Icon, Button } from 'antd';
import { connect } from 'react-redux'



const FormItem = Form.Item
const formItemLayout = {
    labelCol: { span: 0 },
    wrapperCol: { span: 4 },
};



class Login extends Component {



 

    handleLogin=()=>{

        console.log("获取到的name  ",this.props.form.getFieldsValue().user_name)
        this.props.login(this.props.form.getFieldsValue().user_name)
        this.props.history.push('/admin/home/') 
    }
    render() {

        const { getFieldDecorator } = this.props.form
        return (


            <Form className="wrap" >
                <ReactCanvasNest config = {{ pointColor: ' 255, 255, 255 ' ,lineColor:"95,121,133"}} style = {{ zIndex: 99,pointerEvents: "none"}}/>
                <Row type="flex" align="middle" style={{ height: "100vh" }}>
                    <Col span={24} style={{ marginBottom: 100 }}>
                        <Row><Col className="title">欢迎你</Col></Row>

                        <Row type="flex" justify="center">
                            <Col span={6} >
                                <FormItem>
                                    {
                                        getFieldDecorator("user_name")(
                                            <Input placeholder="请输入用户名" className="user_name" prefix={<Icon type="user" style={{ color: '#AAAAAA', fontSize: 25 }} />} />
                                        )
                                    }
                                </FormItem>
                            </Col>
                        </Row>
                        <Row type="flex" justify="center">
                            <Col span={6} >
                                <FormItem>
                                    {
                                        getFieldDecorator("password")(
                                            <Input placeholder="请输入密码" className="password" prefix={<Icon type="lock" style={{ color: '#AAAAAA', fontSize: 25, }} />} />
                                        )
                                    }
                                </FormItem>
                            </Col>
                        </Row>

                        <Row type="flex" justify="center">
                            <Col span={6} >
                                <Button type="primary" onClick={this.handleLogin}>登录</Button>
                            </Col>
                        </Row>
                    </Col>
                </Row>


            </Form>
        )
    }
}


let mapDispatchToProps = (dispatch) => ({

 
    login:(name)=>{
        dispatch({
            type:"LOGIN",
            payload:name
        })
    },

})

export default connect(null,mapDispatchToProps)(Form.create()(withRouter(Login)))