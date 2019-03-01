import React, { Component } from 'react';
import 'semantic-ui-css/semantic.min.css'
import {
    Container,
    Image,
    Menu,
    Button,
    Icon,
    Modal,
    Header,
    Input
  } from 'semantic-ui-react'
import logo from './logo.png'
import swal from 'sweetalert';

import firebase from '../Config/firebase'


class AppConatiner extends Component{
constructor(props){
  super(props);
  this.state= {
    cate: '',
    modalOpen: false,
    serv: []
  }
}  

componentDidMount(){
  firebase.database().ref('services').on('child_added', snap => {
    this.state.serv.push(snap.val())
  })
}


    render(){
        return (

            <div>
              <Menu fixed='top' inverted>
                <Container>
                  <Menu.Item as='a' header>
                    <Image size='mini' src={logo} style={{ marginRight: '1.5em' }} />
                    
                  </Menu.Item>
                  <Menu.Item as='a' >
                  <h3>GSP</h3>
                </Menu.Item>
                
                
                  
                <Menu.Item position='right'>
                <Button as='a' primary onClick={() => {
                  console.log('Graphed')
                    this.props.main.setState({
                      graph: null,
                      users: true,
                      chat: null,
                      
                    })
                    
                  }}>
                    Users
                  </Button>
                <Button as='a' primary onClick={() => {
                  console.log('Graphed')
                    this.props.main.setState({
                      graph: true,
                      users: null,
                      chat: null,
                      
                    })
                    
                  }}>
                    Show Graph
                  </Button>
                  
                  <Button as='a' primary onClick={() => {
                    this.setState({
                      modalOpen: true
                    })
                    
                  }}>
                    Add Categories
                  </Button>
                  <Button as='a' negative style={{ marginLeft: '0.5em' }} onClick={() => {
                    this.props.main.setState({
                      logged: null,
                      login: true,
                      users: null,
                      graph: null
                    },() => {
                      localStorage.setItem('profile',null)
                      localStorage.setItem('logged',null)
                    })
                  }}>
                    Sign Out
                  </Button>
                </Menu.Item>
                </Container>
              </Menu>
          
              <Container text style={{ marginTop: '7em' }}>
              <Modal open={this.state.modalOpen} >
          <Header icon='list' content='Add Categories' />
         <Modal.Content>
      
      <Input placeholder='Categorie...'
        value={this.state.cat}
        onChangeText={e => this.setState({cate: e.target.value})}
      
      />
    </Modal.Content>
    <Modal.Actions>
      <Button color='red' onClick={() => {
        this.setState({
          modalOpen: false
        })
      }}>
        <Icon name='remove' /> No
      </Button>
      <Button color='green' onClick={() => {
          this.state.serv.push({
            id: this.state.cate,
            name: this.state.cate
          })
          firebase.database().ref('services').set({
                list: this.state.serv
          })
            
          
      }}>
        <Icon name='checkmark' /> Add
      </Button>
    </Modal.Actions>
  </Modal>
                {this.props.children}
              </Container>
          
              
            </div>
          
        );
    }
}

export default AppConatiner;