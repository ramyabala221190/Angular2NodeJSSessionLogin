import {Injectable} from '@angular/core';
import {Http,Response} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Observable}from 'rxjs/Rx';
import {Router} from '@angular/router';

@Injectable()

export class ProfileService
{
    constructor(private http:Http,private router:Router){}
  url:string="https://jsonplaceholder.typicode.com/";  

  errorHandler(error:any)
  {
console.log(error);

    return Observable.throw(new Error(error));
  }
    
    getPosts()
    {
return this.http.get('http://localhost:8080/Getposts').
map((res:Response)=>res.json())
.catch(this.errorHandler);
    }

    likePost(post_id:number)
    {
return this.http.get('http://localhost:8080/likePost?post_id='+post_id).
map((res:Response)=>res.json()).catch(this.errorHandler);
    }

    unlikePost(post_id:number)
    {
return this.http.get('http://localhost:8080/unlikePost?post_id='+post_id).
map((res:Response)=>res.json()).catch(this.errorHandler);
    }
}