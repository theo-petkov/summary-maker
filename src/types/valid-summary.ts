import type { HeatPumpCosts } from './heat-pump-costs';
import Decimal from 'decimal.js';

export type ValidSummary = {
  submissionId: string;
  estimatedHeatLoss: number;
  designRegion: string;
  powerHeatLoss: number;
  recommendedHeatPump: string;
  costBreakdown: HeatPumpCosts[] | undefined;
  totalCostWithVAT: Decimal.Value | undefined;
};
