import axios, { AxiosResponse } from 'axios';
import { getLocationData } from './get-location-data';
import { LocationData } from 'src/types';

/**
 * A function that retries the getLocationData function.
 * @param location - The location with which to call the location service API
 * @param retries - The number of retries (default 4)
 * @returns Location Data if valid location. Undefined, if 404.
 * @throws Error if the API call fails after all retries
 */

export const getLocationDataRetry = async (
  location: string,
  retries: number = 4
): Promise<AxiosResponse<LocationData> | undefined | void> => {
  let retryCount = 0;
  while (retryCount < retries) {
    try {
      const locationData = await getLocationData(location);
      return locationData;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        return undefined;
      }
      retryCount++;
      if (retryCount >= retries) {
        throw new Error((error as Error).message);
      }
      // If this was a genuine flaky API, probably an exponential backoff would make more sense, and a more reasonable delay to account for throttling
      await new Promise((resolve) => setTimeout(resolve, 200));
    }
  }
};
