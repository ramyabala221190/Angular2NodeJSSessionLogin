
//modules imported needs to be imported here to add it in the imports array at the bottom
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import {HttpModule} from '@angular/http';
import {ReactiveFormsModule} from '@angular/forms';

import {IndexComponent} from './components/IndexComponent';
import {LoginComponent} from './components/LoginComponent';
import {DashboardComponent} from './components/DashboardComponent';
import {Profile} from './components/ProfileComponent';
import {ErrorPage} from './components/ErrorPage';
import {SomethingWrong} from './components/SomethingWrong';
import {LogoutComponent} from './components/LogoutComponent';

import {LoginService} from './services/LoginService';
import {ActivateService} from './services/ActivateService';
import {DeactivateService} from './services/DeactivateService';
import {ProfileService} from './services/ProfileService';
import {ReactiveComponent} from './components/ReactiveComponent';

const routes:Routes=[

{path:'',redirectTo:'/login',pathMatch:'full'},

{path:'login',
component:LoginComponent},

{path:'dashboard',component:DashboardComponent,
canActivate:[ActivateService],
canDeactivate:[DeactivateService],
children:[

{path:'myprofile',component:Profile}

]},

{path:'reactive',component:ReactiveComponent},
{path:'logout',component:LogoutComponent},
/**The above canActivate ensures that each time the Dashboard path is activated, there
 * is a check if a user is logged in or not before activating this route.
 * 
 * canDeativate ensures that each time we leave the dashboard route, the checkbox is
 * selected,else it doesnt allow to leave the route.
 */
{path:'404',component:SomethingWrong},
{path:'**',component:ErrorPage}


]

//Defines the metadata for the AppModule which is the root module of the app.
@NgModule({
  imports:      [BrowserModule,FormsModule,HttpModule,RouterModule.forRoot(routes),ReactiveFormsModule],
  declarations: [IndexComponent,LoginComponent,DashboardComponent,Profile,ReactiveComponent,ErrorPage,LogoutComponent,SomethingWrong],
  bootstrap:    [IndexComponent],
  providers: [LoginService,ActivateService,DeactivateService,ProfileService] 
})

export class AppModule { }
