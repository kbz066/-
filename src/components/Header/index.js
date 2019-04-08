import React, { Component } from 'react'
import { Row, Col } from 'antd';
import "./index.less"
import utils from '../../utils/utils'
import axios from '../../axios/axios'
import { withRouter } from 'react-router';
import { connect } from 'react-redux'




class Header extends Component {

    constructor() {
        super();
        this.state = {
            userName: "admin"
        }

        this.timeTimer = setInterval(() => {
            let time = utils.formatTime(new Date())
            this.setState({
                sysTime: time
            })

        }, 1000);




    }
    componentDidMount() {
        this.getWeatherApiData()
    }
    componentWillUnmount() {
        clearInterval(this.timeTimer)
    }

    getWeatherApiData = async () => {

        let cityRes = await axios.request({
            type: "get",
            url: "https://restapi.amap.com/v3/ip?key=b21008644c3772a350df79f46dce6483"
        })


        if (cityRes.status == 200) {


            let res = await axios.request({
                type: "get",
                url: `https://restapi.amap.com/v3/weather/weatherInfo?key=b21008644c3772a350df79f46dce6483&city=${cityRes.data.adcode}`
            })

            if (res.status == 200) {
                this.setState({
                    weather_detail: res.data.lives[0].weather,
                    city: res.data.lives[0].city
                })

            }
        }



    }
    handleQuit = (e) => {


        this.props.quit()
        this.props.history.push("/login");
        e.preventDefault();
    }



    getUserName = () => {

        if (this.props.isLogin) {

            if (this.props.user_name) {
                return "欢迎," + this.props.user_name
            } else {
                return ""
            }


        } else {
            return ""
        }
    }

    render() {
        return (
            <div className="hender-main">


                <Row className="hender">
                    <Col span={24} className="hender-top">
                        <span>{this.getUserName()}</span>
                        <a href="#" onClick={this.handleQuit}>
                            {
                                this.props.user_name ? "退出":"登录"
                            }
                        </a>
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
let mapStateToProps = (state) => ({
    isLogin: state.isLogin,
    user_name: state.user_name
})

let mapDispatchToProps = (dispatch) => ({

    quit: () => dispatch({
        type: "QUIT",
        payload: null
    })
})


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header))