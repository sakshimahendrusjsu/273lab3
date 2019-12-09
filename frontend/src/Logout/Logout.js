import React, {Component} from 'react';
import '../App.css'
import { Redirect } from 'react-router';
import cookie from 'react-cookies';

//Define a Login Component
class Logout extends Component{
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.renderMyData();
  }

  renderMyData() {
    console.log("logout");
    cookie.remove('cookyou')
    localStorage.removeItem("email");
    localStorage.removeItem("type");
    localStorage.clear();
  }


    render() {
        return (
      <div>
          <Redirect to="/" />
      </div>

        );
      }
}

export default Logout;