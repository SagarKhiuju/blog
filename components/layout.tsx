'use client';
import React, { ReactNode } from 'react';

type LayoutProps = { children: ReactNode };

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white">
      {/* Main content */}
      <main className="flex-1 container">
        {children}
      </main>
    </div>
  );
}
