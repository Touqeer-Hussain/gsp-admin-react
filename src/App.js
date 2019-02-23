import React, { Component } from 'react';
import { Container } from 'semantic-ui-react'
import SignUp from './Login/SignUp';
import Login from './Login/Login';
import AppContainer from './AppContainer/AppContainer'
import Users from './Users/Users'
import Chat from './Users/Chat'
import Graph from './AppContainer/Graph'

class App extends Component {
  constructor(){
    super();
    this.state ={
      logged: localStorage.getItem('logged'),
      login: true,
      signup: null,
      users: true,
      chat: null,
      chatTarget: '',
      graph: null
    }
  }
  render() {
    const { logged, login, signup, users, chat, graph } = this.state
    return (
      
        
          <AppContainer main={this}>
            {login && !logged &&<Login main={this} />}
            {!login && !logged && signup && <SignUp main={this} />}
            { logged && users && <Users main={this} />}
            { logged && !users && chat && <Chat main={this} />}
            { logged && !users && !chat && graph &&<Graph main={this} />}
            
          </AppContainer>
          
          
          
      
      
    );
  }
}

export default App;
