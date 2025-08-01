import { Suspense, use } from 'react';
import { getPackageDetails, type PackageDetailsData } from '@/lib/data';

function Details({
  detailsPromise,
}: {
  detailsPromise: Promise<PackageDetailsData>;
}) {
  const details = use(detailsPromise);

  return (
    <div className="mt-4 p-4 bg-gray-100 rounded-lg">
      <h4 className="font-bold text-lg">{details.title}</h4>
      <ul className="list-disc list-inside mt-2 text-gray-700">
        {details.details.map((detail) => (
          <li key={detail}>{detail}</li>
        ))}
      </ul>
    </div>
  );
}

export function PackageDetails({ packageId }: { packageId: string }) {
  const detailsPromise = getPackageDetails(packageId);
  return (
    <Suspense
      fallback={<div className="text-center p-4">Loading details...</div>}
    >
      <Details detailsPromise={detailsPromise} />
    </Suspense>
  );
}
