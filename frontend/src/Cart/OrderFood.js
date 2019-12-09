import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getFooditems,getCartItems,setPrice,placeOrder,clearCartItems } from '../Redux/actions/orderActions';
import Products from './Product';
import Basket from './Basket';
import {Redirect} from 'react-router';

class OrderFood extends Component {
    constructor(props) {
        super(props);
        console.log("orderfood props",props.location);
        this.state = {
            restaurantDetails : props.location.state.res,
            result: [],
            cuisines :[],
            red:""
          };
    }
    
    componentWillMount() {
        this.renderMyData();
        localStorage.setItem("restaurant_name",this.state.restaurantDetails.name);
        localStorage.setItem("restaurant_id",this.state.restaurantDetails._id);
    }

    renderMyData() {
        if (localStorage.getItem('cartItems')) {
            console.log("car items exist");
            this.props.getCartItems();
        }
    }

    handleRemoveFromCart = (e, product) => {
       const newCartItems = this.props.cartItems.filter(a => a._id !== product._id);
        localStorage.setItem('cartItems', JSON.stringify(newCartItems));
        this.props.getCartItems();
    }

    handleAddToCart = (e, product) => {
        console.log("e",e.target);
        console.log("product in handle to cart",product);
        let cartItems = this.props.cartItems;
        console.log("carItems",cartItems);
        if(cartItems==undefined){
            cartItems=[];
        }
        let productAlreadyInCart = false;
        cartItems.forEach(cp => {
                console.log(cp._id);
                console.log(product._id);
                if (cp._id === product._id) {
                    cp.count += 1;
                    productAlreadyInCart = true;
                }
            });
        if (!productAlreadyInCart) {
                cartItems.push({ ...product, count: 1 });
            }
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
            this.props.getCartItems();
    }

    checkout = (e)=>{
       console.log("price checkout",e);
        this.props.setPrice(e);
        let price = {
            'totalPrice' : e
        }
        this.props=Object.assign(price,this.props);
        console.log("added price",this.props);
        localStorage.setItem("restaurant_name",this.state.restaurantDetails.name);
        localStorage.setItem("restaurant_id",this.state.restaurantDetails._id);
        localStorage.setItem("owner_id",this.state.restaurantDetails.id);
        this.props.placeOrder(this.props);
        localStorage.removeItem('cartItems');
        this.props.clearCartItems();
        console.log("props car items",this.props.cartItems);
        this.setState({
        redirectVar : <Redirect to= "/order"/>
        });
    }

    render() {
        console.log("cartItems",this.props.cartItems)
        console.log("items", this.props.items)
        return (
            <div>
                {this.state.redirectVar}
            <div className="container">
                <hr />
                <div className="row">
                    <div className="col-md-9">
                    <h2>{this.state.restaurantDetails.name}</h2>
                        <hr />
                        <Products products={this.state.restaurantDetails.sections} type={"buyer"} handleAddToCart={this.handleAddToCart} />
                    </div>
                    <div className="col-md-3">
                        <Basket cartItems={this.props.cartItems} checkout={this.checkout} handleRemoveFromCart={this.handleRemoveFromCart} />
                    </div>
                </div>
            </div>
            </div>
        );
    }
}

function mapStateToProps(store) {
    return {
        output: store.order.ouput,
        message: store.order.message,
        items: store.order.items,
        total: store.order.total,
        cartItems: store.order.cartItems,
        price : store.order.price
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getCartItems: () => dispatch(getCartItems()),
        setPrice: (data)=> dispatch(setPrice(data)),
        placeOrder: (data) => dispatch(placeOrder(data)),
       clearCartItems:() => dispatch(clearCartItems())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderFood);
