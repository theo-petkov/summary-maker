import { mockLocationNotFoundSummary, mockValidSummary } from 'src/_mocks';
import { summaryOutput } from './summary-output';
import { Decimal } from 'decimal.js';

describe('summaryOutput', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should console log a full summary in the proper way', () => {
    const consoleLogSpy = jest
      .spyOn(console, 'log')
      .mockImplementation(jest.fn());

    summaryOutput(mockValidSummary);

    // Below tests can be more exhaustive if deemed necessary
    expect(consoleLogSpy).toHaveBeenCalledTimes(14);
    expect(consoleLogSpy).toHaveBeenNthCalledWith(
      2,
      mockValidSummary.submissionId
    );
    expect(consoleLogSpy).toHaveBeenNthCalledWith(
      9,
      'Design & Supply of your Air Source Heat Pump System Components (8kW), ',
      4216
    );
    expect(consoleLogSpy).toHaveBeenNthCalledWith(
      14,
      'Total Cost, including VAT = ',
      new Decimal(9674.7)
    );
  });

  it('should console log a summary with a location not found warning', () => {
    const consoleLogSpy = jest
      .spyOn(console, 'log')
      .mockImplementation(jest.fn());

    summaryOutput(mockLocationNotFoundSummary);

    expect(consoleLogSpy).toHaveBeenCalledTimes(5);
    expect(consoleLogSpy).toHaveBeenNthCalledWith(
      2,
      mockLocationNotFoundSummary.submissionId
    );
    expect(consoleLogSpy).toHaveBeenNthCalledWith(4, 'Heating Loss: ', 16412.5);
    expect(consoleLogSpy).toHaveBeenNthCalledWith(
      5,
      'Warning: ',
      'Could not find design region'
    );
  });

  it('should omit costs if there is no viable heat pump', () => {
    const consoleLogSpy = jest
      .spyOn(console, 'log')
      .mockImplementation(jest.fn());

    summaryOutput({
      ...mockValidSummary,
      recommendedHeatPump:
        'None of the available heat pumps are viable for this property.',
      costBreakdown: undefined,
      totalCostWithVAT: undefined
    });

    expect(consoleLogSpy).toHaveBeenCalledTimes(7);
    expect(consoleLogSpy).toHaveBeenNthCalledWith(
      2,
      mockValidSummary.submissionId
    );
    expect(consoleLogSpy).toHaveBeenNthCalledWith(
      7,
      'Recommended Heat Pump = ',
      'None of the available heat pumps are viable for this property.'
    );
  });
});
