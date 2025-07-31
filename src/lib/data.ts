import { cache } from 'react';

export interface PackageDetailsData {
  id: string;
  title: string;
  details: string[];
}

// This function simulates a network request
export const getPackageDetails = cache(
  (packageId: string): Promise<PackageDetailsData> =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id: packageId,
          title: 'Rafting & Riding',
          details: [
            'Professional guide included',
            'All safety equipment provided',
            'Suitable for all ages',
          ],
        });
      }, 1500);
    })
);
