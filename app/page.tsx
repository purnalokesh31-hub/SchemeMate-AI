'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { 
  Sparkles, 
  Search, 
  ArrowRight, 
  CheckCircle, 
  FileText, 
  ExternalLink, 
  UserCheck, 
  TrendingUp, 
  Users, 
  ShieldCheck, 
  ArrowDown
} from 'lucide-react';
import Accordion from '@/components/UI/Accordion';
import Container from '@/components/UI/Container';
import SectionTitle from '@/components/UI/SectionTitle';
import Button from '@/components/UI/Button';
import Card from '@/components/UI/Card';

function Counter({ value, duration = 1.5 }: { value: string; duration?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [count, setCount] = useState(0);

  // Extract digits from string, e.g. "1,200+" -> 1200
  const isPercent = value.includes('%');
  const numberPart = value.replace(/[^0-9]/g, '');
  const cleanNumber = parseInt(numberPart);
  const prefix = value.startsWith('₹') ? '₹' : '';
  const suffix = value.replace(/[0-9,₹]/g, '');

  useEffect(() => {
    if (!isInView || isNaN(cleanNumber)) return;
    
    let start = 0;
    const end = cleanNumber;
    const totalFrames = duration * 60;
    let frame = 0;

    const timer = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      // Ease out quad
      const currentCount = Math.floor(end * (1 - (1 - progress) * (1 - progress)));
      
      setCount(currentCount);

      if (frame >= totalFrames) {
        clearInterval(timer);
        setCount(end);
      }
    }, 1000 / 60);

    return () => clearInterval(timer);
  }, [isInView, cleanNumber, duration]);

  if (isNaN(cleanNumber)) {
    return <span ref={ref}>{value}</span>;
  }

  const formattedValue = isPercent 
    ? `${count}%`
    : `${prefix}${count.toLocaleString('en-IN')}${suffix}`;

  return <span ref={ref}>{formattedValue}</span>;
}

export default function HomePage() {
  const features = [
    {
      title: 'AI Eligibility Analysis',
      description: 'Our proprietary matching engine instantly aligns your personal, business, or agricultural profile with 12+ verified schemes.',
      icon: <Sparkles className="w-6 h-6 text-blue-600" />,
      color: 'bg-blue-50 border-blue-100',
    },
    {
      title: 'Personalized Recommendations',
      description: 'Get a customized dashboard containing only the schemes that match your specific profile, state, income, and business scale.',
      icon: <TrendingUp className="w-6 h-6 text-emerald-600" />,
      color: 'bg-emerald-50 border-emerald-100',
    },
    {
      title: 'Official Government Links',
      description: 'Avoid scam sites and intermediaries. We provide verified, direct redirect links to official portal registration forms.',
      icon: <ExternalLink className="w-6 h-6 text-indigo-600" />,
      color: 'bg-indigo-50 border-indigo-100',
    },
    {
      title: 'Document Checklist',
      description: 'We generate an exact list of documents required for each matched scheme so you can apply efficiently without delays.',
      icon: <FileText className="w-6 h-6 text-purple-600" />,
      color: 'bg-purple-50 border-purple-100',
    },
  ];

  const steps = [
    {
      number: '01',
      title: 'Answer Questions',
      description: 'Spend 2 minutes sharing details about your occupation, income, state, and requirements.',
    },
    {
      number: '02',
      title: 'AI Eligibility Scan',
      description: 'Our system analyzes criteria across agricultural, educational, startup, and social sectors.',
    },
    {
      number: '03',
      title: 'View Matches',
      description: 'Review details, match percentages, required documents, and subsidy amounts.',
    },
    {
      number: '04',
      title: 'Apply Directly',
      description: 'Follow our official links to complete applications without middlemen.',
    },
  ];

  const stats = [
    { value: '12+', label: 'Active Schemes Tracked' },
    { value: '₹25,000 Cr+', label: 'Subsidies Facilitated' },
    { value: '2.5M+', label: 'Users Checked' },
    { value: '98.6%', label: 'Match Accuracy' },
  ];

  const testimonials = [
    {
      quote: "As an organic farmer, finding relevant schemes was nearly impossible. SchemeMate AI matched me to the PM-KISAN pension scheme and a farm equipment subsidy in minutes. The application links worked flawlessly.",
      author: "Ramesh Choudhary",
      role: "Farmer, Jaipur (Rajasthan)",
      initials: "RC",
    },
    {
      quote: "We were looking for manufacturing funding. The platform suggested CGTMSE and MUDRA Tarun. We qualified for a collateral-free loan that allowed us to hire 8 more staff and expand operations.",
      author: "Pooja Deshmukh",
      role: "Founder, Deshmukh Textiles (Maharashtra)",
      initials: "PD",
    },
    {
      quote: "As a first-generation college student, securing scholarships was stressful. SchemeMate AI matched me to the Post-Matric scheme, saving me ₹45,000 in tuition fees this year alone.",
      author: "Amit Patel",
      role: "B.Tech Student, Ahmedabad (Gujarat)",
      initials: "AP",
    },
  ];

  const faqItems = [
    {
      question: "Is SchemeMate AI affiliated with the government?",
      answer: "No, SchemeMate AI is an independent search and discovery platform. We gather and catalog data from official government gazettes, websites, and guidelines to present them in an easy-to-use search engine. We do not issue loans or approve applications."
    },
    {
      question: "Does checking my eligibility cost anything?",
      answer: "No, checking your eligibility and viewing the matching schemes is 100% free. Our goal is to make government benefits discoverable for every citizen."
    },
    {
      question: "Is my personal data safe with SchemeMate AI?",
      answer: "We take privacy very seriously. The information you fill in the checker is strictly used to match you with eligible schemes on the client side, and we do not sell or distribute your data to third-party advertisers."
    },
    {
      question: "How frequently is the scheme database updated?",
      answer: "Our team and automated scraper systems update the database weekly, ensuring that deadlines, criteria changes, and newly launched central or state initiatives are updated immediately."
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  } as const;

  const itemVariants = {
    hidden: { y: 25, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 },
    },
  } as const;

  return (
    <main className="relative">
      {/* Background decorations */}
      {/* Responsive Two-Column Hero Layout (Desktop: 2 columns, Mobile: stacked) */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] radial-glow -z-10 pointer-events-none" />
      <div className="absolute top-80 right-1/4 w-[600px] h-[600px] radial-glow-green -z-10 pointer-events-none" />

      {/* Hero Section */}
      <section className="min-h-[90vh] flex items-center bg-gradient-to-b from-blue-50/50 via-white to-white relative overflow-hidden" aria-label="SchemeMate AI Hero Section">
        <Container className="w-full pt-16 pb-20 md:pt-24 md:pb-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Hero Left Content */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="lg:col-span-7 space-y-6 text-center lg:text-left"
            >
              <div className="inline-flex items-center space-x-2 bg-blue-50 border border-blue-200/60 rounded-full px-3.5 py-1.5 text-xs font-semibold text-primary">
                <Sparkles className="w-4 h-4 text-blue-600 animate-pulse" />
                <span>Discover Subsidies, Grants & Loans instantly</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 leading-[1.1] tracking-tight">
                Find Government Schemes You&apos;re Eligible For in <span className="text-primary relative inline-block">Just 2 Minutes</span>
              </h1>

              <p className="text-lg text-slate-600 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Answer a few simple questions and let AI instantly discover government schemes, subsidies, grants, and loans that match your profile.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <Button 
                  href="/eligibility" 
                  size="lg" 
                  className="w-full sm:w-auto flex items-center justify-center gap-1.5"
                  aria-label="Check your eligibility for schemes"
                >
                  Check Eligibility
                  <ArrowRight className="w-5 h-5" />
                </Button>
                <Button 
                  href="/about" 
                  variant="outline" 
                  size="lg" 
                  className="w-full sm:w-auto"
                  aria-label="Learn more about SchemeMate AI"
                >
                  Learn More
                </Button>
              </div>
            </motion.div>

            {/* Hero Right Mockup Illustration */}
            <motion.div 
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
              className="lg:col-span-5 relative select-none"
            >
              <div className="relative mx-auto max-w-[420px] lg:max-w-none rounded-[2rem] border border-slate-200 bg-white shadow-2xl p-6 overflow-hidden">
                {/* Header inside mockup */}
                <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-5">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-rose-400" />
                    <div className="w-3 h-3 rounded-full bg-amber-400" />
                    <div className="w-3 h-3 rounded-full bg-emerald-400" />
                  </div>
                  <div className="bg-slate-100 text-[10px] font-semibold text-slate-500 px-3 py-1 rounded-full border border-slate-200">
                    schememate.ai/results
                  </div>
                </div>

                {/* Mockup Dashboard content */}
                <div className="space-y-4 text-left">
                  <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4 flex items-center justify-between">
                    <div>
                      <p className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">User profile matched</p>
                      <h4 className="text-sm font-bold text-slate-900">Preeti Sharma (MSME)</h4>
                    </div>
                    <div className="bg-primary text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1 shadow-sm">
                      98% Match
                    </div>
                  </div>

                  <div className="border border-slate-100 rounded-2xl p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100">MSME</span>
                      <span className="text-[10px] text-slate-400">Deadline: March 31</span>
                    </div>
                    <h5 className="text-xs font-bold text-slate-800">Pradhan Mantri MUDRA Yojana</h5>
                    <p className="text-[10px] text-slate-500 leading-relaxed">Collateral-free business expansion loan support up to ₹10,00,000 for manufacturing and services.</p>
                    <div className="flex items-center justify-between pt-1 border-t border-slate-50">
                      <span className="text-[10px] text-emerald-600 font-bold">Benefit: Up to ₹10 Lakhs Loan</span>
                      <div className="flex items-center text-[10px] text-primary font-bold gap-0.5">
                        Apply Now <ExternalLink className="w-3 h-3" />
                      </div>
                    </div>
                  </div>

                  <div className="border border-slate-100 rounded-2xl p-4 space-y-3 opacity-60">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold text-purple-600 bg-purple-50 px-2 py-0.5 rounded border border-purple-100">Women</span>
                      <span className="text-[10px] text-slate-400">Deadline: Active</span>
                    </div>
                    <h5 className="text-xs font-bold text-slate-800">Stand-Up India Scheme</h5>
                    <p className="text-[10px] text-slate-500 leading-relaxed">Greenfield business loans for SC/ST and Women entrepreneurs between ₹10 Lakhs and ₹1 Crore.</p>
                  </div>
                </div>
              </div>
              
              {/* Absolute positioning decor badges */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
                className="absolute -bottom-6 -left-6 bg-emerald-50 border border-emerald-200 rounded-2xl p-4 shadow-xl flex items-center gap-3 hidden sm:flex"
              >
                <div className="bg-emerald-500 text-white p-2 rounded-lg">
                  <CheckCircle className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <p className="text-[10px] text-slate-400 font-medium">Eligible Subsidies</p>
                  <p className="text-sm font-bold text-slate-800">₹65,000 Matched</p>
                </div>
              </motion.div>
            </motion.div>

          </div>
        </Container>
      </section>


      {/* Features Section */}
      <section className="py-20 md:py-24">
        <Container>
          <SectionTitle 
            title="How SchemeMate AI Helps You"
            subtitle="Discovering public schemes shouldn't require navigating hundreds of dense government websites. We bring everything into one simple portal."
            className="mb-16"
          />

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {features.map((feature, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
              >
                <Card className="hover-lift flex flex-col sm:flex-row gap-5 items-start h-full">
                  <div className={`p-3 rounded-2xl ${feature.color} flex-shrink-0`}>
                    {feature.icon}
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-bold text-slate-900">{feature.title}</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">{feature.description}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </section>

      {/* How It Works Section */}
      <section className="bg-slate-50 border-y border-slate-200/80 py-20 md:py-24">
        <Container>
          <SectionTitle 
            title="Simple 4-Step Process"
            subtitle="Skip the confusion. In less than two minutes, you can search, match, and begin the application process."
            className="mb-16"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Card className="p-6 bg-white border border-slate-200 h-full relative group shadow-sm hover:shadow-md transition-shadow">
                  <span className="text-5xl font-black text-slate-100 group-hover:text-blue-100 transition-colors absolute top-4 right-4">
                    {step.number}
                  </span>
                  <div className="space-y-3 relative z-10 pt-4">
                    <h3 className="text-lg font-bold text-slate-800">{step.title}</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">{step.description}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="text-center pt-12">
            <Button href="/eligibility" size="lg" className="flex items-center justify-center gap-1.5 mx-auto">
              Start Checking Now
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
        </Container>
      </section>


      {/* FAQ Section */}
      <section className="bg-slate-50 border-t border-slate-200/80 py-20 md:py-24">
        <Container className="max-w-4xl">
          <SectionTitle 
            title="Frequently Asked Questions"
            subtitle="Find quick answers to general inquiries about SchemeMate AI."
            className="mb-16"
          />
          <Accordion items={faqItems} />
        </Container>
      </section>

      {/* Hero CTA Card Section */}
      <section className="py-20">
        <Container>
          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[2rem] p-8 md:p-16 text-center text-white relative overflow-hidden shadow-2xl shadow-blue-500/10">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="max-w-2xl mx-auto space-y-6 relative z-10">
              <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-tight">
                Ready to find your eligible benefits?
              </h2>
              <p className="text-blue-100 text-base md:text-lg leading-relaxed">
                Take the 2-minute checker. Input your background parameters and see a complete checklist of subsidies, loans, and scholarships waiting for you.
              </p>
              <div className="pt-4">
                <Link
                  href="/eligibility"
                  className="bg-white hover:bg-slate-50 active:bg-slate-100 text-slate-900 font-bold px-8 py-4 rounded-xl shadow-lg transition-all duration-200 inline-flex items-center justify-center gap-1.5 group"
                >
                  Launch Eligibility Checker
                  <ArrowRight className="w-5 h-5 text-slate-900 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
