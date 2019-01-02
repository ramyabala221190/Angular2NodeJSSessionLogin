import {Component} from '@angular/core';
import {LoginService} from '../services/LoginService';
import {Router} from '@angular/router';

export class User
{
    username:string;
    password:string;
}
@Component({
templateUrl:'app/templates/login.html'
})

export class LoginComponent
{
username:string="";
password:string="";
result:boolean=false;
message:string="";

    constructor(private serv:LoginService,private router:Router){}

ngOninit()
{
     
}
login(form:any)
{
    var check:boolean=false;
    var filestatus:string="";
    var message:string="";

this.serv.login(form.form.controls.username._value,form.form.controls.password._value)
.subscribe(
    data=>{
        
        check=data.result;
        filestatus=data.filestatus;
        message=data.message;
    },
    err=>{
        console.log(err);
    },
    ()=>{
        if(check)
        {
            
            console.log("Entered check loop");
          this.serv.setUser(form.form.controls.username._value); 
          this.serv.setVisits(message);
          if(filestatus !=="" && filestatus !==undefined && filestatus !==null)
          {
          this.serv.setImage(filestatus);
          }
          this.router.navigate(['/dashboard']);
          //Here again ActivateService will be called because dashboard route
//is getting activated.But we have already checked if the user is logged in or not so
//Calling ActivateService is actually a waste here because not required but it is required in
//other places when the route is activated by a link or pasting the url directly in browser.
        }
        else
        {
            this.message="Invalid username or password";
        }
    }
)

}


}