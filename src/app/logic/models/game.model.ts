import { GameType } from '../enums';

export interface Game {
    gameId?: number;
    name: string;
    type: GameType;
}
