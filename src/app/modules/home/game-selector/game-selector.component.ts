import { Component, OnInit } from '@angular/core';
import { RouterHelper } from '~/app/logic/helpers';
import { Session, Totals, Game } from '~/app/logic/models';
import { TimerService } from '~/app/logic/services';
import { Select } from '@ngxs/store';
import { AppState } from '~/app/logic/states';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { Emitter, Emittable } from '@ngxs-labs/emitter';
import { GameType } from '~/app/logic/enums';

@Component({
  selector: 'ns-game-selector',
  templateUrl: './game-selector.component.html',
  styleUrls: ['./game-selector.component.scss']
})
export class GameSelectorComponent implements OnInit {

  @Select(AppState.getSessionHistory) history$: Observable<Session[]>;
  @Select(AppState.getGames) games$: Observable<Game[]>;

  @Emitter(AppState.createInitialGames)
  public createInitialGames: Emittable<null>;

  @Emitter(AppState.setCurrentSession)
  public setCurrentSession: Emittable<Session>;

  constructor(private timerService: TimerService, private routerHelper: RouterHelper) { }

  public selectedIndex: number = -1;

  public selectedType = -1;
  public selectedGame: Game = undefined;
  public gameType = GameType;

  ngOnInit() {
    this.games$.pipe(first()).subscribe(games => {
      if (games.length === 0) {
        this.createInitialGames.emit(null);
      }
    });
  }

  typeTap(type) {
    this.selectedType = type;
  }

  finishTap() {
    this.timerService.startTimer(new Date());
    this.history$.pipe(first()).subscribe(h => {
      const session: Session = {
          sessionId: h.length + 1,
          game: this.selectedGame,
          totals: new Totals(),
          startTime: new Date(),
          rounds: []
      };

      this.setCurrentSession.emit(session);
      this.routerHelper.backToPreviousPage();
    });
  }

  onGameTap(args) {
    this.selectedIndex = args.index;
    this.games$.pipe(first()).subscribe(games => {
      this.selectedGame = games[args.index];
    });
  }
}
