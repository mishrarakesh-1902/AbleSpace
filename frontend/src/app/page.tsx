"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Triangle, Info } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleGuestLogin = () => {
    setLoading(true);
    // In a real app, you might hit the backend here to register a session.
    // For now, we'll just store a token in localStorage and redirect.
    localStorage.setItem("token", "guest-token");
    localStorage.setItem("user", JSON.stringify({ name: "Guest User", role: "guest" }));
    
    setTimeout(() => {
      router.push("/tasks");
    }, 500);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50/50 dark:bg-zinc-950 p-4">
      {/* Top Banner */}
      <div className="fixed top-0 left-0 right-0 w-full p-4 flex justify-center">
        <div className="border border-orange-500 rounded-md w-full max-w-4xl bg-white dark:bg-zinc-900 py-2 px-4 flex items-center justify-center space-x-2 text-sm font-medium">
          <div className="bg-black text-white p-1 rounded-sm"><Triangle size={14} className="fill-white" /></div>
          <span>Pyramid</span>
        </div>
      </div>

      {/* Login Card */}
      <div className="w-full max-w-[400px] bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-8 shadow-sm text-center">
        <h1 className="text-2xl font-bold mb-2">Let&apos;s get back on track</h1>
        <p className="text-gray-500 dark:text-gray-400 mb-8 text-sm">
          Enter your email below to login to your account.
        </p>

        <div className="flex flex-col gap-3">
          <button
            onClick={handleGuestLogin}
            disabled={loading}
            className="w-full bg-black hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90 text-white font-medium py-2.5 px-4 rounded-lg transition-colors flex items-center justify-center"
          >
            {loading ? "Loading..." : "Continue as Guest"}
          </button>
          
          <button
            className="w-full bg-white hover:bg-gray-50 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-black dark:text-white border border-gray-200 dark:border-zinc-700 font-medium py-2.5 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <svg viewBox="0 0 24 24" width="18" height="18" xmlns="http://www.w3.org/2000/svg">
              <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
                <path fill="#4285F4" d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z"/>
                <path fill="#34A853" d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z"/>
                <path fill="#FBBC05" d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z"/>
                <path fill="#EA4335" d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z"/>
              </g>
            </svg>
            Login with Google
          </button>
        </div>
      </div>

      <p className="mt-8 text-xs text-gray-500 max-w-[250px] text-center leading-relaxed">
        By clicking continue, you agree to our{" "}
        <a href="#" className="underline hover:text-gray-700">Terms of Service</a>{" "}
        and{" "}
        <a href="#" className="underline hover:text-gray-700">Privacy Policy</a>
      </p>
    </div>
  );
}
