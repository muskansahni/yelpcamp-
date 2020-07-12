//=======comments routes==========
var express= require("express");
var router= express.Router();
var Campgrounds= require("../models/campground");
var Comment=require("../models/comment");
const { findByIdAndRemove } = require("../models/campground");
const { route } = require("./campground");


router.get("/campgrounds/:id/comment/new",isloggedin,function(req,res){
    Campgrounds.findById(req.params.id,function(err,campground){
        if(err){
            console.log("/campgrounds/:id");
        }
        else{ 
            res.render("comments/new",{campground:campground});

        }
    }) 
    
});  
router.post("/campgrounds/:id/comment",isloggedin,function(req,res){
    Campgrounds.findById(req.params.id,function(err,camp){
        if(err){
            console.log(err);
        }
        else{
            Comment.create(req.body.comment,function(err,comment){
                comment.author.id=req.user._id;
                comment.author.username=req.user.username;
                comment.save();
                camp.comments.push(comment);
                camp.save();
                req.flash("success","comment successfully added");
                res.redirect("/campgrounds/"+camp._id );
            })
        }
    })

});
//EDIT ROUTES

router.get("/campgrounds/:id/comment/:comment_id/edit",commentownership,function(req,res){
   Comment.findById(req.params.comment_id,function(err,foundcomment){
       if(err){
           res.redirect("back");
       }
       else{
        res.render("comments/edit",{campground_id:req.params.id,comment:foundcomment});
       }
   })
    
})
router.put("/campgrounds/:id/comment/:comment_id",commentownership,function(req,res){
    Comment.findByIdAndUpdate(req.params.comment_id,req.body.comment,function(err,updatedcomment){
        if(err){
            res.redirect("back");
        }
        else{
            req.flash("success","comment updated");
            res.redirect("/campgrounds/"+req.params.id);
        }
    })
})
router.delete("/campgrounds/:id/comment/:comment_id",commentownership,function(req,res){
    Comment.findByIdAndRemove(req.params.comment_id,function(err,deleted){
        req.flash("success","comment successfully deleted");
        res.redirect("/campgrounds/"+req.params.id);
    })
})
function isloggedin(req,res,next){
    if(req.isAuthenticated()){
        return next();

    }
    req.flash("error","please login first");
    res.redirect("/login");

}
function commentownership(req,res,next){
    if(req.isAuthenticated()){
    Comment.findById(req.params.comment_id,function(err,foundcomment){
        if(err){
            res.redirect("back");
        }
        else{
            if(foundcomment.author.id.equals(req.user._id)){
                return next();
            }
            else{
                req.flash("error","you dont have permission to do that");
                res.redirect("back");
            }
        }
    })
    }
    else{
        req.flash("error","please login first");
        res.redirect("back");
    }
}
module.exports= router;