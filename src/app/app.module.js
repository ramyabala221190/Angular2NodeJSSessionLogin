"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
//modules imported needs to be imported here to add it in the imports array at the bottom
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms");
var router_1 = require("@angular/router");
var http_1 = require("@angular/http");
var forms_2 = require("@angular/forms");
var IndexComponent_1 = require("./components/IndexComponent");
var LoginComponent_1 = require("./components/LoginComponent");
var DashboardComponent_1 = require("./components/DashboardComponent");
var ProfileComponent_1 = require("./components/ProfileComponent");
var ErrorPage_1 = require("./components/ErrorPage");
var SomethingWrong_1 = require("./components/SomethingWrong");
var LogoutComponent_1 = require("./components/LogoutComponent");
var LoginService_1 = require("./services/LoginService");
var ActivateService_1 = require("./services/ActivateService");
var DeactivateService_1 = require("./services/DeactivateService");
var ProfileService_1 = require("./services/ProfileService");
var ReactiveComponent_1 = require("./components/ReactiveComponent");
var routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login',
        component: LoginComponent_1.LoginComponent },
    { path: 'dashboard', component: DashboardComponent_1.DashboardComponent,
        canActivate: [ActivateService_1.ActivateService],
        canDeactivate: [DeactivateService_1.DeactivateService],
        children: [
            { path: 'myprofile', component: ProfileComponent_1.Profile }
        ] },
    { path: 'reactive', component: ReactiveComponent_1.ReactiveComponent },
    { path: 'logout', component: LogoutComponent_1.LogoutComponent },
    /**The above canActivate ensures that each time the Dashboard path is activated, there
     * is a check if a user is logged in or not before activating this route.
     *
     * canDeativate ensures that each time we leave the dashboard route, the checkbox is
     * selected,else it doesnt allow to leave the route.
     */
    { path: '404', component: SomethingWrong_1.SomethingWrong },
    { path: '**', component: ErrorPage_1.ErrorPage }
];
//Defines the metadata for the AppModule which is the root module of the app.
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [platform_browser_1.BrowserModule, forms_1.FormsModule, http_1.HttpModule, router_1.RouterModule.forRoot(routes), forms_2.ReactiveFormsModule],
        declarations: [IndexComponent_1.IndexComponent, LoginComponent_1.LoginComponent, DashboardComponent_1.DashboardComponent, ProfileComponent_1.Profile, ReactiveComponent_1.ReactiveComponent, ErrorPage_1.ErrorPage, LogoutComponent_1.LogoutComponent, SomethingWrong_1.SomethingWrong],
        bootstrap: [IndexComponent_1.IndexComponent],
        providers: [LoginService_1.LoginService, ActivateService_1.ActivateService, DeactivateService_1.DeactivateService, ProfileService_1.ProfileService]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map