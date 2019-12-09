import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import axios from 'axios';
import cookie from 'react-cookies';
import {
  Collapse, Navbar, NavbarToggler, NavbarBrand,
  Nav, NavItem, NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap'

function Item(itemName, itemPrice, itemQuanity) {
  this.itemName = itemName;
  this.itemPrice = itemPrice;
  this.itemQuanity = itemQuanity;
}


let products = []
class DragDrop extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      rows: [],
      columns: ['OrderNo', 'Restaurant', 'Price', 'Quantity', 'Status', 'ItemDeatils'],
      status: "",
      results: [],
    }
  }


  componentWillMount() {
    this.setState({
      results: [],
      rows: [],
      products: []
    });
  }
  submitSignIn(e, status) {
    console.log("stats", status)
    this.state.status = status;
    this.renderMyData();
  }

  async renderMyData() {
    this.setState({
      results: [],
      rows: [],
    });

    let user = cookie.load('cookyou');
    console.log("cookyou", user);
    let data = {
      'status': this.state.status,
      'id': localStorage.getItem("_id"),
      'email': localStorage.getItem("email")
    }
    console.log("CURRENT STATE", this.state);
    await axios.post('http://localhost:3001/morder/getOrderDeatilsBuyer/', data)
      .then((response) => {
        console.log(response);
        this.setState({
          results: response.data.message
        })
      });
    console.log("backend result", this.state.results);
    this.setOrderDetails();
    this.setState({
      rows: products
    });
    console.log("rows", this.state.rows);
  }

  setOrderDetails() {
    let map = new Map();
    let dbResult = this.state.results;
    dbResult.map(element => {
      // console.log("buyerid", element.buyer_id);
      if (map.has(element.id)) {
        // console.log("it exists");
        let newItem = new Item(element.name, element.price, element.quantity);
        let value = map.get(element.id);
        value.foodItems.push(newItem);
        // console.log(value);
        map.set(element.id, value);
      }
      else {
        // console.log("does not exists");
        let newItem = new Item(element.name, element.price, element.quantity);
        let obj = {
          orderId: element.id,
          foodItems: [newItem],
          id: element.id,
          name: element.restaurant_name,
          price: element.total_price,
          quantity: element.total_items,
          status: element.status,
        };
        map.set(element.id, obj);
      }
    })
    products = [];
    map.forEach(this.addProducts);
  }

  addProducts(value, key) {
    products.push({
      id: value.id,
      name: value.name,
      price: value.price,
      quantity: value.quantity,
      status: value.status,
      itemDetails: value.foodItems,
    });

    console.log("products", products);
  }

  geItemDeatils(details = []) {
    // console.log("deatils",details);
    let cart = ""
    if (details.length > 0) {
      return cart = <div>
        <div>
          <ul style={{ marginLeft: -25, listStyle: 'none' }}>
            {details.map((item, index) => (
              <li key={index}>
                <b>{item.itemName}</b><br />
                {item.itemQuanity} X ${(item.itemPrice)}
              </li>))
            }
          </ul>

        </div>
      </div>
    } else {
      return cart = <div>No items found!!</div>
    }
  }
  renderTableHeader() {
    return this.state.columns.map((key, index) => {
      return <th key={index}>{key.toUpperCase()}</th>
    })
  }

  renderTableData() {
    return this.state.rows.map((row, index) => {
      const { id, name, price, quantity, status, itemDetails } = row
      // console.log("ietmdeaisl",itemDetails)
      return (
        <tr key={id}>
          <td>{id}</td>
          <td>{name}</td>
          <td>{price}</td>
          <td>{quantity}</td>
          <td>{status}</td>
          <td>{this.geItemDeatils(itemDetails)}</td>
        </tr>
      )
    })
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }


  render() {
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
                    Orders
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

        <h1 id='title'>My Orders</h1>
        <Nav pills>
          <NavItem>
            <NavLink active onClick={(e) => this.submitSignIn(e, "NEW")}>NEW</NavLink>
          </NavItem>
          <NavItem>
            <NavLink onClick={(e) => this.submitSignIn(e, "PREPARING")}>PREPARING</NavLink>
          </NavItem>
          <NavItem>
            <NavLink onClick={(e) => this.submitSignIn(e, "READY")}>READY</NavLink>
          </NavItem>
          <NavItem>
            <NavLink onClick={(e) => this.submitSignIn(e, "DELIVERED")}>PAST ORDERS</NavLink>
          </NavItem>
          <NavItem>
            <NavLink onClick={(e) => this.submitSignIn(e, "CANCELLED")}>CANCELLED</NavLink>
          </NavItem>
        </Nav>
        <table id='restaurant'>
          <thead>
            {this.renderTableHeader()}
          </thead>
          <tbody>
            {this.renderTableData()}
          </tbody>
        </table>
      </div>
    );
  }
}

export default DragDrop;