import type { HeatPumpData } from 'src/types';

/**
 * Find the cheapest heat pump that has output above the property power heat loss
 * @param powerHeatLoss - The power heat loss of a property
 * @param allHeatPumps - All available heat pumps
 * @returns The cheapest viable heat pump (one with enough output), or null, if there are no heat pumps that match the criteria
 */

export const getCheapestViableHeatPump = (
  powerHeatLoss: number,
  allHeatPumps: HeatPumpData[]
): HeatPumpData | null => {
  const viableHeatPumps = allHeatPumps.filter(
    (heatPump) => heatPump.outputCapacity > powerHeatLoss
  );

  if (viableHeatPumps.length === 0) {
    return null;
  }

  viableHeatPumps.sort((a, b) => a.outputCapacity - b.outputCapacity);
  return viableHeatPumps[0];
};
