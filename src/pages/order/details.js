import React, { Component } from 'react'
import { Layout, Row, Col, Card, Button } from 'antd';
import "./details.less"
import "../../style/common.less"
import Axios from '../../axios/axios';
import { start } from 'pretty-error';
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
                this.renderMap(res.data.result)
            })
    }

    renderMap = (result) => {
        this.map = new window.BMap.Map("allmap");
        // 创建地图实例  

        // 创建点坐标  

        this.map.enableScrollWheelZoom(true)
        this.addMapControl()
        this.renderArea(result.area)
        this.addMarker(result.position_list)
    }
    // 添加地图控件
    addMapControl = () => {
        let map = this.map;
        map.addControl(new window.BMap.ScaleControl({ anchor: window.BMAP_ANCHOR_TOP_RIGHT }));
        map.addControl(new window.BMap.NavigationControl({ anchor: window.BMAP_ANCHOR_TOP_RIGHT }));
    }


    addMarker = (positionList) => {

        let bMap = window.BMap;
        var startIcon = new bMap.Icon(require("../../resource/assets/start_point.png"), new bMap.Size(36, 42), {
            // 指定定位位置。   
            // 当标注显示在地图上时，其所指向的地理位置距离图标左上    
            // 角各偏移10像素和25像素。您可以看到在本例中该位置即是   
            // 图标中央下端的尖角位置。    
            imageSize: new bMap.Size(36, 42),
            //anchor: new bMap.Size(18, 42)
            // 设置图片偏移。   
            // 当您需要从一幅较大的图片中截取某部分作为标注图标时，您   
            // 需要指定大图的偏移位置，此做法与css sprites技术类似。    
            // imageOffset: new BMap.Size(0, 0 - index * 25)   // 设置图片偏移    
        });
        var endtIcon = new bMap.Icon(require("../../resource/assets/end_point.png"), new bMap.Size(36, 42), {

            imageSize: new bMap.Size(36, 42),

        });

        let first = positionList[0];
        let last = positionList[positionList.length - 1];

        let startPont = new bMap.Point(first.lon, first.lat)
        let endPont = new bMap.Point(last.lon, last.lat)


        // 创建标注对象并添加到地图   

        this.map.addOverlay(new bMap.Marker(startPont, { icon: startIcon }));
        this.map.addOverlay(new bMap.Marker(endPont, { icon: endtIcon }));



        let brokenList = positionList.map((item) => {
            return new bMap.Point(item.lon, item.lat)
        })
        var polyline = new bMap.Polyline(
            brokenList,
            { strokeColor: "blue", strokeWeight: 6, strokeOpacity: 0.5 }
        );
        this.map.addOverlay(polyline);
        this.map.centerAndZoom(endPont, 11);
    }

    renderArea = (areaList) => {
        let bMap = window.BMap;

        let brokenList = areaList.map((item) => {
            return new bMap.Point(item.lon, item.lat)
        })
        var polygon = new bMap.Polygon (
            brokenList,
            { 
                strokeColor: "blue", 
                strokeWeight: 3, 
                strokeOpacity: 0.5,
                fillOpacity:0.5, 
                fillColor: "#ff8605" 
            }
        );
        this.map.addOverlay(polygon);
    }

    render() {

        let orderInfo = this.state.orderInfo || {};


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
                    <Button type="primary" style={{ marginBottom: 25 }}>原始轨迹</Button>
                    <div className="orderDetailMap" id="allmap" />
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
                                <div className="detail-form-content">{orderInfo.distance / 1000}公里</div>

                            </li>

                        </ul>
                    </div>
                </Card>
            </div>



        );
    }
}

