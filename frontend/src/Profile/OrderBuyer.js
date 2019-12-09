import React, {Component} from 'react';
import '../App.css'
import ProfileBuyer from './ProfileBuyer';
import EditBuyer from './EditBuyer';


//Define a Login Component
class OrderBuyer extends Component{

      render() {
        return (
          <React.Fragment>
             <ProfileBuyer/>
             <EditBuyer/>
             </React.Fragment>
        );
      }
}

export default OrderBuyer;