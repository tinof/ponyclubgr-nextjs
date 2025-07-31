# Step 5: Basic Error Handling (Medium Priority)

## Objective
Implement a basic error handling strategy using a React Error Boundary. This will prevent the entire application from crashing due to a JavaScript error in a single component, providing a better user experience.

## Prerequisites
- Completion of Step 4 (Caching and Lazy Loading).

## Task Details
**Effort**: 3 hours
**Impact**: Medium
**Files to be modified**:
- `src/app/layout.tsx` (update)
- `src/components/ErrorBoundary.tsx` (new file)

## Implementation Steps

### Step 5.1: Create the ErrorBoundary Component

Create a new file `src/components/ErrorBoundary.tsx` with a class component that will catch JavaScript errors in its child component tree.

**File**: `src/components/ErrorBoundary.tsx`
```typescript
'use client'

import { Component, ReactNode } from 'react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error('Error caught by boundary:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center p-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Something went wrong</h2>
            <p className="text-gray-600 mb-4">We're sorry for the inconvenience. Please try again.</p>
            <button
              onClick={() => this.setState({ hasError: false })}
              className="bg-[#5a6f5a] text-white px-6 py-2 rounded-lg hover:bg-opacity-90 transition"
            >
              Try again
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
```

### Step 5.2: Wrap the Application in the ErrorBoundary

Update `src/app/layout.tsx` to import and use the `ErrorBoundary` component, wrapping the main content of the application.

**File**: `src/app/layout.tsx`
```typescript
// Make sure to import the Poppins font and metadata as in the previous step
import { Poppins } from 'next/font/google'
import type { Metadata } from 'next'
import '../index.css'
import { ErrorBoundary } from '../components/ErrorBoundary'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-poppins',
})

export const metadata: Metadata = {
  // ... (keep existing metadata)
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={poppins.variable}>
      <body className="font-sans">
        <ErrorBoundary>
          <div id="root">{children}</div>
        </ErrorBoundary>
      </body>
    </html>
  )
}
```

## Verification
1.  **Build and run the application:**
    ```bash
    npm run build
    npm run dev
    ```
2.  **Manual Check**: The application should load and function as expected. To test the error boundary, you can temporarily introduce an error in one of the components (e.g., `throw new Error('Test Error')` in `WelcomeSection.tsx`) and verify that the fallback UI is displayed instead of a crashed application. Remember to remove the test error afterward.

## Rollback Procedure
If you encounter issues, revert the changes:
```bash
git checkout HEAD~1 -- src/app/layout.tsx
rm src/components/ErrorBoundary.tsx
npm install
