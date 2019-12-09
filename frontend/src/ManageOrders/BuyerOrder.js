import React, { Component } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Collapse, Navbar,  Card, CardImg, CardText, CardBody,Button,
  CardTitle, CardSubtitle,NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import { getOrderDeatilsBuyer } from '../Redux/actions/orderActions';
// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  console.log("reorder list", list);
  console.log("startIndex", startIndex);
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

/**
 * Moves an item from one list to another list.
 */
const move = (source, destination, droppableSource, droppableDestination) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);
  destClone.splice(droppableDestination.index, 0, removed);
  const result = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
};

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: 'none',
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,

  // change background colour if dragging
  background: isDragging ? 'lightgreen' : 'lightpurple',

  // styles we need to apply on draggables
  ...draggableStyle
});

const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? 'lightblue' : 'white',
  padding: grid,
  // width: 250
});

class BuyerOrder extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      rows: [],
      status: "",
      results: [],
      orderItems: [],
      list1: [],
      list2: [],
      // items: getItems(10),
      // selected: getItems(5, 10)
    }
  }

  /**
   * A semi-generic way to handle multiple lists. Matches
   * the IDs of the droppable container to the names of the
   * source arrays stored in the state.
   */
  id2List = {
    droppable: 'list1',
    droppable2: 'list2'
  };

  getList = id => this.state[this.id2List[id]];

  onDragEnd = result => {
    const { source, destination } = result;
    console.log("result", result);
    // dropped outside the list
    if (!destination) {
      return;
    }
    console.log("onDragEnd");
    console.log("source", source);
    console.log("destination", destination);
    if (source.droppableId === destination.droppableId) {
      const items = reorder(
        this.getList(source.droppableId),
        source.index,
        destination.index
      );

      if (source.droppableId === 'droppable2') {
        this.setState({ list2: items });
      } else {
        this.setState({ list1: items });
      }
      // this.setState(state);
    } else {
      const result = move(
        this.getList(source.droppableId),
        this.getList(destination.droppableId),
        source,
        destination
      );
      this.setState({
        list1: result.droppable,
        list2: result.droppable2
      });
    }
  };

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
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
    });
    console.log("CURRENT STATE", this.state.status);
    await this.props.getOrderDeatilsBuyer(this.state.status);
    console.log(this.props.orderItems);
    this.setOrderDetails();
  }

  setOrderDetails() {
    console.log("setOrderDetails"); 
    if (this.props.orderItems != undefined) {
      let len = this.props.orderItems.length;
      console.log(Math.floor(len / 2));
      let even = len % 2 == 0 ? Math.floor(len / 2) : Math.floor(len / 2) + 1
      let odd = Math.floor(len / 2)
      this.props.orderItems.map((item, index) => {
        if (item.list_index == null) {
          if (even > 0) {
            item.list_index = even;
            item.div_index = 0;
            even--;
          } else {
            if (odd > 0) {
              item.list_index = odd;
              item.div_index = 1;
              even--;
            }
          }
        } else if (item.div_index == 1) {
          odd--;
        } else if (item.div_index == 0) {
          even--;
        }
        item.id = index + 1
      }
      );

      this.state.list1 = this.props.orderItems.filter(item => item.div_index === 0);
      console.log("lit1", this.state.list1);
      this.state.list2 = this.props.orderItems.filter(item => item.div_index === 1);
      console.log("lit2", this.state.list2);
    }
  }

  render() {
    return (
      <div><div>
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
        <h1 id>My Orders</h1>
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
      </div>
        <div style={{ display: 'flex', flexDirection: 'row' } }>
          <DragDropContext onDragEnd={this.onDragEnd}>
            <Droppable droppableId="droppable">
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  style={getListStyle(snapshot.isDraggingOver)}>
                  {this.state.list1.map((item, index) => (
                    <Draggable
                      key={item.id}
                      draggableId={item.id}
                      index={index}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={getItemStyle(
                            snapshot.isDragging,
                            provided.draggableProps.style
                          )}>
                          <Card body inverse color="warning">
                            <CardBody>
                              <CardTitle>Order Id # {item._id}    .   
                              <Link to={{ pathname: '/chat', state: {orderId:item,userId:item.buyer_email,userId2:item.restaurant_name,id:item.buyer_id}}}><Button variant="outline-danger"> Need Help?</Button></Link>
                              </CardTitle>
                              <CardSubtitle>Restuarant Name : {item.restaurant_name}</CardSubtitle>
                              <CardText>Order status : {item.status}<br></br>
                              Total : {item.total_price}</CardText>
                            </CardBody>
                            
                          </Card>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
            <Droppable droppableId="droppable2">
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  style={getListStyle(snapshot.isDraggingOver)}>
                  {this.state.list2.map((item, index) => (
                    <Draggable
                      key={item.id}
                      draggableId={item.id}
                      index={index}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={getItemStyle(
                            snapshot.isDragging,
                            provided.draggableProps.style
                          )}>
                          <Card body inverse color="info">
                            <CardBody>
                              <CardTitle>Order Id #{item._id}     .
                              <Link to={{ pathname: '/chat', state: {orderId:item}}}><Button variant="outline-danger">Need Help?</Button></Link>
                              </CardTitle>
                              <CardSubtitle>Restuarant Name : {item.restaurant_name}</CardSubtitle>
                              <CardText>Order status : {item.status}<br></br>
                              Total :{item.total_price}</CardText>
                            </CardBody>
                          </Card>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
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
      getOrderDeatilsBuyer :(data) => dispatch(getOrderDeatilsBuyer(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BuyerOrder)
