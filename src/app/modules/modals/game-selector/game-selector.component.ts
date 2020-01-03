import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ModalDialogParams } from 'nativescript-angular/directives/dialogs';

@Component({
  selector: 'ns-game-selector',
  templateUrl: './game-selector.component.html',
  styleUrls: ['./game-selector.component.scss']
})
export class GameSelectorComponent implements OnInit {

  constructor(private mParams: ModalDialogParams) { }

  public selectedIndex: number = -1;
  private textField;

  public gameTypes = [
    'FPS', 'Fighting', 'MOBA', 'RTS'
  ];

  public gameNames = [
    'Modern Warfare', 'Street Fighter 5', 'League of Legends', 'Apex', 'Halo 5'
  ];

  public selectedType = -1;

  ngOnInit() {
  }

  loadTextField(textField) {
    this.textField = textField;
  }

  plusTap() {
    this.textField.dismissSoftInput();

    if (!this.textField.text) {
      return;
    }

    this.gameNames.unshift(this.textField.text)
    this.textField.text = '';
    console.log('hello', this.textField.text)
  }

  typeTap(type) {
    this.selectedType = type;
  }

  closeModal() {
    this.mParams.closeCallback(this.gameTypes[this.selectedIndex]);
  }

  onItemTap(args) {
    this.selectedIndex = args.index;
  }
}
