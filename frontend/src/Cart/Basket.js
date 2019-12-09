import React, { Component } from 'react';
export default class Basket extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        console.log("basket ");
        let cart="";
        let len = this.props.cartItems ? this.props.cartItems.length :0;
        console.log("hey hey "+this.props.cartItems);
        if(this.props.cartItems){
            console.log("jholi bhar do "+this.props.cartItems);
        cart = <div>
                    <div>Items in the basket. <hr /></div>
                    <div>
                        <ul style={{ marginLeft: -25 }}>
                            {this.props.cartItems.map(item => (
                                <li key={item.id}>
                                    <b>{item.item_name}</b>
                                    <button style={{ float: 'right' }} className="btn btn-danger btn-xs"
                                        onClick={(e) => this.props.handleRemoveFromCart(e, item)}>X</button>
                                    <br />
                                    {item.count} X ${(item.price)}
                                </li>))
                            }
                        </ul>
                        
                        <b>Sum: ${(this.props.cartItems.reduce((a, c) => (a + c.price * c.count), 0))}
                        </b>
                        <button onClick={()=>this.props.checkout((this.props.cartItems.reduce((a, c) => (a + c.price * c.count), 0)))} className="btn btn-primary">checkout</button>
                    </div>
                    </div>
        }else{
            cart= <div>Basket is empty</div>
        }
            
        
        return (
            <div>
            {cart}
        </div>
         )
    }
}
