import type { LocationData } from 'src/types';
import { AxiosResponse } from 'axios';
import axios from 'axios';

/**
 * Obtain heating degree days and ground temperature for a given location.
 * @param location - The location for which the data is needed.
 * @returns Axios Response containing the data about the requested location
 * @example getLocationData('Borders (Boulmer)')
 */
export const getLocationData = async (
  location: string
): Promise<AxiosResponse<LocationData>> => {
  // The below values would normally be obtained via a secure store
  const apiEndpoint = process.env.API_ENDPOINT;
  const apiKey = process.env.API_KEY;

  if (!apiEndpoint) {
    throw new Error('API endpoint not found');
  }
  if (!apiKey) {
    throw new Error('API key not found');
  }
  return await axios.get(`${apiEndpoint}?location=${location}`, {
    headers: {
      'x-api-key': apiKey
    }
  });
};
