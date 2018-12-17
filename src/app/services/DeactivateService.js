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
var DeactivateService = (function () {
    function DeactivateService(router, logserv) {
        this.router = router;
        this.logserv = logserv;
    }
    DeactivateService.prototype.canDeactivate = function (comp, next, state) {
        var newstatus = false;
        if (comp.IsChecked()) {
            console.log("it is checked");
            newstatus = true; //dashboard route can be deactivated
        }
        else {
            //comp.errormessage="Please select before leaving the page";
            alert("Please agree to the conditions before leaving the page");
            newstatus = false;
        }
        return newstatus;
    };
    return DeactivateService;
}());
DeactivateService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [router_1.Router, LoginService_1.LoginService])
], DeactivateService);
exports.DeactivateService = DeactivateService;
//# sourceMappingURL=DeactivateService.js.map