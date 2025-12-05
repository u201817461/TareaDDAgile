export interface SimulationState {
  distance: number | '';
  time: number | '';
  velocity: number | null;
}

export interface ChartDataPoint {
  name: string;
  value: number;
}

export enum UnitSystem {
  METRIC = 'METRIC',
  IMPERIAL = 'IMPERIAL'
}