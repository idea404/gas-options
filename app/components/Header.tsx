'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Cog6ToothIcon } from '@heroicons/react/24/outline';

export default function Header() {
  const pathname = usePathname();
  
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link 
            href="/" 
            className="text-xl font-semibold text-gray-900 hover:text-gray-700"
          >
            Gas Options
          </Link>
          
          <nav className="flex items-center space-x-4">
            <Link
              href="/settings"
              className={`p-2 rounded-full hover:bg-gray-100 ${
                pathname === '/settings' ? 'text-blue-600' : 'text-gray-600'
              }`}
            >
              <Cog6ToothIcon className="h-6 w-6" />
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
