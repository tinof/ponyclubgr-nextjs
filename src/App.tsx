import React from 'react';
import { Header } from './components/Header';
import { WelcomeSection } from './components/WelcomeSection';
import { PackageCards } from './components/PackageCards';
import { BottomNav } from './components/BottomNav';
export default function App() {
  return <div className="bg-[#f5f7f5] min-h-screen flex justify-center items-center p-4 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#e0e8e0] rounded-full opacity-30 -translate-y-1/2 translate-x-1/2 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-[#d8e5d8] rounded-full opacity-30 translate-y-1/2 -translate-x-1/2 blur-3xl" />
      <div className="max-w-sm mx-auto bg-[#f8faf8] rounded-[2rem] shadow-premium p-4 flex flex-col min-h-[80vh] relative z-10 border border-white/40">
        <Header />
        <main className="flex-grow space-y-6 pt-6 pb-20">
          <WelcomeSection />
          <PackageCards />
        </main>
        <BottomNav />
      </div>
    </div>;
}