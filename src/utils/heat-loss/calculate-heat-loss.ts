/**
 * Calculates the heat loss based on the floor area, heat factor, and insulation factor.
 * @param floorArea - The floor area in square meters.
 * @param heatFactor - The heat factor.
 * @param insulationFactor - The insulation factor.
 * @returns The calculated heat loss, rounded to 2 decimal places.
 * @example calcHeatLoss(125, 101, 1.3) => 16412.5
 */

export const calcHeatLoss = (
  floorArea: number,
  heatFactor: number,
  insulationFactor: number
): number => {
  const heatLoss = floorArea * heatFactor * insulationFactor;
  return parseFloat(heatLoss.toFixed(2));
};
