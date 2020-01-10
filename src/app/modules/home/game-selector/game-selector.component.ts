import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { RouterHelper, ModalHelper } from '~/app/logic/helpers';
import { Session, Totals, Game } from '~/app/logic/models';
import { TimerService } from '~/app/logic/services';
import { Select } from '@ngxs/store';
import { AppState } from '~/app/logic/states';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { Emitter, Emittable } from '@ngxs-labs/emitter';
import { GameType } from '~/app/logic/enums';
import { DialogHelper } from '~/app/logic/helpers/dialog.helper';
import { AddNewGameComponent } from '../../modals/add-new-game/add-new-game.component';

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

  @Emitter(AppState.editGame)
  public editGame: Emittable<{index: number, game: Game}>;

  @Emitter(AppState.deleteGame)
  public deleteGame: Emittable<number>;

  constructor(private timerService: TimerService, private routerHelper: RouterHelper,
    private dialogHelper: DialogHelper, private modalHelper: ModalHelper, private vcRef: ViewContainerRef) { }

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

  deleteTap() {
    this.dialogHelper.confirmAlert('This will also delete all history with this game.', `Delete ${this.selectedGame.name}?`).then(ans => {
      if (ans) {
        this.deleteGame.emit(this.selectedIndex);
      }
    });
  }

  editTap() {
    this.modalHelper.openModal(AddNewGameComponent, this.vcRef, false, { game: this.selectedGame}).then((res: Game) => {
      if (!res) {
        return;
      }

      this.selectedGame = res;

      this.editGame.emit({ index: this.selectedIndex, game: res });

    });
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
