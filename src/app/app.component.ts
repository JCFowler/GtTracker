import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { RouterExtensions } from 'nativescript-angular/router';
import { DrawerTransitionBase, RadSideDrawer, SlideInOnTopTransition } from 'nativescript-ui-sidedrawer';
import { filter } from 'rxjs/operators';
import * as app from 'tns-core-modules/application';
import { Emitter, Emittable } from '@ngxs-labs/emitter';
import { AppState } from './logic/states';
import { Session } from './logic/models/session.model';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';

@Component({
    selector: 'ns-app',
    templateUrl: 'app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

    @Select(AppState.getCurrentSession) currentSession$: Observable<Session>;

    @Emitter(AppState.rehydrateApp)
    public rehydrateApp: Emittable<null>;

    private _activatedUrl: string;
    private _sideDrawerTransition: DrawerTransitionBase;

    constructor(private router: Router, private routerExtensions: RouterExtensions) {}

    ngOnInit(): void {
        this._activatedUrl = '/home';
        this._sideDrawerTransition = new SlideInOnTopTransition();

        this.router.events
        .pipe(filter((event: any) => event instanceof NavigationEnd))
        .subscribe((event: NavigationEnd) => this._activatedUrl = event.urlAfterRedirects);

        this.rehydrateApp.emit(null);

        this.currentSession$.subscribe(session => {

        });
    }

    get sideDrawerTransition(): DrawerTransitionBase {
        return this._sideDrawerTransition;
    }

    isComponentSelected(url: string): boolean {
        return this._activatedUrl === url;
    }

    onNavItemTap(navItemRoute: string): void {
        this.routerExtensions.navigate([navItemRoute], {
            transition: {
                name: 'fade'
            },
            clearHistory: true
        });

        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.closeDrawer();
    }
}
