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

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})

export class HomeComponent implements OnInit {
    @Select(AppState.getCurrentSession) currentSession$: Observable<Session>;
    @Select(AppState.getCurrentTotals) currentTotals$: Observable<Totals>;
    @Select(AppState.getSessionHistory) history$: Observable<Session[]>;

    @Emitter(AppState.setCurrentSession)
    public setCurrentSession: Emittable<Session>;

    @Emitter(AppState.updateCurrentSessionGame)
    public updateCurrentSessionGame: Emittable<Game>;

    @Emitter(AppState.addSessionToHistory)
    public addSessionToHistory: Emittable<null>;

    public gameResult = GameResult;

    constructor(private timerService: TimerService) { }

    ngOnInit() {
        this.currentSession$.pipe(first()).subscribe(session => {
            if (session) {
                this.timerService.startTimer(new Date(session.startTime));
                console.log('yay', new Date(session.startTime))
            } else {
                console.log('no')
            }
        });
    }

    startSessionTap() {
        console.log('Start Session');
        this.timerService.startTimer(new Date());
        this.history$.pipe(first()).subscribe(h => {
            const session: Session = {
                sessionId: h.length - 1,
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

    getKD(k: number, d: number): string {
        if (k === 0) {
            return '0.00';
        } else if (d === 0) {
            return `${k}.00`;
        }

        return (k / d).toFixed(2);

    }

}
