'use client';
import { CheckCircle2, Circle, BookOpen, Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { supabase } from '@/supabaseClient'; 

export default function StudyPlanPage() {
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStudyPlan() {
      try {
       
       const { data, error } = await supabase 
      .from('study_plan')                 
      .select('*')                         
      .order('created_at', { ascending: true });

        if (error) throw error;
        setModules(data || []);
      } catch (error) {
        console.error('Error fetching data:', error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchStudyPlan();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#EEF1F7]">
        <Loader2 className="w-10 h-10 animate-spin text-[#4C6180]" />
      </div>
    );
  }


  return (
    <main className="min-h-screen pt-20 px-8 pb-12" style={{ background: '#EEF1F7' }}>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-12">
          <div className="p-4 bg-[#17202D] rounded-3xl text-white">
            <BookOpen className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-4xl font-black tracking-tighter text-[#17202D]">STUDY-PLAN</h1>
            <p className="text-[#6985AE] font-bold text-sm uppercase tracking-widest">Academic Roadmap 2026</p>
          </div>
        </div>

        {/* List of Tasks */}
        <div className="space-y-6">
          {modules.length > 0 ? modules.map((item, index) => (
            <div 
              key={item.id}
              className="flex items-center gap-6 p-2 pr-8 rounded-[3.5rem] transition-all hover:translate-x-2 shadow-sm"
              style={{
                background: item.completed ? 'rgba(255, 255, 255, 0.6)' : 'rgba(255, 255, 255, 0.9)',
                border: '1px solid rgb(98, 97, 97)',
                backdropFilter: 'blur(8px)'
              }}
            >
              {/* Index Number */}
              <div className="w-20 h-20 rounded-[2.5rem] flex items-center justify-center text-2xl font-black text-white shadow-lg"
                   style={{ background: item.completed ? '#4C6180' : '#92AAD1' }}>
                {index + 1}
              </div>

              {/* Task Details */}
              <div className="flex-1">
                <h3 className="text-xl font-black text-[#17202D]">{item.title}</h3>
                <p className="text-[#6985AE] text-sm font-medium">
                  {item.completed ? 'Task completed successfully' : 'Status: In Progress'}
                </p>
              </div>

              {/* Status Icon */}
              <div>
                {item.completed ? (
                  <CheckCircle2 className="w-8 h-8 text-green-500" />
                ) : (
                  <div className="w-8 h-8 rounded-full border-4 border-[#92AAD1] border-t-transparent animate-spin"></div>
                )}
              </div>
            </div>
          )) : (
            <div className="text-center p-12 bg-white/50 rounded-[3rem] border border-dashed border-[#92AAD1]">
              <p className="text-[#4C6180] font-bold">No tasks found. Check your Supabase table.</p>
            </div>
          )}
        </div>

        {/* Footer Card */}
        <div className="mt-12 p-8 rounded-[3rem] text-center shadow-2xl" style={{ background: 'linear-gradient(135deg, #17202D 0%, #303F55 100%)' }}>
          <p className="text-[#92AAD1] font-bold text-sm mb-2 uppercase">Next Milestone</p>
          <h2 className="text-white text-2xl font-black">Final Project Submission</h2>
        </div>
      </div>
    </main>
  );
}