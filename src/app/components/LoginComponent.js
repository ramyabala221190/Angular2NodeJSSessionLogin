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
var router_1 = require("@angular/router");
var User = (function () {
    function User() {
    }
    return User;
}());
exports.User = User;
var LoginComponent = (function () {
    function LoginComponent(serv, router) {
        this.serv = serv;
        this.router = router;
        this.username = "";
        this.password = "";
        this.result = false;
        this.message = "";
    }
    LoginComponent.prototype.ngOninit = function () {
    };
    LoginComponent.prototype.login = function (form) {
        var _this = this;
        var check = false;
        var filestatus = "";
        var message = "";
        this.serv.login(form.form.controls.username._value, form.form.controls.password._value)
            .subscribe(function (data) {
            check = data.result;
            filestatus = data.filestatus;
            message = data.message;
        }, function (err) {
            console.log(err);
        }, function () {
            if (check) {
                console.log("Entered check loop");
                _this.serv.setUser(form.form.controls.username._value);
                _this.serv.setVisits(message);
                if (filestatus !== "" && filestatus !== undefined && filestatus !== null) {
                    _this.serv.setImage(filestatus);
                }
                _this.router.navigate(['/dashboard']);
            }
            else {
                _this.message = "Invalid username or password";
            }
        });
    };
    return LoginComponent;
}());
LoginComponent = __decorate([
    core_1.Component({
        templateUrl: 'app/templates/login.html'
    }),
    __metadata("design:paramtypes", [LoginService_1.LoginService, router_1.Router])
], LoginComponent);
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=LoginComponent.js.map