import React, { Component } from 'react';
import axios from 'axios';
import './table.css'
import Select from 'react-select';
import {
    Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, UncontrolledDropdown,Button,
    DropdownToggle, DropdownMenu, DropdownItem
} from 'reactstrap'
import { connect } from 'react-redux';
import { getOrderDeatilsOwner, handleStatus } from '../Redux/actions/orderActions';
import {Link} from 'react-router-dom';
function Item(itemName, itemPrice, itemQuanity) {
    this.itemName = itemName;
    this.itemPrice = itemPrice;
    this.itemQuanity = itemQuanity;
}

let products = [];
class OwnerOrder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            result: [],
            rows: [],
            status: "",
            columns: ['OrderNo', 'Customer', 'CustomerAddress', 'Price', 'Quantity', 'Status', 'ItemDetails','Help'],
            options: [],
            successMessage: "",
            selectedOption: "",
            selections: [],
            name: localStorage.getItem("restaurant_name")
        }
        this.toggle = this.toggle.bind(this);
        this.handleStatus = this.handleStatus.bind(this)
    }


    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    getOption(id) {
        this.setState({
            ...this.state,
            selections: [...this.state.selections, this.state.selectedOption]
        });
        return this.state.selectedOption;
    }
    componentWillMount() {
        this.setState({
            results: [],
            rows: [],
            selections: []
        });
    }

    submitSignIn(e, status) {
        console.log("stats", status)
        if (status == "NEW") {
            this.state.selectedOption = { value: 'NEW', label: 'NEW' };
            this.state.options = [
                { value: 'PREPARING', label: 'PREPARING' },
                { value: 'READY', label: 'READY' },
                { value: 'DELIVERED', label: 'DELIVERED' },
                { value: 'CANCELLED', label: 'CANCELLED' }
            ]
        } else if (status == "PREPARING") {
            this.state.selectedOption = { value: 'PREPARING', label: 'PREPARING' };
            this.state.options = [
                { value: 'READY', label: 'READY' },
                { value: 'DELIVERED', label: 'DELIVERED' }
            ]
        } else if (status == "READY") {
            this.state.selectedOption = { value: 'READY', label: 'READY' };
            this.state.options = [
                { value: 'DELIVERED', label: 'DELIVERED' }
            ]
        } else {
            this.state.selectedOption = { value: status, label: status };
        }
        this.state.status = status;
        this.renderMyData();
    }

    handleStatus = (option, row, index) => {
        console.log(option,"^^^",row,"^^^^",index)
        if (this.state.selections[index] == index) {
            console.log("returning or not")
            return;
        }
        this.state.selections[index] = index;
        let body = {
            'status': index.value,
            'id': option._id
        }
        this.props.handleStatus(body);
        this.renderMyData();
    }

    async renderMyData() {
        this.props.getOrderDeatilsOwner(this.state.status);
        this.state.results = this.props.orderItems;
        console.log("orderItems", this.props.orderItems);
    }

    geItemDeatils(details = []) {
        let cart = ""
        if (details.length > 0) {
            return cart = <div>
                <div>
                    <ul style={{ marginLeft: -25, listStyle: 'none' }}>
                        {details.map((item, index) => (
                            <li key={index}>
                                <b>{item.name}</b><br />
                                {item.itemQuanity} X ${(item.price)}
                            </li>))
                        }
                    </ul>
                </div>
            </div>
        } else {
            return cart = <div>No items found!!</div>
        }
    }

    renderTableHeader() {
        return this.state.columns.map((key, index) => {
            return <th key={index}>{key.toUpperCase()}</th>
        })
    }

    renderTableData() {
        console.log("render table ", this.state.selectedOption, this.props.orderItems);
        if (this.props.orderItems != undefined) {
            return this.props.orderItems.map((row, index) => {
                const { _id, buyer_email, total_price, items } = row
                return (
                    <tr key={index}>
                        <td>{index+1}</td>
                        <td>{buyer_email}</td>
                        <td>Apt no.{row.items.length}{total_price} ,San Jose </td>
                        <td>{total_price}</td>
                        <td>{row.items.length}</td>
                        <td><Select key={index}
                            value={(e) => this.getOption(index)}
                            onChange={this.handleStatus.bind(this, row, index)}
                            options={this.state.options}
                            autoFocus={true} />
                        </td>
                        <td>{this.geItemDeatils(items)}</td>
                        <td>
                        <Link to={{ pathname: '/chat', state:{orderId:row,userId:row.restaurant_name,userId2:row.buyer_email,id:row.owner_id}}}><Button variant="outline-danger">Chat</Button></Link>
                        </td>
                    </tr>
                )
            })
        }
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
                                    Hi,{this.state.name}
                                </DropdownToggle>
                                <DropdownMenu right>
                                    <DropdownItem href="/ordero">
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
                <h1>Restaurant Orders</h1>
                <Nav pills>
                    <NavItem>
                        <NavLink onClick={(e) => this.submitSignIn(e, "NEW")}>NEW</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink onClick={(e) => this.submitSignIn(e, "PREPARING")}>PREPARING</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink onClick={(e) => this.submitSignIn(e, "READY")}>READY</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink onClick={(e) => this.submitSignIn(e, "DELIVERED")}>DELIVERED</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink onClick={(e) => this.submitSignIn(e, "CANCELLED")}>CANCELLED</NavLink>
                    </NavItem>
                </Nav>
                <table id="restaurant">
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

function mapStateToProps(store) {
    return {
        output: store.order.ouput,
        message: store.order.message,
        orderItems: store.order.orderItems
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getOrderDeatilsOwner: (data) => dispatch(getOrderDeatilsOwner(data)),
        handleStatus: (data) => dispatch(handleStatus(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(OwnerOrder);
