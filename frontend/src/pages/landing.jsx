'use client';

import { motion } from 'framer-motion';
import { Github } from 'lucide-react';
import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-cyber-black overflow-hidden relative">
      {/* Animated gradient background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyber-blue opacity-10 rounded-full mix-blend-multiply filter blur-3xl animate-float"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-cyber-blue opacity-5 rounded-full mix-blend-multiply filter blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-cyber-blue opacity-10 rounded-full mix-blend-multiply filter blur-3xl animate-float" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Navigation */}
        <nav className="fixed top-0 w-full bg-cyber-black/80 backdrop-blur-md border-b border-cyber-blue/20">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-3"
            >
              <div className="w-10 h-10 bg-cyber-blue rounded-lg flex items-center justify-center font-bold text-cyber-black text-xl">
                S
              </div>
              <span className="text-xl font-bold text-white">SyncHub</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-4"
            >
              <a href="#" className="text-cyber-grey-light hover:text-cyber-blue transition">Docs</a>
              <a href="#" className="text-cyber-grey-light hover:text-cyber-blue transition">Blog</a>
            </motion.div>
          </div>
        </nav>

        {/* Hero Section */}
        <div className="min-h-screen flex items-center justify-center px-6 pt-20">
          <div className="text-center max-w-4xl">
            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="inline-block mb-6 px-4 py-2 border border-cyber-blue/50 rounded-lg bg-cyber-blue/10 backdrop-blur-sm"
            >
              <span className="text-cyber-blue text-sm font-medium">🚀 The Future of Standups</span>
            </motion.div>

            {/* Main heading with gradient glow */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-6xl md:text-7xl font-bold mb-6 leading-tight"
            >
              <span className="text-white">Your Work,</span>
              <br />
              <span className="bg-gradient-to-r from-cyber-blue via-cyber-blue to-cyan-400 bg-clip-text text-transparent">
                Unified
              </span>
            </motion.h1>

            {/* Subheading */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-cyber-grey-light text-lg md:text-xl mb-12 leading-relaxed"
            >
              GitHub commits, Google Meet summaries, and Notion notes—all unified into one intelligent standup report. Zero configuration. Zero effort.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              {/* GitHub Sign In */}
              <Link href="/dashboard">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-cyber-blue hover:bg-cyber-blue-hover text-white font-semibold rounded-lg transition-all duration-300 flex items-center gap-3 group border border-cyber-blue shadow-glow-blue"
                >
                  <Github className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                  Sign in with GitHub
                </motion.button>
              </Link>

              {/* Google Sign In */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 border border-cyber-grey/50 hover:border-cyber-blue text-white font-semibold rounded-lg transition-all duration-300 backdrop-blur-sm hover:bg-cyber-charcoal/50"
              >
                Sign in with Google
              </motion.button>
            </motion.div>

            {/* Trust badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="mt-16 flex flex-wrap justify-center items-center gap-8 text-cyber-grey-light text-sm"
            >
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-cyber-blue rounded-full"></div>
                OAuth 2.0 Secure
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-cyber-blue rounded-full"></div>
                Real-time Sync
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-cyber-blue rounded-full"></div>
                Zero Setup
              </div>
            </motion.div>

            {/* Decorative elements */}
            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="mt-20"
            >
              <div className="text-cyber-grey text-lg">↓</div>
            </motion.div>
          </div>
        </div>

        {/* Feature cards section */}
        <div className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-3 gap-8">
          {[
            { title: 'GitHub', icon: '📊', desc: 'Auto-fetch your weekly commits' },
            { title: 'Google Meet', icon: '🎥', desc: 'Sync meeting transcripts' },
            { title: 'Notion', icon: '📝', desc: 'Push reports to Notion' },
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              whileHover={{ borderColor: '#007AFF' }}
              className="p-6 rounded-lg border border-cyber-grey/30 bg-cyber-charcoal/30 backdrop-blur-sm hover:bg-cyber-charcoal/50 transition-all cursor-pointer"
            >
              <div className="text-4xl mb-3">{feature.icon}</div>
              <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
              <p className="text-cyber-grey-light">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
