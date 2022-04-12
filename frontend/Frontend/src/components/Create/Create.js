import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';


class Create extends Component{
    constructor(props){
        //Call the constrictor of Super class i.e The Component
        super(props);
        //default val
        this.state = {
            idnum : "",
            booktitle: "",
            bookauthor : "",
            successflag : false,
            duplicateid: false
        }
        //Bind the handlers to this class
        this.titlehandler = this.titlehandler.bind(this);
        this.idhandler = this.idhandler.bind(this);
        this.authorhandler = this.authorhandler.bind(this);
        this.submitLogin = this.submitLogin.bind(this);
    }

    //title change handler
    titlehandler = (e) => {
        this.setState({
            booktitle : e.target.value
        })
    }
    //ID change handler
    idhandler = (e) => {
            this.setState({
                idnum : e.target.value
            })
        }
    //author change handler
    authorhandler = (e) => {
        this.setState({
            bookauthor: e.target.value
        })
    }
    submitLogin = (e) => {

        e.preventDefault();
        const data = {
            idnum : this.state.idnum,
            title : this.state.booktitle,
            author : this.state.bookauthor
        }
        //send data to backend
        axios.post('http://localhost:3001/create',data)
            .then(response => {
                console.log("Status Code create : ",response.status);
                if(response.status === 200){
                    this.setState({
                        successflag : true,
                        duplicateid : false
                    })
                }else if(response.status === 201){
                    this.setState({
                        successflag : false,
                        duplicateid: true
                    })
                }
            }); 
    }
    render(){
        //set values 
        let {successflag} = this.state;
        let success = null;
        let loginredirect = null;         
        let repeteatedid;
        let {duplicateid} = this.state;
        //check if user logged in
        if(!cookie.load('cookie')){
            loginredirect = <Redirect to= "/login"/>
        }
        //if redirect if added successfully
        if(successflag){
            success = <Redirect to = "/home"/>
        }
        //tell user that id is alredy in DB
        if(duplicateid){
            repeteatedid = 
            <div class="alert alert-danger" role="alert">
                <td>"ID already in Database"</td> 
            </div>
        }
        return(
            <div>
                 {loginredirect}
                 {success}
                <br/>
                <div class="container">
                {repeteatedid}
                        <div style={{width: '100%'}} class="form-group">
                            <input  onChange ={this.idhandler} type="text" class="form-control" name="idnum" placeholder="Book ID" />
                        </div>
                        <br/>
                        <div style={{width: '100%'}} class="form-group">
                                <input  onChange = {this.titlehandler} type="text" class="form-control" name="booktitle" placeholder="Book Title" />
                        </div>
                        <br/>
                        <div style={{width: '100%'}} class="form-group">
                                <input onChange = {this.authorhandler} type="text" class="form-control" name="bookauthor" placeholder="Book Author"/>
                        </div>
                        <br/>
                        <div style={{width: '30%'}}>
                            <button onClick = {this.submitLogin} class="btn btn-success" type="submit">Create</button>
                        </div> 
                </div>
            </div>
        )
    }
}

export default Create;