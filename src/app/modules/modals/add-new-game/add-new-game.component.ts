import { Component, OnInit } from '@angular/core';
import { ModalDialogParams } from 'nativescript-angular';
import { Game } from '~/app/logic/models';

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
  public title = 'Add new game';
  public buttonText = 'Add game';

  ngOnInit() {
    if (this.mParams.context.game) {
      this.editGame = this.mParams.context.game;
      this.title = 'Edit game';
      this.buttonText = 'Edit game';
      this.name = this.editGame.name;
      this.selectedType = this.editGame.type;
    }
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
      type: this.selectedType
    };

    this.mParams.closeCallback(game);
  }
}
