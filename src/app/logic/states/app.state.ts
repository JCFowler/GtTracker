import { State, Selector, StateContext, Store } from '@ngxs/store';
import { Receiver, EmitterAction } from '@ngxs-labs/emitter';
import { LocalStorage } from '../storage/local-storage';
import { Session } from '../models/session.model';
import { Game, Totals } from '../models';
import { GameResult } from '../enums';

export interface AppStateModel {
    user: any;
    currentSession: Session;
    currentTotals: Totals;
    sessionHistory: Session[];
}

@State<AppStateModel>({
    name: 'appData',
    defaults: {
        user: undefined,
        currentTotals: new Totals(),
        currentSession: undefined,
        sessionHistory: []
    },
})


export class AppState {
    constructor() {
    }

    @Selector()
    public static getCurrentSession(state: AppStateModel) {
        return state.currentSession;
    }

    @Selector()
    public static getCurrentTotals(state: AppStateModel) {
        return state.currentTotals;
    }

    @Selector()
    public static getSessionHistory(state: AppStateModel) {
        return state.sessionHistory;
    }

    @Receiver()
    public static async setCurrentSession(ctx: StateContext<AppStateModel>, action: EmitterAction<Session>) {
        ctx.patchState({
            currentSession: action.payload
        });
        LocalStorage.setAppState(ctx.getState());
        console.log('Current Session was set.');
    }

    @Receiver()
    public static async updateCurrentSessionGame(ctx: StateContext<AppStateModel>, action: EmitterAction<Game>) {
        const session = ctx.getState().currentSession;
        const totals = ctx.getState().currentTotals;

        switch (action.payload.result) {
            case GameResult.Win:
                totals.wins++;
                break;
            case GameResult.Tie:
                totals.ties++;
                break;
            case GameResult.Lost:
                totals.losts++;
                break;
            case GameResult.Quit:
                totals.quit++;
                break;
            default:
                break;
        }

        session.games.push(action.payload);

        ctx.patchState({
            currentSession: session,
            currentTotals: totals
        });
        LocalStorage.setAppState(ctx.getState());
    }

    @Receiver()
    public static async addSessionToHistory(ctx: StateContext<AppStateModel>) {
        const currentSession = ctx.getState().currentSession;
        const history = ctx.getState().sessionHistory;
        history.push(currentSession);

        ctx.patchState({
            currentSession: undefined,
            currentTotals: new Totals,
            sessionHistory: history
        });
        LocalStorage.setAppState(ctx.getState());
    }

    @Receiver()
    public static rehydrateApp(ctx: StateContext<AppState>) {
        console.log('Rehydrating App');
        const state: AppStateModel = LocalStorage.getAppState();

        if (state) {
            ctx.setState({
                user: undefined,
                currentSession: state.currentSession,
                currentTotals: state.currentTotals,
                sessionHistory: state.sessionHistory
            });
        }
    }

}
