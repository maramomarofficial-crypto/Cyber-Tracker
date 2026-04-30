"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // 1. فانكشن تسجيل الدخول
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    
    if (error) {
      alert("Error: " + error.message);
    } else {
      router.push("/dashboard"); // التحويل للـ Dashboard بعد النجاح
    }
    setLoading(false);
  };

  // 2. فانكشن إنشاء حساب جديد
// 2. فانكشن إنشاء حساب جديد
const handleSignUp = async (e) => {
  // بنمنع الصفحة إنها تعمل Refresh لو الفانكشن مستدعاة من Form
  if (e && e.preventDefault) e.preventDefault(); 

  const { data, error } = await supabase.auth.signUp({
    email: email,      // تأكدي إن المتغير email فيه قيمة من الـ State
    password: password, // تأكدي إن المتغير password فيه قيمة من الـ State
  });

  if (error) {
    alert("Error: " + error.message);
  } else {
    alert("Check your email or try to login!");
  }
};

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <form onSubmit={handleLogin} className="p-8 bg-card rounded-2xl shadow-xl w-full max-w-md border border-white/10">
        <h1 className="text-3xl font-bold text-accent-1 mb-6 text-center">Cyber Tracker</h1>
        
        <div className="space-y-4">
          <input 
            type="email" 
            placeholder="Email Address" 
            required
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 rounded-lg bg-background border border-white/20 text-white focus:border-accent-1 outline-none"
          />
          <input 
            type="password" 
            placeholder="Password" 
            required
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 rounded-lg bg-background border border-white/20 text-white focus:border-accent-1 outline-none"
          />
          
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-accent-1 hover:bg-accent-1/80 text-white font-bold py-3 rounded-lg transition-all"
          >
            {loading ? "Processing..." : "Login to Portal"}
          </button>
        </div>

        <p className="mt-6 text-center text-gray-400 text-sm">
          Don't have an account?{" "}
          <button type="button" onClick={handleSignUp} className="text-accent-1 underline">
            Create Account
          </button>
        </p>
      </form>
    </div>
  );
}