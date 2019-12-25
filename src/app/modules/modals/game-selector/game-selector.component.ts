import { Component, OnInit } from '@angular/core';
import { ModalDialogParams } from 'nativescript-angular/directives/dialogs';

@Component({
  selector: 'ns-game-selector',
  templateUrl: './game-selector.component.html',
  styleUrls: ['./game-selector.component.scss']
})
export class GameSelectorComponent implements OnInit {

  constructor(private mParams: ModalDialogParams) { }

  public selectedIndex: number = -1;

  public gameTypes = [
    'FPS', 'Fighting', 'MOBA', 'RTS'
  ];

  ngOnInit() {
  }

  closeModal() {
    this.mParams.closeCallback(this.gameTypes[this.selectedIndex]);
  }

  onItemTap(args) {
    this.selectedIndex = args.index;
  }
}
