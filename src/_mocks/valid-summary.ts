import type { ValidSummary } from 'src/types';
import { Decimal } from 'decimal.js';

export const mockValidSummary: ValidSummary = {
  submissionId: '4cb3820a-7bf6-47f9-8afc-3adcac8752cd',
  estimatedHeatLoss: 16412.5,
  designRegion: 'Severn Valley (Filton)',
  powerHeatLoss: 6.61,
  recommendedHeatPump: '8kW Package',
  costBreakdown: [
    {
      label:
        'Design & Supply of your Air Source Heat Pump System Components (8kW)',
      cost: 4216
    },
    {
      label: 'Installation of your Air Source Heat Pump and Hot Water Cylinder',
      cost: 2900
    },
    {
      label: 'Supply & Installation of your Homely Smart Thermostat',
      cost: 150
    },
    { label: 'Supply & Installation of a new Consumer Unit', cost: 300 },
    {
      label: 'MCS System Commissioning & HIES Insurance-backed Warranty',
      cost: 1648
    }
  ],
  totalCostWithVAT: new Decimal(9674.7)
};
