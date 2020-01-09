import { State, Selector, StateContext, Store } from '@ngxs/store';
import { Receiver, EmitterAction } from '@ngxs-labs/emitter';
import { LocalStorage } from '../storage/local-storage';
import { Session } from '../models/session.model';
import { Round, Game } from '../models';
import { GameResult, GameType } from '../enums';

export interface AppStateModel {
    user: any;
    games: Game[];
    currentSession: Session;
    sessionHistory: Session[];
}

@State<AppStateModel>({
    name: 'appData',
    defaults: {
        user: undefined,
        games: [],
        currentSession: undefined,
        sessionHistory: []
    },
})


export class AppState {
    constructor() {}

    @Selector()
    public static getGames(state: AppStateModel) {
        return state.games;
    }

    @Selector()
    public static getCurrentSession(state: AppStateModel) {
        return state.currentSession;
    }

    @Selector()
    public static getSessionHistory(state: AppStateModel) {
        return state.sessionHistory;
    }

    @Receiver()
    public static async createInitialGames(ctx: StateContext<AppStateModel>) {
        const games: Game[] = [
            { name: 'Modern Warfare', type: GameType.Shooter },
            { name: 'Street Fighter 5', type: GameType.Fighting },
            { name: 'League of Legends', type: GameType.MOBA },
            { name: 'Apex', type: GameType.BattleRoyal },
            { name: 'Halo 5', type: GameType.Shooter },
        ];

        ctx.patchState({
            games: games
        });
        LocalStorage.setAppState(ctx.getState());
        console.log('Initial Games were created.');
    }

    @Receiver()
    public static async addGame(ctx: StateContext<AppStateModel>, action: EmitterAction<Game>) {
        const games = ctx.getState().games;
        games.unshift(action.payload);

        ctx.patchState({
            games: games
        });
        LocalStorage.setAppState(ctx.getState());
        console.log('New game was added.');
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
    public static async updateCurrentSessionGame(ctx: StateContext<AppStateModel>, action: EmitterAction<Round>) {
        const session = ctx.getState().currentSession;

        session.totals.games++;

        switch (action.payload.result) {
            case GameResult.Win:
                session.totals.wins++;
                break;
            case GameResult.Tie:
                session.totals.ties++;
                break;
            case GameResult.Lose:
                session.totals.losts++;
                break;
            case GameResult.Quit:
                session.totals.quit++;
                break;
            default:
                break;
        }

        session.rounds.unshift(action.payload);

        ctx.patchState({
            currentSession: session
        });
        LocalStorage.setAppState(ctx.getState());
    }

    @Receiver()
    public static async addSessionToHistory(ctx: StateContext<AppStateModel>) {
        const currentSession = ctx.getState().currentSession;
        const history = ctx.getState().sessionHistory;

        currentSession.endTime = new Date();

        history.unshift(currentSession);

        ctx.patchState({
            currentSession: undefined,
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
                games: state.games,
                currentSession: state.currentSession,
                sessionHistory: state.sessionHistory
            });
        }
    }

}
