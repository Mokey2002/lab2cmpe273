import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//create the Navbar Component
class Navbar extends Component {
    constructor(props){
        super(props);
        this.handleLogout = this.handleLogout.bind(this);
    }
    //handle logout to destroy the cookie
    handleLogout = () => {
        cookie.remove('cookie', { path: '/' })
    }
    render(){
        //if Cookie is set render Logout Button
        let navLogin = null;
        if(cookie.load('cookie')){
            console.log("Able to read cookie");
            navLogin = (
                
                <ul class="nav navbar-nav navbar-right">
                        <li><Link to="/" onClick = {this.handleLogout}><span class="glyphicon glyphicon-user"></span>Logout</Link></li>
                        <li><Link to="/update"><span class="glyphicon glyphicon-user"></span>Edit Profile</Link></li>
                        <li><Link to="/favorites"><span class="glyphicon glyphicon-user"></span>Favorites</Link></li>
                        <li><Link to="/shop_register"><span class="glyphicon glyphicon-user"></span>Seller Registration</Link></li>
                        <li><Link to="/shop"><span class="glyphicon glyphicon-user"></span> My Shop</Link></li>
                        <li><Link to="/purchases"><span class="glyphicon glyphicon-user"></span>Purchases</Link></li>
                        <li><Link to="/cart"><span class="glyphicon glyphicon glyphicon-shopping-cart
"></span></Link></li>
                </ul>
            );
        }else{
            //Else display login button
            console.log("Not Able to read cookie");
            navLogin = (
                <ul class="nav navbar-nav navbar-right">
                        <li><Link to="/login"><span class="glyphicon glyphicon-log-in"></span> Sign in</Link></li>
                        <li><Link to="/register"><span class="glyphicon glyphicon-register"></span> Register</Link></li>
                </ul>
                
                
            )
        }
        let redirectVar = null;
       // if(cookie.load('cookie')){
         //   redirectVar = <Redirect to="/home"/>
       // }
        return(
            <div>
                {redirectVar}
            <nav class="navbar navbar-inverse">
                <div class="container-fluid">
                    <div class="navbar-header">
                        <a class="navbar-brand">Etsy</a>
                    </div>
                    <ul class="nav navbar-nav">
                        <li class="active"><Link to="/home">Home</Link></li>
                    
                    </ul>
                  
  <div class="form-group ">
    <label for="inputPassword2" class="sr-only">Password</label>
    <input type="search" class="form-control rounded" placeholder="Search" aria-label="Search" aria-describedby="search-addon" />
  </div>
  <button type="submit" class="btn btn-primary mb-2">Search</button>

                    {navLogin}
                </div>
            </nav>
        </div>
        )
    }
}

export default Navbar;