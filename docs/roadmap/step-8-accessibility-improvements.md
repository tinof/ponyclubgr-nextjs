# Step 8: Accessibility Improvements (Medium Priority)

## Objective
Enhance the application's accessibility (a11y) to ensure it is usable by people with disabilities, including those who rely on screen readers and keyboard navigation. This involves adding ARIA attributes, ensuring proper semantic HTML, and providing features like skip navigation links.

## Prerequisites
- Completion of Step 7 (React Compiler Setup).

## Task Details
**Effort**: 4 hours
**Impact**: Medium
**Files to be modified**:
- `src/components/BottomNav.tsx`
- `src/app/layout.tsx`
- `src/App.tsx`

## Implementation Steps

### Step 8.1: Improve BottomNav Accessibility

Update `src/components/BottomNav.tsx` to include proper roles, ARIA attributes, and keyboard event handling for better screen reader and keyboard-only user support.

**File**: `src/components/BottomNav.tsx`
```typescript
import React, { useState } from 'react';
import { Home, Map as MapIcon, Phone, Tag, Waves, Menu } from 'lucide-react';

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
}

function NavItem({ icon, label, active = false, onClick }: NavItemProps) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center p-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-[#5a6f5a] focus:ring-offset-2 ${
        active
          ? 'text-[#5a6f5a] bg-[#f0f3f0]'
          : 'text-gray-500 hover:text-[#5a6f5a] hover:bg-[#f0f3f0]/50'
      }`}
      aria-label={label}
      aria-current={active ? 'page' : undefined}
      role="tab"
      tabIndex={0}
    >
      {icon}
      <span className="text-xs mt-1 font-medium">{label}</span>
    </button>
  );
}

export function BottomNav() {
  const [moreMenuOpen, setMoreMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Home');

  const handleTabChange = (tabName: string) => {
    setActiveTab(tabName);
    // Add navigation logic here
  };

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-[calc(24rem-2rem)] z-50">
      <nav
        className="bg-white/90 backdrop-blur-md rounded-2xl shadow-premium flex items-center justify-around p-2 border border-white/40"
        role="tablist"
        aria-label="Main navigation"
      >
        <NavItem
          icon={<Home size={20} />}
          label="Home"
          active={activeTab === 'Home'}
          onClick={() => handleTabChange('Home')}
        />
        <NavItem
          icon={<MapIcon size={20} />}
          label="Map"
          active={activeTab === 'Map'}
          onClick={() => handleTabChange('Map')}
        />
        <NavItem
          icon={<Waves size={20} />}
          label="Activities"
          active={activeTab === 'Activities'}
          onClick={() => handleTabChange('Activities')}
        />
        <NavItem
          icon={<Tag size={20} />}
          label="Offers"
          active={activeTab === 'Offers'}
          onClick={() => handleTabChange('Offers')}
        />

        <div className="relative">
          <button
            onClick={() => setMoreMenuOpen(!moreMenuOpen)}
            className="flex flex-col items-center p-2 rounded-lg text-gray-500 hover:text-[#5a6f5a] hover:bg-[#f0f3f0]/50 transition-colors focus:outline-none focus:ring-2 focus:ring-[#5a6f5a] focus:ring-offset-2"
            aria-label="More options"
            aria-expanded={moreMenuOpen}
            aria-haspopup="true"
          >
            <Menu size={20} />
            <span className="text-xs mt-1 font-medium">More</span>
          </button>

          {moreMenuOpen && (
            <div
              className="absolute bottom-full mb-2 right-0 bg-white rounded-lg shadow-premium border border-white/40 py-2 min-w-[120px]"
              role="menu"
              aria-label="Additional options"
            >
              <button
                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-[#f0f3f0] focus:outline-none focus:bg-[#f0f3f0]"
                role="menuitem"
                onClick={() => setMoreMenuOpen(false)}
              >
                <Phone size={16} className="inline mr-2" />
                Contact
              </button>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
}
```

### Step 8.2: Add a Skip Navigation Link

Update `src/app/layout.tsx` to include a "skip to main content" link. This is crucial for keyboard users to bypass repetitive navigation links.

**File**: `src/app/layout.tsx`
```typescript
// Assuming previous imports (Poppins, ErrorBoundary, etc.) are present
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={poppins.variable}>
      <body className="font-sans">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-[#5a6f5a] text-white px-4 py-2 rounded-lg z-50 focus:outline-none focus:ring-2 focus:ring-white"
        >
          Skip to main content
        </a>
        <ErrorBoundary>
          <div id="root">{children}</div>
        </ErrorBoundary>
      </body>
    </html>
  )
}
```

### Step 8.3: Use Semantic HTML in the Main App Component

Update `src/App.tsx` to use the `<main>` HTML element for the primary content area, which helps screen readers identify the main section of the page.

**File**: `src/App.tsx`
```typescript
import React from 'react';
import { Header } from './components/Header';
import { WelcomeSection } from './components/WelcomeSection';
import { PackageCards } from './components/PackageCards';
import { BottomNav } from './components/BottomNav';

export default function App() {
  return (
    <div className="bg-[#f5f7f5] min-h-screen flex justify-center items-center p-4 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#e0e8e0] rounded-full opacity-30 -translate-y-1/2 translate-x-1/2 blur-3xl" aria-hidden="true" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-[#d8e5d8] rounded-full opacity-30 translate-y-1/2 -translate-x-1/2 blur-3xl" aria-hidden="true" />

      <div className="max-w-sm mx-auto bg-[#f8faf8] rounded-[2rem] shadow-premium p-4 flex flex-col min-h-[80vh] relative z-10 border border-white/40">
        <Header />
        <main id="main-content" className="flex-grow space-y-6 pt-6 pb-20">
          <WelcomeSection />
          <PackageCards />
        </main>
        <BottomNav />
      </div>
    </div>
  );
}
```

## Verification
1.  **Build and run the application.**
2.  **Keyboard Navigation**: Use the `Tab` key to navigate through the application. Ensure all interactive elements (buttons, links) are focusable and that the "Skip to main content" link appears and works correctly.
3.  **Screen Reader**: Use a screen reader (like VoiceOver on macOS, NVDA on Windows) to navigate the app. Verify that button labels and roles are announced correctly.
4.  **Lighthouse Audit**: Run a Lighthouse audit in Chrome DevTools and check the Accessibility score.

## Rollback Procedure
If issues arise, revert the changes to the modified files:
```bash
git checkout HEAD~1 -- src/components/BottomNav.tsx src/app/layout.tsx src/App.tsx
