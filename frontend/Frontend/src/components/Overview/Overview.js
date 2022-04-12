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

    handleClickFavorites (e){
        //e.stopPropagation();
        // access to e.target here
        console.log(e.target.value);

        const data={
            username: cookie.load('cookie'),
            itemname:e.target.value
        }
        axios.post('http://localhost:3001/addfavorites',data)
                .then((response) => {


                    if(response.status === 200){
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

    handleshopclick (e){
        //e.stopPropagation();
        // access to e.target here
        console.log("OVERVIEW");
        console.log(e.target.value);
        console.log("OVERVIEW");

        let d = new Date();
        d.setTime(d.getTime() + (25*60*1000));
        document.cookie = "shopname" +'='+ e.target.value +'; Path=/;';
        window.location.href='/shop'
       // cookie.set("shopname", e.target.value, {path: "/", expires: d});
    }
    handleAddCart (e){
        //e.stopPropagation();
        // access to e.target here
        console.log(e.target.value);

        const data={
            username: cookie.load('cookie'),
            itemname:e.target.value
        }
        axios.post('http://localhost:3001/addcart',data)
                .then((response) => {


                    if(response.status === 200){
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
    //get the books data from backend  
    componentDidMount(){
        const data={
            username: cookie.load('cookie'),
            itemname: cookie.load('itemname')
        }

        console.log("Overview");
       
        console.log(cookie.load('cookie'));
        console.log(cookie.load('itemname'));
        console.log("Overview");
        axios.post('http://localhost:3001/getitem',data)
                .then((response) => {


                    if(response.status === 201){
                        this.setState({
                    items : this.state.items.concat(response.data) 
                });
                        console.log("passed favorites")
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
                     <td>{item.quantity}</td>
                    <td>{item.price}</td>
                    <td>{item.description}</td>
                    <td>
                    <div style={{width: '10%'}}>
                        <button value={item.itemname} onClick={this.handleClickFavorites} class="btn btn-success" type="submit">Favorite</button>
                    </div>
                    <div style={{width: '10%'}}>
                    <button value={item.itemname} onClick = {this.handleAddCart} class="btn btn-success" type="submit">Add to cart</button>
                    </div>
                    <div style={{width: '10%'}}>
                    <button value={item.shopname} onClick = {this.handleshopclick} class="btn btn-success" type="submit">Visit Shop</button>
                    </div>
                    </td>
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
                    <h2>Overview Item</h2>

                        <table class="table">
                            <thead>
                                <tr>
                                    <th>Item Name</th>
                                    <th>Sales Count</th>
                                    <th>Price</th>
                                    <th>Description</th>
                                    <th>Actions</th>
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