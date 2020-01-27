import { GameResult } from '../enums';
import { Stat } from './stat.model';

export interface Round {
    roundId?: number;
    result: GameResult;
    time: Date;
    stats: Stat[];
}
