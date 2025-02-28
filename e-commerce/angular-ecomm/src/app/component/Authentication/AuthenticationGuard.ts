import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from "@angular/router";

@Injectable({
    providedIn: "root",
})
export class AuthenticationGuard implements CanActivate {
    constructor(private router: Router) {}

    canActivate(): boolean {
        const token = localStorage.getItem("token");
        if(!token) {
            this.router.navigate(["/login"])
            return false;
        }
        return true;
    }
}