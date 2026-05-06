"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    
    if (error) {
      alert("Error: " + error.message);
    } else {
      router.push("/dashboard"); 
    }
    setLoading(false);
  };

  const handleSignUp = async (e) => {
    if (e && e.preventDefault) e.preventDefault(); 
    const { error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) {
      alert("Error: " + error.message);
    } else {
      alert("Check your email or try to login!");
    }
  };

  return (
    
    <div className="flex items-center justify-center min-h-screen bg-[#f8fafc]">
      {/* form */}
      <form 
        onSubmit={handleLogin} 
        className="p-10 bg-white rounded-3xl shadow-xl shadow-blue-900/5 w-full max-w-md border border-gray-100"
      >
        <h1 className="text-4xl font-extrabold text-[#0f172a] mb-2 text-center">Cyber Tracker</h1>
        <p className="text-gray-400 text-center mb-8 font-medium">Welcome back! Please enter your details.</p>
        
        <div className="space-y-5">
          {/* frame login*/}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-[#0f172a] ml-1">Email Address</label>
            <input 
              type="email" 
              placeholder="maram@eue.edu.eg" 
              required
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-4 rounded-xl bg-[#f1f5f9] border-2 border-transparent text-[#0f172a] focus:border-[#0f172a] focus:bg-white outline-none transition-all placeholder:text-gray-400"
            />
          </div>

          {/* frame pass */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-[#0f172a] ml-1">Password</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              required
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-4 rounded-xl bg-[#f1f5f9] border-2 border-transparent text-[#0f172a] focus:border-[#0f172a] focus:bg-white outline-none transition-all placeholder:text-gray-400"
            />
          </div>
          
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-[#0f172a] hover:bg-[#1e293b] text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-blue-900/10 active:scale-[0.98] mt-2"
          >
            {loading ? "Processing..." : "Login to Portal"}
          </button>
        </div>

        <p className="mt-8 text-center text-gray-500 text-sm font-medium">
          Don't have an account?{" "}
          <button 
            type="button" 
            onClick={handleSignUp} 
            className="text-blue-600 hover:text-blue-700 font-bold underline underline-offset-4"
          >
            Create Account
          </button>
        </p>
      </form>
    </div>
  );
}