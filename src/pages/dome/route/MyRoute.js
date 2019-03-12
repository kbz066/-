import React, { Component } from 'react'
import { HashRouter, Route, Link } from 'react-router-dom'
import BBB from './BBB'
import AAA from './AAA'
import CCC from './CCC'
import Home from './Home'
import A1 from './A1'


export default class MyRoute extends Component {
    render() {
        return (

            <HashRouter>
                <Home>
                    <Route path="/a" render={() =>
                        <AAA>
                            <Route path="/a/a1" component={A1} />
                        </AAA>} />
                    <Route path="/b" component={BBB} />

                    <Route path="/c" component={CCC} />
                </Home>

            </HashRouter>
        )
    }
}