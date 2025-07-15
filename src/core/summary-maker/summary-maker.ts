import 'dotenv/config';
import { processHouse } from '../process-house/process-house';
import { summaryOutput } from '../summary-output/summary-output';
import type { HouseData } from 'src/types';

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
