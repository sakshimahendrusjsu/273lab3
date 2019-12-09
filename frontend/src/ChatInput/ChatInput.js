import React, { Component } from 'react';
import './Chat.css';
import { connect } from 'react-redux';
import History from './ChatHistory';
import { updateChat,getChat } from '../Redux/actions/messageActions';



class ChatInput extends Component {
  constructor(props) {
    super(props);

  this.state = {
    orderId : props.location.state.orderId,
    userID: props.location.state.userId,
    userID2 : props.location.state.userId2,
    id: props.location.state.id,
    imgURL:'//robohash.org/' + props.location.state.userId + '?set=set2&bgset=bg2&size=70x70'
  };
  }

  componentDidMount() {
    console.log("order id",this.state.orderId);
    localStorage.setItem("restaurant_name",this.state.orderId.restaurant_name);
    localStorage.setItem("restaurant_id",this.state.orderId.restaurant_id);
    this.refs.txtMessage.focus();
    this.renderMyData();
  }

  async renderMyData() {
    await this.props.getChat(this.state.orderId._id);
}

  sendMessage = (message) => {
    console.log("current chat",this.props.chat)
    console.log('sendMessage', message);
  let data ={
    order_id : this.state.orderId,
    chat : message
  }
  this.props.updateChat(data)

  }

  onSubmit = (e) => {
    e.preventDefault();
    const message = this.refs.txtMessage.value;
    if (message.length === 0) {
    return;
    }
    const messageObj = {
      Who: this.state.userID,
      What: message,
      When: new Date().valueOf(),
      userId: this.state.id
    };
    this.sendMessage(messageObj);
    // Clear the input field and set focus
this.refs.txtMessage.value = '';
this.refs.txtMessage.focus()
  };

    render() {
        return (
          <div>
            <div class="header">
          <a href="/" class="logo">GRUBHUB</a>
          <a style={{position: 'absolute', right: 0}} href="/order" class="logo">BACK</a>
          <div class="header-right">
          </div>
        </div>
        <div>
        <span className="chip2">Welcome {this.state.userID}!! Thankyou for contacting GRUBHUB!! </span>
        </div>
        <link rel="stylsheet" type="text/css" href="//fonts.googleapis.com/icon?family=Material+Icons" />
        <link rel="stylesheet" type="text/css" href="//cdnjs.cloudflare.com/ajax/libs/materialize/0.97.5/css/materialize.min.css" media="screen,projection" />
        <History orderId={this.state.orderId}/>
        <footer className="teal"> 
        <form className="container" onSubmit={this.onSubmit}>
          <div className="row">
            <div className="input-field col s10">
              <i className="prefix mdi-communication-chat" />
              <input ref="txtMessage" type="text" placeholder="Type your message" />
              <span className="chip left">
                <img src={this.state.imgURL} />
                <span>{this.state.userID} #{this.state.id}</span>
              </span>
            </div>
           
            <div className="input-field col s2">
              <button type="submit" className="waves-effect waves-light btn-floating btn-large">
                <i className="mdi-content-send" />
              </button>
            </div>
          </div>
        </form>
      </footer>
      </div>);
    }
  }

  function mapStateToProps(store) {
    return {
        output: store.msg.ouput,
        message: store.msg.message,
        chat: store.msg.chat,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getChat: (data) => dispatch(getChat(data)),
        updateChat: (data)=> dispatch(updateChat(data)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatInput)