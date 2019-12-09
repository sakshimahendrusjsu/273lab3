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
import { addItem,getAll } from '../Redux/actions/sectionAction';
import axios from 'axios';
import { addItemToSection } from "../mutation/mutations";
import { withApollo } from "react-apollo";
import { graphql,compose } from "react-apollo";
//Define a Login Component
class AddMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirectVar: "",
      collapse: "",
      message: "",
      imageLocation:"",
      selectedFile:""
    }
    this.formSumbit = this.formSumbit.bind(this);
  }

  toggle(e, index) {
    console.log(index);
    this.setState({ collapse: this.state.collapse === index ? null : index });
  }

  componentDidMount() {
    this.state.collapse = "";
    this.renderMyData();
  }

  onChange(e) {
    console.log(e.target.files[0]);
    this.setState({selectedFile:e.target.files[0]});
  }

  // args: {
  //   email: { type: GraphQLString },
  //   restaurant_name: { type: GraphQLString },
  //   section_id:{type:GraphQLString},
  //   name:{ type: GraphQLString },
  //   description:{ type: GraphQLString },
  //   price:{ type: GraphQLString },
  //   cuisine:{ type: GraphQLString },
  // },
  formSumbit(e, index) {
    e.preventDefault();
    this.props
    .addItemToSection({
      variables: {
        name: (e.target[0].value),
        description: (e.target[1].value),
        price: (e.target[2].value),
        cuisine: (e.target[3].value),
        restaurant_name: localStorage.getItem('restaurant_name'),
        email:localStorage.getItem('email'),
        section_id:index
      }
    }).then(res => {
      console.log("new owner " + JSON.stringify(res));
    });
    if(this.props.message){
      alert("Item Added successfully!!");
    }
      e.target.reset();
  }
  
async renderMyData() {
    this.state.sections = []
    console.log("render data");
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
    let displaySection = ""
    if (this.props.sections !== undefined) {
      displaySection = this.props.sections.map((element, index) => (
        <div>
          <br />
          <div class="alert alert-info alert-dismissable">
            <p>{element.section_name}</p>
            <Button id={element._id} outline color="info" onClick={(e) => this.toggle(e, element._id)} style={{ marginBottom: '1rem' }}>
              New Item
            </Button>
            <Collapse isOpen={this.state.collapse == element._id}>

              <form class="form-horizontal" role="form" onSubmit={(e) => this.formSumbit(e, element._id)}>
                <div class="form-group">
                  <label class="col-lg-3 control-label">Name</label>
                  <div class="col-lg-8">
                    <input class="form-control" type="text" placeholder="Item Name" required />
                  </div>
                </div>

                <div class="form-group" >
                  <label class="col-lg-3 control-label">Description</label>
                  <div class="col-lg-8">
                    <input class="form-control" type="text" placeholder="Item Description" required />
                  </div>
                </div>

                <div class="form-group" >
                  <label class="col-lg-3 control-label">Price</label>
                  <div class="col-lg-8">
                    <input class="form-control" type="number" placeholder="Item Price" required />
                  </div>
                </div>

                <div class="form-group" >
                  <label class="col-lg-3 control-label">Cuisine</label>
                  <div class="col-lg-8">
                    <input class="form-control"  type="text" placeholder="Cuisine" required />
                  </div>
                </div> 

                <div>
                <img src={this.state.imageLocation}></img>
                <input type="file" name="myImage" onChange= {(e) => this.onChange(e)} required/>
                </div>

                <span>
                  <button style={{ margin: '0 1rem' }}>Done</button>
                </span>
              </form>
            </Collapse>
          </div>
        </div>
      ));
    } else {
      displaySection = <h4>No sections found!!</h4>
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
              <NavLink  href="/delS">DELETE SECTION </NavLink>
            </NavItem>
            <NavItem>
              <NavLink active href="/addI">ADD ITEM</NavLink>
            </NavItem>
            <NavItem>
              <NavLink  href="/dItems">MENU</NavLink>
            </NavItem>
          </Nav>
        </div>

        <div>
          <p>{this.state.message}</p>
          {displaySection}
        </div>
      </div>
    )
  }
}


export default compose(
  graphql(addItemToSection, { name: "addItemSection" })
  )(addItem);