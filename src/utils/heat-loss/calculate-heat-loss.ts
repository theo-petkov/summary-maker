export const calcHeatLoss = (
  floorArea: number,
  heatFactor: number,
  insulationFactor: number
) => {
  return floorArea * heatFactor * insulationFactor;
};
