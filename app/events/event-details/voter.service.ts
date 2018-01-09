import { Injectable } from '@angular/core';
import { ISession } from '../shared/event.model';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import { Http, Response, Headers, RequestOptions } from '@angular/http';


@Injectable()
export class VoterService {

    constructor(private _http: Http) { }
          
    deleteVoter(eventId: number,session: ISession, voterName: string) {
        let url = `/api/events/${eventId}/sessions/${session.id}/voters/${voterName}`;
        
        session.voters = session.voters.filter(voter => voter !== voterName);

        this._http.delete(url).catch(this._handleError).subscribe();
    }

    addVoter(eventId: number, session: ISession, voterName: string) {
        session.voters.push(voterName);

        let headers = new Headers({ 'Content-Type' : 'application/json' });
        let options = new RequestOptions({ headers: headers });

        let url = `/api/events/${eventId}/sessions/${session.id}/voters/${voterName}`;
        this._http.post(url, JSON.stringify({}), options).catch(this._handleError).subscribe();
    }

    userHasVoted(session: ISession, voterName: string) {
        return session.voters.some(voter => voter === voterName);        
    }

    private _handleError(error: Response) {
        return Observable.throw(error.statusText);
    }
}