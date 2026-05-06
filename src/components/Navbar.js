'use client';
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center p-6 bg-white sticky top-0 z-50 border-b border-gray-100 shadow-sm">
      {/* ESM EL WEB */}
      <Link href="/" className="text-2xl font-black text-[#0F044C] hover:opacity-80 transition-opacity">
        Cyber Tracker
      </Link>

      {/* EL PAGES LINK */}
      <div className="hidden md:flex gap-8 font-bold text-[#0F044C]">
        <Link href="/dashboard" className="hover:text-gray-500 transition-colors">
          Dashboard
        </Link>
        <Link href="/certifications" className="hover:text-gray-500 transition-colors">
          Certifications
        </Link>
        <Link href="/study-plan" className="hover:text-gray-500 transition-colors">
          Study Plan
        </Link>
      </div>

      {/* EL LOG IN */}
      <div className="flex items-center">
        <Link 
          href="/login" 
          className="bg-[#0F044C] text-white px-8 py-2.5 rounded-full font-bold hover:scale-105 transition-transform active:scale-95 shadow-md"
        >
          Log In
        </Link>
      </div>
    </nav>
  );
}