import React, { Component } from 'react';
import '../App.css'
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import { getAll } from '../Redux/actions/profileActions';
import {Link} from 'react-router-dom';
// css
import '../css/styles.css'

import {
  Collapse, Navbar, NavbarToggler, NavbarBrand,
  Nav,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';

//Define a Login Component
class HomeBuyer extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      searchText: '',
      isOpen: false,
    };
    this.searchTextChange = this.searchTextChange.bind(this);
    this.searchByValue = this.searchByValue.bind(this);
  }

componentWillMount() {
    this.renderMyData();
}

searchTextChange(event) {
  // change the state with the value typed in the search box
  this.setState({ 
    searchText: event.target.value 
  })
}

searchByValue() {
  // if ENTER key is pressed
  if (this.state.searchText != "") {
    console.log('ENTER key pressed / SEARCH button clicked...', this.state.searchText);
  }
}

renderMyData(){
  let emailId = localStorage.getItem("email");
  let type = localStorage.getItem("type");
  let formData = new FormData();
  let data = {
    'email': emailId,
    'type': type
  }
  formData=Object.assign(formData,data);
  console.log(formData);
  this.props.getAll(data);
}

toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    let redirectVar = null;
    // console.log(this.props.output)
    // console.log(cookie.load('cookie'))
    // const response = cookie.load('cookie');
    if (localStorage.getItem("email") === null && localStorage.getItem("type") === null) {
     redirectVar = <Redirect to="/login" />;
    }
    let name= localStorage.getItem("name");
    // } else if (localStorage.getItem("email") !== null) {
    //   return (<Redirect to="/login-owner" />)
    // }
    return (
      <div className="jumbotron1">
        {redirectVar} 
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/">GRUBHUB</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Hi,{this.props.first}
                    </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem href="/order">
                    PastOrders
                      </DropdownItem>
                  <DropdownItem href="/profile">
                    Account
                      </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem href="/logout">
                    Logout
                      </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Collapse>
        </Navbar>

        <div id="DIV_1">
          <h1 id="H1_5">
            <span id="SPAN_6">Who delivers in your neighborhood?</span>
          </h1>
          <form id="FORM_7">
            <div id="DIV_9">
              <div id="DIV_14">
                <label for="order-method-delivery" id="LABEL_15">
                  <input type="radio" tabindex="-1" id="INPUT_16" name="ordermethod" value="delivery" /><span id="SPAN_17">Delivery</span>
                </label>
                <label for="order-method-pickup" id="LABEL_18">
                  <input type="radio" tabindex="-1" id="INPUT_19" name="ordermethod" value="pickup" /><span id="SPAN_20">Pickup</span>
                </label>
              </div>
            </div>
          </form>
        </div>

        <div className="hero-div">
        <div className="find-title">Find the best restaurants, cafés, and bars</div>
        <div className="search-bar" >
        <input className="search-box" type="text" value={this.state.searchText}
        onKeyPress={this.searchTextChange} onChange={this.searchTextChange}
        placeholder="Search restaurants by foodItem" />
       <i className="fa fa-search search-icon"></i>
       <Link to={{ pathname: '/search', state: {searchText:this.state.searchText} }}>SEARCH</Link>

      {/* <button className="btn search-btn"
        onClick={this.searchByValue}> search </button> */}
    </div>
      </div>

      </div>
    );
  }
}


function mapStateToProps(store) {
  return {
    first: store.edit.first,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getAll: (data) => dispatch(getAll(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeBuyer);