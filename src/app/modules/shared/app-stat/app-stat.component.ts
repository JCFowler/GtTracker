import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Stat } from '~/app/logic/models';
import { StatType } from '~/app/logic/enums';
import { TextField } from 'tns-core-modules/ui/text-field/text-field';
import { isIOS } from 'tns-core-modules/ui/page/page';
import { NumericKeyboard } from 'nativescript-numeric-keyboard';

@Component({
  selector: 'app-stat',
  templateUrl: './app-stat.component.html',
  styleUrls: ['./app-stat.component.scss']
})
export class AppStatComponent implements OnInit {

  @Input() stat: Stat;
  @Input() returnType: 'next' | 'done';

  @Output() return = new EventEmitter();
  @Output() textChange = new EventEmitter();

  public statType = StatType;
  public textField: TextField;

  constructor() { }

  ngOnInit() {}

  onTextChange(args) {
    this.textChange.emit(args.value);
  }

  returnPress() {
    if (isIOS) {
      setTimeout(() => {
        this.textField.focus();
      }, 100);
    }

    this.return.emit();
  }

  loadTextField(args: TextField) {
    this.textField = args;
    setTimeout(() => {
      args.focus();
    }, 100);

    if (isIOS && this.stat.type === StatType.Number) {
      new NumericKeyboard().decorate({
        textField: this.textField,
        returnKeyTitle: this.returnType.charAt(0).toUpperCase() + this.returnType.slice(1),
        noDecimals: true,
      });
    }
  }
}
