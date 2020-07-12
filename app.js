var express=require("express");
var app=express();
var bodyParser = require('body-parser');
var mongoose=require("mongoose");
var Campgrounds=require("./models/campground");
var Comment=require("./models/comment")
var seedDB= require("./seeds");
var campgroundRoutes=require("./routes/campground.js");
var commentRoutes= require("./routes/comments.js");
var indexRoutes=require("./routes/index.js");
var passport=require("passport");
var LocalStrategy=require("passport-local");
var User= require("./models/user");
var methodOverride= require("method-override");
var flash= require("connect-flash")

//seedDB();
app.set("view engine","ejs");
app.use(express.static(__dirname+"/public"));
app.use(methodOverride("_method"));
app.use(bodyParser.urlencoded({extended:true}));
app.use(flash());
app.use(require("express-session")({
    secret:"not so sad today",
    resave:false,
    saveUninitialized:false
    

}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(function(req,res,next){
res.locals.currentUser=req.user;
res.locals.error=req.flash("error");
res.locals.success=req.flash("");
next();
});

mongoose.connect("mongodb+srv://Muskansahni18:Muskansahni18@cluster0.plgj1.mongodb.net/yelpcamp_4?retryWrites=true&w=majority", { dbName: "yelpcamp_4" })
  .then( () => {
    console.log('Connection to the Atlas Cluster is successful!')
  })
  .catch( (err) => console.error(err));
  
/* Campgrounds.create({
    name:"granite hill",
image:"https://images.pexels.com/photos/2398220/pexels-photo-2398220.jpeg?auto=compress&cs=tinysrgb&h=350",
description:"has a beautiful site",
},

function(err,campground){
    if(err){
        console.log(err);
        
    }
    else{
        console.log(campground);
    }
}); 
*/




app.use(campgroundRoutes);
app.use(commentRoutes);
app.use(indexRoutes);

app.listen(process.env.PORT ||3000,function(){
    console.log("yelpcamp server running");
});