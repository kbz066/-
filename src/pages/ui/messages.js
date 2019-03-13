import React, { Component } from 'react'
import { Card, Button, message } from 'antd';
import "./ui.less"

export default class Messages extends Component {



    openMessage = (type) => {
        console.log(type)

        message[type]('上月考勤22天， 迟到12天，实发工资250，请笑纳');


    }

    render() {
        return (
            <div>
                <Card title="全局提示框" className="card-warp">

                    <Button type="primary" onClick={() => this.openMessage('success')}>Success</Button>
                    <Button type="primary" onClick={() => this.openMessage('info')}>Info</Button>
                    <Button type="primary" onClick={() => this.openMessage('warning')}>Warning</Button>
                    <Button type="primary" onClick={() => this.openMessage('error')}>Error</Button>
                    <Button type="primary" onClick={() => this.openMessage('loading')}>Loading</Button>


                </Card>

 

            </div>

        )
    }
}