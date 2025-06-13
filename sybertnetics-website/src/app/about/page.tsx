import Link from "next/link";
import { ArrowRight, Brain, Code, Shield, Zap, Users, Target, Globe } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">S</span>
              </div>
              <span className="text-gray-900 font-semibold text-xl">Sybertnetics</span>
            </div>
            <div className="hidden md:flex space-x-8">
              <Link href="/" className="text-gray-600 hover:text-gray-900 transition-colors">
                Landing
              </Link>
              <Link href="/home" className="text-gray-600 hover:text-gray-900 transition-colors">
                Home
              </Link>
              <Link href="/solutions" className="text-gray-600 hover:text-gray-900 transition-colors">
                Solutions
              </Link>
              <Link href="/about" className="text-emerald-600 font-medium">
                About
              </Link>
              <Link href="/contact" className="text-gray-600 hover:text-gray-900 transition-colors">
                Contact
              </Link>
            </div>
            <Link 
              href="/contact" 
              className="bg-gradient-to-r from-emerald-500 to-blue-600 text-white px-6 py-2 rounded-full hover:from-emerald-600 hover:to-blue-700 transition-all duration-300"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              About
              <span className="bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
                {" "}Sybertnetics
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              We&apos;re a passionate team of innovators dedicated to pushing the boundaries 
              of artificial intelligence and creating technology that makes a meaningful impact.
            </p>
          </div>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Sybertnetics AI Solutions was founded with a simple yet ambitious vision: 
                to democratize access to advanced artificial intelligence while maintaining 
                the highest standards of ethical responsibility.
              </p>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                As a small but mighty team of two, we bring together diverse expertise 
                in technology development and strategic marketing to create AI solutions 
                that are not just powerful, but also responsible and accessible.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Our approach combines cutting-edge research with practical implementation, 
                ensuring that our innovations translate into real-world value for our clients 
                and partners.
              </p>
            </div>
            <div className="bg-gradient-to-br from-emerald-50 to-blue-50 rounded-2xl p-8">
              <div className="grid grid-cols-2 gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold text-emerald-600 mb-2">2019</div>
                  <div className="text-gray-600">Founded</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-600 mb-2">2</div>
                  <div className="text-gray-600">Team Members</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-purple-600 mb-2">∞</div>
                  <div className="text-gray-600">Possibilities</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-emerald-600 mb-2">100%</div>
                  <div className="text-gray-600">Commitment</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Our Core Values
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The NEXUS framework that drives our mission to advance artificial intelligence and empower the future
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow text-center">
              <Zap className="w-12 h-12 text-emerald-500 mb-4 mx-auto" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Next-generation</h3>
              <p className="text-gray-600">
                Leading the frontier of AI innovation, always pushing beyond current limitations
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow text-center">
              <Shield className="w-12 h-12 text-blue-500 mb-4 mx-auto" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Excellence</h3>
              <p className="text-gray-600">
                Building AI that thinks deeply, logically, and ethically in every decision
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow text-center">
              <Brain className="w-12 h-12 text-purple-500 mb-4 mx-auto" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">eXploration</h3>
              <p className="text-gray-600">
                Creating transformative solutions that advance science and empower humanity
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow text-center">
              <Users className="w-12 h-12 text-indigo-500 mb-4 mx-auto" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Unity</h3>
              <p className="text-gray-600">
                Fostering partnerships that amplify innovation and accelerate progress
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow text-center">
              <Target className="w-12 h-12 text-orange-500 mb-4 mx-auto" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Solutions</h3>
              <p className="text-gray-600">
                Continuously adapting and growing to meet tomorrow&apos;s challenges today
              </p>
            </div>
          </div>

          {/* Company Mottos */}
          <div className="mt-16 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-8">Our Mission</h3>
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl p-6">
                <h4 className="text-lg font-semibold text-emerald-800 mb-2">Moving Science Forward</h4>
                <p className="text-emerald-700 text-sm">
                  Advancing the boundaries of scientific understanding through AI innovation
                </p>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6">
                <h4 className="text-lg font-semibold text-blue-800 mb-2">Empowering the Future</h4>
                <p className="text-blue-700 text-sm">
                  Creating tools and technologies that enable tomorrow&apos;s breakthroughs
                </p>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6">
                <h4 className="text-lg font-semibold text-purple-800 mb-2">Advancing AI</h4>
                <p className="text-purple-700 text-sm">
                  Developing intelligent systems that reason, learn, and adapt responsibly
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Meet Our Team
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The passionate individuals driving innovation at Sybertnetics AI Solutions
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            {/* Kaynen Pellegrino */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-emerald-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white font-bold text-2xl">KP</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Kaynen Pellegrino</h3>
              <p className="text-emerald-600 font-semibold mb-4">CEO & Technical Developer</p>
              <p className="text-gray-600 leading-relaxed mb-6">
                Kaynen leads our technical vision and development efforts, bringing deep expertise 
                in AI architecture, system design, and innovative problem-solving. His passion for 
                cutting-edge technology drives our commitment to pushing the boundaries of what&apos;s 
                possible with artificial intelligence.
              </p>
              <div className="flex justify-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Brain className="w-5 h-5 text-emerald-500" />
                  <span className="text-sm text-gray-600">AI Architecture</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Code className="w-5 h-5 text-blue-500" />
                  <span className="text-sm text-gray-600">Development</span>
                </div>
              </div>
            </div>

            {/* Ashlin Mullenix */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white font-bold text-2xl">AM</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Ashlin Mullenix</h3>
              <p className="text-blue-600 font-semibold mb-4">Chief Marketing Officer</p>
              <p className="text-gray-600 leading-relaxed mb-6">
                Ashlin shapes our strategic direction and market presence, ensuring our innovative 
                AI solutions reach the right audiences and create meaningful impact. Her expertise 
                in marketing strategy and business development helps translate our technical 
                capabilities into real-world value.
              </p>
              <div className="flex justify-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Target className="w-5 h-5 text-blue-500" />
                  <span className="text-sm text-gray-600">Strategy</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Globe className="w-5 h-5 text-purple-500" />
                  <span className="text-sm text-gray-600">Marketing</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-gradient-to-r from-emerald-600 to-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 text-white">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
              <p className="text-xl opacity-90 leading-relaxed">
                To democratize access to advanced AI capabilities while maintaining the highest 
                standards of ethical responsibility. We create AI systems that augment human 
                potential, drive innovation, and solve complex challenges across industries.
              </p>
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Vision</h2>
              <p className="text-xl opacity-90 leading-relaxed">
                To be the leading force in the next evolution of artificial intelligence, where 
                AI systems are intelligent partners that understand context, reason ethically, 
                and adapt seamlessly to human needs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Work With Us?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our unique combination of technical expertise and strategic vision sets us apart
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Personal Attention</h3>
              <p className="text-gray-600">
                As a small team, we provide personalized service and direct access to our founders
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Agile Innovation</h3>
              <p className="text-gray-600">
                Our lean structure allows us to move quickly and adapt to emerging opportunities
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Deep Expertise</h3>
              <p className="text-gray-600">
                Concentrated knowledge and experience in AI development and strategic implementation
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Work Together?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Let&apos;s discuss how Sybertnetics AI Solutions can help transform your business 
            with innovative artificial intelligence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/contact" 
              className="group bg-gradient-to-r from-emerald-500 to-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:from-emerald-600 hover:to-blue-700 transition-all duration-300 flex items-center justify-center"
            >
              Get in Touch
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link 
              href="/solutions" 
              className="border-2 border-gray-300 text-gray-700 px-8 py-3 rounded-full font-semibold hover:bg-gray-50 transition-all duration-300"
            >
              Explore Our Solutions
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
            <p>&copy; 2024 Sybertnetics AI Solutions. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
} 