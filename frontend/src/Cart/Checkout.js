import React, { Component } from 'react';
import { connect } from 'react-redux';
import { placeOrder } from '../Redux/actions/orderActions';
import { Form, Button, FormGroup, Label, Input } from 'reactstrap';

class Checkout extends Component {
    constructor(props) {
        //Call the constructor of Super class i.e The Component
        super(props);
    }

    
    placeOrder = ()=> {
          this.props.placeOrder(this.props.cartItems,this.props.price);
    }
    
    render() {
        return (
            <div>
              <Button id="BUTTON_1" size="lg" onClick={this.placeOrder} block style={{display:'flex',justifyContent:'center'}}>
	          <span id="SPAN_2">Place Your Order</span>
              </Button>
            </div>

        )
    }
}
function mapStateToProps(store) {
    return {
        output: store.order.ouput,
        message: store.order.message,
        items: store.order.items,
        total: store.order.total,
        cartItems: store.order.cartItems,
        price: store.order.price
    }
}

function mapDispatchToProps(dispatch) {
    return {
        placeOrder: (data,price) => dispatch(placeOrder(data,price)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
