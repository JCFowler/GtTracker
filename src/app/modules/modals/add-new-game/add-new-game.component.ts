import { Component, OnInit } from '@angular/core';
import { ModalDialogParams } from 'nativescript-angular';
import { Game, Stat, allStats } from '~/app/logic/models';

@Component({
  selector: 'ns-add-new-game',
  templateUrl: './add-new-game.component.html',
  styleUrls: ['./add-new-game.component.scss']
})
export class AddNewGameComponent implements OnInit {

  constructor(private mParams: ModalDialogParams) { }

  public selectedType = -1;
  public name = '';
  public editGame: Game = undefined;
  public title = 'Add';
  public buttonText = 'Add';
  public allStats: Stat[] = allStats;

  ngOnInit() {
    if (this.mParams.context.game) {
      this.editGame = this.mParams.context.game;
      this.title = 'Edit';
      this.buttonText = 'Edit game';
      this.name = this.editGame.name;
      this.selectedType = this.editGame.type;
    }

    // this.allStats = [];
    // this.allStats.push(...allStats)
  }

  typeTap(type) {
    this.selectedType = type;
  }

  onTextChange(args) {
    this.name = args.value;
  }

  finishTap(sendData = true) {
    if (!sendData) {
      this.mParams.closeCallback();
    }

    const game: Game = {
      name: this.name,
      type: this.selectedType,
      stats: this.allStats
    };

    this.mParams.closeCallback(game);
  }
}
