import React, { Component } from 'react'
import { Row, Col } from 'antd';

import Footer from './components/Footer/index'
import Header from './components/Header/index'
import NavLeft from './components/NavLeft/index'
import "./style/common.less"
import Home from './pages/home/index'




export default class Admin extends Component {
    render() {
        return (
            <div>
                <Row className="container">

                    <Col span={4} className="nav-left">
                        <NavLeft />
                    </Col>

                    <Col span={20} className="main">

                        <Header />

                        <Row className="content">
                            {this.props.children}
                        </Row>
                        <Footer />

                    </Col>
                </Row>

            </div>
        )
    }
}