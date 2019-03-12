import React, { Component } from 'react'

import menuList from '../../config/menuConfig';
import { Menu } from 'antd';
import "../NavLeft/index.less"
import { NavLink } from 'react-router-dom'

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;



export default class NavLeft extends Component {
    constructor() {
        super();
        this.state = {

        }
    }

    componentDidMount() {

        let menuData = this.renderMenu(menuList);
        this.setState({
            menuData: menuData
        })
    }

    renderMenu = (data) => {


        return data.map((item) => {
            if (item.children) {

                return (
                    <SubMenu title={item.title} key={item.key}>
                        {this.renderMenu(item.children)}
                    </SubMenu>
                )


            }

            console.log(item.key)
            return (
          

                <Menu.Item key={item.key}>
                    <NavLink to={item.key}>
                        {item.title}
                    </NavLink>
                </Menu.Item>

            )

        })
    }


    render() {


        return (
            <div>
                <div className="logo">
                    <img src="../../resource/assets/logo.svg" />
                    <h1>React MS</h1>
                </div>

                <Menu mode="vertical" theme="dark">
                    {
                        this.state.menuData
                    }
                </Menu>


            </div>
        )
    }
}