import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { HistoryListComponent } from './history-list/history-list.component';
import { Routes } from '@angular/router';
import { NativeScriptRouterModule } from 'nativescript-angular/router';
import { SharedModule } from '../shared/shared.module';
import { HistoryDetailComponent } from './history-detail/history-detail.component';

const routes: Routes = [
    { path: '', component: HistoryListComponent },
    { path: 'detail', component: HistoryDetailComponent},
];

@NgModule({
    imports: [
        NativeScriptRouterModule.forChild(routes),
        SharedModule
    ],
    exports: [],
    declarations: [HistoryListComponent, HistoryDetailComponent],
    providers: [],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class HistoryModule { }
