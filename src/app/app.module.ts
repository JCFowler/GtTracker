import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptModule } from 'nativescript-angular/nativescript.module';
import { NativeScriptUISideDrawerModule } from 'nativescript-ui-sidedrawer/angular';

import { AppComponent } from './app.component';
import { SharedModule } from './modules/shared/shared.module';
import { HomeComponent } from './modules/home/home.component';
import { STATES } from './logic/states';
import { NgxsModule } from '@ngxs/store';
import { NgxsEmitPluginModule } from '@ngxs-labs/emitter';
import { Routes } from '@angular/router';
import { NativeScriptRouterModule } from 'nativescript-angular/router';
import { ResultsComponent } from './modules/modals/results/results.component';
import { GameSelectorComponent } from './modules/modals/game-selector/game-selector.component';
import { registerElement } from 'nativescript-angular';

registerElement('NumericTextField', () => require('nativescript-numeric-keyboard').NumericKeyboardView);

const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent},
    { path: 'history', loadChildren: () => import('./modules/history/history.module')
            .then(m => m.HistoryModule) },
];

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptRouterModule.forRoot(routes),
        NativeScriptModule,
        NativeScriptUISideDrawerModule,
        SharedModule,
        NgxsModule.forRoot([ ...STATES ]),
        NgxsEmitPluginModule.forRoot(),
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        ResultsComponent,
        GameSelectorComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ],
    entryComponents: [
        ResultsComponent,
        GameSelectorComponent
    ]
})
export class AppModule { }
