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
var DashboardComponent = (function () {
    function DashboardComponent(logserv) {
        this.logserv = logserv;
        this.currentuser = "";
        this.agreed = false;
        this.errormessage = "";
        this.myviews = "";
    }
    DashboardComponent.prototype.IsChecked = function () {
        return this.agreed;
    };
    DashboardComponent.prototype.ngOnInit = function () {
        console.log("getting user");
        this.currentuser = localStorage.getItem("logged");
        this.myviews = localStorage.getItem("visits");
        //We are writing an ajax call so that the data can be retrieved every time the
        //page(component) is refreshed
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                var parsed_data = JSON.parse(this.responseText); // parsing is necessary to access the ajax response
                console.log(parsed_data);
                $('#details ul li').each(function (index) {
                    console.log(index);
                    if (index == 0)
                        $(this).text(parsed_data.id);
                    if (index == 1)
                        $(this).text(parsed_data.body);
                    if (index == 2)
                        $(this).text(parsed_data.title);
                });
            }
        };
        xhttp.open('GET', 'http://localhost:8080/getDetails/' + this.currentuser, true);
        xhttp.send();
    };
    return DashboardComponent;
}());
DashboardComponent = __decorate([
    core_1.Component({
        templateUrl: 'app/templates/dashboard.html'
    }),
    __metadata("design:paramtypes", [LoginService_1.LoginService])
], DashboardComponent);
exports.DashboardComponent = DashboardComponent;
//# sourceMappingURL=DashboardComponent.js.map