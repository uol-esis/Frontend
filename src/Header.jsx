'use client'

import React from 'react';

// Navigation items for the left section
const leftNavigation = [];

// Navigation items for the right section
const rightNavigation = [
  { name: 'Docs', href: '/wiki' },
];

export default function Header() {
  return (
    <header className="bg-gray-100 h-[10vh] sticky top-0 z-50 relative">
      {/* Use a 4-column grid so left content spans 3/4 of the header width */}
      <nav aria-label="Global" className="grid grid-cols-4 w-full h-full items-center px-4">
        <div className="col-span-3 flex items-center gap-x-12">
          <a href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <img
              alt="Logo"
              src="prolificlogo.png"
              className="h-18 w-auto py-2 pl-5"
            />
          </a>
          <div className="flex gap-x-12">
            {leftNavigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-sm/6 font-semibold text-gray-900 flex items-center hover:scale-105 transition-transform"
              >
                {item.name}
                {item.name === 'Metabase' && (
                  <img
                    src="arrow-mb.svg"
                    alt="Metabase Icon"
                    className="inline-block ml-1"
                  />
                )}
              </a>
            ))}
          </div>
        </div>

        <div className="col-span-1 flex justify-end items-center gap-x-6 pr-5">
          {rightNavigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-sm/6 font-semibold text-gray-900 flex items-center hover:scale-105 transition-transform"
            >
              {item.name}
              {item.name === 'Metabase' && (
                <img
                  src="arrow-mb.svg"
                  alt="Metabase Icon"
                  className="inline-block ml-1"
                />
              )}
            </a>
          ))}
        </div>
      </nav>
    </header>
  );
}
