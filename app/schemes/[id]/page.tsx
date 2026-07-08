'use client';

import React, { use } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  ArrowLeft, 
  Sparkles, 
  CheckCircle2, 
  FileText, 
  ExternalLink, 
  Calendar, 
  Award, 
  Info,
  ChevronRight,
  TrendingUp,
  FileCheck
} from 'lucide-react';
import { schemesData } from '@/data/schemes';
import Badge from '@/components/UI/Badge';
import Accordion from '@/components/UI/Accordion';
import Button from '@/components/UI/Button';
import Card from '@/components/UI/Card';
import Container from '@/components/UI/Container';
import SectionTitle from '@/components/UI/SectionTitle';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function SchemeDetailsPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const router = useRouter();
  const schemeId = resolvedParams.id;
  
  const scheme = schemesData.find((s) => s.id === schemeId);

  if (!scheme) {
    return (
      <Container className="py-24 text-center space-y-6">
        <Info className="w-16 h-16 text-slate-400 mx-auto" />
        <h1 className="text-2xl font-extrabold text-slate-800">Scheme Not Found</h1>
        <p className="text-slate-500 text-sm max-w-md mx-auto">
          The government scheme you are looking for does not exist or has been archived.
        </p>
        <Button href="/results">Back to Schemes</Button>
      </Container>
    );
  }

  // Related schemes of same category
  const relatedSchemes = schemesData
    .filter((s) => s.category === scheme.category && s.id !== scheme.id)
    .slice(0, 3);

  // Scheme specific FAQs
  const schemeFAQs = [
    {
      question: `Who is eligible to apply for ${scheme.name}?`,
      answer: `Eligibility is determined by the specific criteria of the ${scheme.department}. Typically, it requires target profiles matching the ${scheme.category} category, income verification, and specific documents listed below.`
    },
    {
      question: `What are the key financial benefits of this yojana?`,
      answer: `${scheme.benefits}. The funds are directly disbursed to the Aadhaar-linked savings accounts of the verified beneficiaries.`
    },
    {
      question: `Where and how can I apply for this scheme?`,
      answer: `You can submit your application through the verified portal at ${scheme.officialUrl}. Click 'Apply On Official Portal' below to register directly and track your processing status.`
    }
  ];

  return (
    <div className="bg-slate-50 min-h-screen pb-24 relative">
      
      {/* Decorative gradient banner */}
      <div className="h-48 md:h-64 w-full bg-gradient-to-r from-blue-600 to-indigo-700 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />
      </div>

      <Container className="-mt-24 md:-mt-32 relative z-10 space-y-8">
        
        {/* Breadcrumb / Back button */}
        <button 
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-slate-200 text-xs sm:text-sm font-semibold text-slate-600 hover:text-slate-900 shadow-sm transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Results
        </button>

        {/* Hero Card */}
        <Card className="shadow-lg border border-slate-200/80 bg-white">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-2.5">
                <Badge category={scheme.category} />
                <span className="inline-flex items-center gap-1 px-3 py-1 text-xs font-bold text-emerald-700 bg-emerald-50 rounded-full border border-emerald-100">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  Active Scheme
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
                {scheme.name}
              </h1>
              <p className="text-[11px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider">
                {scheme.department}
              </p>
            </div>
            
            <a 
              href={scheme.officialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full md:w-auto text-center"
            >
              <Button size="lg" className="w-full md:w-auto flex items-center justify-center gap-1.5">
                Apply On Official Portal
                <ExternalLink className="w-4 h-4" />
              </Button>
            </a>
          </div>
        </Card>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Main details */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Overview */}
            <Card>
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">Scheme Overview</h3>
                <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-line">
                  {scheme.description}
                </p>
              </div>
            </Card>

            {/* Benefits */}
            <Card className="bg-emerald-50/20 border-emerald-100">
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-emerald-900 flex items-center gap-2 border-b border-emerald-100/50 pb-3">
                  <Award className="w-5.5 h-5.5 text-emerald-600" />
                  Financial Benefits & Subsidies
                </h3>
                <p className="text-emerald-950 text-sm sm:text-base font-semibold leading-relaxed">
                  {scheme.benefits}
                </p>
              </div>
            </Card>

            {/* Eligibility parameters */}
            <Card>
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">Eligibility Parameters</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm text-slate-600">
                  {scheme.criteria.minAge && (
                    <div className="flex justify-between py-2.5 border-b border-slate-100">
                      <span className="font-medium text-slate-400">Minimum Age Limit</span>
                      <span className="font-bold text-slate-800">{scheme.criteria.minAge} Years</span>
                    </div>
                  )}
                  {scheme.criteria.maxAge && (
                    <div className="flex justify-between py-2.5 border-b border-slate-100">
                      <span className="font-medium text-slate-400">Maximum Age Limit</span>
                      <span className="font-bold text-slate-800">{scheme.criteria.maxAge} Years</span>
                    </div>
                  )}
                  {scheme.criteria.maxIncome && (
                    <div className="flex justify-between py-2.5 border-b border-slate-100 col-span-1 sm:col-span-2">
                      <span className="font-medium text-slate-400">Annual Income Cap</span>
                      <span className="font-bold text-slate-800">Below ₹{scheme.criteria.maxIncome.toLocaleString('en-IN')} / annum</span>
                    </div>
                  )}
                  <div className="flex justify-between py-2.5 border-b border-slate-100">
                    <span className="font-medium text-slate-400">Target Region</span>
                    <span className="font-bold text-slate-800">
                      {scheme.criteria.states && scheme.criteria.states.length > 0 
                        ? scheme.criteria.states.join(', ') 
                        : 'All States / Pan India'}
                    </span>
                  </div>
                  <div className="flex justify-between py-2.5 border-b border-slate-100">
                    <span className="font-medium text-slate-400">Required Category</span>
                    <span className="font-bold text-slate-800">
                      {scheme.criteria.womenOnly ? 'Women Only' : scheme.criteria.minorityOnly ? 'SC/ST/Minorities' : 'All Categories'}
                    </span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Step-by-Step application Process */}
            <Card>
              <div className="space-y-6">
                <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">Application Registration Process</h3>
                <div className="relative border-l border-blue-200/80 ml-3.5 space-y-8">
                  
                  <div className="relative pl-7">
                    <div className="absolute left-0 top-1.5 -translate-x-1/2 w-7 h-7 rounded-full bg-blue-50 border border-primary text-primary flex items-center justify-center font-bold text-xs shadow-sm">
                      1
                    </div>
                    <h4 className="font-bold text-sm text-slate-800">Verify Official Site</h4>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                      Click the portal link to open the official registration page. Double check that the site ends with a secure .gov.in or bank portal.
                    </p>
                  </div>

                  <div className="relative pl-7">
                    <div className="absolute left-0 top-1.5 -translate-x-1/2 w-7 h-7 rounded-full bg-blue-50 border border-primary text-primary flex items-center justify-center font-bold text-xs shadow-sm">
                      2
                    </div>
                    <h4 className="font-bold text-sm text-slate-800">Register Profile details</h4>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                      Enter your mobile number linked to Aadhaar. Input personal demographics, bank info, and generate a registration ID.
                    </p>
                  </div>

                  <div className="relative pl-7">
                    <div className="absolute left-0 top-1.5 -translate-x-1/2 w-7 h-7 rounded-full bg-blue-50 border border-primary text-primary flex items-center justify-center font-bold text-xs shadow-sm">
                      3
                    </div>
                    <h4 className="font-bold text-sm text-slate-800">Upload Documents</h4>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                      Scan and upload the verified PDF records (Aadhaar, income declaration, photos) matching the list on this page.
                    </p>
                  </div>

                  <div className="relative pl-7">
                    <div className="absolute left-0 top-1.5 -translate-x-1/2 w-7 h-7 rounded-full bg-blue-50 border border-primary text-primary flex items-center justify-center font-bold text-xs shadow-sm">
                      4
                    </div>
                    <h4 className="font-bold text-sm text-slate-800">Submit & Track</h4>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                      Submit application forms and download the acknowledgement receipt. Use the tracking ID to check approval statuses.
                    </p>
                  </div>

                </div>
              </div>
            </Card>

            {/* Scheme FAQs */}
            <div>
              <SectionTitle title="Frequently Asked Questions" align="left" className="mb-4 text-slate-800" />
              <Accordion items={schemeFAQs} />
            </div>

          </div>

          {/* Right Sidebar details */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Required documents Card */}
            <Card>
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3 uppercase tracking-wider flex items-center gap-1.5">
                  <FileCheck className="w-4.5 h-4.5 text-primary" />
                  Required Files
                </h3>
                <ul className="space-y-3">
                  {scheme.documents.map((doc, idx) => (
                    <li key={idx} className="flex gap-2.5 items-start text-xs font-semibold text-slate-600 bg-slate-50 border border-slate-200/50 p-3 rounded-xl">
                      <ChevronRight className="w-3.5 h-3.5 text-primary flex-shrink-0 mt-0.5" />
                      <span>{doc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Card>

            {/* Important dates Card */}
            <Card>
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3 uppercase tracking-wider flex items-center gap-1.5">
                  <Calendar className="w-4.5 h-4.5 text-primary" />
                  Key Dates
                </h3>
                <div className="space-y-3 text-xs">
                  <div className="flex justify-between py-2 border-b border-slate-100">
                    <span className="text-slate-400 font-bold">Applications</span>
                    <span className="text-slate-800 font-bold">Open (Year-round)</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-slate-100">
                    <span className="text-slate-400 font-bold">Deadline</span>
                    <span className="text-rose-600 font-bold">{scheme.deadline}</span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Related Schemes */}
            {relatedSchemes.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Related Schemes</h3>
                <div className="space-y-4">
                  {relatedSchemes.map((rel) => (
                    <Link href={`/schemes/${rel.id}`} key={rel.id} className="block">
                      <Card hoverLift className="p-4 sm:p-5 bg-white border border-slate-200">
                        <div className="space-y-2 text-xs">
                          <Badge category={rel.category} />
                          <h4 className="font-extrabold text-slate-800 line-clamp-2 leading-snug">{rel.name}</h4>
                          <span className="inline-flex items-center text-[10px] text-primary font-bold gap-0.5 mt-2">
                            View details <ChevronRight className="w-3 h-3" />
                          </span>
                        </div>
                      </Card>
                    </Link>
                  ))}
                </div>
              </div>
            )}

          </div>

        </div>

      </Container>

      {/* Sticky Bottom Apply bar for mobile screen view */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-slate-200 p-4 shadow-lg flex items-center justify-between sm:hidden animate-fade-in">
        <div className="w-2/3">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider leading-none">Subsidies Match</p>
          <h4 className="text-xs font-bold text-slate-800 truncate mt-1">{scheme.name}</h4>
        </div>
        <a 
          href={scheme.officialUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="w-1/3"
        >
          <Button size="sm" className="w-full text-center">
            Apply Now
          </Button>
        </a>
      </div>

    </div>
  );
}
