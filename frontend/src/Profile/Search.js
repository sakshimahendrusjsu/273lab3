import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import './search.css';
import { Nav, NavItem, NavLink } from 'reactstrap';
import { connect } from 'react-redux';
import { selectRestuarantByCuisine,selectRestuarantByItems } from '../Redux/actions/restaurantActions';

let cuisineSet = new Set();
class Search extends Component {
  constructor(props) {
    super(props);
    console.log(props.location);
    this.state = {
      currentPage: 1,
      todosPerPage: 5,
      searchText : props.location.state.searchText,
      result: [],
      cuisineItem:"",
      renderPageNumbers: "",
    };
    this.handleFilter = this.handleFilter.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleFilter= (row,index,event) => {
    let body = {
      'text' : this.state.searchText,
      'cuisine' : row
    }
  this.props.selectRestuarantByCuisine(body);
 }

  componentDidMount(){
    this.renderMyData();
  }

 renderMyData() {
    let data = {
      'text' : this.state.searchText
    }
   console.log(data);
   this.props.selectRestuarantByItems(data); 
  }

  handleClick(event) {
    this.setState({
        currentPage: Number(event.target.id)
    });
  }

  renderTableData() {
    if(this.props.res!=undefined && this.props.res.length>0){
    console.log("dnskdn",this.props.res);
    cuisineSet.clear();
    let arr=[];
    let cue = this.props.res.map(restaurant=>{
     restaurant.sections.map((row, index) => {
      row.items.map(item=>{
        if(!cuisineSet.has(item.cuisine)){
        cuisineSet.add(item.cuisine)
        console.log(item.cuisine)
        arr.push(item.cuisine)
      }});
    });
  });

    return arr.map((item,index)=>
      {return (
      <NavItem key={index}
       onClick={this.handleFilter.bind(this,item)}>
       {item}
       <br/>
    </NavItem>
    )
      });
    }
}

  render() {
    let cart="";
    console.log("search functionality");
    if(this.props.res!= undefined){ 
      let foodItems=this.props.res;
      console.log("foodItems");
      const { currentPage, todosPerPage } = this.state;

      // Logic for displaying todos
      const indexOfLastTodo = currentPage * todosPerPage;
      const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
      const currentTodos = foodItems.slice(indexOfFirstTodo, indexOfLastTodo);
      this.state.result=currentTodos;
      // Logic for displaying page numbers
      const pageNumbers = [];
      for (let i = 1; i <= Math.ceil(foodItems.length / todosPerPage); i++) {
          pageNumbers.push(i);
      }

      console.log("pageNumbers",pageNumbers);
      this.state.renderPageNumbers = pageNumbers.map(number => {
          return (

              <li class="page"
              className={ this.state.currentPage==number ? "page active" : "page" }
                  key={number}
                  id={number}
                  onClick={this.handleClick}
              >
                  -{number} 
              </li>  
          );
      });


    cart =  <div className="container">
             <div className="row">
                    <div id = "leftbox">
                    <h1 id='filter'>Filter</h1>
                <table id='cuisine'>
                <Nav vertical>
                      {this.renderTableData()}
                  </Nav>
                </table>
              </div>
              <div id = "middlebox">
                <div>{this.props.res.length} Restaurants Found!! <hr /></div>
                <div>
                    <ul >
                        {currentTodos.map(res => (
                            <li key={res.id}>
                                <Link to={{ pathname: '/cart', state: {res:res}}}>{res.name}</Link>
                                <br/>
                                {/* <b>{res.name}</b>
                                <br></br> */}
                                <b>Served here!!</b>
                                <br/><br/>
                            </li>))
                        }
                    </ul>
                    <div class="pagination">
                    {this.state.renderPageNumbers}
                  </div>
                </div>
               
                </div>
                <div>
                
                </div>
            </div>
            </div>
    }else{
        cart= <div>No Restaurants Found!!!</div>
    }
        
    
    return (
        <div>
          <div class="header">
          <a href="/" class="logo">GRUBHUB</a>
          <a style={{position: 'absolute', right: 0}} href="/home" class="logo">BACK</a>
          <div class="header-right">
          </div>
        </div>
        {cart}
    </div>
     )
}
}

function mapStateToProps(store) {
  return {
    output: store.res.output,
    message: store.res.message,
    res: store.res.res,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    selectRestuarantByItems: (data) => dispatch(selectRestuarantByItems(data)),
    selectRestuarantByCuisine: (data)=> dispatch(selectRestuarantByCuisine(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);
