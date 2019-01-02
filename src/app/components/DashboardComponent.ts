import {Component} from '@angular/core';
import {LoginService} from '../services/LoginService';

declare var $:any;

@Component({
templateUrl:'app/templates/dashboard.html'
})

export class DashboardComponent
{
currentuser:string="";
imagepath:string="";
agreed:boolean=false;
errormessage:string="";
myviews:string="";
fileUpload:Array<File>=[];
uploadstatus:string="";
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
 this.imagepath=localStorage.getItem("path");
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

open()
{
  document.getElementById("profile_image").click();
}

StoreFile(input:any)
{
  this.fileUpload=input.target.files;

  console.log(this.fileUpload);
  //image preview
var reader=new FileReader();
reader.readAsDataURL(input.target.files[0]);
reader.onload=function()
{
var out=<HTMLInputElement>document.getElementById("output");
out.src=reader.result; 
}
}

upload()
{
  var filename="";
  var myprofile=<HTMLInputElement>document.getElementById('profile_image'); //we are casting it with <HTMLInputElement> to avoid
  //error: Cannot access property files on HtmlElement
  for(var i=0;i<myprofile.files.length;i++)
  {
console.log(myprofile.files[i].name);
  }

  this.logserv.upload(this.fileUpload).subscribe(
    data=>
    {
      console.log(data);
      filename=data.message;
    },
    err=>
    {
      console.log(err);
    },
    ()=>
    {
      this.uploadstatus=filename;
    }
  )

}

}