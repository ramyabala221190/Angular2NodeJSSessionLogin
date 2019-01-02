exports.server=function(app,mul,fs,path)
{
var details_module=require('./modules/details');
var posts_module=require('./modules/posts');
var users_module=require('./modules/users');
var filterPosts_module=require('./modules/filterPosts');



/*
ActivateService.ts performs a session check to ensure that user is logged in
before dashboard component is accessed.So client side performs that check.
The service calls /IfLogged to check for the req.session.user object.

We also need to add checks for server calls after entering into the dashboard component.
For that purpose we have added the below middleware function which will be called before
each of the below routes:
/unlikePost
/likePost
/getDetails/:user
/Getposts
Only if the if-condition is true, we call next() which will redirect to the route
else we send a error message to the client and client redirects to the login page.

We call the middleware function using app.use(function_name);
//Note that you cannot execute app.use inside a route. You can execute it only before/after a route.
*/
var userCheck=function(req,res,next)
{
console.log("performing session check for"+" "+req.url);
console.log(req.session.cookie.maxAge);
console.log("session user"+req.session.user);
 if(req.session.user !==null && req.session.user !==undefined && req.session.user !=="")
{
   console.log("session still exists");
    next(); //proceed to the route
}
else
{
var err=new Error(false);//create a new error and pass it as arg to next()
next(err); //next(err) will pass control to the error middleware at the end of all routes
//the error message will be passed as arg. The message can be accessed in the function and sent
//out as response.
}
}

var deleteFiles=function(req,res,next)
{
var folderpath='./public/uploads/'+req.session.user;
//deletes existing profile.* files for the user so that it can be replaced with the new one
fs.access(folderpath, fs.F_OK, (err) => {
  if (err) {
      //folder does not exist
    console.error(err);
    next();//proceed to post route
  }
  else
  {
      //folder exists
fs.readdir(folderpath,function(err,filenames)
{
for(var i=0;i<filenames.length;i++)
{
fs.unlink(folderpath+'/'+filenames[i],function(err)
{
if (err) throw err;
console.log('File deleted!'); 
})
}
});
next();    //proceed to post route
  }
  })


}

var logger=function(req,res,next)
{
    console.log("Dummy home route executed");
    next();
}


//Routes begin here

//Dummy home and office route to test logger function

app.use('/home',logger);
/*
If you need to execute the middleware function only for a single route or a few routes out of many,
in that case you can add the url of the route in app.use('/path',function(req,res,next)
{})
logger function will be executed only for /home route. although it is called before the
/office route, it will be executed only for /home because the /home is provided as part of syntax.
*/

app.get('/home',function(req,res)
{
    console.log("home route");
    fs.readdir('./public',function(err,filenames)
    {
        for(var i=0;i<filenames.length;i++)
        {
            console.log(filenames[i]);
            console.log(fs.statSync('./public/'+filenames[i]).isFile());
        }
    })


    fs.stat('./public/uploads/ABC/profile.png',function(err,stats)
    {
        console.log(stats);
    })
})

app.get('/office',function(req,res)
{
    console.log("office route");
})

app.post('/login',function(req,res)
{
var imagename="";
var status={result:false,message:"",filestatus:""};
for(var i=0;i<users_module.users.length;i++)
{

  if(req.body[0].username==users_module.users[i].username && req.body[0].password==users_module.users[i].password)  
  {

status.result=true;

req.session.user=req.body[0].username;
req.session.cookie.maxAge=60000;
var folderPath='./public/uploads/'+req.session.user;  

//Database is needed for completely implementing the count logic. In the below logic, count
//wont get updated each time the user visits the page.
if(req.session.page_views)
{
    req.session.page_views++;
    
}
else
{
req.session.page_views=1;
}
console.log(req.session.page_views);
status.message='No of visits:'+req.session.page_views;
break;
}
}
if(status.result)
{
fs.access(folderPath, fs.F_OK, (err) => {
  if (err) {
      //folder does not exist
    console.error(err);
  }
  else
  {
//folder exists
fs.readdir(folderPath,function(err,filenames)
{
for(var i=0;i<filenames.length;i++)
{
    console.log(filenames[i]);
    status.filestatus=filenames[i];
    console.log(status);
}

console.log(status);
res.send(status);
});


  }

})

}
else
{
 res.send(status);   
}
})

app.get('/logout',function(req,res)
{
console.log(req.session);
req.session.user=null;
console.log("logged out");
res.end();
});


app.get('/IfLogged',function(req,res)
{
var status={result:false};

console.log(req.session.cookie.maxAge);
console.log("session user"+req.session.user);
if(req.session.user !==null && req.session.user !==undefined && req.session.user !=="")
{
    status.result=true;  
}
else
{
    status.result=false;  
}
res.send(status);  
});

//We are executing the middle ware function userCheck for all routes after this because
//these routes should be executed only if user is authenticated.
//you will note here that the positioning of app.use is very important.
/*
But if out of 10 routes only 4 need a middleware function 1 and remianing 6 need another
function, then this wont work. You need to add the url in app.use to identify the routes
that will be using the function as shown earlier.
*/
app.use(userCheck);


app.get('/getDetails/:user',function(req,res)
{
console.log(req.params.user);


for(var j=0;j<details_module.details.length;j++)
{
if(req.params.user==details_module.details[j].userId)
{
res.send(details_module.details[j]);
}
}

})


app.get('/Getposts',function(req,res)
{
var postarr1=[];

postarr1=filterPosts_module.filterPosts(req,posts_module);
res.send(postarr1);

})


app.get('/likePost',function(req,res)
{
console.log(req.query.post_id);
var postarr1=[];
for(var j=0;j<posts_module.posts.length;j++)
{
    if(posts_module.posts[j].id==req.query.post_id)
    {
        posts_module.posts[j].likes++;
        break;
    }
}

postarr1=filterPosts_module.filterPosts(req,posts_module);
res.send(postarr1);

})


app.get('/unlikePost',function(req,res)
{
    var postarr1=[];
    console.log(req.query.post_id);
for(var j=0;j<posts_module.posts.length;j++)
{
    if(posts_module.posts[j].id==req.query.post_id)
    {
        posts_module.posts[j].unlikes++;
        break;
    }
}
postarr1=filterPosts_module.filterPosts(req,posts_module);
res.send(postarr1);
});

app.use('/upload',deleteFiles); //removing any other profile.png files from the user's uploads folder

app.post('/upload',mul({storage:mul.diskStorage({

destination:function(req,file,fun)
{
    console.log(file);
    fun(null,'./public/uploads/'+req.session.user);
},
filename:function(req,file,fun)
{
console.log(file);
var extension=file.mimetype;
//fun(null,file.originalname);
fun(null,'profile.'+extension.substring(6));
}
})}).array('uploads'),function(req,res)

{

console.log(req.files);
 req.session.user.uploaded=true;   
 res.send({message:req.files[0].filename}); 
})


//error handling middleware function. It is unique from other middlewares
//due to the extra 4th argument:err
 
app.use(function(err,req,res,next)
{
console.log("error handling function called");
console.log(err);
res.send({result:err});//always pass response as a json so that it can be parsed on client side using res.json()
//If you dont want to pass json, ensure it res.text() on angular 2 service.
})

}
