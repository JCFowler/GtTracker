import { Component, OnInit, ViewContainerRef } from '@angular/core';
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
import { GlobalHelper, ModalHelper } from '~/app/logic/helpers';
import { ResultsComponent } from '../modals/results/results.component';
import { GameSelectorComponent } from '../modals/game-selector/game-selector.component';

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

    public kills = 0;
    public deaths = 0;

    constructor(private timerService: TimerService, private modalHelper: ModalHelper,
        private vcRef: ViewContainerRef) { }

    ngOnInit() {
        this.currentSession$.pipe(first()).subscribe(session => {
            if (session) {
                this.timerService.startTimer(new Date(session.startTime));

                for (let i = 0; i < session.games.length; i++) {
                    this.kills += session.games[i].kills;
                    this.deaths += session.games[i].deaths;
                }
            }
        });
        console.log(this.gameResult[0] + '-result');
    }

    startSessionTap() {
        this.kills = 0;
        this.deaths = 0;

        this.modalHelper.openModal(GameSelectorComponent, this.vcRef, true).then((res: string) => {
            if (!res) {
                return;
            }

            this.timerService.startTimer(new Date());
            this.history$.pipe(first()).subscribe(h => {
                const session: Session = {
                    sessionId: h.length + 1,
                    gameType: res,
                    totals: new Totals(),
                    startTime: new Date(),
                    games: []
               };

               this.setCurrentSession.emit(session);
            });
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
        this.modalHelper.openModal(ResultsComponent, this.vcRef, false,
            { result: GameResult[result] }).then((res: string[]) => {
            if (res) {
                const game: Game = {
                    result: result,
                    time: new Date(),
                    kills: +res[0],
                    deaths: +res[1]
                };

                this.kills += game.kills;
                this.deaths += game.deaths;

                this.updateCurrentSessionGame.emit(game);
            }
        });
    }
}
