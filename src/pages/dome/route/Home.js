import React, { Component } from 'react'
import { HashRouter, Route, Link } from 'react-router-dom'
import BBB from './BBB'
import AAA from './AAA'
import CCC from './CCC'
import { Button } from 'antd';


export default class Home extends Component {
    render() {
        return (

            <HashRouter>



                <div>
                    <Button>按钮+++

                    </Button>
                    <br />
                    <Link to="/a">aaa</Link>
                    <br />
                    <Link to="/b">bbb</Link>
                    <br />
                    <Link to="/c">ccc</Link>
                    {this.props.children}
    
                </div>

            </HashRouter>
        )
    }
}