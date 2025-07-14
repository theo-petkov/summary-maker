import { calcTotalCostWithVAT } from './calculate-total-cost-with-vat';
import { mockHeatPumpCosts } from 'src/_mocks';
import { Decimal } from 'decimal.js';

describe('calcTotalCostWithVAT', () => {
  beforeEach(() => {
    process.env.VAT_PERCENTAGE = '5';
  });
  it('should calculate the correct value, given a valid heat pump costs array', () => {
    const result = calcTotalCostWithVAT(mockHeatPumpCosts);
    expect(result).toEqual(new Decimal(9674.7));
  });

  it('should throw an error if VAT percentage is not found', () => {
    delete process.env.VAT_PERCENTAGE;
    expect(() => calcTotalCostWithVAT(mockHeatPumpCosts)).toThrow(
      'VAT percentage not found'
    );
  });
});
