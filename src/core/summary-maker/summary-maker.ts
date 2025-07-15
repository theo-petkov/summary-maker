import { processHouse } from '../process-house/process-house';
import { summaryOutput } from '../summary-output/summary-output';
import type { HouseData } from 'src/types';

/**
 * A function that takes an array of house details, processes them, and console logs required details in their summaries.
 * @param houses - An array of house details that will be used to process the summaries
 */

export const makeSummary = async (houses: HouseData[]): Promise<void> => {
  const summaries = await Promise.allSettled(
    houses.map(async (house) => processHouse(house))
  );

  summaries.forEach((result, index) => {
    if (result.status === 'fulfilled') {
      summaryOutput(result.value);
    } else {
      console.log(
        `Observability: Property ${index + 1} failed: `,
        result.reason
      );
    }
  });
};
