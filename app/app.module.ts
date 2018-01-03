import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import {
    EventsListComponent,
    EventThumbnailComponent,
    EventService,
    EventDetailsComponent,
    CreateEventComponent,
    EventRouteActivator,
    EventListResolver,
    CreateSessionComponent
} from './events/index'

import { EventsAppComponent} from './events-app.component';
import { NavBarComponent } from './nav/navbar.component';
import { ToastrService } from './common/toastr.service';
import { appRoutes } from './routes';
import { Error404Component } from './errors/404.components';
import { AuthService } from './user/auth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forRoot(appRoutes)    
    ],
    declarations: [
        EventsAppComponent,
        EventsListComponent,
        EventThumbnailComponent,
        EventDetailsComponent,
        CreateEventComponent,
        Error404Component,        
        NavBarComponent,
        CreateSessionComponent
    ],
    providers: [
        EventService, 
        ToastrService, 
        EventRouteActivator,
        {
            provide: 'canDeactivateCreateEvent',
            useValue: checkDirtyState
        },
        EventListResolver,
        AuthService
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
