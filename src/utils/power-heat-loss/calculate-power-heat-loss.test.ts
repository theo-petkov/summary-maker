import { calcPowerHeatLoss } from './calculate-power-heat-loss';

describe('calcHeatLoss', () => {
  it('should give the correct output, given a valid input', () => {
    const heatLoss = 16412.5;
    const heatingDegreeDays = 2483;

    const result = calcPowerHeatLoss(heatLoss, heatingDegreeDays);

    expect(result).toBe(6.61);
  });
});
