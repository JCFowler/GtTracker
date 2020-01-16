import { Component, OnInit } from '@angular/core';
import { ModalDialogParams } from 'nativescript-angular';
import { Game, Stat, allStats, getStats } from '~/app/logic/models';

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
  public buttonText = 'Add';
  public stats: Stat[] = [];

  ngOnInit() {
    if (this.mParams.context.game) {
      this.editGame = this.mParams.context.game;
      this.buttonText = 'Edit game';
      this.name = this.editGame.name;
      this.selectedType = this.editGame.type;
      this.stats = JSON.parse(JSON.stringify(this.editGame.stats));
    }
  }

  typeTap(type) {
    this.selectedType = type;
    this.stats = getStats(type);
  }

  onTextChange(args) {
    this.name = args.value;
  }

  onCheckChanged(checked: boolean, index: number) {
    this.stats[index].selected = checked;
  }

  finishTap(sendData = true) {
    if (!sendData) {
      this.mParams.closeCallback();
    }

    const game: Game = {
      name: this.name,
      type: this.selectedType,
      stats: this.stats
    };

    this.mParams.closeCallback(game);
  }
}
