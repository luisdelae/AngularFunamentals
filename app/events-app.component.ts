import { Component } from '@angular/core';
import { AuthService } from './user/auth.service';

@Component({
    selector: 'events-app',
    template: `
        <nav-bar></nav-bar>
        <router-outlet></router-outlet>`,
})

export class EventsAppComponent {
    constructor(private _auth: AuthService) { }

    public ngOnInit() {
        this._auth.checkAuthenticationStatus();
    }
}
