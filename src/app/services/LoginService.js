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
var router_1 = require("@angular/router");
var http_1 = require("@angular/http");
require("rxjs/add/operator/map");
var LoginService = (function () {
    function LoginService(router, http) {
        this.router = router;
        this.http = http;
        this.url = "http://localhost:8080/";
    }
    LoginService.prototype.setUser = function (name) {
        localStorage.setItem("logged", name);
        //localStorage ensures that the above key-value pair is stored even after browser
        //refreshes and across tabs
        //You can also use sessionStorage instead of localStorage if you want the data to be 
        //maintained only until the browser window closes.
    };
    LoginService.prototype.setVisits = function (times) {
        localStorage.setItem("visits", times);
    };
    LoginService.prototype.getVisits = function () {
        return localStorage.getItem("visits");
    };
    LoginService.prototype.getUser = function () {
        return localStorage.getItem('logged');
    };
    LoginService.prototype.login = function (user, pass) {
        var data = [{
                username: user,
                password: pass
            }];
        console.log(data);
        return this.http.post(this.url + 'login', data)
            .map(function (res) { return res.json(); });
    };
    LoginService.prototype.logout = function () {
        console.log("logging out");
        return this.http.get(this.url + 'logout')
            .map((function (success) { return success.status; }));
    };
    LoginService.prototype.IfLoggedIn = function () {
        var _this = this;
        var status;
        console.log("checking if logged in");
        return this.http.get(this.url + 'IfLogged').map(function (res) {
            console.log(res.json());
            if (res.json().result == false) {
                localStorage.removeItem("logged"); //removing from localstorage
                _this.router.navigate(['/login']); //navigate to login page
            }
            return res.json().result;
        });
    };
    return LoginService;
}());
LoginService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [router_1.Router, http_1.Http])
], LoginService);
exports.LoginService = LoginService;
//# sourceMappingURL=LoginService.js.map