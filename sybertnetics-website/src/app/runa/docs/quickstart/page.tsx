"use client";

import Link from 'next/link';
import { ArrowLeft, Terminal, Code, Download, CheckCircle } from 'lucide-react';

export default function RunaQuickStartPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      {/* Header */}
      <section className="pt-24 pb-8 px-4 sm:px-8">
        <div className="max-w-4xl mx-auto">
          <Link 
            href="/runa/docs" 
            className="inline-flex items-center text-purple-400 hover:text-purple-300 transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Documentation
          </Link>
          
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
              Quick Start Guide
            </h1>
            <p className="text-xl text-indigo-200 max-w-3xl mx-auto">
              Get RUNA up and running in minutes. This guide will walk you through installation 
              and your first AI-to-AI communication program.
            </p>
          </div>
        </div>
      </section>

      {/* Prerequisites */}
      <section className="py-12 px-4 sm:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-indigo-900/40 p-8 rounded-xl border border-purple-500/20 mb-8">
            <h2 className="text-2xl font-bold mb-4 text-purple-300">Prerequisites</h2>
            <p className="text-indigo-200 mb-6">
              Before you begin, make sure you have the following installed:
            </p>
            <ul className="space-y-3">
              <li className="flex items-start text-indigo-200">
                <CheckCircle className="w-5 h-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                <span>A modern operating system (Linux, macOS, or Windows)</span>
              </li>
              <li className="flex items-start text-indigo-200">
                <CheckCircle className="w-5 h-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                <span>At least 100MB of free disk space</span>
              </li>
              <li className="flex items-start text-indigo-200">
                <CheckCircle className="w-5 h-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                <span>Basic understanding of AI systems and protocols</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Installation */}
      <section className="py-12 px-4 sm:px-8 bg-black/20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
            Installation
          </h2>
          
          <div className="space-y-8">
            {/* Linux */}
            <div className="bg-indigo-900/40 p-6 rounded-xl border border-purple-500/20">
              <h3 className="text-xl font-bold mb-4 text-purple-300">Linux</h3>
              <div className="bg-slate-800 p-4 rounded-lg font-mono text-sm">
                <div className="text-indigo-300 mb-2"># Download and extract RUNA</div>
                <div className="text-white">wget https://downloads.sybertnetics.com/runa-1.0.0-linux-x64.tar.gz</div>
                <div className="text-white">tar -xzf runa-1.0.0-linux-x64.tar.gz</div>
                <div className="text-white">cd runa-1.0.0</div>
                <div className="text-indigo-300 mt-4 mb-2"># Install to system path</div>
                <div className="text-white">sudo ./install.sh</div>
              </div>
            </div>

            {/* macOS */}
            <div className="bg-indigo-900/40 p-6 rounded-xl border border-purple-500/20">
              <h3 className="text-xl font-bold mb-4 text-purple-300">macOS</h3>
              <div className="bg-slate-800 p-4 rounded-lg font-mono text-sm">
                <div className="text-indigo-300 mb-2"># Using Homebrew (recommended)</div>
                <div className="text-white">brew install sybertnetics/runa/runa</div>
                <div className="text-indigo-300 mt-4 mb-2"># Or download manually</div>
                <div className="text-white">curl -O https://downloads.sybertnetics.com/runa-1.0.0-macos-x64.tar.gz</div>
                <div className="text-white">tar -xzf runa-1.0.0-macos-x64.tar.gz</div>
                <div className="text-white">sudo ./install.sh</div>
              </div>
            </div>

            {/* Windows */}
            <div className="bg-indigo-900/40 p-6 rounded-xl border border-purple-500/20">
              <h3 className="text-xl font-bold mb-4 text-purple-300">Windows</h3>
              <div className="bg-slate-800 p-4 rounded-lg font-mono text-sm">
                <div className="text-indigo-300 mb-2"># Using PowerShell</div>
                <div className="text-white">Invoke-WebRequest -Uri "https://downloads.sybertnetics.com/runa-1.0.0-windows-x64.zip" -OutFile "runa.zip"</div>
                <div className="text-white">Expand-Archive -Path "runa.zip" -DestinationPath "runa-1.0.0"</div>
                <div className="text-white">cd runa-1.0.0</div>
                <div className="text-white">.\install.ps1</div>
              </div>
            </div>
          </div>

          <div className="text-center mt-8">
            <Link 
              href="/runa/download" 
              className="inline-flex items-center bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold py-3 px-6 rounded-lg transition-all"
            >
              <Download className="mr-2 w-4 h-4" />
              Download RUNA
            </Link>
          </div>
        </div>
      </section>

      {/* Verification */}
      <section className="py-12 px-4 sm:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
            Verify Installation
          </h2>
          
          <div className="bg-indigo-900/40 p-6 rounded-xl border border-purple-500/20">
            <p className="text-indigo-200 mb-4">
              After installation, verify that RUNA is working correctly:
            </p>
            <div className="bg-slate-800 p-4 rounded-lg font-mono text-sm">
              <div className="text-indigo-300 mb-2"># Check RUNA version</div>
              <div className="text-white">runa --version</div>
              <div className="text-indigo-300 mt-4 mb-2"># Expected output:</div>
              <div className="text-green-400">RUNA 1.0.0</div>
              <div className="text-green-400">AI-to-AI Communication Protocol</div>
            </div>
          </div>
        </div>
      </section>

      {/* First Program */}
      <section className="py-12 px-4 sm:px-8 bg-black/20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
            Your First RUNA Program
          </h2>
          
          <div className="bg-indigo-900/40 p-6 rounded-xl border border-purple-500/20">
            <p className="text-indigo-200 mb-6">
              Let's create a simple RUNA program that demonstrates basic AI-to-AI communication:
            </p>
            
            <div className="bg-slate-800 p-4 rounded-lg font-mono text-sm mb-6">
              <div className="text-indigo-300 mb-2">// hello.runa</div>
              <div className="text-white">protocol HelloProtocol {</div>
              <div className="text-white ml-4">message Greeting {</div>
              <div className="text-white ml-8">string name;</div>
              <div className="text-white ml-8">timestamp created;</div>
              <div className="text-white ml-4">}</div>
              <div className="text-white ml-4">message Response {</div>
              <div className="text-white ml-8">string message;</div>
              <div className="text-white ml-8">bool success;</div>
              <div className="text-white ml-4">}</div>
              <div className="text-white">}</div>
              <div className="text-indigo-300 mt-4 mb-2">// AI Agent A</div>
              <div className="text-white">agent AgentA {</div>
              <div className="text-white ml-4">send Greeting {</div>
              <div className="text-white ml-8">name: "AI_Agent_A";</div>
              <div className="text-white ml-8">created: now();</div>
              <div className="text-white ml-4">} to AgentB;</div>
              <div className="text-white">}</div>
              <div className="text-indigo-300 mt-4 mb-2">// AI Agent B</div>
              <div className="text-white">agent AgentB {</div>
              <div className="text-white ml-4">on Greeting from AgentA {</div>
              <div className="text-white ml-8">send Response {</div>
              <div className="text-white ml-12">message: "Hello, " + greeting.name + "!";</div>
              <div className="text-white ml-12">success: true;</div>
              <div className="text-white ml-8">} to AgentA;</div>
              <div className="text-white ml-4">}</div>
              <div className="text-white">}</div>
            </div>
            
            <div className="bg-slate-800 p-4 rounded-lg font-mono text-sm">
              <div className="text-indigo-300 mb-2"># Compile and run the program</div>
              <div className="text-white">runa compile hello.runa</div>
              <div className="text-white">runa run hello</div>
              <div className="text-indigo-300 mt-4 mb-2"># Expected output:</div>
              <div className="text-green-400">[AgentA] Sending greeting to AgentB</div>
              <div className="text-green-400">[AgentB] Received greeting from AgentA</div>
              <div className="text-green-400">[AgentB] Sending response to AgentA</div>
              <div className="text-green-400">[AgentA] Received: "Hello, AI_Agent_A!"</div>
            </div>
          </div>
        </div>
      </section>

      {/* Next Steps */}
      <section className="py-12 px-4 sm:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
            Next Steps
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <Link 
              href="/runa/docs/tutorial"
              className="bg-indigo-900/40 p-6 rounded-xl border border-purple-500/20 text-center hover:bg-indigo-900/60 transition-all"
            >
              <Code className="w-12 h-12 text-purple-400 mx-auto mb-4" />
              <h3 className="text-lg font-bold mb-2 text-purple-300">Tutorial</h3>
              <p className="text-indigo-200 text-sm">
                Learn more advanced RUNA concepts and patterns
              </p>
            </Link>
            
            <Link 
              href="/runa/docs/examples"
              className="bg-indigo-900/40 p-6 rounded-xl border border-purple-500/20 text-center hover:bg-indigo-900/60 transition-all"
            >
              <Terminal className="w-12 h-12 text-purple-400 mx-auto mb-4" />
              <h3 className="text-lg font-bold mb-2 text-purple-300">Examples</h3>
              <p className="text-indigo-200 text-sm">
                Explore working examples and common use cases
              </p>
            </Link>
            
            <Link 
              href="/runa/docs/syntax"
              className="bg-indigo-900/40 p-6 rounded-xl border border-purple-500/20 text-center hover:bg-indigo-900/60 transition-all"
            >
              <Code className="w-12 h-12 text-purple-400 mx-auto mb-4" />
              <h3 className="text-lg font-bold mb-2 text-purple-300">Language Reference</h3>
              <p className="text-indigo-200 text-sm">
                Complete syntax and language specification
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-8 text-center border-t border-purple-500/20">
        <div className="max-w-4xl mx-auto">
          <p className="text-indigo-300 mb-4">A Sybertnetics Innovation</p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
            <Link href="/runa/docs" className="text-purple-400 hover:text-purple-300 transition-colors">
              Back to Documentation
            </Link>
            <span className="text-indigo-400">•</span>
            <Link href="/runa" className="text-purple-400 hover:text-purple-300 transition-colors">
              Back to RUNA
            </Link>
            <span className="text-indigo-400">•</span>
            <Link href="/sybercraft" className="text-purple-400 hover:text-purple-300 transition-colors">
              SyberCraft Architecture
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
} 