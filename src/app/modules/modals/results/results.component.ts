import { Component, OnInit } from '@angular/core';
import { ModalDialogParams } from 'nativescript-angular/directives/dialogs';
import { isIOS } from 'tns-core-modules/ui/page/page';
import { TextField } from '@nativescript/core';
import { Select } from '@ngxs/store';
import { AppState } from '~/app/logic/states';
import { Observable } from 'rxjs';
import { Session } from '~/app/logic/models';

@Component({
  selector: 'ns-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {

  @Select(AppState.getCurrentSession) currentSession$: Observable<Session>;

  constructor(private mParams: ModalDialogParams) { }

  public focusIndex: number;
  public textFields: TextField[] = [];
  public result: string;
  public isIOS: boolean;
  public steps: number;
  public currentStep = 0;

  ngOnInit() {
    this.isIOS = isIOS;
    this.result = this.mParams.context.result;
    this.currentSession$.subscribe(session => {
      this.steps = session.game.stats.length;
    });
  }

  getClass(index: number): string {
    if (index === this.currentStep) {
      return 'fas';
    }
    return 'far';
  }

  nextStep(num: number) {
    const newNum = this.currentStep + num;
    console.log(newNum, this.currentStep)
    if (newNum < 0 || newNum === this.steps) {
      console.log('Stop')
    } else {
      this.currentStep = newNum;
    }
  }

  closeModal(sendData = true) {
    if (!sendData) {
      this.mParams.closeCallback(undefined);
    }
    const res: string[] = [];
    this.textFields.forEach(tf => {
      res.push(tf.text);
    });
    this.mParams.closeCallback(res);
  }

  isFocused(textField, index) {
    textField.focus();
    this.focusIndex = index;
  }

  returnPress(index: number) {
    if (index !== this.textFields.length - 1) {
      if (isIOS) {
        setTimeout(() => {
          this.textFields[index + 1].focus();
        }, 100);
      }
    } else {
      this.closeModal();
    }
  }

  loadTextField(args: TextField) {
    if (this.textFields.length === 0) {
      setTimeout(() => {
        args.focus();
      }, 100);
    }
    this.textFields.push(args);
  }
}
