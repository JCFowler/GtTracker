import { GameType } from '../enums';
import { Stat } from '.';

export interface Game {
    gameId?: number;
    name: string;
    type: GameType;
    stats: Stat[];
}
