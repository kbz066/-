import React, { Component } from 'react'
import { Card, Carousel } from 'antd';
import "./ui.less"


export default class Carousels extends Component {
    render() {
        return (
            <div>
                <Card title="文字轮播" className="card-warp">
                    <Carousel autoplay autoplaySpeed={1500}>
                        <div><h3>1</h3></div>
                        <div><h3>2</h3></div>
                        <div><h3>3</h3></div>
                        <div><h3>4</h3></div>
                    </Carousel>
                </Card>

                <Card title="图片轮播" className="card-warp slider-wrap">
                    <Carousel autoplay autoplaySpeed={1500}>
                        <div><img src={require("../../resource/assets/carousel-img/carousel-1.jpg")} style={{ width: "100%" }} /></div>
                        <div><img src={require("../../resource/assets/carousel-img/carousel-2.jpg")} style={{ width: "100%" }} /></div>
                        <div><img src={require("../../resource/assets/carousel-img/carousel-3.jpg")} style={{ width: "100%" }} /></div>
                    </Carousel>
                </Card>
            </div>



        );
    }
}