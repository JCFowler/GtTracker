import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { Routes } from '@angular/router';
import { NativeScriptRouterModule } from 'nativescript-angular/router';
import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './home.component';
import { GameSelectorComponent } from './game-selector/game-selector.component';

const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'game-selector', component: GameSelectorComponent},
];

@NgModule({
    imports: [
        NativeScriptRouterModule.forChild(routes),
        SharedModule
    ],
    exports: [],
    declarations: [
        HomeComponent,
        GameSelectorComponent
    ],
    providers: [],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class HomeModule { }
