import React, { Component } from 'react';
import axios from 'axios';
import { Form, Button, FormGroup, Label, Input } from 'reactstrap';
import { FacebookLoginButton, GoogleLoginButton } from "react-social-login-buttons";
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import '../Create/CreateBuyer.css';
import { withApollo } from "react-apollo";
import { graphql,compose } from "react-apollo";
import { getLoginQuery } from '../queries/queries';
//Define a Login Component
class LoginBuyer extends Component {
  constructor(props) {
    //Call the constructor of Super class i.e The Component
    super(props);
    this.submitSignIn = this.submitSignIn.bind(this);
    this.state={
      success : false
    }
  }

  submitSignIn(e) {
    e.preventDefault();
    this.props.client
    .query({
      query: getLoginQuery,
      variables: {
        email:(e.target[0].value),
        password: (e.target[1].value),
        "user_type" : "buyer"
      }
    })
    .then(res => {
      if (res.data.login.message) {
        alert("Enter Valid Credentials");
      } else {
        localStorage.setItem("token", JSON.stringify(res));
        localStorage.setItem("email",res.data.login.email)
        localStorage.setItem("type", "buyer");
        this.setState({
          succes:true
        })
      }
      console.log(JSON.stringify(res));
    });
  }

  render() {
    let output = this.props.output;
    let response = cookie.load('cookyou');
    console.log(this.props.message);
    console.log(output);
    console.log("cookyou",response);
    if (this.state.succes) {
      return (<Redirect to="/home" />);                                     
    }
    return (
      <React.Fragment>
        <div class="header">
          <a href="/" class="logo">GRUBHUB</a>
          <div class="header-right">
          </div>
        </div>
        <Form className="create-buyer" onSubmit={this.submitSignIn}>
          <h3><span className="font-weight-bold">Sign in with your Grubhub account</span></h3>
          <h5>{this.props.message}</h5>
          <FormGroup>
            <Label>Email</Label>
            <Input type="email" placeholder="Email" name="email" placeholder="abc@example.com" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" required></Input>
          </FormGroup>
          <FormGroup>
            <Label>Password</Label>
            <Input type="password" placeholder="Password" name="password" minlength="8" required></Input>
          </FormGroup>
          <Button className="btn-lg btn-dark btn-block">Sign in</Button>
          <div className="text-center pt-3">Or</div>
          <FacebookLoginButton />
          <GoogleLoginButton />
          <div className="text-centre">
            <a href="/create">Create your account</a>
          </div>
        </Form>
      </React.Fragment>
    )
  }
}


export default withApollo(LoginBuyer);