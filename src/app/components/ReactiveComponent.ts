import {Component} from '@angular/core';
import {FormGroup,FormControl,FormBuilder,Validators} from '@angular/forms';

@Component({
templateUrl:'app/templates/reactiveForm.html'    
})

export class ReactiveComponent
{
constructor(private fb:FormBuilder){}

myForm:FormGroup;

submit(myForm:FormGroup)
{
console.log(myForm.value.myname);
console.log(myForm.value.myemail);
console.log(myForm.value.mypin);
}

ngOnInit()
{
    this.myForm=this.fb.group({
myname:new FormControl('Enter name',[Validators.required,Validators.maxLength(5),Validators.pattern("[a-zA-Z]*")]),
myemail:new FormControl('Enter email',Validators.required),
mypin:new FormControl('Enter pincode',[Validators.maxLength(6),Validators.required,Validators.pattern("[0-9]*")])
/*
myname is the formControlName in the tag.
First argument is used instead of the placeholder in the tag. 
2nd argument is used instead of required attribute in the input tag
**/
    })

}

}

