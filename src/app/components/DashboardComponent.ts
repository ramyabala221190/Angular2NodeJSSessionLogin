import {Component} from '@angular/core';
import {LoginService} from '../services/LoginService';

declare var $:any;

@Component({
templateUrl:'app/templates/dashboard.html'
})

export class DashboardComponent
{
currentuser:string="";
agreed:boolean=false;
errormessage:string="";
myviews:string="";
constructor(private logserv:LoginService){}

IsChecked()
{
  return this.agreed;
}

ngOnInit()
{
  console.log("getting user");
  this.currentuser=localStorage.getItem("logged");
 this.myviews=localStorage.getItem("visits");
//We are writing an ajax call so that the data can be retrieved every time the
//page(component) is refreshed
var xhttp=new XMLHttpRequest();
xhttp.onreadystatechange=function()
{
  
  if(this.readyState==4 && this.status==200)
  {
  var parsed_data=JSON.parse(this.responseText);// parsing is necessary to access the ajax response
  console.log(parsed_data);
$('#details ul li').each(function(index:number)
{
  console.log(index);
  if(index==0)
  $(this).text(parsed_data.id);
  if(index==1)
  $(this).text(parsed_data.body);
  if(index==2)
  $(this).text(parsed_data.title);
})
  }
}
xhttp.open('GET','http://localhost:8080/getDetails/'+this.currentuser,true);
xhttp.send();

}

}