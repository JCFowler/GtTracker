import { Round } from './round.model';
import { Totals } from './totals.model';
import { Game } from './game.model';

export interface Session {
    sessionId: number;
    game: Game;
    totals: Totals;
    startTime: Date;
    endTime?: Date;
    rounds: Round[];
}
