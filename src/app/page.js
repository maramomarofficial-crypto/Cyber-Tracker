'use client';
import { ArrowRight, LayoutDashboard, Award, BookOpen, Code2 } from 'lucide-react';
import Link from 'next/link';

export default function LandingPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-8 relative overflow-hidden" style={{ background: '#EEF1F7' }}>
      
      {/* Background Decorative Elements */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full blur-[120px] opacity-20" style={{ background: '#92AAD1' }}></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] rounded-full blur-[100px] opacity-20" style={{ background: '#C5D0E6' }}></div>

      <div className="max-w-4xl w-full text-center z-10">
        {/* Logo Section */}
        <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full mb-8 shadow-sm border border-white/50 bg-white/30 backdrop-blur-md">
          <Code2 className="w-5 h-5 text-[#4C6180]" />
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#17202D]">EUE |Project </span>
        </div>

        {/* Hero Title */}
        <h1 className="text-7xl md:text-8xl font-black text-[#17202D] tracking-tighter leading-[0.9] mb-8">
          Cyber <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4C6180] to-[#92AAD1]">
            Tracker
          </span>
        </h1>

        <p className="text-xl text-[#303F55] font-medium max-w-2xl mx-auto mb-12 leading-relaxed">
          A high-fidelity academic portal for tracking software development progress, certifications, and networking labs.
        </p>

        {/* Navigation Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          <Link href="/login" className="glass-panel-btn">
            <LayoutDashboard className="w-5 h-5" /> Login 
          </Link>
          <Link href="/certifications" className="glass-panel-btn">
            <Award className="w-5 h-5" /> Certifications
          </Link>
          <Link href="/study-plan" className="glass-panel-btn">
            <BookOpen className="w-5 h-5" /> Study Plan
          </Link>
        </div>

        {/* Main CTA */}
        <Link href="/login">
          <button className="group relative px-12 py-5 rounded-[2rem] bg-[#17202D] text-white font-bold text-xl transition-all hover:scale-105 hover:shadow-[0_20px_40px_rgba(23,32,45,0.3)]">
            <span className="flex items-center gap-3">
              Get Started <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
            </span>
          </button>
        </Link>
      </div>

      {/* Footer Support */}
      <footer className="absolute bottom-8 text-[#6985AE] text-[10px] font-black uppercase tracking-widest">
        Designed with Figma AI • Built with Next.js • 2026
      </footer>

      <style jsx>{`
        .glass-panel-btn {
          @apply flex items-center justify-center gap-3 p-6 rounded-[2rem] bg-white/40 border border-white/60 backdrop-blur-md 
                 text-[#4C6180] font-bold text-sm transition-all hover:bg-white/80 hover:scale-[1.02] shadow-sm;
        }
      `}</style>
    </main>
  );
}