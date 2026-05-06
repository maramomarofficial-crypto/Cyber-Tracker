'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase'; 
import QuickNote from '@/components/QuickNote';

export default function DashboardPage() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [loading, setLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, mins: 0, secs: 0 });
  const [targetDate, setTargetDate] = useState(null);

  useEffect(() => {
    fetchTasks();
    fetchLatestCertDate();
  }, []);

  const fetchTasks = async () => {
    const { data, error } = await supabase
      .from('study_plan')
      .select('*')
      .order('created_at', { ascending: false });
    if (!error) setTasks(data || []);
    setLoading(false);
  };

  const addTask = async (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;
    
    const { data, error } = await supabase
      .from('study_plan')
      .insert([{ title: newTask, completed: false }]) 
      .select();

    if (!error) {
      setTasks([data[0], ...tasks]);
      setNewTask('');
    }
  };

  const toggleTask = async (id, currentStatus) => {
    const { error } = await supabase
      .from('study_plan')
      .update({ completed: !currentStatus }) 
      .eq('id', id);

    if (!error) {
      setTasks(tasks.map(t => t.id === id ? { ...t, completed: !currentStatus } : t));
    }
  };

  const fetchLatestCertDate = async () => {
    const { data, error } = await supabase
      .from('exam_dates') 
      .select('exam_date')
      .gt('exam_date', new Date().toISOString())
      .order('exam_date', { ascending: true })
      .limit(1);

    if (!error && data.length > 0) {
      setTargetDate(new Date(data[0].exam_date));
    }
  };

  useEffect(() => {
    if (!targetDate) return;

    const timer = setInterval(() => {
      const now = new Date();
      const difference = targetDate - now;

      if (difference <= 0) {
        clearInterval(timer);
      } else {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          mins: Math.floor((difference / 1000 / 60) % 60),
          secs: Math.floor((difference / 1000) % 60),
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="p-8 bg-[#F8FAFC] min-h-screen">
      <h1 className="text-3xl font-black mb-8 text-[#0F044C]">Welcome back, Maram! 👋</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* EL left Side F DASHBOARD */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* 1. Study Progress */}
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Study Progress</h2>
            <form onSubmit={addTask} className="flex gap-2 mb-6">
              <input 
                type="text" 
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                placeholder="Add task to study plan..."
                className="flex-1 bg-[#F1F5F9] p-3 rounded-2xl outline-none"
              />
              <button type="submit" className="bg-[#0F044C] text-white px-6 rounded-2xl font-bold">Add</button>
            </form>

            <div className="space-y-4">
              {tasks.slice(0, 5).map(task => (
                <div key={task.id} className="flex items-center gap-4 p-4 bg-[#F1F5F9] rounded-2xl">
                  <input 
                    type="checkbox" 
                    checked={task.completed} 
                    onChange={() => toggleTask(task.id, task.completed)} 
                    className="w-5 h-5 accent-[#0F044C] cursor-pointer" 
                  />
                  <span className={task.completed ? 'line-through text-gray-400' : ''}>{task.title}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 2. Completed & Active */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-[#E2F1E7] p-8 rounded-3xl">
              <p className="text-sm font-bold text-gray-500 uppercase">Completed</p>
              <p className="text-5xl font-black text-gray-800">18</p>
            </div>
            <div className="bg-[#FFF4E0] p-8 rounded-3xl">
              <p className="text-sm font-bold text-gray-500 uppercase">Active</p>
              <p className="text-5xl font-black text-gray-800">11</p>
            </div>
          </div>

          {/* 3. Quick Note */}
          <div className="mt-8">
            <QuickNote />
          </div>
        </div>

        {/* EL Right Side */}
        <div className="space-y-8">
          
          {/* Calendar */}
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 text-center">
            <h2 className="text-lg font-bold mb-4 text-gray-800">April 2026</h2>
            <div className="grid grid-cols-7 gap-2 text-xs font-bold text-gray-400 mb-4">
              <span>MO</span><span>TU</span><span>WE</span><span>TH</span><span>FR</span><span>SA</span><span>SU</span>
            </div>
            <div className="grid grid-cols-7 gap-2">
              {[...Array(30)].map((_, i) => (
                <div key={i} className={`p-2 text-sm rounded-full ${i === 29 ? 'bg-[#0F044C] text-white' : 'text-gray-600'}`}>{i+1}</div>
              ))}
            </div>
          </div>

          {/* Countdown */}
          <div className="bg-gradient-to-br from-[#0F044C] to-[#363062] p-8 rounded-3xl text-white shadow-xl">
            <h3 className="text-xs font-bold opacity-70 mb-2 uppercase">Next Certification</h3>
            <p className="text-xl font-bold mb-8">Exam Countdown</p>
            <div className="flex justify-between items-center bg-white/10 p-4 rounded-2xl backdrop-blur-md">
              <div className="text-center">
                <span className="block text-2xl font-black">{timeLeft.days}</span>
                <span className="text-[10px] opacity-60">DAYS</span>
              </div>
              <div className="text-center">
                <span className="block text-2xl font-black">{timeLeft.hours}</span>
                <span className="text-[10px] opacity-60">HRS</span>
              </div>
              <div className="text-center">
                <span className="block text-2xl font-black">{timeLeft.mins}</span>
                <span className="text-[10px] opacity-60">MINS</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}