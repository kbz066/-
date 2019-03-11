import React, { Component } from 'react'
import { Row, Col } from 'antd';
import "./index.less"
import utils from '../../utils/utils'
import axios from '../../axios/axios'




export default class Header extends Component {

    constructor() {
        super();
        this.state = {
            userName: "admin"
        }

        setInterval(() => {
            let time = utils.formatFtt(new Date())
            this.setState({
                sysTime: time
            })

        }, 1000);
        this.getWeatherApiData()
    }

    getWeatherApiData = async () => {
        let res = await axios.request({
            type: "get",
            url: "https://restapi.amap.com/v3/weather/weatherInfo?key=b21008644c3772a350df79f46dce6483&city=440100"
        })
        console.log(res.data.lives[0].city)
        if (res.status == 200) {
            this.setState({
                weather_detail: res.data.lives[0].weather,
                city: res.data.lives[0].city
            })

        }


    }
    render() {
        return (
            <div>


                <Row className="hender">
                    <Col span={24} className="hender-top">
                        <span>欢迎,{this.state.userName}</span>
                        <a href="#">退出</a>
                    </Col>
                </Row>
                <Row className="breadcrumb">
                    <Col span={4} className="breadcrumb-title">首页</Col>
                    <Col span={20} className="weather">
                    
                        <span className="date">{this.state.sysTime}</span>
                        <span>{this.state.city}</span>
                        <span className="weather-details">{this.state.weather_detail}</span>
                    </Col>
                </Row>
            </div>
        )
    }
}