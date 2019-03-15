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

import Admin from './admin'
class App extends Component {
  render() {
    return (
      <HashRouter>
        <Switch>
          <Route path="/admin" render={()=><Admin>
              <Route  path="/admin/ui/buttons"  component={Buttons}/>          
              <Route  path="/admin/ui/modals"  component={Modals}/>        
              <Route  path="/admin/ui/loadings"  component={Loadings}/>   
              <Route  path="/admin/ui/notification"  component={Notifications}/>   
              <Route  path="/admin/ui/messages"  component={Messages}/>   
              <Route  path="/admin/ui/tabs"  component={Tabs}/>   
              <Route  path="/admin/ui/gallery"  component={Gallerys}/>   
              <Route  path="/admin/ui/carousel"  component={Carousels}/>   

              <Route  path="/admin/form/login"  component={FormLogin}/>   
              <Route  path="/admin/form/reg"  component={FormRegister}/>   

          </Admin>} />
          <Route path="/login" component={Login} />
        </Switch>
      </HashRouter>

    );
  }
}

export default App;
