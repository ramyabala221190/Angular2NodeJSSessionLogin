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
var LoginService_1 = require("./LoginService");
require("rxjs/add/operator/map");
var ActivateService = (function () {
    //you cannot call component's method here. You can only call the method of a service.  
    function ActivateService(router, loginserv) {
        this.router = router;
        this.loginserv = loginserv;
    }
    ActivateService.prototype.canActivate = function (next, state) {
        return this.loginserv.IfLoggedIn();
    };
    return ActivateService;
}());
ActivateService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [router_1.Router, LoginService_1.LoginService])
], ActivateService);
exports.ActivateService = ActivateService;
//# sourceMappingURL=ActivateService.js.map