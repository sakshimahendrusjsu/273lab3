import React, { Component } from 'react';
import '../Create/CreateBuyer.css';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';

class LandingPage extends Component {
    constructor(props) {
        //Call the constructor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            redirectFlag: "false"
        }
    }
    render() {
        if (localStorage.getItem("token")!=null && localStorage.getItem("type")=="buyer") {
            return (<Redirect to="/home" />);                                     
          }
          if (localStorage.getItem("token")!=null && localStorage.getItem("type")=="owner") {
            return (<Redirect to="/dItems" />);                                     
          }
        return (
            <div class="jumbotron">
                <div class="header">
                    <a href="/" class="logo">GRUBHUB</a>
                    <div class="header-right">
                    </div>
                </div>
                <div class="div2" style={{ float: 'left' }}>>
                <img src={require('../grubhub.png')} alt="burger and fries delivery" />
                </div>
                <div id="outer">
                    <div id="inner" >
                        
                            <br />
                            <br />
                            <a href="/login" id="A_1" style={{ float: 'left' }} >Buyer Signin</a>
                            <br /><br></br>
                            <a href="/logino" id="A_1">Owner Signin</a>
                
                    </div>
                </div>
                {/* <!-- Sidebar --> */}
                {/* <div class="w3-sidebar w3-light-grey w3-bar-block" style={{ width: '35 rem' }}>
                    <h3 class="w3-bar-item">Menu</h3>
                    <a href="#" class="w3-bar-item w3-button">Put image here</a>
                </div> */}
                {/* <!-- Page Content --> */}
                {/* <div style={{ width: '100 rem' }}>
                                <div style={{ width: '100 rem' }}>
                                    <span> <a href class="signIn"> Get perks in the app</a>  
                                     <a href class="signIn"> Sign In </a> </span> </div>
                  </div> */}
            </div>

        )
    }
}

export default LandingPage;