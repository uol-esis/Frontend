'use client'

import React, { useState, useRef } from 'react';
import { href } from 'react-router-dom';

// Navigation items for the left section
const leftNavigation = [
  { name: 'Wiki', href: '/wiki' },
  { name: 'Edit', href: '/edit' },
  { name: 'Metabase', href: import.meta.env.VITE_METABASE_ENDPOINT },
  { name: 'Feedback' , href: '/feedback'},
];

// Navigation items for the right section
const rightNavigation = [
  { name: 'Einstellungen', href: '#', onClick: null },
  { name: 'User', href: '#', onClick: null },
  { name: 'Login', href: '/login' },
];

export default function Header() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isUserOpen, setIsUserOpen] = useState(false);

  const [settingsPopupPos, setSettingsPopupPos] = useState({ top: 0, right: 0 });
  const [userPopupPos, setUserPopupPos] = useState({ top: 0, right: 0 });

  const settingsPopupRef = useRef(null);
  const userPopupRef = useRef(null);

  function openSettingsPopup(event) {
    event.preventDefault();
    const rect = event.target.getBoundingClientRect();
    setSettingsPopupPos({ top: rect.bottom + 5, right: 0 });
    setIsSettingsOpen(true);
  }

  function openUserPopup(event) {
    event.preventDefault();
    const rect = event.target.getBoundingClientRect();
    setUserPopupPos({ top: rect.bottom + 5, right: 0 });
    setIsUserOpen(true);
  }

  function closeSettingsPopup() {
    setIsSettingsOpen(false);
  }

  function closeUserPopup() {
    setIsUserOpen(false);
  }

  rightNavigation[0].onClick = openSettingsPopup;
  rightNavigation[1].onClick = openUserPopup;

  return (
    <header className="bg-gray-100 h-[10vh] sticky top-0 z-50">
      <nav aria-label="Global" className="flex w-full h-full items-center justify-between px-4">
        <div className="flex items-center gap-x-12">
          <a href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <img
              alt="Logo"
              src="logo.png"
              className="h-8 w-auto"
            />
          </a>
          <div className="flex gap-x-12">
            {leftNavigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                target={item.name === 'Metabase' || 'Feedback' ? '_blank' : '_self'}
                rel={item.name === 'Metabase' ? 'noopener noreferrer' : undefined}
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
        <div className="flex items-center gap-x-6">
          {rightNavigation.map((item, index) => (
            <React.Fragment key={item.name}>
              {index === 2 && (
                <span className="border-l border-gray-400 h-6 mx-2"></span>
              )}
              <a
                href={item.href}
                onClick={item.onClick}
                className={`text-sm/6 font-semibold hover:scale-105 transition-transform ${item.name === 'Login' ? 'text-blue-500' : 'text-gray-900'}`}
              >
                {item.name === 'Einstellungen' ? (
                  <img
                    src="einstellungen.svg"
                    alt="Einstellungen"
                    className="inline-block"
                  />
                ) : (
                  item.name
                )}
              </a>
            </React.Fragment>
          ))}
        </div>
      </nav>
      {isSettingsOpen && (
        <div
          ref={settingsPopupRef}
          id="settings-popup"
          style={{ top: settingsPopupPos.top, right: settingsPopupPos.right }}
          className="absolute bg-white shadow-lg rounded-lg p-4"
        >
          <h2>Hier kommen die Einstellungen hin</h2>
          <button onClick={closeSettingsPopup} className="mt-4 bg-blue-500 text-white p-2 rounded">
            Schließen
          </button>
        </div>
      )}
      {isUserOpen && (
        <div
          ref={userPopupRef}
          id="user-popup"
          style={{ top: userPopupPos.top, right: userPopupPos.right }}
          className="absolute bg-white shadow-lg rounded-lg p-4"
        >
          <h2>Hier kommt der User hin</h2>
          <button onClick={closeUserPopup} className="mt-4 bg-blue-500 text-white p-2 rounded">
            Schließen
          </button>
        </div>
      )}
    </header>
  );
}
