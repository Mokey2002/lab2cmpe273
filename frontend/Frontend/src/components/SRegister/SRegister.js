import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import au from '../img/ua.jpg';
import {Link} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons'
class Home extends Component {
    constructor(props){
        super(props);
        this.state = {
            shopname : "",
            username:cookie.load('cookie'),
            successflag: false,
            validid: false
        }
        this.shopnameHandler = this.shopnameHandler.bind(this);
    }
    
    //id  change handler
    shopnameHandler = (e) => {
        this.setState({
            shopname : e.target.value
        })
    }

        //sbumit change handler
        submitLogin = (e) =>{
            e.preventDefault();
            const data = {
                shopname : this.state.shopname,
                username: cookie.load('cookie')
            }
           
            document.cookie = "shopname" +'='+this.state.shopname +'; Path=/;';
            //send datat to backend
            axios.post('http://localhost:3001/check',data).then((response) => {
                console.log(response.data);
                if(response.status === 200){
                    this.setState({
                        successflag: true,
                        validid : false
                    })
                } else if(response.status === 201){
                    this.setState({
                        successflag: false,
                        validid : true
                    })
                }
            })
        }


    render(){

                //set values
                let {successflag} = this.state;
                let {validid} = this.state;
                let success = null;
                let loginredirect = null;
                let invalidID;
                //check if user is logged in
                if(!cookie.load('cookie')){
                    loginredirect = <Redirect to = "/login"/>
                }
                //delete successful
                if(successflag){
                    success = <Redirect to = "/shop"/>
                }
                //lets user know if id is on DB
                if(validid){
                    invalidID =    <div class="alert alert-danger" role="alert">
                    <td>"Shop name already taken"</td> 
                </div>
                }
 
        return(
            <div>
                {loginredirect}
                {invalidID}
                {success}
                <div class="container">
                    <h2>Name your Shop</h2>
<form class="form-inline">
  <div class="form-group ">
    <label for="inputPassword2" class="sr-only">Password</label>
    <input type="search"  onChange = {this.shopnameHandler}  class="form-control rounded" placeholder="Shop Name" aria-label="Search" aria-describedby="search-addon" />
  </div>
  <button type="submit" onClick = {this.submitLogin} class="btn btn-primary mb-2">Check</button>
</form>

                </div> 
            </div> 
        )
    }
}
//export Home Component
export default Home;