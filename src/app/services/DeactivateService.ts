import {Injectable} from '@angular/core';
import {CanDeactivate,Router,ActivatedRouteSnapshot,RouterStateSnapshot} from '@angular/router';
import {DashboardComponent} from '../components/DashboardComponent';
import {LoginService} from './LoginService';

@Injectable()

export class DeactivateService implements CanDeactivate<DashboardComponent>
{
constructor(private router:Router,private logserv:LoginService){}

canDeactivate(comp:DashboardComponent,next:ActivatedRouteSnapshot,
state:RouterStateSnapshot):boolean
{
var newstatus:boolean=false;

if(comp.IsChecked())
{
console.log("it is checked");
newstatus=true; //dashboard route can be deactivated

}
else
{
//comp.errormessage="Please select before leaving the page";
alert("Please agree to the conditions before leaving the page");
newstatus=false;
}

return newstatus;
}

}