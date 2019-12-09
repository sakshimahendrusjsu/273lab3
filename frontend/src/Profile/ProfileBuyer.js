import React, { Component } from 'react';
import '../App.css'
import './Profile.css';
import { Button, UncontrolledCollapse, Collapse } from 'reactstrap';
import { connect } from 'react-redux';
import { editEmail, editName, editImage } from '../Redux/actions/profileActions';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';

//Define a Login Component
class ProfileOwner extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      collapse: false,
      validationMsg: "",
      selectedFile: null,
      selectedFileName: null,
    };
    this.editNameForm = this.editNameForm.bind(this);
    this.editEmailForm = this.editEmailForm.bind(this);
    this.fileChangedHandler = this.fileChangedHandler.bind(this);
  }

  toggle(e) {
    e.preventDefault();
    this.setState({
      collapse: !this.state.collapse
    })
  }

  editEmailForm(e) {
    console.log(e);
    console.log(e.target);
    let data = {
      'newEmail': null,
      'confirmEmail': null,
    }
    e.preventDefault();
    console.log("editing.....", data);
    data.newEmail = (e.target[0].value);
    data.confirmEmail = (e.target[1].value);
    if (data.newEmail !== data.confirmEmail) {
      this.setState = ({
        validationMsg: "Email Ids do not match."
      });
    } else {
      console.log("edit email form", data);
      this.props.editEmail(data);
    }
  }

  editNameForm(e) {
    console.log(e);
    console.log(e.target);
    let data = {
      'first': null,
      'last': null,
    }
    e.preventDefault();
    data.first = (e.target[0].value);
    data.last = (e.target[1].value);
    console.log("edit name form", data);
    this.props.editName(data);
  }

  fileChangedHandler = (event) => {
    var data = {
      'selectedFile': null,
      'selectedFileName': null
    }
    const file = event.target.files[0]
    this.setState({
      selectedFile: event.target.files[0],
      selectedFileName: event.target.files[0].name
    });
    data.selectedFile = this.state.selectedFile;
    data.selectedFileName = this.state.selectedFileName;
    this.props.editImage(data);
  }

  render() {
    // console.log(this.props.output)
    // console.log(cookie.load('cookie'))
    // const response = cookie.load('cookie');
    // if (localStorage.getItem("email") !== null && localStorage.getItem("tyep") == "buyer") {
    //   return (<Redirect to="/login" />)
    // } else if (localStorage.getItem("email") !== null) {
    //   return (<Redirect to="/login-owner" />)
    // }
    return (
      <div class="container">
        <h1>Edit Profile</h1>
        <div class="row">
          {/* <!-- left column --> */}
          <div class="col-md-3">
            <div class="text-center">
              <img src="//placehold.it/100" class="avatar img-circle" alt="avatar" />
              <h6>Upload a different photo...</h6>
              <input type="file" class="form-control" onChange={this.fileChangedHandler} />
            </div>
    
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
            <h4>{this.state.validationMsg}</h4>
            <div>
              <div class="alert alert-info alert-dismissable">
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
                <Button outline color="info" id="toggler1" style={{ marginBottom: '1rem' }}>
                  Edit Email
    </Button>
                <UncontrolledCollapse toggler="#toggler1">
                  <form class="form-horizontal" role="form" onSubmit={this.editEmailForm}>
                    <div class="form-group">
                      <label class="col-lg-3 control-label">New Email:</label>
                      <div class="col-lg-8">
                        <input class="form-control" type="text" placeholder="abc@example.com" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" />
                      </div>
                    </div>
                    <div class="form-group">
                      <label class="col-lg-3 control-label">Confirm Email:</label>
                      <div class="col-lg-8">
                        <input class="form-control" type="text" placeholder="abc@example.com" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" />
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
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(store) {
  return {
    output: store.edit.ouput,
    message: store.edit.message
  }
}

function mapDispatchToProps(dispatch) {
  return {
    editEmail: (data) => dispatch(editEmail(data)),
    editName: (data) => dispatch(editName(data)),
    editImage: (data) => dispatch(editImage(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileOwner);