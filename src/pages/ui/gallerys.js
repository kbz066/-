import React, { Component } from 'react'

import { Card, Row, Col, Modal } from 'antd'
import "./ui.less"


export default class Gallery extends Component {



    state = {
        visible: false,
        imgUrl: ""
    }

    showHDDialog = (imgUrl) => {
        this.setState({
            visible: true,
            imgUrl
        })
    }

    render() {

        let imgPaths = [
            ["1.png", "2.png", "3.png", "4.png", "5.png"],
            ["6.png", "7.png", "8.png", "9.png", "10.png"],
            ["11.png", "12.png", "13.png", "14.png", "15.png"],
            ["16.png", "17.png", "18.png", "19.png", "20.png"],
            ["21.png", "22.png", "23.png", "24.png", "25.png"]


        ]
        let imgList = imgPaths.map((list) => list.map((item => {
            return (
                <Card style={{ marginBottom: 10 }}
                    onClick={() => this.showHDDialog(require("../../resource/assets/gallery/" + item))}
                    key={item}
                    visible={this.state.visible}
                    cover={<img alt="example" src={require("../../resource/assets/gallery/" + item)} />}
                >
                    <Card.Meta
                        title="Europe Street beat"
                        description="React实现画廊效果" 
                    />
                </Card>
            );
        })));
        return (
            <div>
                <Row className="card-warp" gutter={10}>
                    <Col span={5}>
                        {
                            imgList[0]
                        }

                    </Col>
                    <Col span={5}>
                        {
                            imgList[1]
                        }

                    </Col>
                    <Col span={5} >

                        {
                            imgList[2]
                        }
                    </Col>
                    <Col span={5}>

                        {
                            imgList[3]
                        }

                    </Col>
                    <Col span={4}>
                        {
                            imgList[4]
                        }
                    </Col>
                </Row>
                <Modal
                    title="高清图"
                    width={400}
                    visible={this.state.visible}
                    footer={null}
                    onCancel={()=>{
                        this.setState({
                            visible:false
                        })
                    }}
                >
                    <img src={this.state.imgUrl} style={{width:"100%"}}/>
                </Modal>
            </div>

        );
    }
}
