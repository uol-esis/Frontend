'use client'

import React, { useState, useRef } from 'react';
import { href } from 'react-router-dom';
import { useKeycloak } from '@react-keycloak/web';
import { useAuthGuard } from './hooks/AuthGuard';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { ChevronUpIcon } from '@heroicons/react/24/outline';
import { useNavigate } from "react-router-dom";
import { UserCircleIcon } from '@heroicons/react/24/outline';

// Navigation items for the left section
const leftNavigation = [
  { name: 'Wiki', href: '/wiki' },
  { name: 'Metabase', href: import.meta.env.VITE_METABASE_ENDPOINT },
  { name: 'Feedback', href: '/feedback' },
];

// Navigation items for the right section
const rightNavigation = [
  { name: 'Login', href: '/login', onClick: null },
];

export default function Header() {
  const [isUserOpen, setIsUserOpen] = useState(false);
  const { keycloak, initialized } = useKeycloak();

  return (
    <header className="bg-gray-100 h-[10vh] sticky top-0 z-50 relative">
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
                target={item.name === 'Metabase' ? '_blank' : '_self'}
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

              {item.name === 'Login' ? (
                keycloak.authenticated ? (
                  <button
                    type='button'
                    className='text-black hover:text-blue-500'
                    onClick={() => { setIsUserOpen(!isUserOpen); }}
                  >
                    <div className='flex gap-1'>
                      {/* show username if logged in */}
                      <UserCircleIcon className='size-8' />
                    </div>

                  </button>
                ) : (
                  <button
                    type='button'
                    className='text-black hover:text-blue-500'
                    onClick={() => { keycloak.login() }}
                  >
                    Log in
                  </button>

                )
              ) : (
                item.name
              )}

            </React.Fragment>
          ))}
        </div>
      </nav>
      {isUserOpen && (
        <div
          id="user-popup"
          className="flex flex-col gap-4 absolute bg-white shadow-lg rounded-lg p-4 absolute right-0"
        >
          <div className='flex flex-col gap-2'>
            <p>Angemeldet als:</p>
            <p className='text-gray-500'>{keycloak.tokenParsed?.preferred_username}</p>
          </div>


          <button
            onClick={() => {
              keycloak.logout({
                redirectUri: window.location.origin
              });
            }}
            className=" p-5 rounded-md bg-gray-600 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Logout
          </button>
        </div>
      )}
    </header>
  );
}
