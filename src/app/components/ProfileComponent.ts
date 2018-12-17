import {Component} from '@angular/core';
import {ProfileService} from '../services/ProfileService';
import {Router} from '@angular/router';

declare var $:any;

export class Post
{
    userId:string;
    id:string;
    title:string;
    body:string;
}
@Component({
    templateUrl:'app/templates/profile.html'
})

export class Profile
{
  
/**Data between the Dashboard and this child component can be shared
 * only through a common service because the child component is inserted
 * into the parent component via router-outlet and not via selector.
 */
constructor(private prof:ProfileService,private router:Router){}
myposts:Post[]=[];
getPosts()
{
var mypost:any[]=[];
var timedout:string="";
this.prof.getPosts().subscribe(
posts=>{

    if(posts.result)
    {
timedout=posts.result;
    }
    else
    {
console.log(posts);
mypost.push(posts);
    }

},
err=>{
console.log(err);
if(err.status==404)
{
this.router.navigate(['/404']);
}

},
()=>
{
  if(timedout !=="")
    {
        console.log("session timed out");
    this.removeSession();
    }
    else
    {  
    
    this.myposts=mypost;
    console.log(this.myposts);
    console.log("posts retrieved");
    }
    
}

)
}

like(post_id:number)
{

var posting:any[]=[];
var timedout:string="";
this.prof.likePost(post_id).subscribe(
data=>{
    if(data.result)
    {
timedout=data.result;
    }
    else
    {
    console.log(data);
    posting.push(data);
    }

},
err=>{

console.log(err);
},
()=>{
    if(timedout !=="")
    {
console.log("session timed out");
    this.removeSession();
    }
    else
    {
    console.log("Like post done");
    this.myposts=posting;
    console.log(this.myposts);
    }
    
}


)
}

unlike(post_id:number)
{
var posting:any[]=[];
var timedout:string="";
this.prof.unlikePost(post_id).subscribe(
data=>{
    if(data.result)
    {
timedout=data.result;
    }
    else
    {
    console.log(data);
    posting.push(data);
    }
},
err=>{
  console.log(err);          
},
()=>{
    if(timedout !=="")
    {
    this.removeSession();
    }
    else
    {
    console.log("unlike post done");
    this.myposts=posting;
    console.log(this.myposts);
    }
    
}

)
}

removeSession()
{
 localStorage.removeItem("logged");
this.router.navigate(['/login']);   
}

ngOnInit()
{
  
}
}