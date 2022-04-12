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
    constructor(){
        super();
        this.state = {  
            items : []
        }
    }  
    //get the books data from backend  
    //get the books data from backend  
    componentDidMount(){
        const data={
            username: cookie.load('cookie')
        }
        axios.post('http://localhost:3001/getcartitems',data)
                .then((response) => {


                    if(response.status === 200){
                        this.setState({
                    items : this.state.items.concat(response.data) 
                });
                        console.log("passed favorites")
                    } else if(response.status === 201){
                        console.log("INVALID DATA  favorites")
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
                     <td> <figure> {'http://localhost:3001/uploads/'+item.photo && <img src={'http://localhost:3001/uploads/'+item.photo} name={item.itemname} alt="img"/>} <figcaption>{item.itemname} </figcaption></figure></td>
                
                    <td>{item.price}</td>
                    <td>{item.quantity}</td>
                    <td>{item.shopname}</td>
                
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
                                    <th>Quantity </th>
                                    <th>Shopname </th>
                                   
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