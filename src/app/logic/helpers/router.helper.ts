import { Injectable } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular/router';

/**
 * This RouterHelper is used to navigate around the app.
 *
 * Only use this RouterHelper when navigating.
 */
@Injectable({ providedIn: 'root' })
export class RouterHelper {
  constructor(private router: RouterExtensions) {}

  /**
   * Used to replace the current view and not give the user a way to go back.
   *
   * @param commands The actual link to the component you want to go to.
   *
   * EX: ['/home/start']
   */
  replace(commands: any[]) {
    this.router.navigate(commands, { clearHistory: true });
  }

  /**
   * Used to replace the current view and will let the user go back.
   *
   * @param commands The actual link to the component you want to go to.
   *
   * EX: ['/home/start']
   */
  navigate(commands: any[]) {
    this.router.navigate(commands, { transition: { name: 'slide' }});
  }

  backToPreviousPage() {
    this.router.backToPreviousPage();
  }
}
