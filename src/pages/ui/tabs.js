import React, { Component } from 'react'
import { Card, Tabs, message, Icon } from 'antd';
import "./ui.less"
const TabPane = Tabs.TabPane;


export default class MyTabs extends Component {


    constructor() {
        super();

        this.newTabIndex = 0
        let panes = [
            {
                tab: "Tab 1",
                key: "1",
                content: "欢迎学习React page 1"
            },
            {
                tab: "Tab 2",
                key: "2",
                content: "欢迎学习React page 2"
            },
            {
                tab: "Tab 3",
                key: "3",
                content: "欢迎学习React page 3"
            }
        ]
        this.state = {
            panes: panes,
            activeKey: "1",
        }
    }
    add = () => {
        const panes = this.state.panes;
        const activeKey = `newTab${this.newTabIndex++}`;
        console.log(activeKey)
        panes.push({ tab: activeKey, content: 'Content of new Tab', key: activeKey });
        this.setState({ panes, activeKey });
    }

    remove = (targetKey) => {
        let activeKey = this.state.activeKey;
        let lastIndex;
        this.state.panes.forEach((pane, i) => {
            if (pane.key === targetKey) {
                lastIndex = i - 1;
            }
        });
        const panes = this.state.panes.filter(pane => pane.key !== targetKey);
        if (panes.length && activeKey === targetKey) {
            if (lastIndex >= 0) {
                activeKey = panes[lastIndex].key;
            } else {
                activeKey = panes[0].key;
            }
        }
        this.setState({ panes });
    }

    handleChange = (activeKey) => {
        message.info("Hi，您选择了页签:" + activeKey);
        this.setState({ activeKey });
    }

    onEdit = (targetKey, action) => {


        this[action](targetKey);
    }



    render() {
        return (
            <div>
                <Card title="Tab页签" className="card-warp">
                    <Tabs defaultActiveKey="1" onChange={this.handleChange}>
                        <TabPane tab="Tab 1" key="1">欢迎学习React page 1</TabPane>
                        <TabPane tab="Tab 2" disabled key="2">欢迎学习React page 2</TabPane>
                        <TabPane tab="Tab 3" key="3">欢迎学习React page 3</TabPane>
                    </Tabs>
                </Card>
                <Card title="Tab带图标页签" className="card-warp">
                    <Tabs defaultActiveKey="1" onChange={this.handleChange} >
                        <TabPane tab={<span><Icon type="apple" />Tab 1</span>} key="1">欢迎学习React page 1</TabPane>
                        <TabPane tab={<span><Icon type="android" />Tab 2</span>} key="2">欢迎学习React page 2</TabPane>
                        <TabPane tab={<span><Icon type="windows" />Tab 3</span>} key="3">欢迎学习React page 3</TabPane>
                    </Tabs>
                </Card>

                <Card title="Tab可关闭卡片式页签" className="card-warp" >
                    <Tabs

                        onChange={this.handleChange}
                        type="editable-card"
                        onEdit={this.onEdit}
                        activeKey={this.state.activeKey}
                    >

                        {


                            this.state.panes.map((item) => {
                                return (
                                    <TabPane tab={<span><Icon type="apple" />{item.tab}</span>} key={item.key}>{item.content}</TabPane>
                                )
                            })
                        }
                    </Tabs>
                </Card>


            </div>

        )
    }
}