import React, { Component } from 'react';
import { Icon, Form, Input, Button } from 'semantic-ui-react';
import swal from 'sweetalert';
import 'semantic-ui-css/semantic.min.css';

class SignUp extends Component{
  constructor(props){
    super(props);
    this.state = {
        firstName: '',
        lastName: '',
        username: '',
        password: '',
        cpassword: '',
    }
  }


  
  async submitForm(e){
    e.preventDefault();

    if(!this.state.firstName || !this.state.lastName || !this.state.username || !this.state.password || !this.state.cpassword){
      swal('', 'Please Fill this Form Completly!', 'warning');
      this.setState({
        firstName: '',
        lastName: '',
        username: '',
        password: '',
        cpassword: '',
      })
      document.getElementById('loginform').reset();
      
    }else{
         if(this.state.password !== this.state.cpassword){
              swal('', 'Password did not Match!', 'error');
              this.setState({
                firstName: '',
                lastName: '',
                username: '',
                password: '',
                cpassword: '',
              })
              document.getElementById('loginform').reset();
          }else{
            //dsdsd
            
                var f = await fetch(`https://general-service-provider.herokuapp.com/users/register`, {
                  method: 'POST',
                  headers: {
                  "Content-Type": 'application/json'
                     },
                  body: JSON.stringify({
                      firstName: this.state.firstName,
                      lastName: this.state.lastName,
                      username: this.state.username,
                      password: this.state.password
                  
              })
              })
              var res = await f.json()
              swal('', res.status, 'success');
              this.props.main.setState({
                  login: true,
                  signup: null
              })
            }
          }
    }
    
  

    render(){
        return (
      <div className="form" style={{width: '600px', margin: '20px auto'}}>
      <h3>Please Sign in to continue!</h3>
  
          <Form onSubmit={this.submitForm.bind(this)} id="loginform">
    
            <Form.Field
              id='form-input-control-first-name'
              control={Input}
              label='First Name'
              placeholder='First Name'
              type="text"
              onChange={(f) => this.setState({firstName: f.target.value})}
            />
            <Form.Field
              id='form-input-control-last-name'
              control={Input}
              label='Last Name'
              placeholder='Last Name'
              type="text"
              onChange={(f) => this.setState({lastName: f.target.value})}
            />
            <Form.Field
              id='form-input-control-username'
              control={Input}
              label='Username'
              placeholder='Username'
              type="text"
              onChange={(f) => this.setState({username: f.target.value})}
            />
            <Form.Field
              id='form-input-control-pass'
              control={Input}
              label='New Password'
              placeholder='New Password'
              type="password"
              onChange={(f) => this.setState({password: f.target.value})}
            />
            <Form.Field
              id='form-input-control-cpass'
              control={Input}
              label='Confirm Password'
              placeholder='Confirm Password'
              type="password"
              onChange={(f) => this.setState({cpassword: f.target.value})}
            />
          <Form.Group>
          <Button animated color='blue'>
            <Button.Content visible>Sign Up</Button.Content>
            <Button.Content hidden>
            <Icon name='arrow right' />
            </Button.Content>
          </Button>
          </Form.Group>
        </Form>
        <div class='ui horizontal divider'>Or</div>
  <Button alig animated color='grey' onClick={() => this.props.main.setState({
      signup: null,
      login: true
})}>
            <Button.Content visible>Sign In</Button.Content>
            <Button.Content hidden>
            <Icon name='arrow right' />
            </Button.Content>
          </Button>          

        </div>
        );
    }
}

export default SignUp;