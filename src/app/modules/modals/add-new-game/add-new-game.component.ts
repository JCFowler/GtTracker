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

  ngOnInit() {}

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
