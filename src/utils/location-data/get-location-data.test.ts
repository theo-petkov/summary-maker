import { getLocationData } from './get-location-data';
import { mockLocationData } from 'src/_mocks';
import axios from 'axios';

describe('getLocationData', () => {
  beforeEach(() => {
    process.env.API_ENDPOINT = 'https://test-api-url.co.uk';
    process.env.API_KEY = 'test-api-key';
    jest.clearAllMocks();
  });
  it('should return location data, provided a valid location where data exists', async () => {
    jest.spyOn(axios, 'get').mockResolvedValueOnce({
      data: mockLocationData,
      status: 200
    });
    const response = await getLocationData(mockLocationData.location.location);
    expect(response.data).toEqual(mockLocationData);
  });

  it('should throw an error if the API endpoint is not found', async () => {
    delete process.env.API_ENDPOINT;
    await expect(
      getLocationData(mockLocationData.location.location)
    ).rejects.toThrow('API endpoint not found');
  });

  it('should throw an error if the API key is not found', async () => {
    delete process.env.API_KEY;
    await expect(
      getLocationData(mockLocationData.location.location)
    ).rejects.toThrow('API key not found');
  });
});
