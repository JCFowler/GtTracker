import { Component, OnInit } from '@angular/core';
import { ModalDialogParams } from 'nativescript-angular';
import { Game, Stat, getStats } from '~/app/logic/models';
import { ListViewEventData } from 'nativescript-ui-listview';
import { DialogHelper } from '~/app/logic/helpers/dialog.helper';

@Component({
  selector: 'ns-add-new-game',
  templateUrl: './add-new-game.component.html',
  styleUrls: ['./add-new-game.component.scss']
})
export class AddNewGameComponent implements OnInit {

  constructor(private mParams: ModalDialogParams, private dialogHelper: DialogHelper) { }

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

  onQuestionTap() {
    this.dialogHelper.alert(
      `Top 3 will be visible during session.
Press and hold to be able to move the stats around.`,
      'About Stats');
  }

  onTextChange(args) {
    this.name = args.value;
  }

  onCheckChanged(checked: boolean, index: number) {
    this.stats[index].selected = checked;
  }

  public onItemReordered(args: ListViewEventData) {
    console.log('Item reordered. Old index: ' + args.index + ' new index: ' + args.data.targetIndex);
  }

  finishTap(sendData = true) {
    if (!sendData) {
      this.mParams.closeCallback();
    }

    for (let i = this.stats.length - 1; i > 0 ; i--) {
      if (!this.stats[i].selected) {
        this.stats.push(this.stats.splice(i, 1)[0]);
      }
    }

    const game: Game = {
      name: this.name,
      type: this.selectedType,
      stats: this.stats
    };

    this.mParams.closeCallback(game);
  }
}
