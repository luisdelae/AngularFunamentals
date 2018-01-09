import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
    templateUrl: 'app/user/login.component.html',
    styles: [ `
        em { float: right; color: #E05C65; padding-left: 10px;}
    `],
})
export class LoginComponent {
    public loginInvalid = false;

    constructor(private _authService: AuthService, private _router: Router) {

    }
    public login(formValues) {
        this._authService.loginUser(formValues.userName, formValues.password).subscribe((response) => {
            if(!response) {
                this.loginInvalid = true;
            } else {
                this._router.navigate(['events']);
            }
        });
    }

    public cancel() {
        this._router.navigate(['events']);  
    }
}
