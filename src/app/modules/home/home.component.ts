import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { TimerService } from '../../logic/services';
import { Select } from '@ngxs/store';
import { AppState } from '~/app/logic/states';
import { Observable } from 'rxjs';
import { Session } from '~/app/logic/models/session.model';
import { Emitter, Emittable } from '@ngxs-labs/emitter';
import { first } from 'rxjs/operators';
import { Round, Stat } from '~/app/logic/models';
import { GameResult } from '~/app/logic/enums';
import * as dialogs from 'tns-core-modules/ui/dialogs';
import { GlobalHelper, ModalHelper, RouterHelper } from '~/app/logic/helpers';
import { ResultsComponent } from '../modals/results/results.component';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})

export class HomeComponent implements OnInit {
    @Select(AppState.getCurrentSession) currentSession$: Observable<Session>;
    @Select(AppState.getSessionHistory) history$: Observable<Session[]>;

    @Emitter(AppState.setCurrentSession)
    public setCurrentSession: Emittable<Session>;

    @Emitter(AppState.updateCurrentSessionGame)
    public updateCurrentSessionGame: Emittable<Round>;

    @Emitter(AppState.addSessionToHistory)
    public addSessionToHistory: Emittable<null>;

    public gameResult = GameResult;
    public getRatio = GlobalHelper.getRatio;

    public kills = 0;
    public deaths = 0;

    constructor(private timerService: TimerService, private modalHelper: ModalHelper,
        private vcRef: ViewContainerRef, private routerHelper: RouterHelper) { }

    ngOnInit() {
        this.currentSession$.pipe(first()).subscribe(session => {
            if (session) {
                this.timerService.startTimer(new Date(session.startTime));

                for (let i = 0; i < session.rounds.length; i++) {
                    // this.kills += session.rounds[i].kills;
                    // this.deaths += session.rounds[i].deaths;
                }
            }
        });
        console.log(this.gameResult[0] + '-result');
    }

    startSessionTap() {
        this.kills = 0;
        this.deaths = 0;

        this.routerHelper.navigate(['/home/game-selector']);
    }

    endSessionTap() {
        const that = this;
        dialogs.confirm({
            title: 'Are you sure you want to end the session?',
            okButtonText: 'End Session',
            cancelButtonText: 'Cancel',
        }).then(function (result) {
            if (result) {
                that.timerService.stopTimer();
                that.addSessionToHistory.emit(null);
            }
        });
    }

    gameFinished(result: GameResult) {
        this.modalHelper.openModal(ResultsComponent, this.vcRef, false,
            { result: GameResult[result] }).then((res: Stat[]) => {
            if (res) {
                const game: Round = {
                    result: result,
                    time: new Date(),
                    stats: res
                };

                // this.kills += game.kills;
                // this.deaths += game.deaths;

                this.updateCurrentSessionGame.emit(game);
            }
        });
    }
}
