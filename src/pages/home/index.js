import React, { Component } from 'react'

import "./index.less"
export default class Home extends Component{
    render(){
        
        console.log("name  home", this.props.match.params.name)
        return(
            <div className="home">React 开发后台管理系统</div>
        )
    }
}