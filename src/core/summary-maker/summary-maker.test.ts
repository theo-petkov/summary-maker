import { makeSummary } from './summary-maker';
import { mockHouse, mockValidSummary } from 'src/_mocks';
import * as processHouseModule from 'src/core/process-house/process-house';
import * as summaryOutputModule from 'src/core/summary-output/summary-output';

jest.mock('src/core/process-house/process-house');
jest.mock('src/core/summary-output/summary-output');

describe('makeSummary', () => {
  beforeEach(() => {
    process.env.API_ENDPOINT = 'https://test-api-url.co.uk';
    process.env.API_KEY = 'test-api-key';
    jest.clearAllMocks();
  });

  it('should call processHouse and summaryOutput twice for valid summaries', async () => {
    const processHouseSpy = jest
      .spyOn(processHouseModule, 'processHouse')
      .mockResolvedValue(mockValidSummary);
    const summaryOutputSpy = jest
      .spyOn(summaryOutputModule, 'summaryOutput')
      .mockImplementation(jest.fn());

    await makeSummary([mockHouse, mockHouse]);

    expect(processHouseSpy).toHaveBeenCalledTimes(2);
    expect(summaryOutputSpy).toHaveBeenCalledTimes(2);
  });

  it('should call processHouse twice, and summaryOutput once, if one of the summaries fails', async () => {
    const consoleLogSpy = jest
      .spyOn(console, 'log')
      .mockImplementation(jest.fn());
    const processHouseSpy = jest
      .spyOn(processHouseModule, 'processHouse')
      .mockResolvedValueOnce(mockValidSummary)
      .mockRejectedValueOnce(new Error('Test error'));
    const summaryOutputSpy = jest
      .spyOn(summaryOutputModule, 'summaryOutput')
      .mockImplementation(jest.fn());

    await makeSummary([mockHouse, mockHouse]);

    expect(processHouseSpy).toHaveBeenCalledTimes(2);
    expect(summaryOutputSpy).toHaveBeenCalledTimes(1);
    expect(consoleLogSpy).toHaveBeenCalledWith(
      'Observability: Property 2 failed: ',
      new Error('Test error')
    );
  });
});
