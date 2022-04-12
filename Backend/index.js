//import the require dependencies
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var cors = require('cors');
app.set('view engine', 'ejs');
const mysql = require('mysql2');
const multer = require("multer");
// uploads
const storage = multer.diskStorage({
    destination:(req,file,cb) =>{
        cb(null,"./");
    },
    filename: function(req,file,cb){
        const ext = file.mimetype.split("/")[1];
        cb(null, 'uploads/'+file.originalname);

    }
});
// uploads
const upload = multer({
    storage:storage
})



//use cors to allow cross origin resource sharing
app.use(cors(
    { origin: 'http://localhost:3000', methods:["GET","POST"],credentials: true 


}));

//use express session to maintain session data
app.use(session({
    secret              : 'cmpe273_kafka_passport_mongo',
    resave              : false, // Forces the session to be saved back to the session store, even if the session was never modified during the request
    saveUninitialized   : false, // Force to save uninitialized session to db. A session is uninitialized when it is new but not modified.
    duration            : 60 * 60 * 1000,    // Overall duration of Session : 30 minutes : 1800 seconds
    activeDuration      :  5 * 60 * 1000
}));

// app.use(bodyParser.urlencoded({
//     extended: true
//   }));
app.use(bodyParser.json());
// uploads
const path= require('path');
// uploads
app.use('/', express.static(path.join(__dirname, '/')));
// uploads
app.post("/api/image",upload.single('image'),(req,res,err)=>{


    console.log("UPDATE USER IMAGE")
   // console.log(res)
    console.log(req.body.username)
    console.log(req.body.username)
   // console.log(res)
   console.log(req.body)
   console.log(req.file);
    console.log("UPDATE USER IMAGE")
    if (1==2) {
        res.send({ msg:'Only image files (jpg, jpeg, png) are allowed!'})}
    else{

        db.query(
            "Update shop SET  photo =? where username =? and shopname=? and price is NULL ",
            [req.file.originalname, req.body.username,req.body.shopname],
            (err, result) => {
                console.log("result");
                console.log(result);
                console.log(err);
                console.log("result");
    
            if(err) {
                console.log("error")
                res.send({err: err})
            }
            if (result){
               
                res.writeHead(200,{
                    'Content-Type' : 'text/plain'
                })
                res.end("Successful IMAGE UPLOAD");
            }
            }
        );


    }

});
//GET IMG
app.get("/api/image",(req,res)=>{
    console.log(req.body)
    console.log("Get  USER IMAGE")
    console.log(req.body)
        db.query(
            "SELECT photo  FROM user where User =?",
            [ req.body.username],
            (err, result) => {
                console.log("result selct photo of User");
                console.log(result);
                console.log(err);
                console.log("result select photo of User");
    
            if(err) {
                console.log("error")
                res.send({err: err})
            }
            if (result){
               
                res.writeHead(200,{
                    'Content-Type' : 'text/plain'
                })
                res.end("Successful IMAGE UPLOAD");
            }
            }
        );


    

});

//Allow Access Control
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    res.setHeader('Cache-Control', 'no-cache');
    next();

  });

  var Users = [{
      username : "admin",
      password : "admin"
  }]

  var books = [
    {"BookID" : "1", "Title" : "Book 1", "Author" : "Author 1"},
    {"BookID" : "2", "Title" : "Book 2", "Author" : "Author 2"},
    {"BookID" : "3", "Title" : "Book 3", "Author" : "Author 3"}
]

//// create the connection to database
//
  const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "root",
    database: "hw4"
});
//Route to handle Post Request Call
app.post('/login',function(req,res){
    
    // Object.keys(req.body).forEach(function(key){
    //     req.body = JSON.parse(key);
    // });
    // var username = req.body.username;
    // var password = req.body.password;
    console.log("Inside Login Post Request");
    //console.log("Req Body : ", username + "password : ",password);
    console.log("Req Body : ",req.body);

    db.query(
        "SELECT name From user  where User =? and password =?",
        [req.body.username, req.body.password],
        (err, result) => {
            console.log("result");
            console.log(result);
            console.log(err);
            console.log("result");

        if(err) {
            res.send({err: err})
        }
        if (result.length > 0 ){
            res.cookie('cookie',req.body.username,{maxAge: 900000, httpOnly: false, path : '/'});
            req.session.user ={ username: req.body.user, password: req.body.password };
            //return succes to front end
            res.writeHead(200,{
                'Content-Type' : 'text/plain'
            })
            res.end("Successful Login");
        }
        else{
            //return unsuccesful to front end
            res.writeHead(201,{
                'Content-Type' : 'text/plain'
            })
            res.end("Unsuccessful Login");
        }
        }
    );

    /*
    Users.filter(function(user){
        console.log("USER LOGIN");
        console.log(user);
        console.log("USER LOGIN");        
        if(user.username === req.body.username && user.password === req.body.password){


            
            res.cookie('cookie',"admin",{maxAge: 900000, httpOnly: false, path : '/'});
            req.session.user = user;
            res.writeHead(200,{
                'Content-Type' : 'text/plain'
            })
            res.end("Successful Login");
        }else{


            res.writeHead(201,{
                'Content-Type' : 'text/plain'
            })
            res.end("Unsuccessful Login");

            }
    })*/

    
});

//Handle usre info to update
app.post('/getuserinfo',function(req,res){
    
    console.log("Inside update get info   Request");
    //console.log("Req Body : ", username + "password : ",password);
    console.log("Req Body : ",req.body);

    db.query(
        "SELECT * From user  where User =?",
        [req.body.username],
        (err, result) => {
            console.log("result");
            console.log(result);
            console.log(err);
            console.log("result");

        if(err) {
            res.send({err: err})
        }
        if (result.length > 0 ){
           // {user}JSON.stringify(books)
            //return succes to front end
            res.writeHead(200,{
                'Content-Type' : 'text/plain'
            })
            res.end(JSON.stringify(result[0]));
        }
        else{
            //return unsuccesful to front end
            res.writeHead(201,{
                'Content-Type' : 'text/plain'
            })
            res.end("Unsuccessful Login");
        }
        }
    );
    
});

//Route to get All Books when user visits the Home Page
app.get('/home', function(req,res){
    console.log("Inside Home Login");    
    res.writeHead(200,{
        'Content-Type' : 'application/json'
    });
    console.log("Books : ",JSON.stringify(books));
    res.end(JSON.stringify(books));
    
})

app.post('/create', function (req, res) {
    console.log("Req Body : ",req.body);
        //get items from form
        let book = req.body;
        console.log(req.body);
        function extractValue(arr, prop) {

            let extractedValue = [];
        
            for (let i=0; i < arr.length ; ++i) {
        
                // extract value from property
                extractedValue.push(arr[i][prop]);
            }
            return extractedValue;
        }
        let result = extractValue(books, 'BookID');
        console.log(result);
        let id_included = result.includes(book.idnum);
       console.log(id_included);
        if(!id_included){
            let my_book = {};
            my_book.BookID= book.idnum;
            my_book.Title = book.title;
            my_book.Author = book.author;
            //push new book to the db(array)
            books.push(my_book);
            console.log("book added");
            res.writeHead(200,{
                'Content-Type' : 'application/plain'
            });
            res.end("Successful Book Added");
            //console.log("Books : ",JSON.stringify(books));
            //res.redirect('home');
        }
        else{
            //let alert = [{error: 'Error: Book ID already in DB. Please select a different ID.'}];
            //res.render('create', {
                //alert: alert
            //});
            res.writeHead(201,{
                'Content-Type' : 'application/plain'
            });
            res.end(" Book alrady in DB");
        }
});

app.post('/delete', function (req, res) {
    console.log(req.body);
    let id = req.body;
    function extractValue(arr, prop) {
    //array to store IDs of all books
    let extractedBookIDs = [];    
    for (let i=0; i < arr.length ; ++i) {
        // extract ids
        extractedBookIDs.push(arr[i][prop]);
        }
    return extractedBookIDs;
    }
    //retrieve IDs in books array 
    let result = extractValue(books, 'BookID');
    console.log(result);
    //Check whether or not ID matches
    let id_included = result.includes(id.idnum);
    console.log(id_included);
    if(id_included){
        //get index of book w/matching ID'
        
        let index = books.findIndex((element) =>
                element.BookID == id.idnum);
        console.log("index")
        console.log(result.indexOf(id.idnum))
        console.log(index);
        books.splice(index,1);
        console.log("index")
        //delete book using splice
        //delete books[result.indexOf(id.book_id)]
        //books.splice(result.indexOf(id.book_id));
        console.log("book deleted");
        //successfully deleted book
        res.writeHead(200,{
            'Content-Type' : 'application/plain'
        })
        res.end("Successful Book Deleted");
    } 
    else{
        //book was not found in array
        res.writeHead(201,{
            'Content-Type' : 'application/plain'
        });
        res.end(" Book not in DB");
    }
});
//check if shopname is valid
app.post('/check', function (req, res) {
    console.log("cheeeeeeeeeeeeeeeeeeek")
    console.log(req.body)
    console.log("cheeeeeeeeeeeeeeeeeeek")
    db.query(
        "SELECT * From shop  where shopname=?",
        [req.body.shopname],
        (err, result) => {
            console.log("result");
            console.log(result);
            console.log(err);
            console.log("result");

        if(err) {
            res.send({err: err})
        }
        if (result.length > 0 ){
           // {user}JSON.stringify(books)
            //return succes to front end
            res.writeHead(201,{
                'Content-Type' : 'text/plain'
            })
            res.end("invalid");
        }
        else{
            db.query(
                "INSERT INTO shop (username,shopname) values(?,?)",
                [req.body.username,req.body.shopname]
            );
                        console.log("exiting insert into shop")
                        //return unsuccesful to front end
                        res.writeHead(200,{
                            'Content-Type' : 'text/plain'
                        })
                        res.end("Unsuccessful Login");
        }
        }
    );
});

//get all items for landing
app.post('/getallshop', function (req, res) {
    console.log("get all for landing")
    db.query(
        "SELECT * From shop where itemname is not  NULL",
        [],
        (err, result) => {
            console.log("result");
            console.log(result);
            console.log(err);
            console.log("result");
        if (result.length > 0 ){
           // {user}JSON.stringify(books)
            //return succes to front end
            res.writeHead(201,{
                'Content-Type' : 'text/plain'
            })
            res.end(JSON.stringify(result));
        }
        }
    );
});
//get filtered items
app.post('/getfiletered', function (req, res) {
    console.log("get all for landing")
    db.query(
        "SELECT * From shop where itemname is not  NULL and itemname Like ?",
        ['%'+req.body.term+'%'],
        (err, result) => {
            console.log("result");
            console.log(result);
            console.log(err);
            console.log("result");
        if (result.length > 0 ){
           // {user}JSON.stringify(books)
            //return succes to front end
            res.writeHead(201,{
                'Content-Type' : 'text/plain'
            })
            res.end(JSON.stringify(result));
        }
        }
    );
});
//get item for overview
//get all items for landing
app.post('/getitem', function (req, res) {
    console.log("get all for landing")
    console.log(req.body)
    db.query(
        "SELECT * From shop where itemname=? ",
        [req.body.itemname],
        (err, result) => {
            console.log("geitem");
            console.log(result);
            console.log(err);
            console.log("getitem");
        if (result.length > 0 ){
           // {user}JSON.stringify(books)
            //return succes to front end
            res.writeHead(201,{
                'Content-Type' : 'text/plain'
            })
            res.end(JSON.stringify(result));
        }
        }
    );
});

//gets shopdata
app.post('/shopdata', function (req, res) {
    console.log("shopdata")
    console.log(req.body)
    console.log(req.body.shopname)
    console.log("shopdata")
    if(req.body.shopname ==undefined || req.body.shopname=='' ){
    db.query(
        "SELECT * From shop  where username =? and itemname is not NULL",
        [req.body.username],
        (err, result) => {
            console.log("shoopdata");
            console.log(result);
            console.log(err);
            console.log("shoopdata");
        if(err) {
            res.send({err: err})
        }
        if (result.length > 0 ){
           // {user}JSON.stringify(books)
            //return succes to front end
            console.log("******");
            console.log(result);
            console.log("******");
            res.writeHead(200,{
                'Content-Type' : 'text/plain'
            })
            res.end(JSON.stringify(result));
        }
        }

    );
}
    else{
        console.log("here")
        db.query(
            "SELECT * From shop  where shopname =? and username=? ",
            [req.body.shopname,req.body.username],
            (err, result) => {
                console.log("shoopdata");
                console.log(result);
                console.log(err);
                console.log("shoopdata");
            if(err) {
                res.send({err: err})
            }
            if (result.length > 0 ){
               // {user}JSON.stringify(books)
                //return succes to front end
                console.log("******");
                console.log(result);
                console.log("******");
                res.writeHead(200,{
                    'Content-Type' : 'text/plain'
                })
                res.end(JSON.stringify(result));
            }
            else{
                db.query(
                    "SELECT * From shop  where shopname =? ",
                    [req.body.shopname],
                    (err, result) => {
                        console.log("shoopdata111111");
                        console.log(result);
                        console.log(err);
                        console.log("shoopdata111111");
                    if(err) {
                        res.send({err: err})
                    }
                    if (result.length > 0 ){
                       // {user}JSON.stringify(books)
                        //return succes to front end
                        console.log("******");
                        console.log(result);
                        console.log("******");
                        res.writeHead(201,{
                            'Content-Type' : 'text/plain'
                        })
                        res.end(JSON.stringify(result));
                    }
                    else{
        
        
        
                        
                    }
                    }
            
                );

            }
            }
    
        );
    }

});
//get image
app.post('/shopdataphoto', function (req, res) {
    console.log("shopdata")
    console.log(req.body)
    console.log(req.body.shopname)
    console.log("shopdata")
    if(req.body.shopname ==undefined || req.body.shopname=='' ){
    db.query(
        "SELECT * From shop  where username =? and itemname is not NULL",
        [req.body.username],
        (err, result) => {
            console.log("shoopdata");
            console.log(result);
            console.log(err);
            console.log("shoopdata");
        if(err) {
            res.send({err: err})
        }
        if (result.length > 0 ){
           // {user}JSON.stringify(books)
            //return succes to front end
            console.log("******");
            console.log(result);
            console.log("******");
            res.writeHead(200,{
                'Content-Type' : 'text/plain'
            })
            res.end(JSON.stringify(result));
        }
        }

    );
}
    else{
        console.log("here")
        db.query(
            "SELECT * From shop  where shopname =? and username=? ",
            [req.body.shopname,req.body.username],
            (err, result) => {
                console.log("shoopdata");
                console.log(result);
                console.log(err);
                console.log("shoopdata");
            if(err) {
                res.send({err: err})
            }
            if (result.length > 0 ){
               // {user}JSON.stringify(books)
                //return succes to front end
                console.log("--------------");
                console.log(result[0]);
                console.log("-------");
                res.writeHead(200,{
                    'Content-Type' : 'text/plain'
                })
                res.end(JSON.stringify(result));
            }
            else{
                db.query(
                    "SELECT * From shop  where shopname =? ",
                    [req.body.shopname],
                    (err, result) => {
                        console.log("shoopdata");
                        console.log(result);
                        console.log(err);
                        console.log("shoopdata");
                    if(err) {
                        res.send({err: err})
                    }
                    if (result.length > 0 ){

                       // {user}JSON.stringify(books)
                        //return succes to front end
                        console.log("******");
                        console.log(result);
                        console.log("******");
                        res.writeHead(201,{
                            'Content-Type' : 'text/plain'
                        })
                        res.end(JSON.stringify(result));
                    }
                    else{
        
        
        
                        
                    }
                    }
            
                );

            }
            }
    
        );
    }

});
//regiester api
app.post('/register', (req,res) => {
    let name = req.body.name;
    let email = req.body.email;
    let passwordn = req.body.password;
    let user = req.body.user;
    let city = req.body.city;
    let age = req.body.age;
    let street = req.body.street;
    let zip = req.body.zip;
    let phone = req.body.phone;
    let country = req.body.country;
    console.log("Register")
    console.log(req.body)
    console.log("Register")
   // bcrypt.hash(password, saltRounds, (err, hash) => {
        db.query(
            "INSERT INTO user (Name, Phone, City,Age,Email,Zip,Country,User,street,password) VALUES (?,?,?,?,?,?,?,?,?,?)",
            [name, phone,city,age,email,zip,country,user,street,passwordn],
            (err, result) => {
                console.log("result");
                console.log(result);
                console.log(err);
                console.log("result");

            if(err) {
                res.send({err: err})
            }
            if (result){
                res.cookie('cookie',user,{maxAge: 900000, httpOnly: false, path : '/'});
                req.session.user ={ username: user, password: passwordn };
                //return succes to front end
                res.writeHead(200,{
                    'Content-Type' : 'text/plain'
                })
                res.end("Successful Login");
            }
            else{
                //return unsuccesful to front end
                res.writeHead(201,{
                    'Content-Type' : 'text/plain'
                })
                res.end("Unsuccessful Login");
            }
            }
        );
   // })
    
});
//insert favorites
app.post('/addfavorites', (req,res) => {
    let username = req.body.username;
    let itemname = req.body.itemname;
    console.log("addfavorites")
    console.log(req.body)
    console.log("addfavorites")
   // bcrypt.hash(password, saltRounds, (err, hash) => {
        db.query(
            "INSERT INTO favorites (username,itemname) VALUES (?,?)",
            [username,itemname],
            (err, result) => {
                console.log("result");
                console.log(result);
                console.log(err);
                console.log("result");

            if(err) {
                res.send({err: err})
            }
            if (result){
                //return succes to front end
                res.writeHead(200,{
                    'Content-Type' : 'text/plain'
                })
                res.end("Successful Insert");
            }
            else{
                //return unsuccesful to front end
                res.writeHead(201,{
                    'Content-Type' : 'text/plain'
                })
                res.end("Unsuccessful Insert");
            }
            }
        );
   // })
    
});
//get items from cart
app.post('/getcartitems', (req,res) => {
    let username = req.body.username;
    let itemname = req.body.itemname;
    console.log("get cartitems")
    console.log(req.body)
    console.log("get cartitems")
   // bcrypt.hash(password, saltRounds, (err, hash) => {
        db.query(
            "SELECT * FROM cart where username =?",
            [username],
            (err, result) => {
                console.log("result");
                console.log(result);
                
                //console.log(err);
                console.log("result");

            if(err) {
                res.send({err: err})
            }
            if (result){
                //
                console.log("get cart item")
                const items = result.filter(resulitem => resulitem.itemname !== null);
console.log(items); // true
let itemnames=[]
for (var j = 0; j < items.length; j++){
    itemnames.push(items[j].itemname);
    console.log(items[j].itemname);
  }
  console.log(itemnames)
  let name = itemnames.toString();
  var str = "SELECT * FROM shop WHERE ";

if (name.includes(",")) {  
  var names = name.split(",");
  names.map((o,i)=>{
    names[i] = '%'+o+'%'; 
    str += "itemname LIKE ? ";
   (i==names.length -1)?str += "":str += "OR ";

  }) 
} else{
  names=name;
  str += "itemname LIKE ? ";
}
  console.log(name)
  console.log(str)
  console.log("get cart item")
  db.query(
    str,

    names,
    (err, result) => {
        console.log("11favorites result")
        console.log(result)
        console.log(err)
        console.log("11favorites result")
    if (result){
        console.log("favorites result")
        console.log(result)
        console.log("favorites result")
                        //return succes to front end
                        res.writeHead(200,{
                            'Content-Type' : 'text/plain'
                        })
                        res.end(JSON.stringify(result));
    
    }
    }
);
            }
            else{
                //return unsuccesful to front end
                res.writeHead(201,{
                    'Content-Type' : 'text/plain'
                })
                res.end("Unsuccessful Insert");
            }
            }
        );
   // })
    
});




//insert cart
app.post('/addcart', (req,res) => {
    let username = req.body.username;
    let itemname = req.body.itemname;
    console.log("addcart")
    console.log(req.body)
    console.log("addcart")
   // bcrypt.hash(password, saltRounds, (err, hash) => {
        db.query(
            "INSERT INTO cart (username,itemname) VALUES (?,?)",
            [username,itemname],
            (err, result) => {
                console.log("result");
                console.log(result);
                console.log(err);
                console.log("result");

            if(err) {
                res.send({err: err})
            }
            if (result){
                //return succes to front end
                res.writeHead(200,{
                    'Content-Type' : 'text/plain'
                })
                res.end("Successful Insert");
            }
            else{
                //return unsuccesful to front end
                res.writeHead(201,{
                    'Content-Type' : 'text/plain'
                })
                res.end("Unsuccessful Insert");
            }
            }
        );
   // })
    
});
//get favorites
app.post('/getfavorites', (req,res) => {
    let username = req.body.username;
    let itemname = req.body.itemname;
    console.log("get favorites")
    console.log(req.body)
    console.log("get favorites")
   // bcrypt.hash(password, saltRounds, (err, hash) => {
        db.query(
            "SELECT * FROM favorites where username =?",
            [username],
            (err, result) => {
                console.log("result");
                console.log(result);
                
                //console.log(err);
                console.log("result");

            if(err) {
                res.send({err: err})
            }
            if (result){
                //
                console.log("get item")
                const items = result.filter(resulitem => resulitem.itemname !== null);
console.log(items); // true
let itemnames=[]
for (var j = 0; j < items.length; j++){
    itemnames.push(items[j].itemname);
    console.log(items[j].itemname);
  }
  console.log(itemnames)
  let name = itemnames.toString();
  var str = "SELECT * FROM shop WHERE ";

if (name.includes(",")) {  
  var names = name.split(",");
  names.map((o,i)=>{
    names[i] = '%'+o+'%'; 
    str += "itemname LIKE ? ";
   (i==names.length -1)?str += "":str += "OR ";

  }) 
} else{
  names=name;
  str += "itemname LIKE ? ";
}
  console.log(name)
  console.log(str)
  console.log("get item")
  db.query(
    str,

    names,
    (err, result) => {
        console.log("11favorites result")
        console.log(result)
        console.log(err)
        console.log("11favorites result")
    if (result){
        console.log("favorites result")
        console.log(result)
        console.log("favorites result")
                        //return succes to front end
                        res.writeHead(200,{
                            'Content-Type' : 'text/plain'
                        })
                        res.end(JSON.stringify(result));
    
    }
    }
);
            }
            else{
                //return unsuccesful to front end
                res.writeHead(201,{
                    'Content-Type' : 'text/plain'
                })
                res.end("Unsuccessful Insert");
            }
            }
        );
   // })
    
});
//update user api
app.post('/updateuser', upload.single('image'),(req,res) => {
    let name = req.body.name;
    let email = req.body.email;
    let passwordn = req.body.password;
    let user = req.body.user;
    let city = req.body.city;
    let age = req.body.age;
    let street = req.body.street;
    let zip = req.body.zip;
    let phone = req.body.phone;
    let country = req.body.country;
    console.log("Register")
    console.log(req.body)
    console.log("Register")
    "Update user SET  photo =? where User =?",
   // bcrypt.hash(password, saltRounds, (err, hash) => {
        db.query(
            "Update user SET  photo =?, Name=?, Phone=?, City=?,Age=?,Email=?,Zip=?,Country=?,street=? where User =?",
   
            [req.file.originalname,name, phone,city,age,email,zip,country,street,user],
            (err, result) => {
                console.log("result");
                console.log(result);
                console.log(err);
                console.log("result");

            if(err) {
                res.send({err: err})
            }
            if (result){
                res.cookie('cookie',user,{maxAge: 900000, httpOnly: false, path : '/'});
                req.session.user ={ username: user, password: passwordn };
                //return succes to front end
                res.writeHead(200,{
                    'Content-Type' : 'text/plain'
                })
                res.end("Successful Login");
            }
            else{
                //return unsuccesful to front end
                res.writeHead(201,{
                    'Content-Type' : 'text/plain'
                })
                res.end("Unsuccessful Login");
            }
            }
        );
   // })
    
});
//Insert new item
app.post('/additem', upload.single("image"),(req,res) => {
    console.log("Register")
    console.log(req.body)
    console.log("Register")
    let username = req.body.username;
    let name = req.body.itemname;
    let category = req.body.category;
    let description = req.body.description;
    let price = req.body.price;
    let quantity = req.body.quantity;
    let shopname=''
   // let photo = req.body.photo;

   db.query(
    "SELECT shopname FROM shop where username=?",
    [username],
    (err, result) => {
        console.log("result to fins shopname");
        console.log(result);
        console.log(err);
        console.log("result to find shopname");

    if(err) {
        res.send({err: err})
    }
    if (result){
        console.log("Register ITEM")
        console.log(shopname)
       
        shopname = result[0].shopname
        console.log(shopname)
        console.log("Register ITEM")
        db.query(
            "INSERT INTO shop (username,shopname, itemname,category,description,price,quantity,photo) VALUES (?,?,?,?,?,?,?,?)",
            [username,shopname,name,category,description,price,quantity,req.file.originalname],
            (err, result) => {
                console.log("result");
                console.log(result);
                console.log(err);
                console.log("result");

            if(err) {
                res.send({err: err})
            }
            if (result){
                //return succes to front end
                res.writeHead(200,{
                    'Content-Type' : 'text/plain'
                })
                res.end("Successful Login");
            }
            else{
                //return unsuccesful to front end
                res.writeHead(201,{
                    'Content-Type' : 'text/plain'
                })
                res.end("Unsuccessful Login");
            }
            }
        );
    }
    else{
    }
    }
);


   // bcrypt.hash(password, saltRounds, (err, hash) => {

   // })
    
});

//start your server on port 3001
app.listen(3001);
console.log("Server Listening on port 3001");