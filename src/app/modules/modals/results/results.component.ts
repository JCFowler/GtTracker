import { Component, OnInit } from '@angular/core';
import { ModalDialogParams } from 'nativescript-angular/directives/dialogs';
import { Select } from '@ngxs/store';
import { AppState } from '~/app/logic/states';
import { Observable } from 'rxjs';
import { Session, Stat } from '~/app/logic/models';
import { borderTopRightRadiusProperty } from 'tns-core-modules/ui/page/page';

@Component({
  selector: 'ns-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {

  @Select(AppState.getCurrentSession) currentSession$: Observable<Session>;

  constructor(private mParams: ModalDialogParams) { }

  public result: string;
  public currentStep = 0;
  public stats: Stat[] = [];

  ngOnInit() {
    this.result = this.mParams.context.result;
    this.currentSession$.subscribe(session => {
      const currentStats = JSON.parse(JSON.stringify(session.game.stats));

      currentStats.forEach(s => {
        if (s.selected) {
          this.stats.push(s);
        }
      });
    });
  }

  getClass(index: number): string {
    if (index === this.currentStep) {
      return 'fas';
    }
    return 'far';
  }

  getReturnType() {
    if (this.currentStep === this.stats.length - 1) {
      return 'done';
    } else {
      return 'next';
    }
  }

  onTextChange(args: string) {
    this.stats[this.currentStep].answer = args;
  }

  nextStep(num: number, forceFinish = false) {
    const newNum = this.currentStep + num;
    if (newNum < 0 || newNum === this.stats.length) {
      console.log('Stop');
      if (forceFinish) {
        this.closeModal();
      }
    } else {
      this.currentStep = newNum;
    }
  }

  closeModal(sendData = true) {
    if (!sendData) {
      this.mParams.closeCallback(undefined);
    }

    this.mParams.closeCallback(this.stats);
  }
}
