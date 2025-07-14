export const calcHeatLoss = (
  floorArea: number,
  heatFactor: number,
  insulationFactor: number
): number => {
  return floorArea * heatFactor * insulationFactor;
};
