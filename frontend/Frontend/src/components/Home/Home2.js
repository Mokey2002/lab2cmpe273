import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';

class Home extends Component {
    constructor(){
        super();
        this.state = {  
          items:[]
          //  books : []
        }
    }  

    /*
    //get the books data from backend  
    componentDidMount(){
        axios.get('http://localhost:3001/home')
                .then((response) => {
                //update the state with the response data
                this.setState({
                    books : this.state.books.concat(response.data) 
                });
            });
    }*/
    componentDidMount(){
        const data={
            username: cookie.load('cookie'),

        }
        axios.post('http://localhost:3001/getallshop',data)
                .then((response) => {


                    if(response.status === 200){
                        this.setState({
                            
                            items : this.state.items.concat(response.data) 
                        })
                    } else if(response.status === 201){
                        this.setState({
                            
                            items : this.state.items.concat(response.data)  
                        })
                    }

                //update the state with the response data
              //  this.setState({
              //      books : this.state.books.concat(response.data) 
               // });
            });
    }

    render(){
        //iterate over books to create a table row
        let details = this.state.items.map(item => {
            return(
                <tr>
                 <td>{item.itemname}   <div class="left">
              <button  onClick = {this.submitLogin}  type="button" class="btn btn-primary">Like</button>
            </div></td>
                <td>{item.price}</td>

                </tr>
            )
        })
        //if not logged in go to login page
        let redirectVar = null;
        if(!cookie.load('cookie')){
            redirectVar = <Redirect to= "/login"/>
        }
        return(
            <div>
                {redirectVar}
                <div class="container">
                    <h2>Items</h2>
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>Item</th>
                                    <th>Price</th>
                                   
                                </tr>
                            </thead>
                            <tbody>
                                {/*Display the Tbale row based on data recieved*/}
                                {details}
                            </tbody>
                        </table>
                </div> 
            </div> 
        )
    }
}
//export Home Component
export default Home;