import { GameResult } from '../enums';

export interface Round {
    roundId?: number;
    result: GameResult;
    time: Date;
    kills: number;
    deaths: number;
}
