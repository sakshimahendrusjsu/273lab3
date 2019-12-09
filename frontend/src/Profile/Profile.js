import React, { Component } from 'react';
import '../App.css'
import './Profile.css';
import { connect } from 'react-redux';
import { editEmail, editName, editImage, editCuisine, editPhone, editRestuarantName, getAll } from '../Redux/actions/profileActions';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import {Collapse, Navbar, NavbarToggler, NavbarBrand,
  Nav,UncontrolledCollapse,Button,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';
import axios from 'axios';
import { withApollo } from "react-apollo";
import { graphql,compose } from "react-apollo";
import { getProfileQuery  } from '../queries/queries';
import { updateUserEmail,updateUserName } from "../mutation/mutations";

//Define a Login Component
class ProfileOwner extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      firstName:"",
      lastNmae:"",
      email:"",
      phone:"",
      restaurantName:"khao pio",
      collapse: false,
      validationMsg: "",
      multerImage:"",
      imageLocation: this.props.image==undefined? "download.png" : this.props.image,
      selectedFile:""
    };
  
    // this.editNameForm = this.editNameForm.bind(this);
    // this.editEmailForm = this.editEmailForm.bind(this);
    // this.editPhone = this.editPhone.bind(this);
    // this.editCuisine = this.editCuisine.bind(this);
    // this.editRestaurantName = this.editRestaurantName.bind(this);
    // this.onChange= this.onChange.bind(this);
  }

  componentWillMount() {
    this.renderMyData();
  }

  async renderMyData() {
    let emailId = localStorage.getItem("email");
    let type = localStorage.getItem("type");
    await this.props.client
    .query({
      query: getProfileQuery ,
      variables: {
        email:emailId,
        "user_type" : type
      }
    })
    .then(res => {
       this.setState({
         email:res.data.profile.email,
         firstName:res.data.profile.firstName,
         lastName:res.data.profile.lastName
       })
       
      console.log(JSON.stringify(res));
    });
  }

  toggle(e) {
    e.preventDefault();
    this.setState({
      collapse: !this.state.collapse
    })
  }

  editNameForm(e) {
    e.preventDefault();
    this.props
    .updateUserName({
      variables: {
        firstName: (e.target[0].value),
        lastName: (e.target[1].value),
        email: localStorage.getItem("email"),
        user_type: localStorage.getItem("type"),
      }
    }).then(res => {
      console.log(JSON.stringify(res));
    });
  }

  editEmailForm(e) {
    let data = {
      'newEmail': null,
      'confirmEmail': null,
    }
    e.preventDefault();
    data.newEmail = (e.target[0].value);
    data.confirmEmail = (e.target[1].value);
    if (data.newEmail !== data.confirmEmail) {
      this.setState = ({
        validationMsg: "Email Ids do not match."
      });
    } else {
      console.log("edit email form", data);
      this.props
    .updateUserEmail({
      variables: {
        email: localStorage.getItem("email"),
        newemail:(e.target[0].value),
        user_type: localStorage.getItem("type"),
      }
    }).then(res => {
      console.log(JSON.stringify(res));
    });
    }
  }

  editPhone(e) {
    let data = {
      'phone': null,
    }
    e.preventDefault();
    data.phone = (e.target[0].value);
    console.log("edit phone form", data);

  }

  editCuisine(e) {
    let data = {
      'cuisine': null,
    }
    e.preventDefault();
    data.cuisine = (e.target[0].value);
    console.log("edit cuisine form", data);

  }

  editRestaurantName(e) {
    let data = {
      'restaurantName': null,
    }
    e.preventDefault();
    data.restaurantName = (e.target[0].value);
    console.log("edit restuarant name form", data);
  
  }

  formSumbit(e) {
    e.preventDefault();
    let data = new FormData();
    console.log("0 idnex",e.target[0].value);
    console.log("target",e.target);
    console.log("selectedFile and index",this.state.selectedFile);
    data.append('file', this.state.selectedFile);
    data.append('name', e.target[0].value);
    data.append('id', localStorage.getItem("_id"));
    data.append('email',localStorage.getItem("email"));
    data.append('type',localStorage.getItem("type"));
    // this.props.editImage(data);
    // this.state.imageLocation=this.props.image
      alert("Profile Photo Updated!!");
      e.target.reset();
  }

  onChange(e) {
    console.log(e.target.files[0]);
    let location = e.target.files[0].name;
    this.setState({selectedFile:e.target.files[0],
    imageLocation:location});
    console.log("imagelocation",this.state.imageLocation);
  }

  render() {
    // console.log(this.props.output)
    // console.log(cookie.load('cookie'))
    // const response = cookie.load('cookie');
    if (localStorage.getItem("email") == null && localStorage.getItem("type") == null) {
      return (<Redirect to="/" />)
    }
    // } else if (localStorage.getItem("email") !== null) {
    //   return (<Redirect to="/login-owner" />)
    // }
    let ownerFields = null;
    let restuarantImage = null;
    let flag = localStorage.getItem("type") == "owner" ? true : false;
    if (flag) {
      ownerFields = <div>
        <div>
          <br />
          <div class="alert alert-info alert-dismissable">
          <p>restaurantName: {this.state.restaurantName}</p>
            <Button outline color="info" id="toggler3" style={{ marginBottom: '1rem' }}>
              Edit Restaurant Name
</Button>
            <UncontrolledCollapse toggler="#toggler3">
              <form class="form-horizontal" role="form" onSubmit={this.editRestaurantName}>
                <div class="form-group">
                  <label class="col-lg-3 control-label">Restaurant Name:</label>
                  <div class="col-lg-8">
                    <input class="form-control" type="text" placeholder="Restaurant Name" />
                  </div>
                </div>
                <span>
                  <button style={{ margin: '0 1rem' }}>Update Restuarant Name</button>
                  <button style={{ margin: '0 1rem' }}>Cancel</button>
                </span>
              </form>
            </UncontrolledCollapse>
          </div>
        </div>

        <div>
          <br />
          <div class="alert alert-info alert-dismissable">
          <p>Cuisine: {this.state.cuisine}</p>
            <Button outline color="info" id="toggler4" style={{ marginBottom: '1rem' }}>
              Edit Cuisine
</Button>
            <UncontrolledCollapse toggler="#toggler4">
              <form class="form-horizontal" role="form" onSubmit={this.editCuisine}>
                <div class="form-group">
                  <label class="col-lg-3 control-label">Cuisine:</label>
                  <div class="col-lg-8">
                    <input class="form-control" type="text" placeholder="Cuisine" />
                  </div>
                </div>
                <span>
                  <button style={{ margin: '0 1rem' }}>Update Cuisine</button>
                  <button style={{ margin: '0 1rem' }}>Cancel</button>
                </span>
              </form>
            </UncontrolledCollapse>
          </div>
        </div>
      </div>
    }
    return (
      
      <div class="container1">
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
        <h3 style={{ width: "1 rem" }}>Edit Profile</h3><br />
        <h5>{this.state.message}</h5>
        <div class="row">
          {/* <!-- left column --> */}
          <div class="col-md-3">
            <div class="text-center">
            <form  onSubmit={(e) => this.formSumbit(e)}>
                <h1>File Upload</h1>
                <img src={require(`../upload/${this.state.imageLocation}`)} alt="edit" className="thumbnail" ></img>
                <input type="file" name="myImage" onChange= {(e) => this.onChange(e)} required/>
                <button style={{ margin: '0 1rem' }}>Upload</button>
            </form>

              {/* <img src="//placehold.it/100" class="avatar img-circle" alt="avatar" />
              <h6>Upload profile photo...</h6>
              <input name="avatar" type="file" class="form-control" onChange={this.fileChangedHandler}/> */}

            </div>
            {restuarantImage}
          </div>
          {/* <!-- edit form column --> */}
          <div class="col-md-9 personal-info">
            {/* <div class="alert alert-info alert-dismissable">
          <a class="panel-close close" data-dismiss="alert">×</a> 
          <i class="fa fa-coffee"></i>
          This is an <strong>.alert</strong>. Use this to show important messages to the user.
        </div> */}
            <h3>Your account</h3>
            <br />
            <div>
              <div class="alert alert-info alert-dismissable">
                <p>Name: {this.state.firstName} {this.state.lastName}</p>
                <Button outline color="info" id="toggler" style={{ marginBottom: '1rem' }}>
                  Edit Name
                 </Button>
                <UncontrolledCollapse toggler="#toggler">
                  <form class="form-horizontal" role="form" onSubmit={this.editNameForm}>
                    <div class="form-group">
                      <label class="col-lg-3 control-label">First name:</label>
                      <div class="col-lg-8">
                        <input class="form-control" type="text" placeholder="First Name" />
                      </div>
                    </div>
                    <div class="form-group">
                      <label class="col-lg-3 control-label">Last name:</label>
                      <div class="col-lg-8">
                        <input class="form-control" type="text" placeholder="Last Name" />
                      </div>
                    </div>
                    <span>
                      <button style={{ margin: '0 1rem' }} >Update name</button>
                      <button style={{ margin: '0 1rem' }} >Cancel</button>
                    </span>
                  </form>
                </UncontrolledCollapse>
                <br />
              </div>
            </div>

            <div>
              <br />
              <div class="alert alert-info alert-dismissable">
              <p>Email: {this.state.email}</p>
                <Button outline color="info" id="toggler1" style={{ marginBottom: '1rem' }}>
                  Edit Email
    </Button>
                <h4>{this.state.validationMsg}</h4>
                <UncontrolledCollapse toggler="#toggler1">
                  <form class="form-horizontal" role="form" onSubmit={this.editEmailForm}>
                    <div class="form-group">
                      <label class="col-lg-3 control-label">New Email:</label>
                      <div class="col-lg-8">
                        <input class="form-control" type="email" placeholder="abc@example.com" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" />
                      </div>
                    </div>
                    <div class="form-group">
                      <label class="col-lg-3 control-label">Confirm Email:</label>
                      <div class="col-lg-8">
                        <input class="form-control" type="email" placeholder="abc@example.com" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" />
                      </div>
                    </div>
                    <span>
                      <button style={{ margin: '0 1rem' }}>Update email</button>
                      <button style={{ margin: '0 1rem' }}>Cancel</button>
                    </span>
                  </form>
                </UncontrolledCollapse>
              </div>
            </div>

            <div>
              <br />
              <div class="alert alert-info alert-dismissable">
              <p>Phone: {this.state.phone}</p>
                <Button outline color="info" id="toggler2" style={{ marginBottom: '1rem' }}>
                  Edit Phone Number
              </Button>
                <UncontrolledCollapse toggler="#toggler2">
                  <form class="form-horizontal" role="form" onSubmit={this.editPhone}>
                    <div class="form-group">
                      <label class="col-lg-3 control-label">Phone Number:</label>
                      <div class="col-lg-8">
                        <input class="form-control" type="number" placeholder="xxx-xxx-xxxx" pattern="[0-9]" size="10" />
                      </div>
                    </div>
                    <span>
                      <button style={{ margin: '0 1rem' }}>Update Phone Number</button>
                      <button style={{ margin: '0 1rem' }}>Cancel</button>
                    </span>
                  </form>
                </UncontrolledCollapse>
              </div>
            </div>

            {ownerFields}
          </div>
        </div>
      </div>
    );
  }
}

export default compose(
  graphql(updateUserEmail, { name: "updateUserEmail" }),
  graphql(updateUserName, { name: "updateUserName" })
  )(withApollo(ProfileOwner));