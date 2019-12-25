import { Game } from './game.model';
import { Totals } from './totals.model';

export interface Session {
    sessionId: number;
    gameType: string;
    totals: Totals;
    startTime: Date;
    endTime?: Date;
    games: Game[];
}
