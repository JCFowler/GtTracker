import { StatType } from '../enums';

export interface Stat {
    id: number;
    name: string;
    type: StatType;
}

export const allStats: Stat[] = [
    { id: 0, name: 'Kills', type: StatType.Number },
    { id: 1, name: 'Deaths', type: StatType.Number },
    { id: 2, name: 'Assists', type: StatType.Number },
    { id: 3, name: 'Map', type: StatType.Text },
    { id: 4, name: 'Stage', type: StatType.Text },
    { id: 5, name: 'Rounds Won', type: StatType.Number },
    { id: 6, name: 'Rounds Lost', type: StatType.Number },
];