import 'dotenv/config';
import { processHouse } from '../process-house/process-house';
import { summaryOutput } from '../summary-output/summary-output';
import houses from 'src/data/houses.json';

export const makeSummary = (): void => {
  Promise.allSettled(houses.map(async (house) => processHouse(house))).then(
    (results) => {
      results.forEach((result, index) => {
        if (result.status === 'fulfilled') {
          summaryOutput(result.value);
        } else {
          console.log(
            `Observability: Property ${index + 1} failed: `,
            result.reason
          );
        }
      });
    }
  );
};
