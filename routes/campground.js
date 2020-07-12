//========campground routes=============
var express= require("express");
var router= express.Router();
var Campgrounds= require("../models/campground");
const { route } = require("./comments");
const NodeGeocoder = require('node-geocoder');
const options = {
    provider: 'google',
   
    httpAdaptor:'https',
    apiKey: process.env.GEOCODER_API_KEY, // for Mapquest, OpenCage, Google Premier
    formatter: null // 'gpx', 'string', ...
  };
  var geocoder = NodeGeocoder(options);


router.get("/campgrounds",function(req,res){
    Campgrounds.find({},function(err,camps){
 if(err){
     console.log(err);
 }
 else{
      res.render("campgrounds/campground",{campgrounds:camps});
 }
    })
            
 });
 router.post("/campgrounds",isloggedin,function(req,res){
     var name = req.body.name;
     var image = req.body.image;
     var description=req.body.description;
     var price=req.body.price;
    // var location=req.body.location;
     var author={
         id:req.user._id,
         username:req.user.username
     };
    // geocoder.geocode(req.body.location,function(err,data){
       //  if(err || !data.length){
         //    req.flash("error","invalid address");
           // return res.redirect("back");
       // }
        //var lat=data[0].latitude;
        //var lng=data[0].longitude;
        //var location=data[0].formattedAddress;

    
    
     var newcampgrounds= {name:name,image:image,description:description,price:price,author:author};
     Campgrounds.create(newcampgrounds);
     res.redirect("campgrounds");

 //});
});
 router.get("/campgrounds/new",isloggedin,function(req,res){
     res.render("campgrounds/add");
 });
 router.get("/campgrounds/:id",function(req,res){
     Campgrounds.findById(req.params.id).populate("comments likes").exec(function(err,foundcamp){
 if(err){
     console.log(err);
 }
 else{
 res.render("campgrounds/more",{campground:foundcamp});
 }
 });
 
 });
router.get("/campgrounds/:id/edit",campownership,function(req,res){
     Campgrounds.findById(req.params.id,function(err,campground){
         res.render("campgrounds/edit",{campground:campground});
     })
 
 
    //res.render("edit")
 });
 router.put("/campgrounds/:id",campownership,function(req,res){
   // geocoder.geocode(req.body.location,function(err,data){
     //   if(err || !data.length){
       //     req.flash("error","invalid address");
         //  return res.redirect("back");
       //}
      // var lat=data[0].latitude;
      // var lng=data[0].longitude;
      // var location=data[0].formattedAddress;
//var newdata={name:req.body.name,image:req.body.image,description:req.body.description,lat:req.body.lat,lng:req.body.lng,location:req.body.location,price:req.body.price,author:req.body.author};
   
     Campgrounds.findByIdAndUpdate(req.params.id,req.body.campground,function(err,updatedcamp){
         if(err){
             console.log(err);
         }
         else{
            req.flash("success","updated successfully");
             res.redirect("/campgrounds/"+req.params.id);
         }
     });
   // });
 });
 router.delete("/campgrounds/:id",campownership,function(req,res){
    Campgrounds.findByIdAndRemove(req.params.id,function(err){
        if(err){
            console.log(err);
        }
        else{
            req.flash("success","deleted successfully");
            res.redirect("/campgrounds");
        }
    });
})
router.post("/campgrounds/:id/likes",isloggedin,function(req,res){
    Campgrounds.findById(req.params.id,function(err,camp){
        if(err){
            req.flash("error","campground not found");
            res.redirect("back");
        }
        else{
            var foundlike= camp.likes.some(function(likes){
                return likes.equals(req.user._id);
            })
            if(foundlike){
                camp.likes.pull(req.user._id);
            }
            else{
                camp.likes.push(req.user);
            }
            camp.save();
            res.redirect("/campgrounds/"+camp._id);
        }
    });
});
 function isloggedin(req,res,next){
    if(req.isAuthenticated()){
        return next();

    }
    req.flash("error","please login first");
    res.redirect("/login");

}
function campownership(req,res,next){
    if(req.isAuthenticated()){
        Campgrounds.findById(req.params.id,function(err,campground){
            if(err){
                res.redirect("back");
            }
            else
            {
                if(campground.author.id.equals(req.user._id)){
                   return next();
                }
                else{
                    req.flash("error","you dont have permission to do that");
                    res.redirect("back");
                }
                
            }
        });
     }
     else{
         req.flash("error","please login first");
         res.redirect("/login");
     }
}
 module.exports= router;