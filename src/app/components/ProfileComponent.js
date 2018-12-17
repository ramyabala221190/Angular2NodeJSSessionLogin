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
var ProfileService_1 = require("../services/ProfileService");
var router_1 = require("@angular/router");
var Post = (function () {
    function Post() {
    }
    return Post;
}());
exports.Post = Post;
var Profile = (function () {
    /**Data between the Dashboard and this child component can be shared
     * only through a common service because the child component is inserted
     * into the parent component via router-outlet and not via selector.
     */
    function Profile(prof, router) {
        this.prof = prof;
        this.router = router;
        this.myposts = [];
    }
    Profile.prototype.getPosts = function () {
        var _this = this;
        var mypost = [];
        var timedout = "";
        this.prof.getPosts().subscribe(function (posts) {
            if (posts.result) {
                timedout = posts.result;
            }
            else {
                console.log(posts);
                mypost.push(posts);
            }
        }, function (err) {
            console.log(err);
            if (err.status == 404) {
                _this.router.navigate(['/404']);
            }
        }, function () {
            if (timedout !== "") {
                console.log("session timed out");
                _this.removeSession();
            }
            else {
                _this.myposts = mypost;
                console.log(_this.myposts);
                console.log("posts retrieved");
            }
        });
    };
    Profile.prototype.like = function (post_id) {
        var _this = this;
        var posting = [];
        var timedout = "";
        this.prof.likePost(post_id).subscribe(function (data) {
            if (data.result) {
                timedout = data.result;
            }
            else {
                console.log(data);
                posting.push(data);
            }
        }, function (err) {
            console.log(err);
        }, function () {
            if (timedout !== "") {
                console.log("session timed out");
                _this.removeSession();
            }
            else {
                console.log("Like post done");
                _this.myposts = posting;
                console.log(_this.myposts);
            }
        });
    };
    Profile.prototype.unlike = function (post_id) {
        var _this = this;
        var posting = [];
        var timedout = "";
        this.prof.unlikePost(post_id).subscribe(function (data) {
            if (data.result) {
                timedout = data.result;
            }
            else {
                console.log(data);
                posting.push(data);
            }
        }, function (err) {
            console.log(err);
        }, function () {
            if (timedout !== "") {
                _this.removeSession();
            }
            else {
                console.log("unlike post done");
                _this.myposts = posting;
                console.log(_this.myposts);
            }
        });
    };
    Profile.prototype.removeSession = function () {
        localStorage.removeItem("logged");
        this.router.navigate(['/login']);
    };
    Profile.prototype.ngOnInit = function () {
    };
    return Profile;
}());
Profile = __decorate([
    core_1.Component({
        templateUrl: 'app/templates/profile.html'
    }),
    __metadata("design:paramtypes", [ProfileService_1.ProfileService, router_1.Router])
], Profile);
exports.Profile = Profile;
//# sourceMappingURL=ProfileComponent.js.map