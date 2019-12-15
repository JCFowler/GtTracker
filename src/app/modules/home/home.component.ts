import { Component, OnInit } from '@angular/core';
import { TimerService } from '../../logic/services';
import { Select } from '@ngxs/store';
import { AppState } from '~/app/logic/states';
import { Observable } from 'rxjs';
import { Session } from '~/app/logic/models/session.model';
import { Emitter, Emittable } from '@ngxs-labs/emitter';
import { first } from 'rxjs/operators';
import { Game, Totals } from '~/app/logic/models';
import { GameResult } from '~/app/logic/enums';
import * as dialogs from 'tns-core-modules/ui/dialogs';
import { GlobalHelper } from '~/app/logic/helpers';

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
    public updateCurrentSessionGame: Emittable<Game>;

    @Emitter(AppState.addSessionToHistory)
    public addSessionToHistory: Emittable<null>;

    public gameResult = GameResult;
    public getRatio = GlobalHelper.getRatio;

    constructor(private timerService: TimerService) { }

    ngOnInit() {
        this.currentSession$.pipe(first()).subscribe(session => {
            if (session) {
                this.timerService.startTimer(new Date(session.startTime));
            }
        });
    }

    startSessionTap() {
        console.log('Start Session');
        this.timerService.startTimer(new Date());
        this.history$.pipe(first()).subscribe(h => {
            const session: Session = {
                sessionId: h.length + 1,
                totals: new Totals(),
                startTime: new Date(),
                games: []
           };

           this.setCurrentSession.emit(session);
        });

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
        dialogs.prompt({
            title: 'Kills',
            message: 'How many kills?',
            okButtonText: 'Ok',
            inputType: dialogs.inputType.number,
        }).then(kills => {
            dialogs.prompt({
                title: 'Deaths',
                message: 'How many deaths?',
                okButtonText: 'Ok',
                inputType: dialogs.inputType.number,
            }).then(deaths => {
                const game: Game = {
                    result: result,
                    time: new Date(),
                    kills: +kills.text,
                    deaths: +deaths.text
                };

                this.updateCurrentSessionGame.emit(game);
            });
        });
    }
}
