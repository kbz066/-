import React, { Component } from 'react'
import { Layout, Row, Col } from 'antd';
import "./details.less"
const {
    Header, Footer, Sider, Content,
  } = Layout;

export default class Details extends Component{
    render(){
        return(
            <Row className="header">
                <Col >
                    <img src={require("../../resource/assets/logo.svg")}/>
                </Col>
            </Row>
        );
    }
}

