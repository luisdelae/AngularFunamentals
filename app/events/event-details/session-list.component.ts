import { Component, Input, OnChanges } from '@angular/core';
import { AuthService } from '../../user/auth.service';
import { ISession } from '../shared/index';
import { VoterService } from './voter.service';

@Component({
    selector: 'session-list',
    templateUrl: 'app/events/event-details/session-list.component.html',
})
export class SessionListComponent implements OnChanges {
    @Input() public sessions: ISession[];
    @Input() public filterBy: string;
    @Input() public sortBy: string;
    @Input() public eventId: number;
    public visibleSessions: ISession[] = [];

    constructor(private _auth: AuthService, private _voterService: VoterService) {}

    public ngOnChanges() {
        if(this.sessions) {
            this.filterSessions(this.filterBy);
            this.sortBy === 'name' ? this.visibleSessions.sort(sortByNameAsc) 
            : this.visibleSessions.sort(sortByVotesDesc);
        }
    }

    public toggleVote(session: ISession) {
        if (this.userHasVoted(session)) {
            this._voterService.deleteVoter(this.eventId, session, this._auth.currentUser.userName);
        } else {
            this._voterService.addVoter(this.eventId, session, this._auth.currentUser.userName);
        }

        if (this.sortBy === 'votes') {
            this.visibleSessions.sort(sortByVotesDesc);
        }
    }

    public userHasVoted(session: ISession) {
        return this._voterService.userHasVoted(session, this._auth.currentUser.userName);
    }

    public filterSessions(filter) {
        if(filter === 'all') {
            this.visibleSessions = this.sessions.slice(0);
        } else {
            this.visibleSessions = this.sessions.filter((s) => s.level.toLocaleLowerCase() === filter);
        }
    }
}

function sortByNameAsc(s1: ISession, s2: ISession) {
    if(s1.name > s2.name) {
        return 1;
    } else if (s1.name === s2.name) {
        return 0;
    } else {
        return -1;
    }
}

function sortByVotesDesc(s1: ISession, s2: ISession) {
    return s2.voters.length - s1.voters.length;
}
