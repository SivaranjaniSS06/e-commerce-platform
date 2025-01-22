const express = require('express');
const multer = require('multer');
const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");
const path = require('path');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 4002;

// Middleware to parse JSON bodies
app.use(express.json());

// Serve static files from the root directory
app.use(express.static(path.join(__dirname)));

app.use(cors());
  


// Database connection (if applicable)
mongoose.connect("mongodbconnectionstring");

// Configure Multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'upload/images'); // Ensure this directory exists
    },
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    }
});
const upload = multer({ storage: storage });

// Route to serve the HTML form
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.use('/images', express.static(path.join(__dirname, 'upload/images')));

// Endpoint to handle file uploads
app.post('/upload', upload.single('product'), (req, res) => {
    console.log('Request body:', req.body); // Log any additional fields sent
    console.log('Uploaded file:', req.file); // Log the uploaded file object

    if (!req.file) {
        console.error("No file uploaded.");
        return res.status(400).json({ success: false, message: 'No file uploaded.' });
    }

    // If needed, you can save product info to MongoDB here
    res.json({
        success: true,
        message: 'File uploaded successfully.',
        image_url: `http://localhost:4002/images/${req.file.filename}` // Adjust based on your server's file serving logic
    });
});



//Schema for creating Schema

const Product = mongoose.model("Product", {
    id:{
        type: Number,
        required : true,
    },
    name:{
        type:String,
        required: true,
    },
    image:{
        type: String,
        required: true,
    },
    category:{
        type: String,
        required: true,
    },
    new_price:{
        type: String,
        required: true,
    },
    old_price:{
        type:String,
        required:true,
    },
    date:{
        type: Date,
        default: Date.now,
    },
    available:{
        type: Boolean,
        default: true,
    },


})

app.post('/addproduct', async (req,res)=>{
    let products = await Product.find({});
    let id;
    if(products.length>0){
        let last_product_array = products.slice(-1);
        let last_product = last_product_array[0];
        id = last_product.id+1;
    }else{
        id=1;
    }
    const product = new Product({
        id:id,
        name: req.body.name,
        image:req.body.image,
        category: req.body.category,
        new_price: req.body.new_price,
        old_price: req.body.old_price,
    });
    console.log(product);
    await product.save();
    console.log("Saved");
    res.json({
        success:true,
        name:req.body.name,
    })
    
})

//Creating API for deleting products

app.post('/removeproduct', async (req,res)=>{
    await Product.findOneAndDelete({id:req.body.id});
    console.log("Removed");
    res.json({
        success:true,
        name: req.body.name
    })
    
})

// Create API for getting all products
app.get('/allproducts', async(req,res)=>{
    let products = await Product.find({});
    console.log("All Products Fetched");
    res.send(products);
    
})

// Schema creating for User Model

const Users = mongoose.model('Users',{
    name:{
        type:String,
    },
    email:{
        type:String,
        unique:true,
    },
    password:{
        type:String,
    },
    cartData:{
        type:Object,
    },
    date:{
        type:Date,
        default:Date.now,
    }
})

// Create Endpoint for registering the user
app.post('/signup',async(req,res)=>{
    let check = await Users.findOne({email:req.body.email});
    if(check){
        return res.status(400).json({success:false,errors:"existing user found with same email address"});
    }
    let cart = {};
    for (let i = 0; i < 300; i++) {
        cart[i]=0;     
    }
    const user = new Users({
        name:req.body.username,
        email:req.body.email,
        password:req.body.password,
        cartData:cart,
    })

    await user.save();

    const data ={
        user:{
            id:user.id
        }
    }

    const token = jwt.sign(data,'secret_ecom');
    res.json({success:true,token})
})
//Creating Endpoint Userlogin
app.post('/login', async(req,res)=>{
    let user = await Users.findOne({email:req.body.email});
    if(user){
        const passCompare = req.body.password === user.password;
        if(passCompare){
            const data = {
                user:{
                    id:user.id
                }
            }
            const token = jwt.sign(data,'secret_ecom');
            res.json({success:true,token});
        }
        else{
            res.json({success:false, errors:"Wrong Password"});
        }
    }else{
        res.json({success:false,errors:"Wrong Email Id"});
    }
})

// Creating Endpoint for Popular in Women

app.get('/popularinwomen', async(req,res)=>{
    let products = await Product.find({category:"women"});
    let popular_in_women = products.slice(0,4);
    console.log("Popular in women fetched");
    res.send(popular_in_women);
    
})

// Creating middleware to fetch user

const fetchUser = async(req,res,next)=>{
    const token = req.header('auth-token');
    if(!token){
        res.status(401).send({errors:"Please authenticate using valid token"})
    }else{
        try{
            const data = jwt.verify(token,'secret_ecom');
            req.user = data.user;
            next();
        }catch(error){
            res.status(401).send({errors:"Please authenticate using valid token"})
        }
    }
}
// Creating Endpoint for adding products in cart data

app.post('/addtocart',fetchUser,async(req,res)=>{
    console.log("added",req.body.itemId);
    let userData = await Users.findOne({_id:req.user.id});
    userData.cartData[req.body.itemId] += 1;
    await Users.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData});
    res.send("Added")
    
})

// Creating Endpoint to remove product in cart data
app.post('/removefromcart', fetchUser,async(req,res)=>{
    console.log("removed",req.body.itemId);
    
    let userData = await Users.findOne({_id:req.user.id});
    if(userData.cartData[req.body.itemId]>0)
    userData.cartData[req.body.itemId] -= 1;
    await Users.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData});
    res.send("Removed")
})

// Creating Endpoint to get cartdata
app.post('/getcart',fetchUser,async(req,res)=>{
    console.log("GetCart");
    let userData = await Users.findOne({_id:req.user.id});
    res.json(userData.cartData);
})

// Start the server
app.listen(port, (error) => {
    if(!error){
    console.log(`Server running on port ${port}`);
    }else{
        console.log("Error : "+error)
    }
});
