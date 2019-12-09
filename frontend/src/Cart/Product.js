import React, { Component } from 'react';
import { element } from 'prop-types';

// let myMap = new Map();
let sections = [];
export default class Products extends Component {
    constructor(props) {
        super(props);
    }

    getItems(items, type,sectionId) {
        console.log("items",items);
        console.log("type",type);
        console.log("sectionId",sectionId)
        let productItems = "";
        if (type == "owner") {
            productItems = items.map(product => (
                <div className="row-md-2" key={product._id}>
                    <div className="thumbnail text-center">
                        <a href={`#${product._id}`}>
                        <img  style={{width:'100%',height:'auto'}} src={require(`../upload/${product.image}`)} alt={product.item_name} className="thumbnail"/>
                            {/* <img src={require(`../res.jpeg`)} alt={product.name} className="thumbnail" /> */}
                            <h5>{product.name}</h5>
                            <p>{product.description}</p>
                        </a>
                        <b>${product.price}</b>
                        <button className="btn btn-primary" onClick={(e) => this.props.handleRemoveItem(e, product,sectionId)}>Delete Item</button>
                        <br /><br />
                    </div>
                </div>
            ));
        } else {
            productItems = items.map(product => (
                <div className="row-md-2" key={product._id}>
                    <div className="thumbnail text-center">
                        <a href={`#${product._id}`}>
                            <img  src={require(`../upload/${product.image}`)} alt={product.item_name} className="thumbnail"/>
                            {/* <img src={require(`../pizza.jpeg`)} alt={product.name} className="thumbnail" /> */}
                            <h5>{product.name}</h5>
                            <p>>{product.description}</p>
                        </a>
                        <b>${product.price}</b>
                        <button className="btn btn-primary" onClick={(e) => this.props.handleAddToCart(e, product)}>Add to cart</button>
                        <br /><br />
                    </div>
                </div>
            ));
        }
        return productItems;
    }


    render() {
        let productItems = "";
        console.log("this.props.products", this.props.products);

        productItems = this.props.products.map((product) => (
            <div className="col-md-4" key={product._id}>
                <div>
                    <h4>{product.section_name}</h4>
                {this.getItems(product.items, this.props.type, product._id)}</div>
            </div>
        )
        );
        // }else{
        //     productItems=<h4>NO ITEMS FOUND :( </h4> 
        // }

        return (
            <div className="row">
                {productItems}
            </div>
        )
    }
}
