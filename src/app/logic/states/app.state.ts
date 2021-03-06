import { State, Selector, StateContext, Store } from '@ngxs/store';
import { Receiver, EmitterAction } from '@ngxs-labs/emitter';
import { LocalStorage } from '../storage/local-storage';
import { Session } from '../models/session.model';
import { Round, Game, shooterStats, fightingStats, mobaStats, batleRoyalStats, sportsStats } from '../models';
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
            { name: 'Modern Warfare', type: GameType.Shooter, stats: shooterStats },
            { name: 'Street Fighter 5', type: GameType.Fighting, stats: fightingStats },
            { name: 'League of Legends', type: GameType.MOBA, stats: mobaStats },
            { name: 'Apex', type: GameType.BattleRoyal, stats: batleRoyalStats },
            { name: 'Halo 5', type: GameType.Shooter, stats: shooterStats },
            { name: 'Madden 20', type: GameType.Sports, stats: sportsStats },
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
    public static async deleteGame(ctx: StateContext<AppStateModel>, action: EmitterAction<number>) {
        const games = ctx.getState().games;
        games.splice(action.payload, 1);

        ctx.patchState({
            games: games
        });
        LocalStorage.setAppState(ctx.getState());
        console.log('Game was removed.');
    }

    @Receiver()
    public static async editGame(ctx: StateContext<AppStateModel>, action: EmitterAction<{index: number, game: Game}>) {
        const games = ctx.getState().games;
        games[action.payload.index] = action.payload.game;

        ctx.patchState({
            games: games
        });
        LocalStorage.setAppState(ctx.getState());
        console.log('Game was edited.');
    }

    @Receiver()
    public static async updateGames(ctx: StateContext<AppStateModel>, action: EmitterAction<Game[]>) {
        ctx.patchState({
            games: action.payload
        });
        LocalStorage.setAppState(ctx.getState());
        console.log('Games were updated.');
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
