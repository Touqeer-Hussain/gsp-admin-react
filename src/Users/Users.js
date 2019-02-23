import React, { Component } from 'react';
import { Icon, Form, Input, Button, Divider, Table } from 'semantic-ui-react';
import swal from 'sweetalert';
import 'semantic-ui-css/semantic.min.css';
import firebase from '../Config/firebase'


class Users extends Component{
  constructor(props){
    super(props);
    this.state = {
        list: [],
        temp: false,
      }
  
  
  
    }
    
  componentDidMount(){
      this.dataGet();
  }
  dataGet(){
      firebase.database().ref('users').on('child_added', snap => { 
          
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

  
    render(){
        const active = 'Active';
        const inactive = 'Inactive';
        return (
      <div style={{ margin: '20px auto'}}>
        <h1>Users</h1>
        <Divider />
        <Table >
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell>Email</Table.HeaderCell>
                <Table.HeaderCell>Phone No.</Table.HeaderCell>
                <Table.HeaderCell></Table.HeaderCell>
                
              </Table.Row>
            </Table.Header>
        
            <Table.Body>
{
    this.state.list.map( (data, i) => {
        console.log(Object.keys(data)[0], i)
        return <Table.Row key={Object.keys(data)[0]}>
        <Table.Cell>{data[Object.keys(data)[0]].name}</Table.Cell>
        <Table.Cell>{data[Object.keys(data)[0]].email}</Table.Cell>
        <Table.Cell>{data[Object.keys(data)[0]].phoneNum}</Table.Cell>
        <Table.Cell textAlign='right'>
            <Button.Group>
            <Button animated color='blue' onClick={() => {
                        localStorage.setItem('chatTarget', data[Object.keys(data)[0]].uid)
                        this.props.main.setState({
                          chatTarget: data[Object.keys(data)[0]].uid,
                          users: null,
                          chat: true
                        })

                      
                    }}>
                        <Button.Content visible>Chat</Button.Content>
                        <Button.Content hidden>
                        <Icon name='rocketchat right' />
                        </Button.Content>
                    </Button>
        
            <Button toggle active={data[Object.keys(data)[0]].status == true} onClick={() => {
                        
                        
                        firebase.database().ref(`users/${Object.keys(data)[0]}`).update({ status:  !data[Object.keys(data)[0]].status}).then(() =>{
                            if(data[Object.keys(data)[0]].status == true){
                            swal('','Account disabled successfully!','success')
                            }else{
                                swal('','Account enabled successfully!','success')
                            }
                            this.rerender();
                        })
                        
                        
                    
                    }}>
                        <Button.Content visible>{data[Object.keys(data)[0]].status== true ? active : inactive}</Button.Content>
                    </Button>
        <Button animated negative  onClick={() => {
                      firebase.database().ref(`users/${Object.keys(data)[0]}`).set({

                      }).then(() => {
                        swal('','User Deleted','success')

                        this.rerender();
                        

                      })



                      
                      
                    }}>
                        <Button.Content visible>Delete</Button.Content>
                        <Button.Content hidden>
                        <Icon name='close right' />
                        </Button.Content>
                    </Button>
                    </Button.Group>
                    </Table.Cell>
      </Table.Row>
    } )
        
    
}
                </Table.Body >
                </Table>
            
        </div>
        );
    }
}

export default Users;