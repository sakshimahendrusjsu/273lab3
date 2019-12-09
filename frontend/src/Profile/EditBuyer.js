import React, {Component} from 'react';
import '../App.css'
import {
    DropdownToggle,
    DropdownMenu,
    DropdownItem ,Dropdown,Collapse, Card, Button, CardBody, UncontrolledCollapse,Form,FormGroup,Label,Input} from 'reactstrap';
import {Link} from 'react-router-dom';


//Define a Login Component
class EditBuyer extends Component{
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false
    };
  }

  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }
    render() {
        return (

          <div class="wrapper">
    <nav id="sidebar">
        <div class="sidebar-header">
            <h3>Account</h3>
        </div>

        <ul class="list-unstyled components">
            <p>Account</p>
            <li class="active">
                <a href="#homeSubmenu" data-toggle="collapse" aria-expanded="false" class="dropdown-toggle" >Profile</a>
                <ul class="collapse list-unstyled" id="homeSubmenu">
                    <li>
                        <a href="#">Home 1</a>
                    </li>
                    <li>
                        <a href="#">Home 2</a>
                    </li>
                    <li>
                        <a href="#">Home 3</a>
                    </li>
                </ul>
            </li>
            <li>
                <a href="#">About</a>
            </li>
            <li>
                <a href="#pageSubmenu" data-toggle="collapse" aria-expanded="false" class="dropdown-toggle">Pages</a>
                <ul class="collapse list-unstyled" id="pageSubmenu">
                    <li>
                        <a href="#">Page 1</a>
                    </li>
                    <li>
                        <a href="#">Page 2</a>
                    </li>
                    <li>
                        <a href="#">Page 3</a>
                    </li>
                </ul>
            </li>
            <li>
                <a href="#">Contact</a>
            </li>
        </ul>
    </nav>

</div>
          // <div>
          //   <br/>
          //   <p>Your Account</p>
          //   <Nav vertical>
          //     <NavItem>
          //       <NavLink href="/edit-account-buyer">Profile</NavLink>
          //     </NavItem>
          //     <NavItem>
          //       <NavLink href="#">Address and phone</NavLink>
          //     </NavItem>
          //   </Nav>
          // </div>

/* <div>
<Navbar color="light" light expand="md">
  <NavbarBrand href="/profile">profile</NavbarBrand>
  <NavbarToggler onClick={this.toggle} />
  <Collapse isOpen={this.state.isOpen} navbar>
    <Nav className="ml-auto" navbar>
      <NavItem>
        **<NavLink tag={Link} to="/plantInfo">Plant Info</NavLink>**
      </NavItem>
      <UncontrolledDropdown nav inNavbar>
        <DropdownToggle nav caret>
          Options
        </DropdownToggle>
        <DropdownMenu right>
          <DropdownItem>
            Option 1
          </DropdownItem>
          <DropdownItem>
            Option 2
          </DropdownItem>
          <DropdownItem divider />
          <DropdownItem>
            Reset
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
    </Nav>
  </Collapse>
</Navbar>
</div>  */

        );
      }
}

export default EditBuyer;