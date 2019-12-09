import React, { Component } from 'react';
import '../App.css'
import ProfileBuyer from './ProfileBuyer';
import EditBuyer from './EditBuyer';
import { ListGroup, ListGroupItem, Collapse, Card, Button, CardBody, UncontrolledCollapse,Form,FormGroup,Label,Input } from 'reactstrap';
//Define a Login Component
class AccountBuyer extends Component {

  render() {
    return (
      <div>
        <React.Fragment>
          <ProfileBuyer/>
          <EditBuyer/>
            <ListGroup>
              <ListGroupItem>Your Account</ListGroupItem>
              <ListGroupItem>
                <Button color="primary" id="toggler" style={{ marginBottom: '5rem' }}>
                  Edit </Button>
                <UncontrolledCollapse toggler="#toggler">
                  <Card>
                    <CardBody>
                    <Form  className="create-buyer" onSubmit={this.signInHandler}>
            <h3><span className="font-weight-bold">Edit Name</span></h3>
            {/* <h5>{this.state.errorMsg}</h5> */}
            <FormGroup>
            <Label>FirstName</Label>
            <Input  type="text" placeholder="first-name" required></Input>
          </FormGroup>
          <FormGroup>
            <Label>LastName</Label>
            <Input  type="text" placeholder="last-name" required></Input>
          </FormGroup>
          <FormGroup>
            <Label>Current Password</Label>
            <Input  type="password" placeholder="Password" required></Input>
          </FormGroup>
          <Button className="btn-lg btn-dark btn-block">Update</Button>
          <Button className="btn-lg btn-dark btn-block">Cancel</Button>
          </Form>
                    </CardBody>
                  </Card>
                </UncontrolledCollapse>
              </ListGroupItem>
            </ListGroup>
</React.Fragment>
</div>
        );
      }
}

export default AccountBuyer;