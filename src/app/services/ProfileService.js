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
var http_1 = require("@angular/http");
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
var Rx_1 = require("rxjs/Rx");
var router_1 = require("@angular/router");
var ProfileService = (function () {
    function ProfileService(http, router) {
        this.http = http;
        this.router = router;
        this.url = "https://jsonplaceholder.typicode.com/";
    }
    ProfileService.prototype.errorHandler = function (error) {
        console.log(error);
        return Rx_1.Observable.throw(new Error(error));
    };
    ProfileService.prototype.getPosts = function () {
        return this.http.get('http://localhost:8080/Getposts').
            map(function (res) { return res.json(); })
            .catch(this.errorHandler);
    };
    ProfileService.prototype.likePost = function (post_id) {
        return this.http.get('http://localhost:8080/likePost?post_id=' + post_id).
            map(function (res) { return res.json(); }).catch(this.errorHandler);
    };
    ProfileService.prototype.unlikePost = function (post_id) {
        return this.http.get('http://localhost:8080/unlikePost?post_id=' + post_id).
            map(function (res) { return res.json(); }).catch(this.errorHandler);
    };
    return ProfileService;
}());
ProfileService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http, router_1.Router])
], ProfileService);
exports.ProfileService = ProfileService;
//# sourceMappingURL=ProfileService.js.map