import {Injectable} from '@angular/core';
import {Router,CanActivate,ActivatedRouteSnapshot,RouterStateSnapshot} from '@angular/router';
import {LoginService} from './LoginService';
import {Observable} from 'rxjs';
import 'rxjs/add/operator/map';

@Injectable()

export class ActivateService implements CanActivate
{
  //you cannot call component's method here. You can only call the method of a service.  
    constructor(private router:Router,private loginserv:LoginService){}

    canActivate(next:ActivatedRouteSnapshot,state:RouterStateSnapshot):Observable<boolean>{


return this.loginserv.IfLoggedIn();


    }

}