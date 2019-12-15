import { Component, OnInit, Input } from '@angular/core';
import { RadSideDrawer } from 'nativescript-ui-sidedrawer';
import * as app from 'tns-core-modules/application';
import { RouterHelper } from '~/app/logic/helpers';

@Component({
  selector: 'ns-actionbar',
  templateUrl: './actionbar.component.html',
  styleUrls: ['./actionbar.component.scss'],
})
export class ActionbarComponent implements OnInit {

  @Input() title: string;
  @Input() showBack = false;

  constructor(private routerHelper: RouterHelper) {}

  ngOnInit() {
    console.log(this.showBack)
  }

  onDrawerButtonTap(): void {
    const sideDrawer = <RadSideDrawer>app.getRootView();
    sideDrawer.showDrawer();
  }

  onAndroidBack() {
    this.routerHelper.backToPreviousPage();
  }

}
