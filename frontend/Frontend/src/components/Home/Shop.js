import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import au from '../img/ua.jpg';
import {Link} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
//import Home from '../Home'
import Home from './Home'
class Create extends Component {
    constructor(props){
        super(props);
        this.state = {  
            owner: false,
            added:false,
            items:  [],
            itemname : "",
            category:"",
            description : "",
            price: "",
            quantity : "",
            photo : "",
            
        }

                //Bind the handlers to this class
                this.itemnamehandler = this.itemnamehandler.bind(this);
                this.categoryhandler = this.categoryhandler.bind(this);
                this.descriptionhandler = this.descriptionhandler.bind(this);
                this.quantityhandler = this.quantityhandler.bind(this);
                this.pricehandler = this.pricehandler.bind(this);
                this.photohandler = this.photohandler.bind(this);
                
                this.submitLogin = this.submitLogin.bind(this);
    }
        //title change handler
        itemnamehandler = (e) => {
            this.setState({
                itemname : e.target.value
            })
        }
            //title change handler
    categoryhandler = (e) => {
        this.setState({
            category : e.target.value
        })
    }
        //title change handler
        descriptionhandler = (e) => {
            this.setState({
                description : e.target.value
            })
        }
            //title change handler
    quantityhandler = (e) => {
        this.setState({
            quantity : e.target.value
        })
    }
        //title change handler
        pricehandler = (e) => {
            this.setState({
                price : e.target.value
            })
        }
            //title change handler
    photohandler = (e) => {
        this.setState({
            photo : e.target.value
        })
    }  
    imageHandler= (event)=>{
        this.setState({
            photo : event.target.files[0]
        })

    }
    //add item
    submitLogin = (e) => {

        e.preventDefault();
        const data = {
            username: cookie.load('cookie'),
            itemname : this.state.itemname,
            category:this.state.category,
            description : this.state.description,
            price: this.state.price,
            quantity : this.state.quantity,
            photo : this.state.photo
        }

        const file= this.state.photo;
       // const data = cookie.load('cookie')// {  username:"adfafsd"}// cookie.load('cookie')}
 
        const formData = new FormData()
        formData.append('image',file)
        formData.append('username', cookie.load('cookie'))
        formData.append('itemname', this.state.itemname)
        formData.append('category', this.state.category)
        formData.append('description', this.state.description)
        formData.append('price', this.state.price)
        formData.append('quantity', this.state.quantity)
        console.log("File");
        console.log(data);
        console.log("File");
        /*axios.post('http://localhost:3001/api/image', formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
        })*/
        //send data to backend
        axios.post('http://localhost:3001/additem',formData,{
            headers: {
                'Content-Type': 'multipart/form-data'
              }
        })
            .then(response => {
                console.log("Status Code Register : ",response.status);
                if(response.status === 200){
                    this.setState({
                        added : true
                    })
                }else if(response.status === 201){
                    this.setState({
                        successflag : false,
                        duplicateid: true
                    })
                }
            }); 
    }
    //get the books data from backend  
    componentDidMount(){
        const data={
            username: cookie.load('cookie'),

        }

        console.log("shop");
        console.log(this.state.owner);
        console.log("shop");
        axios.post('http://localhost:3001/shopdata',data)
                .then((response) => {


                    if(response.status === 200){
                        this.setState({
                            owner: true,
                            items : this.state.items.concat(response.data) 
                        })
                    } else if(response.status === 201){
                        this.setState({
                            owner:false,
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

        //if not logged in go to login page
        let redirectVar = null;
        let shopowner= null;
        let sales = null;
        let {owner} = this.state;
        let {added} = this.state;
        let additem = null;
        let modalval = null;
        let addsuccess= null;
        let editowner = null;
        if(!cookie.load('cookie')){
            redirectVar = <Redirect to= "/login"/>
        }
        if (added){
            addsuccess =    <div class="alert alert-danger" role="alert">
            <td>"Item added"</td> 
        </div>

        }
        if(owner){
            editowner = <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
            Edit item
          </button>
            shopowner = <Link to="/update"><span class="glyphicon glyphicon-user"></span>Edit Profile</Link>
            sales = <div class="form-group ">
            <label for="sales" class="sr-only">sales</label>
            <p name="sales" id="sales"> 5656 items </p>
          </div>
       additem =  <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
         Add item
       </button>
       
   
        modalval =        <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
            <div style={{width: '100%'}} class="form-group">
                        <div class="col col-lg-3">
                        <label> 
                         Item name:   <input  onChange ={this.itemnamehandler} type="text" class="form-control" name="idnum" placeholder="Name" />
                         
                        </label>
                        <br/>
                        <label> 
                         Category:   <input  onChange ={this.categoryhandler} type="text" class="form-control" name="idnum" placeholder="Name" />
                        </label>
                        <br/>
                        <label> 
                         Description:   <input  onChange ={this.descriptionhandler} type="text" class="form-control" name="idnum" placeholder="Name" />
                            
                        </label>
                        <br/>
                        <label>
                           Price:     <input  onChange = {this.pricehandler} type="text" class="form-control" name="booktitle" placeholder="Age" />
                        </label>
                        <br/>
                        <label>
                            Quantity:
                                <input onChange = {this.quantityhandler} type="text" class="form-control" name="bookauthor" placeholder="email"/>
                     </label>
                     </div>
                     <div class="col col-lg-2">
                     <label>
                            Photo:

                    <input type="file" name="image" accept="image/*" multiple={false} onChange={this.imageHandler} />
                     </label>
                     </div>
                        </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              <button  onClick = {this.submitLogin}  type="button" class="btn btn-primary">Add item</button>
            </div>
            {addsuccess}
          </div>
        </div>
      </div>
    
    
    
    }

    let details = this.state.items.map(item => {
        return(
            <tr>
                <td> <figure> {'http://localhost:3001/uploads/'+item.photo && <img src={'http://localhost:3001/uploads/'+item.photo} name={item.itemname} alt="img"/>} <figcaption>{item.itemname} </figcaption></figure></td>
                <td>{item.category}</td>
                <td>{item.description}</td>
                <td>{item.price}</td>
                <td>{item.quantity}</td>
                
                <td>{editowner}</td>

            </tr>
        )
    })

        return(
            <div>
                {redirectVar}
                {modalval}
                <div class="container">

                <div class="outer">
                <img src={au} class="rounded" ></img>
    <div class="inner">
    {shopowner}
    {additem}
    <label></label>
    </div>
  </div>


                    <h2>Items</h2>

<div class="d-inline ">
  <input type="search" class="form-control rounded" placeholder="Search" aria-label="Search" aria-describedby="search-addon" />
  <button type="button" class="btn btn-primary">
  <FontAwesomeIcon icon={faSearch} />
  </button>
</div>
<form class="form-inline">
  <div class="form-group ">
    <label for="inputPassword2" class="sr-only">Password</label>
    <input type="search" class="form-control rounded" placeholder="Search" aria-label="Search" aria-describedby="search-addon" />
  </div>
  <br></br>
  {sales}
  <button type="submit" class="btn btn-primary mb-2">Search</button>
</form>
{this.state}
{this.state.owner}
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>Item</th>
                                    <th>Category</th>
                                    <th>Description</th>
                                    <th>Price</th>
                                    <th>Quantity</th>
                                    
                                    <th>Edit</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/*Display the Tbale row based on data recieved*/}
                                {details}
       { /*                        <div class="outer">
                <img src={au} class="rounded" ></img>
    <div class="inner">

    <Link to="/update"><span class="glyphicon glyphicon-user"></span>Edit Profile</Link>
    <label></label>
    </div>
  </div>
  <div class="outer">
                <img src={au} class="rounded" ></img>
    <div class="inner">

    <Link to="/update"><span class="glyphicon glyphicon-user"></span>Edit Profile</Link>
    <label></label>
    </div>
        </div>*/}
                            </tbody>
                        </table>
                </div> 
            </div> 
        )
    }
}
//export Home Component
export default Create;