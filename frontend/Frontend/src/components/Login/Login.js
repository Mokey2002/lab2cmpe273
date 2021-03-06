import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
//const jwt_decode = require('jwt-decode');
import jwt_decode from 'jwt-decode';
//Define a Login Component
class Login extends Component{
    //call the constructor method
    constructor(props){
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            username : "",
            password : "",
            token:"",
            authFlag : true
        }
        //Bind the handlers to this class
        this.usernameChangeHandler = this.usernameChangeHandler.bind(this);
        this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
        this.submitLogin = this.submitLogin.bind(this);
    }
    //Call the Will Mount to set the auth Flag to false
    componentWillMount(){
        this.setState({
            authFlag : true
        })
    }
    //username change handler to update state variable with the text entered by the user
    usernameChangeHandler = (e) => {
        this.setState({
            username : e.target.value
        })
    }
    //password change handler to update state variable with the text entered by the user
    passwordChangeHandler = (e) => {
        this.setState({
            password : e.target.value
        })
    }
    //submit Login handler to send a request to the node backend
    submitLogin = (e) => {
        var headers = new Headers();
        //prevent page from refresh
        e.preventDefault();
        const data = {
            username : this.state.username,
            password : this.state.password
        }
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.post('http://localhost:3001/login',data)
            .then(response => {
                console.log("REsponse login")
                console.log(response.data)
                console.log("REsponse login")
                console.log("Status Code : ",response.status);
                if(response.status === 200){
                    this.setState({
                        token: response.data,
                        authFlag : true
                    })
                }else{
                    this.setState({
                        authFlag : false
                    })
                }
            });
    }

    render(){
        //redirect based on successful login
        let wrongcredentials;
        let {authFlag} = this.state;
        let redirectVar = null;
        if(this.state.token.length > 0){
            console.log("deocdign")
            console.log(this.state.token)
            document.cookie = "token" +'='+ this.state.token +'; Path=/;';
            localStorage.setItem("token", this.state.token);
            var decoded = jwt_decode(this.state.token.split(' ')[1]);
            localStorage.setItem("user_id", decoded._id);
            //localStorage.setItem("username", decoded.username);
            console.log(decoded)
            console.log(decoded._id)
            redirectVar = <Redirect to="/home" />
          
        }
        if(!authFlag){
            wrongcredentials =<div class="alert alert-danger" role="alert">

            <td>"Invalid Credentials"</td>  
  </div>        

        }
        return(
            <div>
                {redirectVar}
            <div class="container">
            {wrongcredentials}
                <div class="login-form">
                    <div class="main-div">
                        <div class="panel">
                            <h2>User Login</h2>
                            <p>Please enter your username and password</p>
                        </div>
                        
                            <div class="form-group">
                                <input onChange = {this.usernameChangeHandler} type="text" class="form-control" name="username" placeholder="Username"/>
                            </div>
                            <div class="form-group">
                                <input onChange = {this.passwordChangeHandler} type="password" class="form-control" name="password" placeholder="Password"/>
                            </div>
                            <button onClick = {this.submitLogin} class="btn btn-primary">Login</button>                 
                    </div>
                </div>
            </div>
            </div>
        )
    }
}
//export Login Component
export default Login;