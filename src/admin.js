import React, { Component } from 'react'
import { Row, Col } from 'antd';

import Footer from './components/Footer/index'
import Header from './components/Header/index'
import NavLeft from './components/NavLeft/index'
import "./style/common.less"




export default class Admin extends Component {
    render() {
        return (
            <div>
                <Row className="container">

                    <Col span={3} className="nav-left">
                        <NavLeft />
                    </Col>

                    <Col span={21} className="main">

                        <Header />

                        <Row className="content">content</Row>
                        <Footer />

                    </Col>
                </Row>

            </div>
        )
    }
}