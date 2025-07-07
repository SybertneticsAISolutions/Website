'use client';

import Link from "next/link";
import { ArrowLeft, Home, Search, Bot, Zap, RefreshCw } from "lucide-react";
import { useState, useEffect } from "react";

export default function NotFound() {
  const [mounted, setMounted] = useState(false);
  const [glitchActive, setGlitchActive] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Trigger glitch effect every 3 seconds
    const interval = setInterval(() => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 200);
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);

  const suggestions = [
    { icon: Home, label: "Go Home", href: "/", color: "emerald" },
    { icon: Search, label: "Explore Solutions", href: "/solutions", color: "blue" },
    { icon: Bot, label: "About Us", href: "/about", color: "purple" },
    { icon: Zap, label: "Contact Us", href: "/contact", color: "amber" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-emerald-900 flex items-center justify-center p-4 overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {mounted && [...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto">
        {/* 404 with glitch effect */}
        <div className="relative mb-8">
          <h1 
            className={`text-9xl md:text-[12rem] font-black bg-gradient-to-r from-emerald-400 via-blue-400 to-purple-400 bg-clip-text text-transparent select-none transition-all duration-200 ${
              glitchActive ? 'animate-pulse blur-sm' : ''
            }`}
            style={{
              textShadow: glitchActive ? '2px 0 #ff0000, -2px 0 #00ffff' : 'none',
            }}
          >
            404
          </h1>
          
          {/* Glitch overlay effect */}
          {glitchActive && (
            <div className="absolute inset-0 text-9xl md:text-[12rem] font-black text-red-500 opacity-30 animate-pulse">
              404
            </div>
          )}
        </div>

        {/* Error message */}
        <div className="mb-12 space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Oops! Page Not Found
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Looks like this page got lost in the neural network. Don&apos;t worry—our AI 
            hasn&apos;t become sentient yet. Let&apos;s get you back to exploring our solutions.
          </p>
        </div>

        {/* Navigation suggestions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {suggestions.map((item, index) => {
            const Icon = item.icon;
            return (
              <Link
                key={index}
                href={item.href}
                className={`group relative overflow-hidden bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 hover:bg-white/20 transition-all duration-300 hover:scale-105 hover:rotate-1`}
              >
                <div className={`w-12 h-12 mx-auto mb-3 bg-gradient-to-br from-${item.color}-400 to-${item.color}-600 rounded-xl flex items-center justify-center group-hover:rotate-12 transition-transform duration-300`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <p className="text-white font-medium group-hover:text-emerald-300 transition-colors">
                  {item.label}
                </p>
                
                {/* Hover effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 via-emerald-500/10 to-emerald-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Link>
            );
          })}
        </div>

        {/* Additional actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/"
            className="group flex items-center space-x-2 bg-gradient-to-r from-emerald-500 to-blue-600 text-white px-8 py-4 rounded-full font-semibold hover:from-emerald-600 hover:to-blue-700 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-emerald-500/25"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span>Take Me Home</span>
          </Link>
          
          <button
            onClick={() => window.history.back()}
            className="group flex items-center space-x-2 bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-4 rounded-full font-semibold hover:bg-white/20 transition-all duration-300 hover:scale-105"
          >
            <RefreshCw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
            <span>Go Back</span>
          </button>
        </div>

        {/* Fun AI-themed message */}
        <div className="mt-12 p-6 bg-black/20 backdrop-blur-md border border-white/10 rounded-2xl max-w-md mx-auto">
          <div className="flex items-center justify-center mb-3">
            <Bot className="w-8 h-8 text-emerald-400 animate-bounce" />
          </div>
          <p className="text-gray-300 text-sm">
            <span className="text-emerald-400 font-medium">AI Tip:</span> While you&apos;re here, 
            did you know that our neural networks can process this error 1000x faster than 
            traditional systems? Pretty cool, right?
          </p>
        </div>

        {/* Brand logo */}
        <div className="mt-8 flex items-center justify-center space-x-2 opacity-60">
          <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">S</span>
          </div>
          <span className="text-white font-semibold text-xl">Sybertnetics AI Solutions</span>
        </div>
      </div>

      {/* CSS for additional effects */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
} 