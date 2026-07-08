'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Target, 
  Eye, 
  Mail, 
  MessageSquare,
  CheckCircle2,
  Users,
  Award,
  Globe,
  Database,
  Cpu,
  Server,
  Sliders,
  ClipboardCheck,
  Bot,
  LayoutGrid,
  ExternalLink,
  ArrowDown
} from 'lucide-react';
import Accordion from '@/components/UI/Accordion';
import Container from '@/components/UI/Container';
import Button from '@/components/UI/Button';
import Card from '@/components/UI/Card';
import SectionTitle from '@/components/UI/SectionTitle';

export default function AboutPage() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setSubmitted(false), 5000);
    }
  };

  const faqItems = [
    {
      question: "Is my personal profile stored on SchemeMate AI servers?",
      answer: "No. Your profile parameters are compiled directly in your local browser storage/session to run the scoring match, and are passed between the Checker and Results pages via URL parameters. We do not store your profiles in database tables."
    },
    {
      question: "Are the links to the portals verified and safe?",
      answer: "Yes, we exclusively link to government-owned domains ending in '.gov.in' or '.nic.in', or established public sector bank application systems. We strictly audit our portal database weekly to eliminate dead links or unauthorized mirrors."
    },
    {
      question: "How can I suggest a scheme or submit feedback?",
      answer: "We love hearing from our community! You can write to us directly using the contact form below or email us at support@schememate.ai. Our team will review and add suggested schemes after verified gazette review."
    }
  ];

  return (
    <div className="bg-slate-50 min-h-screen">
      
      {/* Hero Section */}
      <section className="pt-16 pb-12 text-center space-y-4">
        <Container className="space-y-4">
          <div className="inline-flex items-center space-x-2 bg-blue-50 border border-blue-200/60 rounded-full px-3.5 py-1.5 text-xs font-semibold text-primary">
            <Globe className="w-4 h-4 text-blue-600" />
            <span>Bridging the gap between citizens & policies</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Democratizing Public Benefits
          </h1>
          <p className="text-slate-500 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            SchemeMate AI was founded with a single mission: to make 12+ Central and State welfare policies easily discoverable and accessible using AI technology.
          </p>
        </Container>
      </section>

      {/* Mission & Vision grid */}
      <section className="py-12">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Mission */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Card className="hover-lift space-y-4 h-full bg-white">
                <div className="bg-blue-50 text-primary p-3 rounded-2xl w-fit border border-blue-200">
                  <Target className="w-6 h-6" />
                </div>
                <h2 className="text-xl font-bold text-slate-800">Our Mission</h2>
                <p className="text-slate-600 text-sm leading-relaxed">
                  To eliminate complexity and administrative friction from public service discovery. We translate pages of legal and administrative eligibility jargon into simple matching logic, so you can find loans, scholarships, and farming grants in 2 minutes.
                </p>
              </Card>
            </motion.div>

            {/* Vision */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
            >
              <Card className="hover-lift space-y-4 h-full bg-white">
                <div className="bg-emerald-50 text-emerald-600 p-3 rounded-2xl w-fit border border-emerald-200">
                  <Eye className="w-6 h-6" />
                </div>
                <h2 className="text-xl font-bold text-slate-800">Our Vision</h2>
                <p className="text-slate-600 text-sm leading-relaxed">
                  A digitally empowered India where no eligible farmer, hard-working student, or ambitious startup founder misses out on government financial support or training simply because they didn&apos;t know it existed.
                </p>
              </Card>
            </motion.div>

          </div>
        </Container>
      </section>

      {/* Narrative Section: Why We Built This */}
      <section className="py-12">
        <Container className="max-w-4xl">
          <SectionTitle title="Why We Built SchemeMate AI" className="mb-8" />
          <Card className="bg-white shadow-sm">
            <div className="space-y-6 text-slate-600 text-sm leading-relaxed">
              <p>
                Every year, the government allocates thousands of crores for public schemes, student scholarships, MSME credit lines, and farming subsidies. Yet, a massive portion of these funds goes unclaimed. Why? Because discovering them is incredibly difficult.
              </p>
              <p>
                An average citizen has to search across dozens of ministries, check dense eligibility files, and avoid unofficial intermediary websites that charge hefty fees. The process is broken, time-consuming, and confusing.
              </p>
              <p>
                <strong>SchemeMate AI</strong> replaces this friction with an elegant matching engine. By answering a few clean questions, citizens immediately see what they qualify for, what files they need, and get verified links to apply. No middlemen, no commissions, no hassle.
              </p>
            </div>
          </Card>
        </Container>
      </section>


      {/* Stats / Goals Section */}
      <section className="py-12">
        <Container>
          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[2rem] p-8 md:p-12 text-white grid grid-cols-1 md:grid-cols-3 gap-8 text-center shadow-lg">
            <div className="space-y-2">
              <Users className="w-8 h-8 mx-auto text-blue-200" />
              <h3 className="text-3xl font-extrabold">10 Million</h3>
              <p className="text-xs text-blue-100 font-semibold uppercase tracking-wider">Target Citizens Served by 2028</p>
            </div>
            <div className="space-y-2 border-y md:border-y-0 md:border-x border-blue-500/40 py-6 md:py-0">
              <Award className="w-8 h-8 mx-auto text-blue-200" />
              <h3 className="text-3xl font-extrabold">100% Free</h3>
              <p className="text-xs text-blue-100 font-semibold uppercase tracking-wider">No application discovery charges</p>
            </div>
            <div className="space-y-2">
              <CheckCircle2 className="w-8 h-8 mx-auto text-blue-200" />
              <h3 className="text-3xl font-extrabold">Weekly Updates</h3>
              <p className="text-xs text-blue-100 font-semibold uppercase tracking-wider">Ensuring active criteria validity</p>
            </div>
          </div>
        </Container>
      </section>

      {/* FAQ Accordion */}
      <section className="py-12">
        <Container className="max-w-4xl">
          <SectionTitle title="Frequently Asked Questions" className="mb-8" />
          <Accordion items={faqItems} />
        </Container>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16">
        <Container className="max-w-3xl">
          <Card className="shadow-xl bg-white">
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <div className="bg-blue-50 text-primary p-2.5 rounded-2xl w-fit mx-auto border border-blue-200">
                  <Mail className="w-5 h-5" />
                </div>
                <h2 className="text-xl font-bold text-slate-900">Get In Touch</h2>
                <p className="text-slate-500 text-xs sm:text-sm">Have any queries, suggestions, or feedback? Send us a message.</p>
              </div>

              {submitted ? (
                <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-5 rounded-2xl text-center space-y-2 animate-fade-in">
                  <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                  <h3 className="font-extrabold text-sm sm:text-base">Message Sent Successfully!</h3>
                  <p className="text-xs text-emerald-600">Thank you for writing. Our support team will get back to you shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label htmlFor="name" className="block text-xs font-semibold text-slate-700">Your Name</label>
                      <input
                        type="text"
                        id="name"
                        required
                        placeholder="e.g. Preeti Deshmukh"
                        value={formData.name}
                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        className="w-full border border-slate-200 rounded-xl py-2.5 px-4 text-xs sm:text-sm focus:outline-none focus:border-primary transition-colors bg-slate-50/50"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label htmlFor="email" className="block text-xs font-semibold text-slate-700">Email Address</label>
                      <input
                        type="email"
                        id="email"
                        required
                        placeholder="e.g. preeti@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        className="w-full border border-slate-200 rounded-xl py-2.5 px-4 text-xs sm:text-sm focus:outline-none focus:border-primary transition-colors bg-slate-50/50"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="message" className="block text-xs font-semibold text-slate-700">Message / Inquiry</label>
                    <textarea
                      id="message"
                      required
                      rows={4}
                      placeholder="Tell us about the issue you are facing or share details of schemes you would like us to index..."
                      value={formData.message}
                      onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                      className="w-full border border-slate-200 rounded-xl py-2.5 px-4 text-xs sm:text-sm focus:outline-none focus:border-primary transition-colors bg-slate-50/50 resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    fullWidth
                    className="flex items-center justify-center gap-1.5"
                  >
                    Send Message
                    <MessageSquare className="w-4 h-4" />
                  </Button>
                </form>
              )}
            </div>
          </Card>
        </Container>
      </section>

    </div>
  );
}
