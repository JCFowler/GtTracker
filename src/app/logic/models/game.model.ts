import { GameResult } from '../enums';

export interface Game {
    gameId?: number;
    result: GameResult;
    time: Date;
    kills: number;
    deaths: number;
}
