import React, { Component } from 'react'
import { Card, Button, Radio, Modal } from 'antd';
import "./ui.less"

export default class Modals extends Component {



    state = {
        showModal1: false,
        showModal2: false,
        showModal3: false,
        showModal4: false,
    }
    handleOpen = (type) => {


        this.setState({
            [type]: true,
        })
    }

    handleInfo=(type)=>{
        Modal[type](
            {
                title : "React",
                content : "你确定学会react了吗?",
                okText:"确定",
                cancelText:"没有",
                onOk(){
     
                },
                onCancel(){
   
                }

            }
        );
    }

    render() {
        return (
            <div>
                <Card title="基础弹窗" className="card-warp" >

                    <Button type="primary" onClick={() => this.handleOpen("showModal1")}>Open</Button>

                    <Button type="primary" onClick={() => this.handleOpen("showModal2")}>自定义</Button>

                    <Button type="primary" onClick={() => this.handleOpen("showModal3")}>顶部20px弹窗</Button>

                    <Button type="primary" onClick={() => this.handleOpen("showModal4")}>居中弹窗</Button>
                    <Modal
                        title="React"
                        visible={this.state.showModal1}
                        onCancel={
                            () => {
                                this.setState({
                                    showModal1: false
                                })
                            }
                        }
                    >
                        <p>欢迎学习使用React开发后台管理系统</p>
                    </Modal>

                    <Modal
                        title="React"
                        visible={this.state.showModal2}
                        okText="确认"
                        cancelText="取消"
                        onCancel={
                            () => {
                                this.setState({
                                    showModal2: false
                                })
                            }
                        }
                    >
                        <p>欢迎学习使用React开发后台管理系统</p>
                    </Modal>

                    <Modal
                        style={{ top: 20 }}
                        title="React"
                        visible={this.state.showModal3}
                        onCancel={
                            () => {
                                this.setState({
                                    showModal3: false
                                })
                            }
                        }
                    >
                        <p>欢迎学习使用React开发后台管理系统</p>
                    </Modal>

                    <Modal
                        centered
                        title="React"
                        visible={this.state.showModal4}
                        onCancel={
                            () => {
                                this.setState({
                                    showModal4: false
                                })
                            }
                        }
                    >
                        <p>欢迎学习使用React开发后台管理系统</p>
                    </Modal>

                </Card>

                <Card title="信息确认框" className="card-warp" >
                    <Button type="primary" onClick={() => this.handleInfo("info")}>Info</Button>

                    <Button type="primary" onClick={() => this.handleInfo("success")}>Success</Button>

                    <Button type="primary" onClick={() => this.handleInfo("error")}>Error</Button>

                    <Button type="primary" onClick={() => this.handleInfo("warning")}>Warning</Button>
                    
                    <Button type="primary" onClick={() => this.handleInfo("confirm")}>Confirm</Button>
                </Card>


            </div>

        )
    }
}