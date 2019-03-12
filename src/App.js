import React, { Component } from 'react';

import './App.less';

import { HashRouter, Route, Switch } from 'react-router-dom'
import Login from './pages/login'
import Buttons from './pages/ui/buttons'


import Admin from './admin'
class App extends Component {
  render() {
    return (
      <HashRouter>
        <Switch>
          <Route path="/admin" render={()=><Admin>
              <Route  path="/admin/ui/buttons"  component={Buttons}/>            
          </Admin>} />
          <Route path="/login" component={Login} />
        </Switch>
      </HashRouter>

    );
  }
}

export default App;
