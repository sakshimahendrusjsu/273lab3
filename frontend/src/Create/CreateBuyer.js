import React, { Component } from 'react';
import { Form,Button,FormGroup,Label,Input } from 'reactstrap';
import { FacebookLoginButton, GoogleLoginButton } from "react-social-login-buttons";
import './CreateBuyer.css';
import {Redirect} from 'react-router';
import { graphql,compose } from "react-apollo";
import { newUserMutation } from "../mutation/mutations";

//App Component
class CreateBuyer extends Component {
  constructor(props){
    //Call the constructor of Super class i.e The Component
    super(props);
    //maintain the state required for this component
    this.submitSignUp = this.submitSignUp.bind(this);
  }
  submitSignUp(e) {
    this.props
    .newUserMutation({
      variables: {
        firstName: (e.target[0].value),
        lastName: (e.target[1].value),
        email: (e.target[2].value),
        password: (e.target[3].value),
        user_type: "buyer",
      }
    }).then(res => {
      console.log("new owner " + JSON.stringify(res));
    });
    e.preventDefault();
}

render() {
    return (
      <React.Fragment>
      <div>
      <div className="create">
          <Form className="create-buyer" onSubmit={this.submitSignUp}>
            <h3><span className="font-weight-bold">Create your account</span></h3>
            <h4 className="text-centre">{this.props.message}</h4>
            <FormGroup>
              <Label>First name</Label>
              <Input name="first" type="text" placeholder="First Name" required></Input>
              </FormGroup>
              <FormGroup>
              <Label>Last name</Label>
              <Input name="last" type="text" placeholder="Last Name" required></Input>
            </FormGroup>
            <FormGroup>
              <Label>Email</Label>
              <Input name="email" type="email" placeholder="abc@example.com"  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" required></Input>
            </FormGroup>
            <FormGroup>
              <Label>Password</Label>
              <Input name="password" type="password" placeholder="Password" name="password" minlength="8" required></Input>
            </FormGroup>
            <Button className="btn-lg btn-dark btn-block">Create your account</Button>
            <div className="text-center pt-3">Or continue wtih</div>
            <FacebookLoginButton/>
            <GoogleLoginButton/>
            <div className="text-centre">
            <span>Have an account?</span> <a href="/login">Sign in</a>
            </div> 
          </Form>
      </div>
      </div>
      </React.Fragment>
    );
  }
}

//Export the App component so that it can be used in index.js
export default compose(
    graphql(newUserMutation, { name: "newUserMutation" })
    )(CreateBuyer);
