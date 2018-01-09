import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {
    EventsListComponent,
    EventThumbnailComponent,
    EventService,
    EventDetailsComponent,
    CreateEventComponent,
    EventResolver,
    EventListResolver,
    CreateSessionComponent,
    SessionListComponent,
    DurationPipe,
    UpvoteComponent,
    VoterService,
    LocationValidator
} from './events/index'

import { 
    TOASTR_TOKEN,
    IToastr,
    JQ_TOKEN,
    CollapsibleWellComponent,
    SimpleModalCompnent,
    ModalTriggerDirective
 } from './common/index'

import { EventsAppComponent} from './events-app.component';
import { NavBarComponent } from './nav/navbar.component';
import { appRoutes } from './routes';
import { Error404Component } from './errors/404.components';
import { AuthService } from './user/auth.service';

declare let toastr: IToastr;
declare let jQuery: Object;

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forRoot(appRoutes),
        HttpModule
    ],
    declarations: [
        EventsAppComponent,
        EventsListComponent,
        EventThumbnailComponent,
        EventDetailsComponent,
        CreateEventComponent,
        Error404Component,        
        NavBarComponent,
        CreateSessionComponent,
        SessionListComponent,
        CollapsibleWellComponent,
        DurationPipe,
        SimpleModalCompnent,
        ModalTriggerDirective,
        UpvoteComponent,
        LocationValidator
    ],
    providers: [
        EventService, 
        {
            provide: TOASTR_TOKEN,
            useValue: toastr
         }, 
         {
            provide: JQ_TOKEN,
            useValue: jQuery
         }, 
         EventResolver,
        {
            provide: 'canDeactivateCreateEvent',
            useValue: checkDirtyState
        },
        EventListResolver,
        AuthService,
        VoterService
    ],
    bootstrap: [EventsAppComponent]
})

export class AppModule{}

function checkDirtyState(component: CreateEventComponent) {
    if (component.isDirty) {
        return window.confirm('You have not saved this event. do you really want to cancel?');
    }
    return true;
}
