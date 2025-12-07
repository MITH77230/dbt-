import React, { ReactNode } from 'react';

interface DashboardLayoutProps {
  title: string;
  userRole: string;
  userName: string;
  sidebar: ReactNode;
  onNavigate: (page: string) => void;
  children: ReactNode;
}

export default function DashboardLayout({
  title,
  userRole,
  userName,
  sidebar,
  onNavigate,
  children,
}: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-gray-800 shadow-lg flex flex-col">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="text-lg font-bold text-[#002147]">{title}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">{userRole}</div>
        </div>
        <nav className="flex-1 overflow-y-auto">{sidebar}</nav>
        <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-900 text-center">
          <div className="text-sm font-semibold text-[#002147]">{userName}</div>
          <button
            onClick={() => onNavigate('landing')}
            className="mt-2 px-3 py-1 rounded bg-[#002147] text-white text-sm hover:bg-[#003366]"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
