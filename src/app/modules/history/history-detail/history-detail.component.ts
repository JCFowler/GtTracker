import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Select } from '@ngxs/store';
import { AppState } from '~/app/logic/states';
import { Observable } from 'rxjs';
import { Session } from '~/app/logic/models';
import { first } from 'rxjs/operators';
import { GlobalHelper } from '~/app/logic/helpers';

@Component({
  selector: 'ns-history-detail',
  templateUrl: './history-detail.component.html',
  styleUrls: ['./history-detail.component.scss']
})
export class HistoryDetailComponent implements OnInit {

  @Select(AppState.getSessionHistory) history$: Observable<Session[]>;

  constructor(private route: ActivatedRoute) { }

  public getRatio = GlobalHelper.getRatio;
  public getTimeDiff = GlobalHelper.getTimeDiff;

  session: Session;

  ngOnInit() {
    const index = this.route.snapshot.paramMap.get('index');

    this.history$.pipe(first()).subscribe(history => {
      this.session = history[index];
    });
  }

}
