import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Params } from '@angular/router/src/shared';
import { IEvent, ISession } from '../index';
import { EventService } from '../shared/events.service';

@Component({
    templateUrl: 'app/events/event-details/event-details.component.html',
    styles: [`
        .container { padding-left: 20px; padding-right: 20px; }
        .event-image { height: 100px; }
        a { cursor: pointer }
    `],
})

export class EventDetailsComponent {
    public event: IEvent;
    public addMode: boolean;
    public filterBy: string = 'all';
    public sortBy: string = 'votes';

    constructor(private _eventService: EventService, private _route: ActivatedRoute) {

    }

    public ngOnInit() {
        this._route.data.forEach((data) => {
            this.event = data.event;
            this.addMode = false;
        });
    }

    public addSession() {
        this.addMode = true;
    }

    public saveNewSession(session: ISession) {
        const nextId = Math.max.apply(null, this.event.sessions.map((s) => s.id));
        session.id = nextId + 1;
        this.event.sessions.push(session);
        this._eventService.saveEvent(this.event).subscribe();
        this.addMode = false;
    }

    public cancelAddSession() {
        this.addMode = false;
    }
}
