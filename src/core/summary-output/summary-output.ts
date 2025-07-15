import type { LocationNotFoundSummary, ValidSummary } from 'src/types';

export const summaryOutput = (
  summary: ValidSummary | LocationNotFoundSummary
): void => {
  console.log('--------------------------------------');
  console.log(summary.submissionId);
  console.log('--------------------------------------');
  if ('warning' in summary) {
    console.log('Heating Loss: ', summary.estimatedHeatLoss);
    console.log('Warning: ', summary.warning);
  } else {
    console.log('Estimated Heat Loss = ', summary.estimatedHeatLoss);
    console.log('Design Region = ', summary.designRegion);
    console.log('Power Heat Loss = ', summary.powerHeatLoss);
    console.log('Recommended Heat Pump = ', summary.recommendedHeatPump);
    if (summary.costBreakdown) {
      console.log('Cost Breakdown');
      summary.costBreakdown.forEach((costItem) => {
        console.log(`${costItem.label}, `, costItem.cost);
      });
    }
    if (summary.totalCostWithVAT) {
      console.log('Total Cost, including VAT = ', summary.totalCostWithVAT);
    }
  }
};
