import React, { Component } from 'react';
import '../App.css'
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import {
  Collapse, Navbar, NavbarToggler, NavbarBrand,
  Nav, UncontrolledCollapse, Button,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem, NavItem, NavLink
} from 'reactstrap';
import { connect } from 'react-redux';
import { getAll,deleteSection  } from '../Redux/actions/sectionAction';
import axios from 'axios';

//Define a Login Component
class DeleteSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sections: [],
      redirectVar: "",
      collapse: "",
      message: "",
      displaySection:""
    }
  }

  toggle(e, index) {
    console.log(index);
    this.setState({ collapse: this.state.collapse === index ? null : index });
  }

  componentDidMount() {
    this.state.collapse = "";
    this.renderMyData();
  }

  formSumbit(e, index) {
    e.preventDefault();
    console.log("0 idnex",e.target[0].value);
    let data = {
      'name':e.target[0].value,
      'section_id':index,
      'restaurant_name':localStorage.getItem('restaurant_name'),
      'email':localStorage.getItem('email')
    }
    this.props.deleteSection(data);
    // axios.post('http://localhost:3001/msec/del', data)
    //   .then(response => {
    //     console.log("response", response);
    //     this.setState({
    //       message: response.data.message
    //     })
    //   })
    if(this.props.output){
      alert("Section Deleted!!");
    }
      this.renderMyData();
      window.location.href = '/delS';
  }

  renderMyData() {
    this.state.sections = []
      let user = cookie.load('cookyou')
      let data = { 
        id:localStorage.getItem('_id'),
        email:localStorage.getItem('email'),
        name:localStorage.getItem('restaurant_name')
       }
      this.props.getAll(data);
      console.log("sections", this.props.sections);
  }


  render() {
    if (localStorage.getItem("token")==null && localStorage.getItem("type")!="owner") {
      return (<Redirect to="/" />)
    }
  
    if (this.props.sections !== undefined) { 
      this.state.displaySection = this.props.sections.map((element, index) => (
        <div>
          <br />
          <div class="alert alert-info alert-dismissable">
            <p>{element.section_name}</p>
              <form class="form-horizontal" role="form" onSubmit={(e) => this.formSumbit(e, element._id)}>
                <span>
                  <button style={{ margin: '0 1rem' }}>DELETE</button>
                </span>
              </form>
          </div>
        </div>
      ));
    } else {
      this.state.displaySection = <h4>No sections found!!</h4>
    }

    return (
      <div>
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
        <div>
          <Nav pills>
            <NavItem>
              <NavLink href="/addS">UPDATE SECTION </NavLink>
            </NavItem>
            <NavItem>
              <NavLink  active href="/delS">DELETE SECTION </NavLink>
            </NavItem>
            <NavItem>
              <NavLink  href="/addI">ADD ITEM</NavLink>
            </NavItem>
            <NavItem>
              <NavLink  href="/dItems">MENU</NavLink>
            </NavItem>
          </Nav>
        </div>
        <div>
          <p>{this.state.message}</p>
          {this.state.displaySection}
        </div>
      </div>
    )
  }
}

function mapStateToProps(store) {
  return {
    output: store.section.output,
    message: store.section.message,
    sections: store.section.sections
  }
}

function mapDispatchToProps(dispatch) {
  return {
    deleteSection: (data) => dispatch(deleteSection(data)),
    getAll: (data) => dispatch(getAll(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeleteSection)