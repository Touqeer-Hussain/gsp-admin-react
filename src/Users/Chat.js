import React, { Component } from 'react';
import { Icon, Form, Segment, List, Input, Button, Divider, Table } from 'semantic-ui-react';
import swal from 'sweetalert';
import 'semantic-ui-css/semantic.min.css';
import firebase from '../Config/firebase'


class Chat extends Component{
  constructor(props){
    super(props);
    this.state = {
        list: [],
        temp: false,
        profile: {},
        chatTarget: ''
      }
  
  
      
    }
    
  componentDidMount(){
      this.dataGet();
  }
  async dataGet(){
      var c = await localStorage.getItem('chatTarget')
      console.log(c)
      var profile = await JSON.parse(localStorage.getItem('profile'))
      this.setState({
          profile

      }, () => {
          console.log(this.state.profile)
      })
      
    
      firebase.database().ref(`users/${c}/adminchat`).on('child_added', snap => { 
            console.log(this.state.chatTarget)
            this.state.list.push({[snap.key]: snap.val()})
        
            this.setState({
                temp: true
            })
            
            
        })
    
      
  }

  
rerender(){
    console.log('rerender')
    this.state.list.splice(0, this.state.list.length)
    console.log(this.state.list)
    this.componentDidMount()
    
    
}

renderDate = (date) => {
    var raw = new Date(-date).toISOString()
    var f = raw.split('.')
    var h = f[0].split('T')

    return(
      
        `${h[0]} \n ${h[1]}`
      
    );
  }

  
  
    render(){
        const active = 'Active';
        const inactive = 'Inactive';
        return (
      <div style={{ margin: '20px auto'}}>
        <h1>Admin Chat</h1>
        <Divider />
        <Segment style={{overflow: 'auto', maxHeight: '27em' }}
         
        >
        <List celled    >

{
    this.state.list.map(l => {
        if(l[Object.keys(l)[0]].uid != this.state.profile._id){

            return   <List.Item >
            <List.Content>
              <List.Header>{l[Object.keys(l)[0]].message}</List.Header>
              {this.renderDate(l[Object.keys(l)[0]].time)}
            </List.Content>
          </List.Item>

        }else{

            return   <List.Item>
            <List.Content floated='right'>
              <List.Header>${l[Object.keys(l)[0]].message}</List.Header>
              {this.renderDate(l[Object.keys(l)[0]].time)}
            </List.Content>
          </List.Item>

        }
        
      
    })
}


</List>
  
            
        </Segment>

        <div fluid>
            <Input placeholder='Write your messsage...'
                style={{width: '80%'}}
                onChange={e => this.setState({msg: e.target.value})}
                focus
                
            />
                <Button primary onClick={async () => {


        var c = await localStorage.getItem('chatTarget')
    
    
      firebase.database().ref(`users/${c}/adminchat`).push().set({
          uid: this.state.profile._id,
          message: this.state.msg,
          time: -Date.now()
      }, () => {
        this.setState({
            temp: true,
            msg: ''
        })
        this.rerender()

      })
            


                }} >Send</Button>
            </div>    
        </div>
        );
    }
}

export default Chat;