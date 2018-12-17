import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Http,Response} from '@angular/http';
import 'rxjs/add/operator/map';
import {User} from '../components/LoginComponent';


@Injectable()

export class LoginService
{
    url:string="http://localhost:8080/";
    constructor(private router:Router,private http:Http){}


setUser(name:string)
{

   localStorage.setItem("logged",name); 
   //localStorage ensures that the above key-value pair is stored even after browser
   //refreshes and across tabs
   //You can also use sessionStorage instead of localStorage if you want the data to be 
   //maintained only until the browser window closes.
}

setVisits(times:string)
{
    localStorage.setItem("visits",times);
}
getVisits()
{
    return localStorage.getItem("visits");
}

getUser()
{
    return localStorage.getItem('logged');
}

login(user:string,pass:string)
{
var data:User[]=[{
    username:user,
    password:pass
}];
console.log(data);
return this.http.post(this.url+'login',data)
.map((res:Response)=>res.json());

}

logout()
{
console.log("logging out");
return this.http.get(this.url+'logout')
.map((success=>success.status));
}

IfLoggedIn()
{
var status:boolean;
console.log("checking if logged in");
return this.http.get(this.url+'IfLogged').map((res:Response)=>
{
console.log(res.json());
if(res.json().result==false) //session no longer exists
{  
localStorage.removeItem("logged");//removing from localstorage
this.router.navigate(['/login']); //navigate to login page
 //dont navigate to the route
}
return res.json().result;
});
    
}

}