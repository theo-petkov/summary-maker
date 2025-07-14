/**
 * Calculates the power heat loss based on the heat loss and heating degree days.
 * @param heatLoss - The heat loss in kWh
 * @param heatingDegreeDays - The heating degree days
 * @returns The calculated power heat loss, rounded to 2 decimal places.
 * @example calcPowerHeatLoss(16412.5, 20) => 821.65
 */

export const calcPowerHeatLoss = (
  heatLoss: number,
  heatingDegreeDays: number
): number => {
  const powerHeatLoss = heatLoss / heatingDegreeDays;
  return parseFloat(powerHeatLoss.toFixed(2));
};
