import Link from "next/link";
import { ArrowRight, Brain, Zap, Shield } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-emerald-900">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-black/20 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-blue-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">S</span>
              </div>
              <span className="font-semibold text-xl">
                <span className="text-blue-400">Syber</span>
                <span className="text-emerald-400">t</span>
                <span className="text-white">netics</span>
              </span>
            </div>
            <div className="hidden md:flex space-x-8">
              <Link href="/home" className="text-white/80 hover:text-white transition-colors">
                Home
              </Link>
              <Link href="/solutions" className="text-white/80 hover:text-white transition-colors">
                Solutions
              </Link>
              <Link href="/about" className="text-white/80 hover:text-white transition-colors">
                About
              </Link>
              <Link href="/contact" className="text-white/80 hover:text-white transition-colors">
                Contact
              </Link>
            </div>
            <Link 
              href="/contact" 
              className="bg-gradient-to-r from-emerald-500 to-blue-600 text-white px-6 py-2 rounded-full hover:from-emerald-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            {/* Hero Badge */}
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8">
              <Zap className="w-4 h-4 text-emerald-400 mr-2" />
              <span className="text-white/90 text-sm font-medium">
                Revolutionary AI Solutions
              </span>
            </div>

            {/* Main Headline */}
                        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              The Future of{" "}
              <span className="inline-block">
                <span className="bg-gradient-to-r from-emerald-400 to-emerald-600 bg-clip-text text-transparent">
                  Artificial
                </span>
                <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                  {" "}Intelligence
                </span>
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-xl md:text-2xl text-white/80 mb-12 max-w-4xl mx-auto leading-relaxed">
                              Pioneering next-generation AI systems that redefine what&apos;s possible. 
              Our groundbreaking technology delivers unprecedented capabilities 
              through innovative methodologies and ethical design.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <Link 
                href="/solutions" 
                className="group bg-gradient-to-r from-emerald-500 to-blue-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-emerald-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 flex items-center"
              >
                Explore Solutions
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                href="/about" 
                className="border-2 border-white/30 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white/10 transition-all duration-300 backdrop-blur-sm"
              >
                Learn More
              </Link>
            </div>

            {/* Feature Cards */}
            <div className="grid md:grid-cols-3 gap-8 mt-20">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300">
                <Brain className="w-12 h-12 text-emerald-400 mb-4 mx-auto" />
                <h3 className="text-xl font-semibold text-white mb-3">Advanced Reasoning</h3>
                <p className="text-white/70">
                  Cutting-edge AI systems with sophisticated reasoning capabilities 
                  that adapt and learn from complex scenarios.
                </p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300">
                <Zap className="w-12 h-12 text-blue-400 mb-4 mx-auto" />
                <h3 className="text-xl font-semibold text-white mb-3">Lightning Fast</h3>
                <p className="text-white/70">
                  Optimized architectures delivering exceptional performance 
                  with minimal computational overhead.
                </p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300">
                <Shield className="w-12 h-12 text-blue-400 mb-4 mx-auto" />
                <h3 className="text-xl font-semibold text-white mb-3">Ethical by Design</h3>
                <p className="text-white/70">
                  Built with responsible AI principles at the core, 
                  ensuring safe and beneficial outcomes.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA Section */}
        <div className="bg-black/30 backdrop-blur-sm border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-white mb-4">
                Ready to Transform Your Business?
              </h2>
              <p className="text-white/80 mb-8 max-w-2xl mx-auto">
                Join forward-thinking organizations leveraging our AI solutions 
                to unlock new possibilities and drive innovation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  href="/contact" 
                  className="bg-gradient-to-r from-emerald-500 to-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:from-emerald-600 hover:to-blue-700 transition-all duration-300"
                >
                  Start Your Journey
                </Link>
                <Link 
                  href="/careers" 
                  className="border border-white/30 text-white px-8 py-3 rounded-full font-semibold hover:bg-white/10 transition-all duration-300"
                >
                  Join Our Team
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
