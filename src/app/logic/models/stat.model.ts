import { StatType, GameType } from '../enums';

export interface Stat {
    id: number;
    name: string;
    type: StatType;
    selected?: boolean;
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
    { id: 0, name: 'Kills', type: StatType.Number },
    { id: 1, name: 'Deaths', type: StatType.Number },
    { id: 2, name: 'Assists', type: StatType.Number },
    { id: 3, name: 'Map', type: StatType.Text },
    { id: 4, name: 'Stage', type: StatType.Text },
    { id: 5, name: 'Rounds Won', type: StatType.Number },
    { id: 6, name: 'Rounds Lost', type: StatType.Number },
    { id: 7, name: 'Character', type: StatType.Text },
    { id: 8, name: 'Place', type: StatType.Number },
    { id: 9, name: 'Damage', type: StatType.Number },
];

export const shooterStats: Stat[] = [
    { id: 0, name: 'Kills', type: StatType.Number },
    { id: 1, name: 'Deaths', type: StatType.Number },
    { id: 2, name: 'Assists', type: StatType.Number },
    { id: 3, name: 'Map', type: StatType.Text },
    { id: 5, name: 'Rounds Won', type: StatType.Number },
    { id: 6, name: 'Rounds Lost', type: StatType.Number },
    { id: 9, name: 'Damage', type: StatType.Number },
];

export const fightingStats: Stat[] = [
    { id: 4, name: 'Stage', type: StatType.Text },
    { id: 7, name: 'Character', type: StatType.Text },
    { id: 5, name: 'Rounds Won', type: StatType.Number },
    { id: 6, name: 'Rounds Lost', type: StatType.Number },
];

export const mobaStats: Stat[] = [
    { id: 0, name: 'Kills', type: StatType.Number },
    { id: 1, name: 'Deaths', type: StatType.Number },
    { id: 2, name: 'Assists', type: StatType.Number },
    { id: 7, name: 'Character', type: StatType.Text },
    { id: 3, name: 'Map', type: StatType.Text },
];

export const rtsStats: Stat[] = [
    { id: 3, name: 'Map', type: StatType.Text },
    { id: 7, name: 'Character', type: StatType.Text },
];

export const batleRoyalStats: Stat[] = [
    { id: 0, name: 'Kills', type: StatType.Number },
    { id: 1, name: 'Deaths', type: StatType.Number },
    { id: 2, name: 'Assists', type: StatType.Number },
    { id: 8, name: 'Place', type: StatType.Number },
    { id: 9, name: 'Damage', type: StatType.Number },
];
