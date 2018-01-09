import { EventEmitter, Injectable } from '@angular/core';
import { Headers, Http, RequestOptions, Response } from '@angular/http';
import { Observable, Subject } from 'rxjs/RX';
import { IEvent, ISession } from '../index';

@Injectable()
export class EventService {

  constructor(private _http: Http) {

  }

    public getEvents(): Observable<IEvent[]> {
      const subject = new Subject<IEvent[]>();

      return this._http.get('/api/events').map((response: Response) => {
        return response.json() as IEvent[];
      }).catch(this._handleError);
    }

    public getEvent(id: number): Observable<IEvent> {
      return this._http.get('/api/events/' + id).map((response: Response) => {
        return response.json() as IEvent;
      }).catch(this._handleError);
    }

    public saveEvent(event): Observable<IEvent> {
      const headers = new Headers({ 'Content-Type' : 'application/json' });
      const options = new RequestOptions({ headers });

      return this._http.post('/api/events', event, options).map((response: Response) => {
        return response.json();
      }).catch(this._handleError);
    }

    // The API is set up to be smart enough to know that if there is an ID, it will update the existing event,
    // so there is not need for and update method.
    // updateEvent(event) {
    //   let index = EVENTS.findIndex(x => x.id = event.id);
    //   EVENTS[index] = event;
    // }

    public searchSessions(searchTerm: string) {
      return this._http.get('/api/sessions/search?search=' + searchTerm).map((response: Response) => {
        return response.json();
      }).catch(this._handleError);
    }

    private _handleError(error: Response) {
      return Observable.throw(error.statusText);
    }
}
