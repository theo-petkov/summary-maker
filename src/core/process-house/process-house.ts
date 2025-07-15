import type {
  ValidSummary,
  HouseData,
  LocationNotFoundSummary
} from 'src/types';
import {
  calcHeatLoss,
  getLocationDataRetry,
  calcPowerHeatLoss,
  calcTotalCostWithVAT,
  getCheapestViableHeatPump
} from 'src/utils';
import heatPumps from 'src/data/heat-pumps.json';

export const processHouse = async (
  house: HouseData
): Promise<ValidSummary | LocationNotFoundSummary> => {
  const houseHeatLoss = calcHeatLoss(
    house.floorArea,
    house.heatingFactor,
    house.insulationFactor
  );

  const locationData = await getLocationDataRetry(house.designRegion);

  if (!locationData) {
    const locationNotFoundSummary: LocationNotFoundSummary = {
      submissionId: house.submissionId,
      estimatedHeatLoss: houseHeatLoss,
      warning: 'Could not find design region'
    };
    return locationNotFoundSummary;
  }

  const housePowerHeatLoss = calcPowerHeatLoss(
    houseHeatLoss,
    locationData.data.location.degreeDays
  );

  const recommendedHeatPump = getCheapestViableHeatPump(
    housePowerHeatLoss,
    heatPumps
  );

  let totalCostWithVAT = undefined;
  if (recommendedHeatPump) {
    totalCostWithVAT = calcTotalCostWithVAT(recommendedHeatPump.costs);
  }

  const validSummary: ValidSummary = {
    submissionId: house.submissionId,
    estimatedHeatLoss: houseHeatLoss,
    designRegion: house.designRegion,
    powerHeatLoss: housePowerHeatLoss,
    recommendedHeatPump:
      recommendedHeatPump?.label ??
      'None of the available heat pumps are viable for this property.',
    costBreakdown: recommendedHeatPump?.costs ?? undefined,
    totalCostWithVAT: totalCostWithVAT
  };

  return validSummary;
};
