import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions, Response } from '@angular/http';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';
import { ISession } from '../shared/event.model';

@Injectable()
export class VoterService {

    constructor(private _http: Http) { }
          
    public deleteVoter(eventId: number,session: ISession, voterName: string) {
        const url = `/api/events/${eventId}/sessions/${session.id}/voters/${voterName}`;
        
        session.voters = session.voters.filter((voter) => voter !== voterName);

        this._http.delete(url).catch(this._handleError).subscribe();
    }

    public addVoter(eventId: number, session: ISession, voterName: string) {
        session.voters.push(voterName);

        const headers = new Headers({ 'Content-Type' : 'application/json' });
        const options = new RequestOptions({ headers });

        const url = `/api/events/${eventId}/sessions/${session.id}/voters/${voterName}`;
        this._http.post(url, JSON.stringify({}), options).catch(this._handleError).subscribe();
    }

    public userHasVoted(session: ISession, voterName: string) {
        return session.voters.some((voter) => voter === voterName);        
    }

    private _handleError(error: Response) {
        return Observable.throw(error.statusText);
    }
}
