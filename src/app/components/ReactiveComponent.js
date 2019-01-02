"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var ReactiveComponent = (function () {
    function ReactiveComponent(fb) {
        this.fb = fb;
    }
    ReactiveComponent.prototype.submit = function (myForm) {
        console.log(myForm.value.myname);
        console.log(myForm.value.myemail);
        console.log(myForm.value.mypin);
    };
    ReactiveComponent.prototype.ngOnInit = function () {
        this.myForm = this.fb.group({
            myname: new forms_1.FormControl('Enter name', [forms_1.Validators.required, forms_1.Validators.maxLength(5), forms_1.Validators.pattern("[a-zA-Z]*")]),
            myemail: new forms_1.FormControl('Enter email', forms_1.Validators.required),
            mypin: new forms_1.FormControl('Enter pincode', [forms_1.Validators.maxLength(6), forms_1.Validators.required, forms_1.Validators.pattern("[0-9]*")])
        });
    };
    return ReactiveComponent;
}());
ReactiveComponent = __decorate([
    core_1.Component({
        templateUrl: 'app/templates/reactiveForm.html'
    }),
    __metadata("design:paramtypes", [forms_1.FormBuilder])
], ReactiveComponent);
exports.ReactiveComponent = ReactiveComponent;
//# sourceMappingURL=ReactiveComponent.js.map