import React, { Component } from 'react'
import { HashRouter, Route, Link } from 'react-router-dom'
import A1 from './A1'
import A2 from './A2'
import { NavLink } from 'react-router-dom'
import { Menu, Icon } from 'antd';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
export default class AAA extends Component {
    render() {
        return (
            <div>
                我是 aaaaaa   页面

                <Menu style={{ width: 256 }} mode="vertical">
                    <SubMenu key="sub1"  title={<span><Icon type="mail" /><span>Navigation One</span></span>}>
                        <Menu.Item key="1"><NavLink to="/a/a1">Option 1</NavLink></Menu.Item>
                        <Menu.Item key="2">Option 2</Menu.Item>
                    </SubMenu>
                </Menu>

{
    this.props.children
}
                {/* <br />
                <Link to="/a/a1">a1</Link>
                <br />
                <Link to="/a/a2">a2</Link>
                
       
                //
                <Route path="/a/a2" component={A2} /> */}
   
            </div>
        )
    }
}