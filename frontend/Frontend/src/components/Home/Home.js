import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import Navbar from '../LandingPage/Navbar';
//import Button from 'react-bootstrap/Button'; 
import {Link} from 'react-router-dom';
import Shop from '../Shop/Shop';
//import { useNavigation } from 'react-navigation';
//import { useNavigation } from '@react-navigation/native';
class Home extends Component {
    constructor(props){
        super(props);
        this.state = {  
            products : [],
            term: "",
            minPrice: 0.00,
            maxPrice: 0.00,
            selectedOption: "price",
            outOfStock: false,
            authFlag: true,
            shopname:""
        }
        this.termChangeHandler = this.termChangeHandler.bind(this);
      //  this.handleshopclick = this.handleshopclick.bind(this);
        this.minPriceChangeHandler = this.minPriceChangeHandler.bind(this);
        this.maxPriceChangeHandler = this.maxPriceChangeHandler.bind(this);
        this.selectedOptionChangeHandler = this.selectedOptionChangeHandler.bind(this);
        this.outOfStockOptionChangeHandler = this.outOfStockOptionChangeHandler.bind(this);
        this.submitLogin = this.submitLogin.bind(this);
        //this.handleClickFavorites = this.handleClickFavorites(this);

    }  


    //
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
        console.log(e.target.value);


        let d = new Date();
        d.setTime(d.getTime() + (25*60*1000));
        document.cookie = "shopname" +'='+ e.target.value +'; Path=/;';
        window.location.href='/shop'
       // cookie.set("shopname", e.target.value, {path: "/", expires: d});
    }
    handleOverviewClick (e){
        //e.stopPropagation();
        // access to e.target here
        console.log(e.target.value);

  


        let d = new Date();
        d.setTime(d.getTime() + (25*60*1000));
        document.cookie = "itemname" +'='+ e.target.value +'; Path=/;';
        window.location.href='/Overview'
       // cookie.set("shopname", e.target.value, {path: "/", expires: d});
    }
    
   //Call the Will Mount to set the auth Flag to false
   componentWillMount(){
    this.setState({
        authFlag : true,
        products: [],
    })
}
    //username change handler to update state variable with the text entered by the user
    termChangeHandler= (e) => {
        this.setState({
            term : e.target.value
        })
    }
    //username change handler to update state variable with the text entered by the user
    minPriceChangeHandler= (e) => {
        this.setState({
            minPrice : e.target.value
        })
    }
    //username change handler to update state variable with the text entered by the user
    maxPriceChangeHandler= (e) => {
        this.setState({
            maxPrice : e.target.value
        })
    }
    selectedOptionChangeHandler=(e)=>{
        this.setState({
            selectedOption:e.target.value
        })
    }
    outOfStockOptionChangeHandler=(e)=>{
        this.setState({
            outOfStock:true
        })
    }


    componentDidMount(){
        const data={
            username: cookie.load('cookie'),

        }
        axios.post('http://localhost:3001/getallshop',data)
                .then((response) => {


                    if(response.status === 200){
                        this.setState({
                            
                            products : this.state.products.concat(response.data) 
                        })
                    } else if(response.status === 201){
                        this.setState({
                            
                            products : this.state.products.concat(response.data)  
                        })
                    }

                //update the state with the response data
              //  this.setState({
              //      books : this.state.books.concat(response.data) 
               // });
            });
    }
    //submit Login handler to send a request to the node backend
    submitLogin = (e) => {
    //var headers = new Headers();
    //prevent page from refresh
    e.preventDefault();
    const data = {
        term : this.state.term,
        minPrice: this.state.minPrice,
        maxPrice: this.state.maxPrice,
        selectedOption: this.state.selectedOption,
    }
    //set the with credentials to true
    axios.defaults.withCredentials = true;
    //make a post request with the user data
    axios.post('http://localhost:3001/getfiletered',data)
        .then(res => {
            if(res){
                console.log(res)
                this.setState({
                    authFlag : false,
                    products : (res.data)
                })
               
            }else{
                this.setState({
                    authFlag : true,
                    
                })
            }
        });  
}


    render(){
       // const navigation = useNavigation();
        //iterate over books to create a table row
        let details = this.state.products.map(product => {
            return(
                <tr>
                    <td> <figure> {'http://localhost:3001/uploads/'+product.photo && <img src={'http://localhost:3001/uploads/'+product.photo} name={product.itemname} alt="img"/>} <figcaption>{product.itemname} </figcaption></figure></td>
                    <td>{product.price}</td>
                    <td>{product.description}</td>
                    <td>
   
                   
                    <button value={product.shopname} onClick={this.handleshopclick} class="btn btn-success" type="submit">{product.shopname}</button>
                    </td>
                    <td>
                    <div style={{width: '10%'}}>
                        <button value={product.itemname} onClick={this.handleClickFavorites} class="btn btn-success" type="submit">Favorite</button>
                    </div>
                    <div style={{width: '10%'}}>
                    <button value={product.itemname} onClick = {this.handleOverviewClick} class="btn btn-success" type="submit">View</button>
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
                    <h2>All Items</h2>
                    <br/>
                        <div style={{width: '30%'}} class="form-group">
                                <input onChange = {this.termChangeHandler} type="text" class="form-control" name="term" placeholder="Search..."/>
                        </div>
                        <div style={{width: '30%'}}>
                            <button onClick = {this.submitLogin} class="btn btn-success" type="submit">Search</button>
                        </div> 
                        <br/>
                        <p>Filter by Price Range</p>
                        <div style={{width: '15%'}} class="form-group">
                                <input onChange = {this.minPriceChangeHandler} type="number" class="form-control" name="minPrice" placeholder="Min"/>
                                <input onChange = {this.maxPriceChangeHandler} type="number" class="form-control" name="maxPrice" placeholder="Max"/>
                        </div>
                        <p>Sort Products By: </p>
                        <div class="form-check">
                                <label>
                                    <input type= "radio" name="sortType" value="price" checked={this.state.selectedOption ==="price"}  onChange = {this.selectedOptionChangeHandler} class="form-check-input" />
                                    Price
                                </label> 
                        </div>
                        <div class="form-check">
                                <label>
                                    <input type= "radio" name="sortType" value="quantity" checked={this.state.selectedOption ==="quantity"}  onChange = {this.selectedOptionChangeHandler} class="form-check-input" />
                                    Quantity
                                </label> 
                        </div>
                        <div class="form-check">
                                <label>
                                    <input type= "radio" name="sortType" value="salesCount" checked={this.state.selectedOption ==="salesCount"}  onChange = {this.selectedOptionChangeHandler} class="form-check-input" />
                                    Sales Count
                                </label> 
                        </div>
                        <div class="form-check">
                                <label>
                                    <input type= "checkbox" name="outOfStock" checked={this.state.outOfStock}  onChange = {this.outOfStockOptionChangeHandler} class="form-check-input" />
                                    Show Out of Stock Items
                                </label> 
                        </div>
                        
                        <br/>
                         <table class="table">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Price</th>
                                    <th>Description</th>
                                    <th>Shop</th>
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
