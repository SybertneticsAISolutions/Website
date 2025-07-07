import Link from "next/link";
import { ArrowRight, Brain, Code, Database, Shield, Zap, Users, Building, Cpu, Network, CheckCircle } from "lucide-react";
import Header from "../components/Header";

export default function SolutionsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              AI Solutions That
              <span className="bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
                {" "}Transform Business
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Discover our comprehensive suite of artificial intelligence solutions designed 
              to solve complex challenges, optimize operations, and unlock new opportunities 
              across industries.
            </p>
          </div>
        </div>
      </section>

      {/* Core Solution Categories */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Comprehensive AI Capabilities
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our modular AI ecosystem delivers specialized solutions tailored to your unique needs
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Intelligent Reasoning Systems */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
              <Brain className="w-16 h-16 text-emerald-500 mb-6" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Intelligent Reasoning Systems</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Advanced AI systems that understand context, analyze complex scenarios, 
                and provide sophisticated reasoning capabilities for critical decision-making.
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-600">Complex problem analysis and solution generation</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-600">Multi-step reasoning and logical inference</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-600">Contextual understanding and adaptation</span>
                </li>
              </ul>
            </div>

            {/* Specialized Domain AI */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
              <Code className="w-16 h-16 text-blue-500 mb-6" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Specialized Domain AI</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Purpose-built AI models optimized for specific industries and use cases, 
                delivering superior performance in targeted applications.
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-600">Industry-specific optimization and training</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-600">Domain expertise and specialized knowledge</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-600">Seamless integration with existing workflows</span>
                </li>
              </ul>
            </div>

            {/* Adaptive Learning Platforms */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
              <Network className="w-16 h-16 text-purple-500 mb-6" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Adaptive Learning Platforms</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Self-improving AI systems that continuously learn from new data and experiences, 
                becoming more effective over time.
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-purple-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-600">Continuous learning and model improvement</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-purple-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-600">Real-time adaptation to changing conditions</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-purple-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-600">Automated optimization and performance tuning</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Industry Applications */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Industry Applications
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our AI solutions adapt to diverse industries and use cases
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow text-center">
              <Building className="w-12 h-12 text-emerald-500 mb-4 mx-auto" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Enterprise</h3>
              <p className="text-gray-600 text-sm">
                Streamline operations, automate processes, and enhance decision-making
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow text-center">
              <Shield className="w-12 h-12 text-blue-500 mb-4 mx-auto" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Security</h3>
              <p className="text-gray-600 text-sm">
                Advanced threat detection, risk assessment, and security optimization
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow text-center">
              <Database className="w-12 h-12 text-purple-500 mb-4 mx-auto" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Data Analytics</h3>
              <p className="text-gray-600 text-sm">
                Extract insights, predict trends, and optimize data-driven strategies
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow text-center">
              <Users className="w-12 h-12 text-red-500 mb-4 mx-auto" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Customer Experience</h3>
              <p className="text-gray-600 text-sm">
                Personalize interactions, improve satisfaction, and drive engagement
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Key Benefits */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Why Choose Sybertnetics AI Solutions?
              </h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Our unique approach to AI development delivers measurable results 
                while maintaining the highest standards of ethics and reliability.
              </p>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Zap className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Exceptional Performance</h3>
                    <p className="text-gray-600">
                      Optimized architectures deliver superior results with minimal computational overhead
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Shield className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Ethical by Design</h3>
                    <p className="text-gray-600">
                      Built-in safeguards ensure responsible AI behavior and transparent decision-making
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Cpu className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Scalable Architecture</h3>
                    <p className="text-gray-600">
                      Modular design allows for seamless scaling and customization to meet evolving needs
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-emerald-50 to-blue-50 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Ready to Get Started?</h3>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Transform your business with cutting-edge AI solutions tailored to your specific needs. 
                Our team of experts will work with you to identify opportunities and implement 
                solutions that drive real results.
              </p>
              <div className="space-y-4">
                <Link 
                  href="/contact" 
                  className="group w-full bg-gradient-to-r from-emerald-500 to-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-emerald-600 hover:to-blue-700 transition-all duration-300 flex items-center justify-center"
                >
                  Schedule a Consultation
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link 
                  href="/about" 
                  className="w-full border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-all duration-300 text-center block"
                >
                  Learn More About Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Highlights */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Cutting-Edge Technology
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Built on innovative methodologies and advanced computational principles
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Advanced Neural Architectures</h3>
              <p className="text-gray-600">
                Proprietary model designs that push the boundaries of AI capabilities
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Network className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Modular AI Ecosystem</h3>
              <p className="text-gray-600">
                Interconnected AI systems that work together seamlessly
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Ethical AI Framework</h3>
              <p className="text-gray-600">
                Comprehensive safeguards ensuring responsible AI deployment
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-emerald-600 to-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Transform Your Business with AI?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join the AI revolution and unlock new possibilities for your organization. 
            Let&apos;s discuss how our solutions can drive your success.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/contact" 
              className="bg-white text-emerald-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300"
            >
              Start Your AI Journey
            </Link>
            <Link 
              href="/about" 
              className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white/10 transition-all duration-300"
            >
              Learn About Our Team
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-blue-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">S</span>
                </div>
                <span className="text-white font-semibold text-xl">Sybertnetics AI Solutions</span>
              </div>
              <p className="text-gray-400 mb-4">
                Pioneering the future of artificial intelligence through innovative 
                technology and ethical design.
              </p>
              <div className="flex space-x-4">
                <a 
                  href="https://linkedin.com/company/sybertnetics" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  LinkedIn
                </a>
                <a 
                  href="mailto:support@sybertnetics.com"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Email
                </a>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
                <li><Link href="/careers" className="hover:text-white transition-colors">Careers</Link></li>
                <li><Link href="/news" className="hover:text-white transition-colors">News</Link></li>
                <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Solutions</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/solutions" className="hover:text-white transition-colors">AI Systems</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2019-2025 Sybertnetics AI Solutions. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
} 