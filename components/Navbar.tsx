'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'หน้าแรก', href: '/' },
    { name: 'แบบประเมิน', href: '/assessment' },
    { name: 'ข้อแนะนำการปฏิบัติตน', href: '/recommendations' },
  ];

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  return (
    <header className="bg-surface sticky top-0 z-50 h-20 border-b border-outline-variant/20 transition-all duration-300">
      <nav className="flex justify-between items-center w-full px-4 md:px-margin-desktop max-w-container-max mx-auto h-20">
        <Link href="/" className="font-headline-md text-headline-md font-bold text-primary cursor-pointer">
          Burnout check
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-8 items-center">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`font-body-md text-body-md transition-colors cursor-pointer pb-1 ${
                isActive(link.href)
                  ? 'text-primary font-bold border-b-2 border-primary'
                  : 'text-on-surface-variant hover:text-primary'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Mobile Toggle Button */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-primary focus:outline-none"
          aria-label="Toggle Menu"
        >
          <span className="material-symbols-outlined text-[28px]">
            {isOpen ? 'close' : 'menu'}
          </span>
        </button>
      </nav>

      {/* Mobile Drawer Dropdown */}
      {isOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-surface border-b border-outline-variant shadow-lg flex flex-col py-4 px-6 gap-4 z-40 animate-fade-in">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className={`font-body-md text-body-md py-2 transition-colors ${
                isActive(link.href)
                  ? 'text-primary font-bold border-l-4 border-primary pl-2'
                  : 'text-on-surface-variant hover:text-primary pl-2'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
