import {Component} from '@angular/core';
import {LoginService} from '../services/LoginService';

declare var $:any;

@Component({
    template:'<h3></h3><a href="javascript:void(0)" routerLink="/login"></a>'
})

export class LogoutComponent
{
    loggedout:string="";
constructor(private logservice:LoginService){}
ngOnInit()
{
localStorage.removeItem("logged");
localStorage.removeItem("visits");
localStorage.removeItem("path");
//Now the value of logged will be null

this.logservice.logout().subscribe(
data=>{
console.log(data);
},
err=>{
console.log(err);
},
()=>{
$('h3').html('You have successfully logged out');
$('a').text('Login');
}
)

}

}