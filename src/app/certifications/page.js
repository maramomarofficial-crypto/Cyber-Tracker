"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function CertificationsPage() {
  const [certs, setCerts] = useState([]);
  const [newCertTitle, setNewCertTitle] = useState("");
  const [status, setStatus] = useState("planned");
  const [expiryDate, setExpiryDate] = useState("");
  const [loading, setLoading] = useState(true);

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

  const addCertification = async (e) => {
    e.preventDefault();
    if (!newCertTitle) return;

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      alert("Please log in first!");
      return;
    }

    const { error } = await supabase
      .from("certifications")
      .insert([
        { 
          title: newCertTitle, 
          status: status, // نستخدم القيمة المختارة من الـ select
          issuing_org: "Self-Study",
          user_id: user.id 
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
    // الخلفية فاتحة لتماثل باقي الصفحات
    <div className="min-h-screen bg-[#f8fafc] p-8">
      <div className="max-w-6xl mx-auto">
        <header className="mb-10">
          <h1 className="text-3xl font-bold text-[#0f172a]">
            Certifications <span className="text-blue-600">Tracker</span>
          </h1>
          <p className="text-gray-500 mt-2">Manage and track your professional achievements.</p>
        </header>

        {/* Form Section - تصميم يشبه الـ Search Bar في الـ Dashboard */}
        <form 
          onSubmit={addCertification} 
          className="mb-10 grid grid-cols-1 md:grid-cols-4 gap-4 bg-white p-6 rounded-2xl shadow-sm border border-gray-100"
        >
          <input 
            value={newCertTitle}
            onChange={(e) => setNewCertTitle(e.target.value)}
            placeholder="Certification Name (e.g. CCNA)"
            className="md:col-span-1 bg-[#f1f5f9] p-3 rounded-xl text-[#0f172a] outline-none focus:ring-2 focus:ring-blue-500/20 transition-all border-none placeholder:text-gray-400"
          />

          <select 
            value={status} 
            onChange={(e) => setStatus(e.target.value)}
            className="bg-[#f1f5f9] p-3 rounded-xl text-[#0f172a] outline-none focus:ring-2 focus:ring-blue-500/20 border-none cursor-pointer"
          >
            <option value="planned">Planned</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>

          <input 
            type="date" 
            value={expiryDate} 
            onChange={(e) => setExpiryDate(e.target.value)}
            className="bg-[#f1f5f9] p-3 rounded-xl text-[#0f172a] outline-none focus:ring-2 focus:ring-blue-500/20 border-none"
          />

          <button 
            type="submit" 
            className="bg-[#0f172a] text-white py-3 rounded-xl font-semibold hover:bg-[#1e293b] transition-all shadow-md shadow-blue-900/10 active:scale-95"
          >
            Add Goal
          </button>
        </form>

        {/* Certifications List */}
        {loading ? (
          <div className="flex justify-center py-20">
             <p className="text-gray-400 animate-pulse">Loading your goals...</p>
          </div>
        ) : certs.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-gray-200">
             <p className="text-gray-400">No certifications added yet. Start by adding one above!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certs.map((cert) => (
              <div 
                key={cert.id} 
                className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all group"
              >
                <h3 className="text-xl font-bold text-[#0f172a] mb-4 group-hover:text-blue-600 transition-colors">
                  {cert.title}
                </h3>
                <div className="flex justify-between items-center mt-auto">
                  <span className={`text-xs font-bold px-3 py-1.5 rounded-lg border ${
                    cert.status === 'Completed' 
                      ? 'bg-green-50 text-green-600 border-green-100' 
                      : cert.status === 'In Progress'
                      ? 'bg-blue-50 text-blue-600 border-blue-100'
                      : 'bg-orange-50 text-orange-600 border-orange-100'
                  }`}>
                    {cert.status.toUpperCase()}
                  </span>
                  <span className="text-xs text-gray-400 font-medium">
                    {new Date(cert.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}