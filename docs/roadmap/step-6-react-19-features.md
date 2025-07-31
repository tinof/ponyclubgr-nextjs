# Step 6: React 19 Features (`useOptimistic`, `use`)

## Objective
Leverage new React 19 hooks like `useOptimistic` for instant UI feedback and `use` for simplified data fetching. This will create a more responsive, modern, and maintainable application.

## Prerequisites
- Completion of Step 5 (Basic Error Handling).

## Task Details
**Effort**: 6 hours
**Impact**: High
**Files to be modified**:
- `src/components/PackageCards.tsx`
- `src/lib/data.ts` (new file)
- `src/components/PackageDetails.tsx` (new file to demonstrate `use`)

## Implementation Steps

### Step 6.1: Update PackageCards to use `useOptimistic`

Modify `src/components/PackageCards.tsx` to manage booking state optimistically. The UI will update instantly when a user clicks "Book Now," showing a loading state, while the actual (simulated) API call happens in the background.

**File**: `src/components/PackageCards.tsx`
```typescript
'use client'

import React, { useOptimistic, useTransition } from 'react';
import { ImageSlider } from './ImageSlider';
import { Waves, Mountain, Clock, Star } from 'lucide-react';

// ... (rest of the component remains the same as the original step 5)
interface BookingState {
  packageId: string | null;
  isBooking: boolean;
}

export function PackageCards() {
  const [isPending, startTransition] = useTransition();
  const [optimisticBooking, addOptimisticBooking] = useOptimistic<BookingState, string>(
    { packageId: null, isBooking: false },
    (state, packageId) => ({ packageId, isBooking: true })
  );

  const handleBooking = (packageId: string) => {
    addOptimisticBooking(packageId);
    startTransition(async () => {
      // Simulate booking API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      // Reset optimistic state after "booking"
      addOptimisticBooking('');
    });
  };

  const isPackageBooking = (packageId: string) =>
    optimisticBooking.isBooking && optimisticBooking.packageId === packageId;

  return (
    <div className="space-y-8 px-3">
      {/* Package 1 */}
      <div className="bg-white rounded-3xl shadow-premium overflow-hidden border border-white/40 relative">
        <div className="absolute top-4 left-0 bg-[#5a6f5a] text-white text-xs font-semibold py-1 px-4 rounded-r-full z-10 shadow-md">
          Family Favorite
        </div>
        <div className="relative h-56">
          <ImageSlider
            images={['https://lh3.googleusercontent.com/aida-public/AB6AXuAy3muCIwLH4QIsLcENlnaAFxf6WymQV6e7hg1mWJln8NSXX2Tq-ZIVhTru0CyCLLsFpoD007GKZZhwI-ECuigvHRaSUEgDLNdXZo-uvPJqzgkdidtj6SHZmzXbhTAAGwY2Fko47FiEr3wyzUJYzhsfQWgVM2T660pFmZ-_Rvr3I--Z7mlGqLuf3JGa50TPsfZb3671Av0SKdb65snYwBlOksS2Tjmk-fdl_UAm3R86gQ5b5kY7T9UV5tAh76LaNqmA89nDKzkZVdtg']}
            alt="People rafting down a river"
          />
        </div>
        <div className="p-5">
          <div className="flex justify-between items-center mb-2">
            <p className="text-sm font-medium uppercase tracking-wider text-gray-500">
              Package 1
            </p>
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={14} fill="#FFD700" stroke="#FFD700" />
              ))}
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-800">Rafting & Riding</h3>
          <div className="mt-3 space-y-2 text-sm text-gray-600">
            <div className="flex items-center">
              <Waves className="text-[#5a6f5a] mr-2" size={20} />
              <span>Rafting: 30 minutes</span>
            </div>
            <div className="flex items-center">
              <Clock className="text-[#5a6f5a] mr-2" size={20} />
              <span>Riding: 10-15 minutes</span>
            </div>
            <div className="flex items-center">
              <Mountain className="text-[#5a6f5a] mr-2" size={20} />
              <span>Hiking canyon crossing</span>
            </div>
          </div>
          <div className="flex justify-between items-center mt-4">
            <div>
              <p className="text-2xl font-bold text-gray-800">20 EUR</p>
              <p className="text-sm text-gray-500">per person</p>
            </div>
            <button
              onClick={() => handleBooking('package-1')}
              disabled={isPending || isPackageBooking('package-1')}
              className="bg-[#5a6f5a] text-white font-bold py-3 px-6 rounded-xl text-base hover:bg-opacity-90 transition shadow-md disabled:opacity-50 disabled:cursor-not-allowed min-w-[120px]"
            >
              {isPackageBooking('package-1') ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Booking...
                </div>
              ) : (
                'Book Now'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
```

### Step 6.2: Implement Data Fetching with `use`

Create a mock data-fetching function and a new component to demonstrate how the `use` hook simplifies reading data from a Promise within a component.

**1. Create a data-fetching utility (new file):**

**File**: `src/lib/data.ts`
```typescript
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
```

**2. Create a component that uses the `use` hook (new file):**

**File**: `src/components/PackageDetails.tsx`
```typescript
import { use, Suspense } from 'react';
import { getPackageDetails, PackageDetailsData } from '@/lib/data';

function Details({ detailsPromise }: { detailsPromise: Promise<PackageDetailsData> }) {
  const details = use(detailsPromise);

  return (
    <div className="mt-4 p-4 bg-gray-100 rounded-lg">
      <h4 className="font-bold text-lg">{details.title}</h4>
      <ul className="list-disc list-inside mt-2 text-gray-700">
        {details.details.map((detail, i) => (
          <li key={i}>{detail}</li>
        ))}
      </ul>
    </div>
  );
}

export function PackageDetails({ packageId }: { packageId: string }) {
  const detailsPromise = getPackageDetails(packageId);
  return (
    <Suspense fallback={<div className="text-center p-4">Loading details...</div>}>
      <Details detailsPromise={detailsPromise} />
    </Suspense>
  );
}
```
*Note: You would then use `<PackageDetails packageId="package-1" />` within another component to see this in action.*

## Verification
1.  **Optimistic UI**: Verify that the "Book Now" button behavior from the previous step still works as expected.
2.  **Data Fetching with `use`**: Add the `<PackageDetails />` component to a page. Verify that the "Loading details..." fallback is shown first, followed by the fetched details after a 1.5-second delay. The `use` hook will automatically handle the promise resolution within the `Suspense` boundary.

## Rollback Procedure
If issues arise, revert the changes:
```bash
git checkout HEAD~1 -- src/components/PackageCards.tsx
rm src/lib/data.ts src/components/PackageDetails.tsx
