import { Component, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { AppState } from '~/app/logic/states';
import { Observable } from 'rxjs';
import { Session } from '~/app/logic/models';
import { RouterHelper, GlobalHelper } from '~/app/logic/helpers';

@Component({
  selector: 'ns-history-list',
  templateUrl: './history-list.component.html',
  styleUrls: ['./history-list.component.scss']
})
export class HistoryListComponent implements OnInit {

  @Select(AppState.getSessionHistory) history$: Observable<Session[]>;

  constructor(private routerHelper: RouterHelper) { }

  public getRatio = GlobalHelper.getRatio;
  public getTimeDiff = GlobalHelper.getTimeDiff;


  ngOnInit() {}

  onItemTap(args) {
    this.routerHelper.navigate(['history/detail', { index: args.index}]);
  }

  noHistoryTap() {
    this.routerHelper.replace(['/home']);
  }

}
