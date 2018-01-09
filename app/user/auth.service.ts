import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { IUser } from './user.model';

@Injectable()
export class AuthService {
    public currentUser: IUser;

    constructor(private _http: Http) {}

    public loginUser(userName: string, password: string) {
        const headers = new Headers ({ 'Content-Type' : 'application/json' });
        const options = new RequestOptions({ headers });
        const loginInfo = { username: userName, password } ;

        const response = this._http.post('/api/login', JSON.stringify(loginInfo), options).do((response) => {
            if(response) {
                this.currentUser = response.json().user as IUser;                
            }
        }).catch((error) => {
            return Observable.of(false);
        });

        return response;
    }

    public isAuthenticated() {
        return !!this.currentUser;
    }

    public checkAuthenticationStatus() {
        return this._http.get('/api/currentIdentity').map((response: any) => {
            if(response._body) {
                return response.json();
            } else {
                return {};
            }
        }).do((currentUser) => {
            if (!!currentUser.userName) {
                this.currentUser = currentUser;
            }
        }).subscribe();
    }

    public updateCurrentUser(firstName: string, lastName: string) {
        this.currentUser.firstName = firstName;
        this.currentUser.lastName = lastName;

        const headers = new Headers ({ 'Content-Type' : 'application/json' });
        const options = new RequestOptions({ headers });

        return this._http.put(`/api/users/${this.currentUser.id}`, JSON.stringify(this.currentUser), options);
    }

    public logout() {
        this.currentUser = undefined;

        const headers = new Headers ({ 'Content-Type' : 'application/json' });
        const options = new RequestOptions({ headers });

        return this._http.post('/api/logout', { }, options);
    }
}
