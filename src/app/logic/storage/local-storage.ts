import { AppStateModel } from '../states';
import { ApplicationStorage } from './application-storage';


export class LocalStorage {

    public static setAppState(state: AppStateModel) {
        ApplicationStorage.set('appState', state);
    }

    public static getAppState(): AppStateModel {
        return ApplicationStorage.get<AppStateModel>('appState');
    }
}
