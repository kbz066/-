import React, { Component } from 'react'
import { Layout, Row, Col, Card, Button } from 'antd';
import "./details.less"
import "../../style/common.less"
import Axios from '../../axios/axios';
const {
    Header, Footer, Sider, Content,
} = Layout;

export default class Details extends Component {

    state = {}

    componentDidMount() {
        Axios.ajax({
            url: "order/detail",
            data: {
                isShowLoading: true
            }

        })
            .then((res) => {
                this.setState({
                    orderInfo: res.data.result
                })
            })
    }

    render() {

        let orderInfo = this.state.orderInfo || {};
        console.log(orderInfo)

        return (
            <div>
                <Row className="header" type="flex" align="middle" justify="space-between">
                    <Col >
                        <img alt="" src={require("../../resource/assets/logo.svg")} />
                        React通用管理系统
                </Col>
                    <Col className="right">
                        欢迎,
                    <span className="user_name">admin</span>
                        <a href="#"> 退出 </a>
                    </Col>
                </Row>
                <Card className="content">
                    <Button type="primary">原始轨迹</Button>
                    <div className="orderDetailMap" />
                    <div className="detail_items">
                        <div className="item-title">基础信息</div>
                        <ul>
                            <li>
                                <div className="detail-form-left">用车模式</div>
                                <div className="detail-form-content">{orderInfo.mode == 1 ? "服务区" : "停车点"}</div>

                            </li>
                            <li>
                                <div className="detail-form-left">订单编号</div>
                                <div className="detail-form-content">{orderInfo.order_sn}</div>

                            </li>
                            <li>
                                <div className="detail-form-left">车辆编号</div>
                                <div className="detail-form-content">{orderInfo.bike_sn}</div>

                            </li>
                            <li>
                                <div className="detail-form-left">用户姓名</div>
                                <div className="detail-form-content">{orderInfo.user_name}</div>

                            </li>
                            <li>
                                <div className="detail-form-left">手机号码</div>
                                <div className="detail-form-content">{orderInfo.mobile}</div>

                            </li>
                        </ul>
                    </div>
                    <div className="detail_items">
                        <div className="item-title">行驶轨迹</div>
                        <ul>
                            <li>
                                <div className="detail-form-left">行程起点</div>
                                <div className="detail-form-content">{orderInfo.start_location}</div>

                            </li>
                            <li>
                                <div className="detail-form-left">行程终点</div>
                                <div className="detail-form-content">{orderInfo.end_location}</div>

                            </li>
                            <li>
                                <div className="detail-form-left">行驶里程</div>
                                <div className="detail-form-content">{orderInfo.distance/1000}公里</div>

                            </li>

                        </ul>
                    </div>
                </Card>
            </div>



        );
    }
}

