'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Filter, 
  MapPin, 
  Calendar, 
  Award, 
  FileCheck, 
  ArrowRight, 
  ChevronRight,
  RefreshCw,
  Sparkles,
  Info,
  X,
  CheckCircle2,
  AlertTriangle,
  ExternalLink
} from 'lucide-react';
import { schemesData } from '@/data/schemes';
import { Scheme } from '@/types';
import Badge from '@/components/UI/Badge';
import { CardSkeleton } from '@/components/UI/Skeleton';

const states = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 
  'Delhi', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 
  'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 
  'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 
  'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 
  'Uttarakhand', 'West Bengal'
];

// Actual Content Component that handles search parameters
function ResultsContent() {
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedStateFilter, setSelectedStateFilter] = useState<string>('all');
  const [matchedSchemes, setMatchedSchemes] = useState<(Scheme & { matchScore: number })[]>([]);
  const [selectedScheme, setSelectedScheme] = useState<Scheme | null>(null);
  const [loading, setLoading] = useState(true);

  // Extract Form Data from URL query parameters
  const userState = searchParams.get('state') || '';
  
  // Sync state filter with userState from query parameters on mount/update
  useEffect(() => {
    if (userState) {
      setSelectedStateFilter(userState);
    }
  }, [userState]);

  const userAge = parseInt(searchParams.get('age') || '0');
  const userGender = searchParams.get('gender') || '';
  const userOccupation = searchParams.get('occupation') || '';
  
  // Robustly verify status flags based on checkbox OR direct occupation selections
  const isStudent = searchParams.get('isStudent') === 'true' || userOccupation === 'student';
  const isFarmer = searchParams.get('isFarmer') === 'true' || userOccupation === 'farmer';
  const isBusinessOwner = searchParams.get('isBusinessOwner') === 'true' || 
                          userOccupation === 'business_owner' || 
                          userOccupation === 'street_vendor' || 
                          userOccupation === 'self_employed';
                          
  const userIncome = searchParams.get('annualIncome') || '';
  const minorityCategory = searchParams.get('minorityCategory') || '';
  const disabilityStatus = searchParams.get('disabilityStatus') || '';
  const businessRegistration = searchParams.get('businessRegistration') || '';
  const isWomenEntrepreneur = searchParams.get('isWomenEntrepreneur') === 'true';
  const loanRequirement = searchParams.get('loanRequirement') || '';
  const purpose = searchParams.get('purpose') || '';
  const userEducation = searchParams.get('education') || '';
  const userAreaType = searchParams.get('areaType') || '';

  // Calculate Match Score for each scheme
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      const results = schemesData.map((scheme) => {
        let score = 100; // Base score
        const { criteria } = scheme;

        // Age Criteria
        if (userAge > 0) {
          if (criteria.minAge && userAge < criteria.minAge) score -= 30;
          if (criteria.maxAge && userAge > criteria.maxAge) score -= 30;
        }

        // Gender/Women Only Criteria
        if (criteria.womenOnly) {
          if (userGender !== 'female' && !isWomenEntrepreneur) {
            score = 0; // Absolute disqualification
          } else {
            score += 5; // Preference boost
          }
        }

        // Student Criteria
        if (criteria.student && !isStudent) {
          score -= 50;
        } else if (criteria.student && isStudent) {
          score += 10;
        }

        // Farmer Criteria
        if (criteria.farmer && !isFarmer) {
          score -= 50;
        } else if (criteria.farmer && isFarmer) {
          score += 10;
        }

        // Business Owner Criteria
        if (criteria.businessOwner && !isBusinessOwner) {
          score -= 40;
        } else if (criteria.businessOwner && isBusinessOwner) {
          score += 10;
          
          // Registration specific check
          if (criteria.businessRegistration === 'registered' && businessRegistration === 'unregistered') {
            score -= 30;
          }
        }

        // Income Bracket check (Income matches or below)
        if (criteria.maxIncome) {
          let userIncomeVal = 0;
          if (userIncome === 'above_20') {
            userIncomeVal = 2500000; // Map high bracket correctly
          } else {
            userIncomeVal = parseInt(userIncome) || 0;
          }

          if (userIncomeVal > criteria.maxIncome) {
            score -= 40;
          } else {
            score += 5;
          }
        }

        // Minority Check
        if (criteria.minorityOnly) {
          if (minorityCategory === 'general' || minorityCategory === '') {
            score -= 40;
          } else {
            score += 10;
          }
        }

        // Disability Check
        if (criteria.disabilityOnly && disabilityStatus !== 'yes') {
          score -= 50;
        }

        // State Check (Only if states constraint is set on the scheme)
        if (criteria.states && criteria.states.length > 0 && userState) {
          if (!criteria.states.includes(userState)) {
            score -= 20;
          } else {
            score += 5;
          }
        }

        // Purpose Check (If scheme fits user's purpose)
        if (purpose) {
          if (purpose === 'farm_inputs' && scheme.category === 'agriculture') score += 10;
          if (purpose === 'tuition' && scheme.category === 'education') score += 10;
          if (purpose === 'working_capital' && scheme.category === 'msme') score += 10;
          if (purpose === 'equipment' && scheme.category === 'msme') score += 10;
          if (purpose === 'greenfield' && scheme.id === 'standup-india') score += 15;
          if (purpose === 'pension' && scheme.id === 'pm-kmy') score += 20;
        }

        // Education Level matching
        if (scheme.category === 'education') {
          if (userEducation === 'under_10') {
            score = 0; // Disqualify from post-matric/secondary scholarships
          } else if (userEducation === 'matric' && scheme.id === 'post-matric-scholarship') {
            score += 10;
          } else if (userEducation === 'senior_secondary' || userEducation === 'undergraduate' || userEducation === 'postgraduate') {
            score += 15;
          }
        }

        // Area Type (Rural / Urban) matching
        if (scheme.id === 'mahila-coir-yojana' && userAreaType === 'urban') {
          score -= 40; // Rural artisan mismatch
        } else if (scheme.id === 'pm-kisan' && userAreaType === 'urban') {
          score -= 20; // Farmers landholder is rural target
        } else if (userAreaType === 'rural' && scheme.id === 'pm-svanidhi') {
          score += 5;
        }

        // Clamp score between 0 and 100
        score = Math.max(0, Math.min(100, score));

        return {
          ...scheme,
          matchScore: score
        };
      });

      // Sort schemes: Central schemes first (no states restriction), then State-specific schemes.
      // Within each, sort by matchScore descending.
      const sortedResults = results.sort((a, b) => {
        const aIsCentral = !a.criteria.states || a.criteria.states.length === 0;
        const bIsCentral = !b.criteria.states || b.criteria.states.length === 0;
        
        if (aIsCentral && !bIsCentral) return -1;
        if (!aIsCentral && bIsCentral) return 1;
        
        return b.matchScore - a.matchScore;
      });
      setMatchedSchemes(sortedResults);
      setLoading(false);
    }, 800); // Simulated network delay for realism

    return () => clearTimeout(timer);
  }, [
    userState, userAge, userGender, userOccupation, isStudent, isFarmer, 
    isBusinessOwner, userIncome, minorityCategory, disabilityStatus, 
    businessRegistration, isWomenEntrepreneur, loanRequirement, purpose,
    userEducation, userAreaType
  ]);

  // Handle Search and Filter logic
  const filteredSchemes = matchedSchemes.filter((scheme) => {
    const matchesSearch = 
      scheme.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      scheme.description.toLowerCase().includes(searchQuery.toLowerCase()) || 
      scheme.department.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesCategory = selectedCategory === 'all' || scheme.category === selectedCategory;
    const matchesState = selectedStateFilter === 'all' || 
                         !scheme.criteria.states || 
                         scheme.criteria.states.length === 0 || 
                         scheme.criteria.states.includes(selectedStateFilter);

    // Enforce compatibility threshold (>= 60% match score) to prevent unrelated results
    const matchesScore = scheme.matchScore >= 60;

    return matchesSearch && matchesCategory && matchesState && matchesScore;
  });

  const categoriesList = [
    { value: 'all', label: 'All Categories' },
    { value: 'msme', label: 'MSME & Business' },
    { value: 'agriculture', label: 'Agriculture & Farming' },
    { value: 'education', label: 'Education & Merit' },
    { value: 'women', label: 'Women Empowerment' },
    { value: 'minority', label: 'Minority & SC/ST' },
  ];

  const statesFilterOptions = [
    'all', 'Delhi', 'Maharashtra', 'Karnataka', 'Rajasthan', 'Gujarat', 'Uttar Pradesh'
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      
      {/* Search and Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-slate-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Matching Schemes
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            {searchParams.get('fullName') 
              ? `Tailored results for ${searchParams.get('fullName')} based on profile inputs.` 
              : 'Explore government schemes, funding, and subsidies matched to our default profile.'}
          </p>
        </div>

        {/* Search input */}
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-400" />
          <input
            type="text"
            placeholder="Search scheme name, department..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-primary transition-colors"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 pt-8">
        
        {/* FILTERS PANEL (Sidebar on desktop) */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-5 sticky top-24">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <Filter className="w-4 h-4 text-primary" />
              <h3 className="font-bold text-slate-800 text-sm">Refine Schemes</h3>
            </div>

            {/* Categories filter */}
            <div className="space-y-2.5">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Category</h4>
              <div className="space-y-1.5">
                {categoriesList.map((cat) => (
                  <button
                    key={cat.value}
                    onClick={() => setSelectedCategory(cat.value)}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                      selectedCategory === cat.value
                        ? 'bg-blue-50 text-primary border border-blue-100'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 border border-transparent'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* State filter */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">State</h4>
              <select
                value={selectedStateFilter}
                onChange={(e) => setSelectedStateFilter(e.target.value)}
                className="w-full text-xs font-semibold bg-white border border-slate-200 rounded-xl py-2 px-3 focus:outline-none focus:border-primary text-slate-700"
              >
                <option value="all">All States / Central</option>
                {states.map((st) => (
                  <option key={st} value={st}>{st}</option>
                ))}
              </select>
            </div>

            {/* Reset Checker profile button */}
            <div className="pt-4 border-t border-slate-100">
              <Link
                href="/eligibility"
                className="w-full py-2.5 px-4 bg-slate-50 hover:bg-slate-100 text-slate-700 font-semibold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-colors border border-slate-200"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Retake Checker
              </Link>
            </div>
          </div>
        </div>

        {/* RESULTS SCHEMES LIST (Main content) */}
        <div className="lg:col-span-3 space-y-6">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <CardSkeleton />
              <CardSkeleton />
              <CardSkeleton />
              <CardSkeleton />
            </div>
          ) : filteredSchemes.length > 0 ? (
            <motion.div 
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {filteredSchemes.map((scheme, idx) => {
                const matchScore = scheme.matchScore;
                
                // Color formatting for match score badge
                let matchBadgeClass = 'bg-emerald-50 text-emerald-700 border-emerald-200';
                let matchIcon = <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />;
                if (matchScore < 40) {
                  matchBadgeClass = 'bg-rose-50 text-rose-700 border-rose-200';
                  matchIcon = <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />;
                } else if (matchScore < 75) {
                  matchBadgeClass = 'bg-amber-50 text-amber-700 border-amber-200';
                  matchIcon = <Info className="w-3.5 h-3.5 text-amber-600" />;
                }

                return (
                  <motion.div 
                    key={scheme.id}
                    layout
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: Math.min(idx * 0.05, 0.4), ease: 'easeOut' }}
                    className="border border-slate-200 rounded-3xl p-6 bg-white flex flex-col justify-between hover-lift shadow-sm relative overflow-hidden"
                  >
                    {/* Top Section details */}
                    <div className="space-y-3.5">
                      <div className="flex items-center justify-between gap-2">
                        <Badge category={scheme.category} />
                        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 text-xs font-bold rounded-full border ${matchBadgeClass}`}>
                          {matchIcon}
                          {matchScore}% Match
                        </span>
                      </div>

                      <div>
                        <Link href={`/schemes/${scheme.id}`}>
                          <h3 className="font-extrabold text-slate-800 leading-snug line-clamp-2 min-h-[2.75rem] hover:text-primary transition-colors">
                            {scheme.name}
                          </h3>
                        </Link>
                        <p className="text-[10px] font-semibold text-slate-400 mt-1 uppercase tracking-wider truncate">
                          {scheme.department}
                        </p>
                      </div>

                      <p className="text-slate-500 text-xs leading-relaxed line-clamp-3">
                        {scheme.description}
                      </p>
                    </div>

                    {/* Bottom Section details & CTAs */}
                    <div className="mt-5 pt-4 border-t border-slate-100 space-y-4">
                      <div className="grid grid-cols-2 gap-3 text-[11px] font-semibold text-slate-600">
                        <div className="flex items-center gap-1.5">
                          <Award className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                          <span className="truncate text-slate-700 font-bold">{scheme.benefits.split(',')[0]}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <FileCheck className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                          <span className="truncate text-slate-700 font-bold">{scheme.documents.length} Docs Required</span>
                        </div>
                      </div>

                      <div className="flex gap-2.5 pt-1">
                        <Link 
                          href={`/schemes/${scheme.id}`}
                          className="flex-1 text-center py-2.5 text-xs font-semibold text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl transition-all block"
                        >
                          View Details
                        </Link>
                        <a 
                          href={scheme.officialUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex-1 text-center py-2.5 text-xs font-bold text-white bg-primary hover:bg-blue-700 rounded-xl transition-all inline-flex items-center justify-center gap-1"
                        >
                          Apply Now
                          <ArrowRight className="w-3 h-3" />
                        </a>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          ) : (
            <div className="bg-slate-50 border border-slate-200/80 rounded-[2rem] p-8 text-center space-y-6 max-w-2xl mx-auto shadow-sm">
              <div className="w-14 h-14 rounded-full bg-blue-50 text-primary border border-blue-100 flex items-center justify-center mx-auto shadow-sm">
                <Info className="w-6 h-6 text-primary" />
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-extrabold text-slate-800">No High-Probability Matches Found</h3>
                <p className="text-xs text-slate-500 leading-relaxed max-w-md mx-auto">
                  Based on your demographic details, we couldn&apos;t identify an exact match. Don&apos;t worry, this happens when parameters are highly specific.
                </p>
              </div>
              
              <div className="bg-white border border-slate-200/60 rounded-2xl p-5 text-left space-y-3 shadow-sm max-w-md mx-auto">
                <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Alternative Pathways & General Schemes</h4>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  You can explore general schemes with open eligibility parameters:
                </p>
                <ul className="space-y-2 text-[11px] text-slate-600">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                    <span><strong>PM Kaushal Vikas Yojana</strong>: Skill training and stipend placement open to youth aged 15-45.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                    <span><strong>PM MUDRA Yojana</strong>: Collateral-free business credit up to ₹50,000 under Shishu tranche.</span>
                  </li>
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 items-center justify-center pt-2 max-w-md mx-auto">
                <Link 
                  href="/eligibility" 
                  className="w-full sm:w-auto text-center py-2.5 px-5 bg-primary hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md transition-all active:scale-98"
                >
                  Adjust Parameters
                </Link>
                <Link 
                  href="/assistant" 
                  className="w-full sm:w-auto text-center py-2.5 px-5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-xs rounded-xl shadow-sm transition-all"
                >
                  Ask AI Assistant
                </Link>
                <button 
                  onClick={() => { setSearchQuery(''); setSelectedCategory('all'); setSelectedStateFilter('all'); }}
                  className="w-full sm:w-auto text-center py-2.5 px-5 bg-slate-100 hover:bg-slate-200 text-slate-600 font-semibold text-xs rounded-xl transition-all"
                >
                  Clear Filters
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* SCHEME DETAIL MODAL VIEW */}
      {selectedScheme && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-[2rem] w-full max-w-2xl overflow-hidden shadow-2xl animate-fade-in relative max-h-[90vh] flex flex-col">
            
            {/* Modal Header */}
            <div className="p-6 sm:p-8 border-b border-slate-100 flex items-start justify-between gap-4 bg-slate-50/50">
              <div className="space-y-2">
                <Badge category={selectedScheme.category} />
                <h2 className="font-extrabold text-slate-900 text-lg sm:text-xl leading-snug">
                  {selectedScheme.name}
                </h2>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider leading-relaxed">
                  {selectedScheme.department}
                </p>
              </div>
              <button 
                onClick={() => setSelectedScheme(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 space-y-6 overflow-y-auto flex-1 text-sm text-slate-600 leading-relaxed">
              
              {/* Description */}
              <div className="space-y-2">
                <h4 className="font-extrabold text-slate-800 uppercase text-xs tracking-wider">About Scheme</h4>
                <p>{selectedScheme.description}</p>
              </div>

              {/* Benefits */}
              <div className="space-y-2 bg-emerald-50/40 border border-emerald-100 p-5 rounded-2xl">
                <h4 className="font-extrabold text-emerald-800 uppercase text-xs tracking-wider flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Key Benefits & Subsidies
                </h4>
                <p className="text-emerald-950 font-medium text-xs sm:text-sm">{selectedScheme.benefits}</p>
              </div>

              {/* Required Documents Checklist */}
              <div className="space-y-3">
                <h4 className="font-extrabold text-slate-800 uppercase text-xs tracking-wider flex items-center gap-1.5">
                  <FileCheck className="w-4.5 h-4.5 text-primary" />
                  Required Documents Checklist
                </h4>
                <ul className="space-y-2">
                  {selectedScheme.documents.map((doc, idx) => (
                    <li key={idx} className="flex gap-2.5 items-start text-xs font-semibold text-slate-700">
                      <ChevronRight className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      <span>{doc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* General Criteria Summary details */}
              <div className="grid grid-cols-2 gap-4 border-t border-slate-100 pt-5 text-xs">
                <div className="space-y-1">
                  <span className="text-slate-400 font-bold uppercase tracking-wider block text-[10px]">Deadline</span>
                  <span className="text-slate-800 font-bold">{selectedScheme.deadline}</span>
                </div>
                <div className="space-y-1">
                  <span className="text-slate-400 font-bold uppercase tracking-wider block text-[10px]">Applicable Region</span>
                  <span className="text-slate-800 font-bold">
                    {selectedScheme.criteria.states && selectedScheme.criteria.states.length > 0 
                      ? selectedScheme.criteria.states.join(', ') 
                      : 'All States / Pan India'}
                  </span>
                </div>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="p-6 sm:p-8 border-t border-slate-100 flex gap-4 bg-slate-50/50">
              <button 
                onClick={() => setSelectedScheme(null)}
                className="flex-1 py-3 text-sm font-semibold text-slate-600 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors"
              >
                Close Details
              </button>
              <a 
                href={selectedScheme.officialUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex-1 py-3 text-sm font-bold text-white bg-primary hover:bg-blue-700 rounded-xl transition-all text-center flex items-center justify-center gap-1"
              >
                Apply On Official Portal
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}

// Main Results Component containing Suspense
export default function ResultsPage() {
  return (
    <Suspense fallback={
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center space-y-4">
        <RefreshCw className="w-8 h-8 text-primary animate-spin mx-auto" />
        <p className="text-slate-500 font-semibold text-sm">Analyzing scheme eligibility databases...</p>
      </div>
    }>
      <ResultsContent />
    </Suspense>
  );
}
