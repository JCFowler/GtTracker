import { Game } from './game.model';

export interface Session {
    sessionId: number;
    startTime: Date;
    endTime?: Date;
    games: Game[];
}
