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
var LoginService_1 = require("../services/LoginService");
var LogoutComponent = (function () {
    function LogoutComponent(logservice) {
        this.logservice = logservice;
        this.loggedout = "";
    }
    LogoutComponent.prototype.ngOnInit = function () {
        localStorage.removeItem("logged");
        //Now the value of logged will be null
        this.logservice.logout().subscribe(function (data) {
            console.log(data);
        }, function (err) {
            console.log(err);
        }, function () {
            $('h3').html('You have successfully logged out');
            $('a').text('Login');
        });
    };
    return LogoutComponent;
}());
LogoutComponent = __decorate([
    core_1.Component({
        template: '<h3></h3><a href="javascript:void(0)" routerLink="/login"></a>'
    }),
    __metadata("design:paramtypes", [LoginService_1.LoginService])
], LogoutComponent);
exports.LogoutComponent = LogoutComponent;
//# sourceMappingURL=LogoutComponent.js.map