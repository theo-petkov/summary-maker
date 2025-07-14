import { calcHeatLoss } from './calculate-heat-loss';

describe('calcHeatLoss', () => {
  it('should give the correct output, given a valid input', () => {
    const floorArea = 125;
    const heatFactor = 101;
    const insulationFactor = 1.3;

    const result = calcHeatLoss(floorArea, heatFactor, insulationFactor);

    expect(result).toBe(16412.5);
  });
});
