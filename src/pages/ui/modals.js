import React, { Component } from 'react'
import { Card, Button, Radio, Modal } from 'antd';
import "./ui.less"

export default class Modals extends Component {



    state={
        showModal1:false,
        showModal2:false,
        showModal3:false,
        showModal4:false,
    }
    handleOpwn=(type)=>{
 
      
        this.setState({
            [type]:true,
        })
    }

    render() {
        return (
            <div>
                <Card title="基础弹窗" className="card-warp" >

                    <Button type="primary" onClick={()=>this.handleOpwn("showModal1")}>Open</Button>
              
                    <Button type="primary" onClick={()=>this.handleOpwn("showModal2")}>自定义</Button>
                    
                    <Button type="primary" onClick={()=>this.handleOpwn("showModal3")}>顶部弹窗</Button>
                    
                    <Button type="primary" onClick={()=>this.handleOpwn("showModal4")}>居中弹窗</Button>
                    <Modal
                        title="React"
                        visible={this.state.showModal1}
                        onCancel={
                            ()=>{
                                this.setState({
                                   showModal1:false
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
                            ()=>{
                                this.setState({
                                   showModal2:false
                                })
                            }
                        }
                        >
                     <p>欢迎学习使用React开发后台管理系统</p>
                    </Modal>

                </Card>

              
            </div>

        )
    }
}