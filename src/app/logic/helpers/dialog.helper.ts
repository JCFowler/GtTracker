import { Injectable } from '@angular/core';
import { alert, action, ActionOptions, confirm } from 'tns-core-modules/ui/dialogs';


@Injectable({ providedIn: 'root' })
export class DialogHelper {

    /**
     * Regular dialog.
     */
    alert(message: string, title: string = 'Alert', okButtonText: string = 'OK'): Promise<void> {
        const options = {
            title: title,
            message: message,
            okButtonText: okButtonText
        };

        return alert(options);
    }

    /**
     * Gives a dialog of a Yes / No question.
     */
    confirmAlert(message: string, title: string = 'Alert',
                okButtonText: string = 'OK', cancelButtonText: string = 'Cancel'): Promise<boolean> {
        const options = {
            title: title,
            message: message,
            okButtonText: okButtonText,
            cancelButtonText:
            cancelButtonText
        };

        return confirm(options);
    }

    /**
     * Creates dialog of list of strings.
     */
    genericActionDialog(options: string[], title: string): Promise<string> {
        const allOptions: ActionOptions = {
            title: title,
            actions: options,
            cancelButtonText: 'Cancel'
        };

        return action(allOptions);
    }
}
