import { Component, OnInit, Input, ViewContainerRef } from '@angular/core';
import { RadSideDrawer } from 'nativescript-ui-sidedrawer';
import * as app from 'tns-core-modules/application';
import { RouterHelper, ModalHelper } from '~/app/logic/helpers';
import { AddNewGameComponent } from '../../modals/add-new-game/add-new-game.component';
import { Game } from '~/app/logic/models';
import { Emitter, Emittable } from '@ngxs-labs/emitter';
import { AppState } from '~/app/logic/states';

@Component({
  selector: 'ns-actionbar',
  templateUrl: './actionbar.component.html',
  styleUrls: ['./actionbar.component.scss'],
})
export class ActionbarComponent implements OnInit {

  @Emitter(AppState.addGame)
  public addGame: Emittable<Game>;

  @Input() title: string;
  @Input() showBack = false;
  @Input() showAdd = false;

  constructor(private routerHelper: RouterHelper, private modalHelper: ModalHelper, private vcRef: ViewContainerRef) {}

  ngOnInit() {}

  onDrawerButtonTap(): void {
    const sideDrawer = <RadSideDrawer>app.getRootView();
    sideDrawer.showDrawer();
  }

  onAndroidBack() {
    this.routerHelper.backToPreviousPage();
  }

  onAdd() {
    this.modalHelper.openModal(AddNewGameComponent, this.vcRef, false).then((res: Game) => {
      if (!res) {
        return;
      }

      this.addGame.emit(res);
    });
  }

}
