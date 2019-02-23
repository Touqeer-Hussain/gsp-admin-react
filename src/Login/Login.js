import React, { Component } from 'react';
import { Icon, Form, Input, Button } from 'semantic-ui-react';
import swal from 'sweetalert';
import 'semantic-ui-css/semantic.min.css';


class Signin extends Component{
  constructor(props){
    super(props);
    this.state = {
      username: '',
      password: '',
    }
  }


  async submitForm(e){
    e.preventDefault();

    if(!this.state.username || !this.state.password){
      swal('', 'Please Provide Credentials!', 'warning');
      this.setState({
        username: '',
        password: ''
      })
      document.getElementById('loginform').reset();
      
    }else{
        var f = await fetch(`https://general-service-provider.herokuapp.com/users/authenticate`, {
        method: 'POST',
        headers: {
        "Content-Type": 'application/json'
           },
        body: JSON.stringify({

            username: this.state.username,
            password: this.state.password
        
    })
    })
    var res = await f.json()
    if(!res.message){
        
        localStorage.setItem('profile', JSON.stringify(res))
        localStorage.setItem('logged', true)

        this.props.main.setState({
            logged: true,
            login: null,
            users: true
        })
        
    
    }else{
        swal('',res.message,'error')
        
        
    }
         

    }
    
  }

    render(){
        return (
      <div className="form" style={{width: '600px', margin: '20px auto'}}>
      <h3>Please Sign in to continue!</h3>
          <Form onSubmit={this.submitForm.bind(this)} id="loginform">
    
            <Form.Field
              id='form-input-control-username'
              control={Input}
              label='username'
              placeholder='username'
              type="text"
              onChange={f => this.setState({username: f.target.value})}
            />
            <Form.Field
              id='form-input-control-password'
              control={Input}
              label='Password'
              placeholder='admin'
              type="password"
              onChange={f => this.setState({password: f.target.value})}
            />
          <Form.Group>
          <Button animated color='blue'>
            <Button.Content visible>Sign in</Button.Content>
            <Button.Content hidden>
            <Icon name='arrow right' />
            </Button.Content>
          </Button>
          </Form.Group>
        </Form>
        <div class='ui horizontal divider'>Or</div>
        <Button animated color='grey'  onClick={() => this.props.main.setState({
            login: null,
            signup: true
            })}>
            <Button.Content visible>Sign Up</Button.Content>
            <Button.Content hidden>
            <Icon name='arrow right' />
            </Button.Content>
          </Button>
        </div>
        );
    }
}

export default Signin;