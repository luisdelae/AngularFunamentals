import { Component } from '@angular/core';
import { EventService } from './shared/events.service';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { ToastrService } from '../common/toastr.service';

@Component({
    selector: 'events-list',
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
    events: any[];

    constructor(private _eventService: EventService, private _toastr: ToastrService) {
    }

    ngOnInit() {
        this.events = this._eventService.getEvents();        
    }

    handleThumbnailClick(eventName) {
        this._toastr.success(eventName)
    }
}