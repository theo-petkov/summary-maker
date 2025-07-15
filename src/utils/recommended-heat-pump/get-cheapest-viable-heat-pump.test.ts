import type { HeatPumpData } from 'src/types';
import { getCheapestViableHeatPump } from './get-cheapest-viable-heat-pump';
import { mockCheapHeatPump, mockExpensiveHeatPump } from 'src/_mocks';

const mockAllHeatPumps: HeatPumpData[] = [
  mockExpensiveHeatPump,
  mockCheapHeatPump
];

describe('getCheapestViableHeatPump', () => {
  it('should return the cheapest heat pump, given the power heat loss is lower than all heat pump outputs', () => {
    const powerHeatLoss = 3;

    const result = getCheapestViableHeatPump(powerHeatLoss, mockAllHeatPumps);

    expect(result).toEqual(mockCheapHeatPump);
  });

  it('should return the expensive heat pump, since this is the only viable heat pump for the given power heat loss', () => {
    const powerHeatLoss = 10;

    const result = getCheapestViableHeatPump(powerHeatLoss, mockAllHeatPumps);

    expect(result).toEqual(mockExpensiveHeatPump);
  });

  it('should return null if there are no viable heat pumps', () => {
    const powerHeatLoss = 100;

    const result = getCheapestViableHeatPump(powerHeatLoss, mockAllHeatPumps);

    expect(result).toBeNull();
  });
});
