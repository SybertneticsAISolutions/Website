import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Download, ExternalLink, FileText, BookOpen, GraduationCap } from 'lucide-react'

export const metadata: Metadata = {
  title: 'SyberCraft LLM Architecture - Sybertnetics',
  description: 'Comprehensive whitepaper detailing the SyberCraft specialized model structure and AI governance framework.',
  keywords: 'SyberCraft, LLM, AI architecture, artificial intelligence, specialized models, AI governance, federated architecture',
}

export default function SybercraftPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <div className="bg-black/20 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link 
              href="/"
              className="flex items-center space-x-2 text-white/80 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Home</span>
            </Link>
            <div className="flex items-center space-x-4">
              <a 
                href="/docs/Sybertnetics/A%20Federated%20Architecture%20for%20Safe%20AI.pdf"
                download
                className="flex items-center space-x-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>Download Research Paper</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Title Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            SyberCraft
          </h1>
          <p className="text-xl md:text-2xl text-white/80 max-w-4xl mx-auto">
            A Federated, Domain-Specific Architecture for Safe and Scalable Artificial Intelligence
          </p>
          <div className="mt-8 flex items-center justify-center space-x-4 text-white/60">
            <span>Version 1.0</span>
            <span>•</span>
            <span>Last Updated: August 4, 2025</span>
          </div>
        </div>

        {/* Executive Summary */}
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 mb-12 border border-white/10">
          <h2 className="text-3xl font-bold text-white mb-6">Executive Summary</h2>
          <p className="text-lg text-white/80 leading-relaxed mb-6">
            The prevailing paradigm in artificial intelligence development is the pursuit of monolithic, general-purpose models. 
            This approach is inefficient, unsafe, and fundamentally misaligned with the nature of complex intelligence. 
            Sybertnetics introduces the SyberCraft Architecture, a revolutionary new model based on a "Federation of Specialists."
          </p>
          <p className="text-lg text-white/80 leading-relaxed mb-6">
            This architecture comprises a vast ecosystem of 147 highly specialized AI agents, each a master of its own domain, 
            operating in perfect synchrony through our open AI-to-AI language, Runa. Governed by a dedicated AI-driven C-Suite 
            that enforces ethics, security, and strategic alignment, the SyberCraft platform represents a new foundation for 
            building safe, hyper-efficient, and truly scalable artificial intelligence.
          </p>
          <p className="text-lg text-white/80 leading-relaxed">
            The architecture prioritizes ethical AI governance, security, and scalability, 
            providing a foundation for next-generation AI applications across industries.
          </p>
        </div>

        {/* Research & Publications Section */}
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 mb-12 border border-white/10">
          <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
            <GraduationCap className="w-8 h-8 mr-3 text-blue-400" />
            Research & Publications
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl p-6 border border-white/10">
              <div className="flex items-start justify-between mb-4">
                <FileText className="w-8 h-8 text-blue-400" />
                <span className="text-sm text-white/60 bg-white/10 px-2 py-1 rounded">18 pages</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Academic Research Paper</h3>
              <p className="text-white/80 mb-4">
                "A Federated, Domain-Specific Architecture for Safe and Scalable Artificial Intelligence" - 
                A comprehensive academic paper presenting the theoretical foundations and technical implementation 
                of the SyberCraft architecture.
              </p>
              <a 
                href="/docs/Sybertnetics/A%20Federated%20Architecture%20for%20Safe%20AI.pdf"
                download
                className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>Download PDF</span>
              </a>
            </div>

            <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-xl p-6 border border-white/10">
              <div className="flex items-start justify-between mb-4">
                <BookOpen className="w-8 h-8 text-green-400" />
                <span className="text-sm text-white/60 bg-white/10 px-2 py-1 rounded">Executive</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Executive Summary</h3>
              <p className="text-white/80 mb-4">
                "SyberCraft White Paper" - A concise overview of the SyberCraft architecture, 
                highlighting key principles, components, and benefits for business and technical audiences.
              </p>
              <a 
                href="/docs/Sybertnetics/SyberCraft%20White%20Paper.pdf"
                download
                className="inline-flex items-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>Download PDF</span>
              </a>
            </div>
          </div>
        </div>

        {/* Core Systems Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {/* Core Intelligence & AI Governance */}
          <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl p-6 border border-white/10">
            <h3 className="text-xl font-bold text-white mb-4">Core Intelligence & AI Governance</h3>
            <ul className="space-y-2 text-white/80">
              <li>• Hermod - AI Architect & Developer</li>
              <li>• Odin - AI Oversight & Task Management</li>
              <li>• Nemesis - AI Compliance & Security</li>
              <li>• Skuld - Performance Optimizer</li>
              <li>• Harmonia - Diplomatic Governor</li>
            </ul>
          </div>

          {/* Financial & Economic AI */}
          <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-xl p-6 border border-white/10">
            <h3 className="text-xl font-bold text-white mb-4">Financial & Economic AI</h3>
            <ul className="space-y-2 text-white/80">
              <li>• Plutus - Financial AI & Transactions</li>
              <li>• Janus - Economic Forecasting</li>
            </ul>
          </div>

          {/* Administrative & Infrastructure */}
          <div className="bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-xl p-6 border border-white/10">
            <h3 className="text-xl font-bold text-white mb-4">Administrative & Infrastructure</h3>
            <ul className="space-y-2 text-white/80">
              <li>• Hestia - Administrative Automation</li>
              <li>• Hermes - Logistics & Communications</li>
            </ul>
          </div>

          {/* Construction & Engineering */}
          <div className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-xl p-6 border border-white/10">
            <h3 className="text-xl font-bold text-white mb-4">Construction & Engineering</h3>
            <ul className="space-y-2 text-white/80">
              <li>• Hephaestus - Construction & Civil Engineering</li>
              <li>• Themis - Legal Automation & Compliance</li>
            </ul>
          </div>

          {/* Government & Security */}
          <div className="bg-gradient-to-br from-red-500/20 to-pink-500/20 rounded-xl p-6 border border-white/10">
            <h3 className="text-xl font-bold text-white mb-4">Government & Security</h3>
            <ul className="space-y-2 text-white/80">
              <li>• Aegis - National Defense & Cybersecurity</li>
              <li>• Ares - Military Logistics & Strategy</li>
            </ul>
          </div>

          {/* Transportation & Mobility */}
          <div className="bg-gradient-to-br from-indigo-500/20 to-blue-500/20 rounded-xl p-6 border border-white/10">
            <h3 className="text-xl font-bold text-white mb-4">Transportation & Mobility</h3>
            <ul className="space-y-2 text-white/80">
              <li>• Sleipnir - Autonomous Vehicle Systems</li>
              <li>• Baldur - Public Transit & Infrastructure</li>
            </ul>
          </div>
        </div>

        {/* Detailed Architecture */}
        <div className="space-y-12">
          <section className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
            <h2 className="text-3xl font-bold text-white mb-6">Core Intelligence & AI Governance</h2>
            
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-blue-400 mb-4">1. Hermod - AI Architect & Developer</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-white/80">
                  <div>
                    <h4 className="font-semibold text-white mb-2">Coding LLM</h4>
                    <p>Advanced code generation across multiple languages, framework adaptation, API integration, and self-modifying code capabilities</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-2">System Architecture LLM</h4>
                    <p>Complex system design, architectural pattern implementation, scalability planning, and technical debt assessment</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-2">Research Integration LLM</h4>
                    <p>Scientific paper analysis, cutting-edge innovation assessment, and implementation of novel AI techniques</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-2">Documentation & Knowledge LLM</h4>
                    <p>Technical writing, versioning systems, knowledge representation, and comprehensive documentation generation</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-purple-400 mb-4">2. Odin - AI Oversight & Task Management</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-white/80">
                  <div>
                    <h4 className="font-semibold text-white mb-2">Strategic Planning LLM</h4>
                    <p>Long-term vision development, resource allocation modeling, interdependency mapping, and risk forecasting</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-2">Analytics LLM</h4>
                    <p>Multi-dimensional performance analysis, predictive optimization, anomaly detection, and visualization</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-2">Coordination LLM</h4>
                    <p>Cross-system communication protocols, conflict resolution, priority arbitration, and workload balancing</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-red-400 mb-4">3. Nemesis - AI Compliance & Security Enforcement</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-white/80">
                  <div>
                    <h4 className="font-semibold text-white mb-2">Security LLM</h4>
                    <p>Threat modeling, vulnerability assessment, penetration testing, and defense strategy formulation</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-2">Ethics & Compliance LLM</h4>
                    <p>Regulatory framework assessment, bias detection, fairness evaluation, and policy implementation</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-2">Auditing LLM</h4>
                    <p>Comprehensive logging, forensic analysis, accountability tracking, and transparent reporting</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-cyan-400 mb-4">4. Skuld - Performance Optimizer & Meta-Cognitive Agent</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-white/80">
                  <div>
                    <h4 className="font-semibold text-white mb-2">Performance Monitoring LLM</h4>
                    <p>Time-series performance analysis, statistical drift detection, and continuous improvement recommendations</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-2">Knowledge Curation LLM</h4>
                    <p>Master knowledge graph maintenance, consistency checking, and worldview coherence across all agents</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-2">Meta-Learning LLM</h4>
                    <p>System-wide learning optimization, retraining scheduling, and architectural refinement recommendations</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-pink-400 mb-4">5. Harmonia - Diplomatic Governor & Empathy Agent</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-white/80">
                  <div>
                    <h4 className="font-semibold text-white mb-2">Cultural Sensitivity LLM</h4>
                    <p>Multi-cultural communication, cultural context analysis, and appropriate interaction protocols</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-2">Emotional Intelligence LLM</h4>
                    <p>Sentiment analysis, emotional state recognition, and psychological safety optimization</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-2">User Profiling LLM</h4>
                    <p>Personalized communication adaptation, user preference learning, and relationship building</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
            <h2 className="text-3xl font-bold text-white mb-6">Financial & Economic AI Systems</h2>
            
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-green-400 mb-4">6. Plutus - Financial AI & Transaction Management</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-white/80">
                  <div>
                    <h4 className="font-semibold text-white mb-2">Transaction Processing LLM</h4>
                    <p>Payment gateway integration, multi-currency handling, fraud detection, and receipt management</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-2">Financial Operations LLM</h4>
                    <p>Accounting procedures, reconciliation, financial reporting, and business operation optimization</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-2">Blockchain LLM</h4>
                    <p>Cryptocurrency management, smart contract development, decentralized finance integration, and digital asset security</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-2">Consumer Banking LLM</h4>
                    <p>User-focused financial interfaces, personalized financial advice, budgeting assistance, and financial literacy education</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-emerald-400 mb-4">7. Janus - Economic Forecasting & Financial Strategy</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-white/80">
                  <div>
                    <h4 className="font-semibold text-white mb-2">Market Analysis LLM</h4>
                    <p>Multi-factor market modeling, trend identification, sentiment analysis, and economic indicator tracking</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-2">Forecasting LLM</h4>
                    <p>Predictive economic modeling, scenario planning, risk assessment, and probability distribution analysis</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-2">Investment Strategy LLM</h4>
                    <p>Portfolio optimization, asset allocation, algorithmic trading strategy development, and institutional finance support</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-2">Financial Policy LLM</h4>
                    <p>Monetary policy analysis, regulatory impact assessment, global market interconnection modeling, and economic stability evaluation</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Call to Action */}
          <div className="text-center">
            <p className="text-white/60 mb-4">
              This is an excerpt of the comprehensive SyberCraft architecture featuring 22 primary specialist agents and 5 governance agents.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <a 
                href="/docs/Sybertnetics/A%20Federated%20Architecture%20for%20Safe%20AI.pdf"
                download
                className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg transition-all transform hover:scale-105"
              >
                <Download className="w-5 h-5" />
                <span>Download Full Research Paper</span>
              </a>
                             <a 
                 href="/docs/Sybertnetics/SyberCraft%20White%20Paper.pdf"
                 download
                 className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-lg transition-all transform hover:scale-105"
               >
                 <FileText className="w-5 h-5" />
                 <span>Download Executive Summary</span>
               </a>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-black/20 backdrop-blur-sm border-t border-white/10 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-white/60">
            <p>&copy; 2025 Sybertnetics. All rights reserved.</p>
            <p className="mt-2">SyberCraft LLM Architecture - Version 1.0</p>
            <p className="mt-2 text-sm">Research Paper: "A Federated, Domain-Specific Architecture for Safe and Scalable Artificial Intelligence"</p>
          </div>
        </div>
      </div>
    </div>
  )
} 