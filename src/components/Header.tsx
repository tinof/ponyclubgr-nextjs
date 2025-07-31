import React from 'react';
export function Header() {
  return <header className="flex justify-between items-start px-2 pt-4 relative">
      <div className="flex items-center space-x-3">
        <div className="bg-white p-2 rounded-full shadow-soft border border-[#e0e8e0]">
          <svg className="h-10 w-10 text-[#5a6f5a]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M6.75 6.75C6.75 5.097 8.097 3.75 9.75 3.75H12.75C14.403 3.75 15.75 5.097 15.75 6.75V17.25C15.75 18.903 14.403 20.25 12.75 20.25H9.75C8.097 20.25 6.75 18.903 6.75 17.25V6.75Z" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M9 9.75H14.25" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M9 14.25H14.25" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M18.75 9.75H19.5C20.328 9.75 21 10.422 21 11.25V12.75C21 13.578 20.328 14.25 19.5 14.25H18.75" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Pony Club</h1>
          <p className="text-sm text-gray-500">Acheron River, Greece</p>
        </div>
      </div>
      {/* Decorative element */}
      <div className="absolute top-0 right-0 h-16 w-16 bg-[#f0f3f0] rounded-full -z-10 opacity-70 translate-x-1/4 -translate-y-1/4"></div>
    </header>;
}