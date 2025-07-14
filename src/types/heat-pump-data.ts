import type { HeatPumpCosts } from './heat-pump-costs';

export type HeatPumpData = {
  label: string;
  outputCapacity: number;
  costs: HeatPumpCosts[];
};
