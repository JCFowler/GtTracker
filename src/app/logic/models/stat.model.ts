import { StatType, GameType } from '../enums';

export interface Stat {
    id: number;
    name: string;
    type: StatType;
    selected: boolean;
}

export function getStats(type: GameType): Stat[] {
    switch (type) {
        case GameType.Shooter:
            return shooterStats;
        case GameType.Fighting:
            return fightingStats;
        case GameType.MOBA:
            return mobaStats;
        case GameType.RTS:
            return rtsStats;
        case GameType.BattleRoyal:
            return batleRoyalStats;
        default:
            return allStats;
    }
}

export const allStats: Stat[] = [
    { id: 0, name: 'Kills', type: StatType.Number, selected: true },
    { id: 1, name: 'Deaths', type: StatType.Number, selected: true },
    { id: 2, name: 'Assists', type: StatType.Number, selected: true },
    { id: 3, name: 'Map', type: StatType.Text, selected: true },
    { id: 4, name: 'Stage', type: StatType.Text, selected: true },
    { id: 5, name: 'Rounds Won', type: StatType.Number, selected: true },
    { id: 6, name: 'Rounds Lost', type: StatType.Number, selected: true },
    { id: 7, name: 'Character', type: StatType.Text, selected: true },
    { id: 8, name: 'Place', type: StatType.Number, selected: true },
    { id: 9, name: 'Damage', type: StatType.Number, selected: true },
    { id: 10, name: 'Team', type: StatType.Text, selected: true },
    { id: 11, name: 'Points', type: StatType.Number, selected: true },
    { id: 12, name: 'Opponent\'s Points', type: StatType.Number, selected: true },
];

export const shooterStats: Stat[] = [
    { id: 0, name: 'Kills', type: StatType.Number, selected: true },
    { id: 1, name: 'Deaths', type: StatType.Number, selected: true },
    { id: 2, name: 'Assists', type: StatType.Number, selected: true },
    { id: 3, name: 'Map', type: StatType.Text, selected: true },
    { id: 5, name: 'Rounds Won', type: StatType.Number, selected: true },
    { id: 6, name: 'Rounds Lost', type: StatType.Number, selected: true },
    { id: 9, name: 'Damage', type: StatType.Number, selected: true },
];

export const fightingStats: Stat[] = [
    { id: 4, name: 'Stage', type: StatType.Text, selected: true },
    { id: 7, name: 'Character', type: StatType.Text, selected: true },
    { id: 5, name: 'Rounds Won', type: StatType.Number, selected: true },
    { id: 6, name: 'Rounds Lost', type: StatType.Number, selected: true },
];

export const mobaStats: Stat[] = [
    { id: 0, name: 'Kills', type: StatType.Number, selected: true },
    { id: 1, name: 'Deaths', type: StatType.Number, selected: true },
    { id: 2, name: 'Assists', type: StatType.Number, selected: true },
    { id: 7, name: 'Character', type: StatType.Text, selected: true },
    { id: 3, name: 'Map', type: StatType.Text, selected: true },
];

export const rtsStats: Stat[] = [
    { id: 3, name: 'Map', type: StatType.Text, selected: true },
    { id: 7, name: 'Character', type: StatType.Text, selected: true },
];

export const batleRoyalStats: Stat[] = [
    { id: 0, name: 'Kills', type: StatType.Number, selected: true },
    { id: 1, name: 'Deaths', type: StatType.Number, selected: true },
    { id: 2, name: 'Assists', type: StatType.Number, selected: true },
    { id: 8, name: 'Place', type: StatType.Number, selected: true },
    { id: 9, name: 'Damage', type: StatType.Number, selected: true },
];

export const sportsStats: Stat[] = [
    { id: 10, name: 'Team', type: StatType.Text, selected: true },
    { id: 11, name: 'Points', type: StatType.Number, selected: true },
    { id: 12, name: 'Opponent\'s Points', type: StatType.Number, selected: true },
];
