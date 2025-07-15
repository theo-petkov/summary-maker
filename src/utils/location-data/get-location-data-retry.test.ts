import { getLocationDataRetry } from './get-location-data-retry';
import * as getLocationData from './get-location-data';
import { mockLocationData } from 'src/_mocks';
import { AxiosResponse } from 'axios';

jest.mock('./get-location-data');

describe('getLocationDataRetry', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('should return location data, given a valid input, and a working API', async () => {
    const getLocationDataSpy = jest
      .spyOn(getLocationData, 'getLocationData')
      .mockResolvedValue({
        data: mockLocationData,
        status: 200
      } as AxiosResponse);

    const locationData = await getLocationDataRetry('Some Location');

    expect(locationData).toEqual({
      data: mockLocationData,
      status: 200
    });
    expect(getLocationDataSpy).toHaveBeenCalledTimes(1);
  });

  it('should return undefined if the location service returns a 404', async () => {
    const getLocationDataSpy = jest
      .spyOn(getLocationData, 'getLocationData')
      .mockRejectedValue({
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

    const locationData = await getLocationDataRetry('Some Location');

    expect(locationData).toBeUndefined();
    expect(getLocationDataSpy).toHaveBeenCalledTimes(1);
  });

  it('should try 4 times if the location service returns an error other than a 404', async () => {
    const errorResponse = {
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
    };
    const getLocationDataSpy = jest
      .spyOn(getLocationData, 'getLocationData')
      .mockRejectedValueOnce(errorResponse)
      .mockRejectedValueOnce(errorResponse)
      .mockRejectedValueOnce(errorResponse)
      .mockResolvedValueOnce({
        data: mockLocationData,
        status: 200
      } as AxiosResponse);

    const locationData = await getLocationDataRetry('Some Location');

    expect(locationData).toEqual({
      data: mockLocationData,
      status: 200
    });
    expect(getLocationDataSpy).toHaveBeenCalledTimes(4);
  });

  it('should throw if all the retries are errors', async () => {
    const errorResponse = {
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
    };
    jest
      .spyOn(getLocationData, 'getLocationData')
      .mockRejectedValue(errorResponse);

    await expect(getLocationDataRetry('Some Location')).rejects.toThrow(
      'Request failed with status code 418'
    );
    expect(getLocationData.getLocationData).toHaveBeenCalledTimes(4);
  });
});
