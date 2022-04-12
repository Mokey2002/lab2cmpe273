import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import Login from './Login/Login';
import Home from './Home/Home';
import Delete from './Delete/Delete';
import Create from './Create/Create';
import Navbar from './LandingPage/Navbar';
import Register from './Register/Register';
import Update from './Update/Update';
import Favorites from './Favorites/Favorites';
import SRegister from './SRegister/SRegister';
import Shop from './Shop/Shop';
import Purchases from './Mypurchases/Purchases';
import Cart from './Cart/Cart';
import Overview from './Overview/Overview';
import MyShop from './MyShop/MyShop'

//Create a Main Component
class Main extends Component {
    render(){
        return(
            <div>
                {/*Render Different Component based on Route*/}
                <Route path="/" component={Navbar}/>
                <Route path="/login" component={Login}/>
                <Route path="/home" component={Home}/>
                <Route path="/delete" component={Delete}/>
                <Route path="/create" component={Create}/>
                <Route path="/register" component={Register}/>
                <Route path="/update" component={Update}/>
                <Route path="/favorites" component={Favorites}/>
                <Route path="/shop_register" component={SRegister}/>
                <Route path="/shop" component={Shop}/>
                <Route path="/purchases" component={Purchases}/>
                <Route path="/cart" component={Cart}/>
                <Route path="/overview" component={Overview}/>
                <Route path="/myshop" component={MyShop}/>
            </div>
        )
    }
}
//Export The Main Component
export default Main;