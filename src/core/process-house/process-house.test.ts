import { AxiosResponse } from 'axios';
import { processHouse } from './process-house';
import {
  mockHouse,
  mockLocationData,
  mockLocationNotFoundSummary,
  mockValidSummary
} from 'src/_mocks';
import * as locationService from 'src/utils/location-data/get-location-data';

jest.mock('src/utils/location-data/get-location-data');

describe('processHouse', () => {
  beforeEach(() => {
    process.env.API_ENDPOINT = 'https://test-api-url.co.uk';
    process.env.API_KEY = 'some-api-key';
    process.env.VAT_PERCENTAGE = '5';
    jest.clearAllMocks();
  });
  it('should return a valid summary, given a valid input and a successful call to the location api', async () => {
    jest.spyOn(locationService, 'getLocationData').mockResolvedValue({
      data: mockLocationData,
      status: 200
    } as AxiosResponse);

    const validSummary = await processHouse(mockHouse);
    expect(validSummary).toEqual(mockValidSummary);
  });

  it('should return a location not found summary, given a 404 response from the location service', async () => {
    jest.spyOn(locationService, 'getLocationData').mockRejectedValue({
      request: {},
      message: 'Request failed with status code 404',
      name: 'AxiosError',
      isAxiosError: true,
      response: {
        data: {
          error: 'Unknown Location'
        },
        status: 404
      }
    });

    const locationNotFoundSummary = await processHouse(mockHouse);
    expect(locationNotFoundSummary).toEqual(mockLocationNotFoundSummary);
  });

  it('should throw an error if the location API completely fails, after all the retries', async () => {
    jest.spyOn(locationService, 'getLocationData').mockRejectedValue({
      request: {},
      message: 'Request failed with status code 418',
      name: 'AxiosError',
      isAxiosError: true,
      response: {
        data: {
          error: 'Critical teapot error, please try again'
        },
        status: 418
      }
    });

    await expect(processHouse(mockHouse)).rejects.toThrow(
      'Request failed with status code 418'
    );
    expect(locationService.getLocationData).toHaveBeenCalledTimes(4);
  });

  it('should return a response with no recommended heat pump if no heat pump is viable', async () => {
    jest.spyOn(locationService, 'getLocationData').mockResolvedValue({
      data: mockLocationData,
      status: 200
    } as AxiosResponse);

    const validSummary = await processHouse({
      ...mockHouse,
      floorArea: 100000
    });
    expect(validSummary).toEqual({
      submissionId: '4cb3820a-7bf6-47f9-8afc-3adcac8752cd',
      estimatedHeatLoss: 13130000,
      designRegion: 'Severn Valley (Filton)',
      powerHeatLoss: 5287.96,
      recommendedHeatPump:
        'None of the available heat pumps are viable for this property.',
      costBreakdown: undefined,
      totalCostWithVAT: undefined
    });
  });
});
