import { Component } from '@angular/core';
import { EventService } from './shared/events.service';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { ActivatedRoute } from '@angular/router';
import { IEvent } from './index';

@Component({
    template: `
    <div>
        <h1>Upcoming Angular Events</h1>
        <hr>
        <div class="row">
            <div class="col-md-5" *ngFor="let event of events">
                <event-thumbnail #thumbnail (click)="handleThumbnailClick(event.name)" [event]="event"></event-thumbnail>
            </div>
        </div>
    </div>
    ` 
})

export class EventsListComponent implements OnInit{
    events: IEvent[];

    constructor(private _eventService: EventService, private _route: ActivatedRoute) {
    }

    ngOnInit() {
        this.events = this._route.snapshot.data['events'];
    }
}