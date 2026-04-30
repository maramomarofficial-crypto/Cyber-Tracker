"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function CertificationsPage() {
  // 1. هنا بنعرف المتغيرات (States) اللي هتشيل البيانات في الصفحة
  const [certs, setCerts] = useState([]); // قائمة الشهادات
  const [newCertTitle, setNewCertTitle] = useState(""); // اسم الشهادة الجديدة
  const [status, setStatus] = useState("planned"); // الحالة (Planned, In Progress, etc.)
  const [expiryDate, setExpiryDate] = useState(""); // التاريخ
  const [loading, setLoading] = useState(true); // حالة التحميل

  // 3. جلب الشهادات من جدول certifications
  const fetchCerts = async () => {
  setLoading(true);
  const { data, error } = await supabase
    .from("certifications")
    .select("*")
    .order("created_at", { ascending: false });

  if (!error) setCerts(data);
  setLoading(false);
};

  useEffect(() => {
    fetchCerts();
  }, []);

  // 4. إضافة شهادة (Task) جديدة
  const addCertification = async (e) => {
  e.preventDefault();
  if (!newCertTitle) return;

  // 1. نجيب بيانات المستخدم اللي مسجل دخول دلوقتي
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    alert("Please log in first!");
    return;
  }

  // 2. نبعت الـ user_id مع البيانات عشان سوبابيز يوافق
  const { error } = await supabase
    .from("certifications")
    .insert([
      { 
        title: newCertTitle, 
        status: "planned",
        issuing_org: "Self-Study",
        user_id: user.id // السطر ده هو اللي هيحل مشكلة الـ Foreign Key
      }
    ]);

  if (error) {
    alert("Error: " + error.message);
  } else {
    setNewCertTitle("");
    fetchCerts();
  }
};
  return (
    <div className="p-8 max-w-6xl mx-auto">
      <header className="flex justify-between items-center mb-10">
        <h1 className="text-4xl font-extrabold text-white">Certifications <span className="text-accent-1">Tracker</span></h1>
      </header>

      {/* فورم الإضافة */}
     {/* فورم الإضافة المطور */}
<form onSubmit={addCertification} className="mb-10 grid grid-cols-1 md:grid-cols-4 gap-3 bg-card p-4 rounded-xl border border-white/10">
  
  {/* 1. خانة اسم الشهادة */}
  <input 
    value={newCertTitle}
    onChange={(e) => setNewCertTitle(e.target.value)}
    placeholder="Certification Name (e.g. CCNA)"
    className="bg-background p-3 rounded-lg border border-white/20 text-white outline-none focus:border-accent-1"
  />

  {/* 2. اختيار الحالة (Status) */}
  <select 
    value={status} 
    onChange={(e) => setStatus(e.target.value)}
    className="bg-background p-3 rounded-lg border border-white/20 text-white outline-none focus:border-accent-1"
  >
    <option value="planned">Planned</option>
    <option value="In Progress">In Progress</option>
    <option value="Completed">Completed</option>
  </select>

  {/* 3. خانة اختيار التاريخ (Date) */}
  <input 
    type="date" 
    value={expiryDate} 
    onChange={(e) => setExpiryDate(e.target.value)}
    className="bg-background p-3 rounded-lg border border-white/20 text-white outline-none focus:border-accent-1"
  />

  {/* 4. زرار الإضافة */}
  <button type="submit" className="bg-accent-1 py-3 rounded-lg font-bold hover:scale-105 transition-transform text-black">
    Add Goal
  </button>
</form>

      {/* قائمة الشهادات */}
      {loading ? (
        <p className="text-center text-gray-400">Loading your goals...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certs.map((cert) => (
            <div key={cert.id} className="p-6 bg-card rounded-2xl border-l-4 border-accent-1 shadow-lg hover:shadow-accent-1/10 transition-shadow">
              <h3 className="text-xl font-bold text-white mb-2">{cert.title}</h3>
              <div className="flex justify-between items-center">
                <span className="text-sm px-3 py-1 bg-accent-1/20 text-accent-1 rounded-full border border-accent-1/30">
                  {cert.status}
                </span>
                <span className="text-xs text-gray-500">
                  {new Date(cert.created_at).toLocaleDateString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}