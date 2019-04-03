import React, { Component } from 'react';

import './App.less';

import { HashRouter, Route, Switch } from 'react-router-dom'
import Login from './pages/login'
import Buttons from './pages/ui/buttons'
import Modals from './pages/ui/modals'
import Loadings from './pages/ui/loadings'
import Notifications from './pages/ui/notifications'
import Messages from './pages/ui/messages'
import Tabs from './pages/ui/tabs'
import Gallerys from './pages/ui/gallerys'
import Carousels from './pages/ui/carousels'
import FormLogin from './pages/form/formLogin'
import FormRegister from './pages/form/formRegister'

import BasicsTable from './pages/table/basicsTable'
import SeniorTable from './pages/table/seniorTable'
import RichText from './pages/rich/index'
import City from './pages/city/index'
import Order from './pages/order/index'
import Details from './pages/order/details'
import User from './pages/user/index'
import BikeMap from './pages/map/bikeMap'

import Bar from './pages/bizcharts/bar'
import Pie from './pages/bizcharts/pie'
import Line from './pages/bizcharts/line'
import Permission from './pages/permission'


import Admin from './admin'
import Home from './pages/home';
class App extends Component {
  render() {
    return (
      <HashRouter>
        <Switch>

          <Route path="/login" component={Login} />
          <Route path="/order/details/:id" component={Details} />

          <Route path="/" render={() => <Admin>
            <Route path="/ui/buttons" component={Buttons} />
            <Route path="/ui/modals" component={Modals} />
            <Route path="/ui/loadings" component={Loadings} />
            <Route path="/ui/notification" component={Notifications} />
            <Route path="/ui/messages" component={Messages} />
            <Route path="/ui/tabs" component={Tabs} />
            <Route path="/ui/gallery" component={Gallerys} />
            <Route path="/ui/carousel" component={Carousels} />

            <Route path="/form/login" component={FormLogin} />
            <Route path="/form/reg" component={FormRegister} />

            <Route path="/table/basic" component={BasicsTable} />

            <Route path="/table/hight" component={SeniorTable} />
            <Route path="/rich" component={RichText} />
            <Route path="/city" component={City} />
            <Route path="/order" component={Order} />
            <Route path="/user" component={User} />
            <Route path="/BikeMap" component={BikeMap} />
            <Route path="/charts/bar" component={Bar} />
            <Route path="/charts/pie" component={Pie} />
            <Route path="/charts/line" component={Line} />
            <Route path="/permission" component={Permission} />

            <Route component={Home}/>


          </Admin>} />

        </Switch>
      </HashRouter>

    );
  }
}

export default App;
