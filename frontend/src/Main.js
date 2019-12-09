import React, {Component} from 'react';
import { Route, Switch } from "react-router-dom";
import LandingPage from './LandingPage/LandingPage';
import LoginBuyer from './Login/LoginBuyer';
import LoginOwner from './Login/LoginOwner';
import CreateBuyer from './Create/CreateBuyer';
import CreateOwner from './Create/CreateOwner';
import AccountInfo from './Create/AccountInfo';
import Pricing from './Create/Pricing';
import Profile from './Profile/Profile';
import AccountBuyer from './Profile/AccountBuyer';
import EditBuyer from './Profile/EditBuyer';
import HomeBuyer from './Home/HomeBuyer'
import Logout from './Logout/Logout';
import OrderFood from './Cart/OrderFood';
import Checkout from './Cart/Checkout';
import BuyerOrder from './ManageOrders/BuyerOrder'
import Search from './Profile/Search'
import OwnerOrder from './ManageOrders/OwnerOrder'
import AddMenu from './Menu/AddItem';
import AddSection from './Menu/AddSection';
import DeleteSection from './Menu/DeleteSection';
import DeleteItems from './Menu/ItemsPage';
import DragDrop from './ManageOrders/dragorder';
import NewOrder from './ManageOrders/NewOrder';
import code from './ManageOrders/codeboxOrder';
import chat from './ChatInput/ChatInput';
import pagination from './Menu/pagination';
//Create a Main Component
class Main extends Component {
    render(){
        return(
            <div>
                <Switch>
                <Route exact path="/" component={LandingPage}/>
                <Route exact path="/login" component={LoginBuyer}/>
                <Route exact path="/create" component={CreateBuyer}/>
                <Route exact path="/logino" component={LoginOwner}/>
                <Route exact path="/createo" component={CreateOwner}/>
                <Route exact path="/home" component={HomeBuyer}/>
                <Route exact path="/homeo" component={HomeBuyer}/>
                <Route exact path="/profile" component={Profile}/>
                <Route exact path="/search" component={Search}/>
                <Route exact path="/cart" component={OrderFood}/>
                <Route exact path="/order" component={BuyerOrder}/>
                <Route exact path="/ordero" component={OwnerOrder}/>
                <Route exact path="/logout" component={Logout}/>
                <Route exact path="/addI" component={AddMenu}/>
                <Route exact path="/addS" component={AddSection}/>
                <Route exact path="/delS" component={DeleteSection}/>
                <Route exact path="/dItems" component={DeleteItems}/>
                <Route exact path="/account" component={AccountBuyer}/>
                <Route exact path="/account-owner" component={AccountInfo}/>
                <Route exact path="/pricing" component={Pricing}/>
                <Route exact path="/edit" component={EditBuyer}/>
                <Route exact path="/checkout" component={Checkout}/>
                {/* <Route exact path="/drag" component={DragDrop}/>
                <Route exact path="/drago" component={NewOrder}/>
                <Route exact path="/code" component={code}/> */}
                <Route exact path="/chat" component={chat}/>
                </Switch>

            </div>
        );
    }
}
//Export The Main Component
export default Main;