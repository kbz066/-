import React, { Component } from 'react'
import { Card, Spin, Icon } from 'antd';
import "./ui.less"

export default class Loadings extends Component {





    render() {
        const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;
        const pushIcon = <Icon type="star" style={{ fontSize: 24 }} spin />;


        return (
            <div>
                <Card title="spin基本使用" className="card-warp">
                    <Spin size="small" />
                    <Spin style={{ padding: "0 10px" }} />
                    <Spin size="large" />
                    <Spin indicator={antIcon} style={{ padding: "0 10px" }} />
                    <Spin indicator={pushIcon} />
                </Card>


                <Card title="spin基本使用" className="card-warp">
                    <Card bodyStyle={{ border: "1px solid #91d5ff", background: "#e6f7ff" }}>
                        <span>React</span><br />
                        <span>欢迎学习阿里ant design框架</span>
                    </Card>

                    <Spin>
                        <Card bodyStyle={{ border: "1px solid #91d5ff", background: "#e6f7ff",margin:" 10px 0" }}>
                            <span>React</span><br />
                            <span>欢迎学习阿里ant design框架</span>
                        </Card>
                    </Spin>
                    <Spin tip="加载中..." indicator={pushIcon}>
                        <Card bodyStyle={{ border: "1px solid #91d5ff", background: "#e6f7ff" }}>
                            <span>React</span><br />
                            <span>欢迎学习阿里ant design框架</span>
                        </Card>
                    </Spin>
                </Card>

            </div>

        )
    }
}