import React, { Component } from 'react'
import { Card, Button } from 'antd';
import "./ui.less"

export default class Buttons extends Component {
    render() {
        return (
            <div>
                <Card title="基础按钮">

                    <Button type="primary">Primary</Button>
                    <Button>Default</Button>
                    <Button type="dashed">Dashed</Button>
                    <Button type="danger">Danger</Button>
                    <Button type="danger" disabled={true}>disabled</Button>

                </Card>

                <Card title="图形按钮">

              
                    <Button icon="plus">创建</Button>
                    <Button icon="edit">创建</Button>
                    <Button icon="delete">创建</Button>
                    <Button type="primary" shape="circle" icon="download"  />
                    <Button type="primary"  icon="search"   >搜索</Button>
                    <Button type="primary"  icon="download"   >下载</Button>

                </Card>
            </div>

        )
    }
}