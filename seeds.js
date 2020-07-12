var mongoose=require("mongoose");
var Campgrounds=require("./models/campground");
var Comment=require("./models/comment");
var data=[
    {
        name:"granite hill",
        image:"https://images.pexels.com/photos/2398220/pexels-photo-2398220.jpeg?auto=compress&cs=tinysrgb&h=350",
        description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
    {
        name:"salmon ",
    image:"https://images.pexels.com/photos/2398220/pexels-photo-2398220.jpeg?auto=compress&cs=tinysrgb&h=350",
    description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
    {
        name:"phantom hill",
        image:"https://images.pexels.com/photos/2398220/pexels-photo-2398220.jpeg?auto=compress&cs=tinysrgb&h=350",
        description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    }
];
function seedDB(){
    Campgrounds.remove({},function(err,deleted){
     /*   if(err){
            console.log(err);
        }
        else{
            data.forEach(function(campground){
                Campgrounds.create(campground,function(err,newcamp){
                    if(err){
                        console.log(err);
                    }
                    else{
                        Comment.create({
                            text:"difficult to climb this high",
                            author:"Sabreina micheal"
                        },function(err,comment){
                            if(err){
                                console.log(err);
                            }
                            else{
                                newcamp.comments.push(comment);
                                newcamp.save();
                               

                            }
                        });
                    }
                });

            });
        }
  */   }); 
}
module.exports=seedDB;