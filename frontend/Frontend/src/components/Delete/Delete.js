import React, {Component} from 'react';
import '../../App.css';
import {Redirect} from 'react-router';
import cookie from 'react-cookies';
import axios from 'axios';

class Delete extends Component{
    constructor(props){
        super(props);
        this.state = {
            idnum : "",
            successflag: false,
            validid: false
        }
        this.indnumHandler = this.indnumHandler.bind(this);
    }
    
    //id  change handler
    indnumHandler = (e) => {
        this.setState({
            idnum : e.target.value
        })
    }
    
    //sbumit change handler
    submitLogin = (e) =>{
        e.preventDefault();
        const data = {
            idnum : this.state.idnum,
        }
        //send datat to backend
        axios.post('http://localhost:3001/delete',data).then((response) => {
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
            success = <Redirect to = "/home"/>
        }
        //lets user know if id is on DB
        if(validid){
            invalidID =    <div class="alert alert-danger" role="alert">
            <td>"Invalid ID"</td> 
        </div>
        }

        return(
            <div>
            {loginredirect}
            <div class="container">
                {success}
                {invalidID}
                    <div style={{width: "100%"}} class="form-group">
                        <input  onChange = {this.indnumHandler} type="text" class="form-control" name="idnum" placeholder="Delete Book using ID"/>
                    </div>
                    <div style={{width: "50%"}}>
                            <button class="btn btn-success" onClick = {this.submitLogin} type="submit">Delete</button>
                    </div> 
                
            </div>
            </div>
        )
    }
}

export default Delete;