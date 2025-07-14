import type { HeatPumpCosts } from 'src/types';
import { Decimal } from 'decimal.js';

/**
 * Calculates the total cost of a heat pump installation, including VAT.
 * @param costs - An array containing the various costs of a heat pump
 * @returns The total cost of the heat pump, including VAT, as a Decimal object, for precision
 */

export const calcTotalCostWithVAT = (costs: HeatPumpCosts[]): Decimal => {
  const vatPercentage = process.env.VAT_PERCENTAGE;
  if (!vatPercentage) {
    throw new Error('VAT percentage not found');
  }
  const vatPercentageDecimal = new Decimal(vatPercentage).div(new Decimal(100));

  const costsBeforeVAT = costs.reduce((acc, current) => {
    return acc.add(new Decimal(current.cost));
  }, new Decimal(0));

  const costsAfterVAT = costsBeforeVAT.mul(
    vatPercentageDecimal.add(new Decimal(1))
  );

  return costsAfterVAT;
};
