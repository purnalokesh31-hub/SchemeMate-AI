'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, 
  Briefcase, 
  IndianRupee, 
  Sparkles, 
  ArrowRight, 
  ArrowLeft,
  CheckCircle2,
  Save,
  Trash2,
  History
} from 'lucide-react';
import Button from '@/components/UI/Button';
import Card from '@/components/UI/Card';
import Container from '@/components/UI/Container';

export default function EligibilityCheckerPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [saveToast, setSaveToast] = useState(false);
  const [hasSavedProgress, setHasSavedProgress] = useState(false);
  const [savedName, setSavedName] = useState('');

  // Form State
  const [formData, setFormData] = useState({
    fullName: '',
    state: '',
    district: '',
    age: '',
    gender: '',
    occupation: '',
    isStudent: false,
    isFarmer: false,
    isBusinessOwner: false,
    annualIncome: '',
    businessRegistration: '',
    isWomenEntrepreneur: false,
    minorityCategory: '',
    disabilityStatus: '',
    businessType: '',
    yearsInBusiness: '',
    employees: '',
    loanRequirement: '',
    purpose: '',
    education: '',
    areaType: '',
  });

  // Check for saved progress on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = window.localStorage.getItem('schememate_checker_progress');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (parsed && parsed.formData) {
            setHasSavedProgress(true);
            setSavedName(parsed.formData.fullName || 'Anonymous');
          }
        } catch (e) {
          console.warn('Failed to parse saved checker progress:', e);
        }
      }
    }
  }, []);

  const handleSaveProgress = () => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('schememate_checker_progress', JSON.stringify({ formData, step }));
      setSaveToast(true);
      setSavedName(formData.fullName || 'Anonymous');
      setTimeout(() => setSaveToast(false), 3500);
    }
  };

  const handleResume = () => {
    if (typeof window !== 'undefined') {
      const saved = window.localStorage.getItem('schememate_checker_progress');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          setFormData(parsed.formData);
          setStep(parsed.step);
          setHasSavedProgress(false);
        } catch (e) {
          console.warn('Failed to resume checker progress:', e);
        }
      }
    }
  };

  const handleClearSaved = () => {
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem('schememate_checker_progress');
      setHasSavedProgress(false);
    }
  };

  const states = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 
    'Delhi', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 
    'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 
    'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 
    'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 
    'Uttarakhand', 'West Bengal'
  ];

  const occupations = [
    { value: 'student', label: 'Student' },
    { value: 'farmer', label: 'Farmer / Agricultural worker' },
    { value: 'business_owner', label: 'Business Owner / Entrepreneur' },
    { value: 'salaried', label: 'Salaried Employee' },
    { value: 'self_employed', label: 'Self-Employed Professional' },
    { value: 'street_vendor', label: 'Street Vendor / Retailer' },
    { value: 'unemployed', label: 'Unemployed' },
    { value: 'other', label: 'Other' },
  ];

  const incomeBrackets = [
    { value: '250000', label: 'Less than ₹2.5 Lakhs' },
    { value: '500000', label: '₹2.5 Lakhs - ₹5 Lakhs' },
    { value: '1000000', label: '₹5 Lakhs - ₹10 Lakhs' },
    { value: '2000000', label: '₹10 Lakhs - ₹20 Lakhs' },
    { value: 'above_20', label: 'Above ₹20 Lakhs' },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => {
        const update = { ...prev, [name]: checked };
        // Sync toggles with occupation if needed
        if (name === 'isStudent' && checked) update.occupation = 'student';
        if (name === 'isFarmer' && checked) update.occupation = 'farmer';
        if (name === 'isBusinessOwner' && checked) update.occupation = 'business_owner';
        return update;
      });
    } else {
      setFormData(prev => {
        const update = { ...prev, [name]: value };
        // Sync checkmarks when selecting occupation
        if (name === 'occupation') {
          update.isStudent = value === 'student';
          update.isFarmer = value === 'farmer';
          update.isBusinessOwner = value === 'business_owner' || value === 'street_vendor';
        }
        return update;
      });
    }

    if (errors[name]) {
      setErrors(prev => {
        const copy = { ...prev };
        delete copy[name];
        return copy;
      });
    }
  };

  const validateStep = () => {
    const newErrors: Record<string, string> = {};
    
    if (step === 1) {
      if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
      if (!formData.age) newErrors.age = 'Age is required';
      else if (parseInt(formData.age) < 1 || parseInt(formData.age) > 120) newErrors.age = 'Enter a valid age';
      if (!formData.gender) newErrors.gender = 'Gender is required';
      if (!formData.state) newErrors.state = 'State is required';
      if (!formData.district.trim()) newErrors.district = 'District is required';
      if (!formData.education) newErrors.education = 'Education level is required';
      if (!formData.areaType) newErrors.areaType = 'Area type is required';
    } else if (step === 2) {
      if (!formData.occupation) newErrors.occupation = 'Please select your primary occupation';
      if (!formData.minorityCategory) newErrors.minorityCategory = 'Please specify category';
      if (!formData.disabilityStatus) newErrors.disabilityStatus = 'Please select disability status';
    } else if (step === 3) {
      if (!formData.annualIncome) newErrors.annualIncome = 'Annual income is required';
      
      // If business owner, validate business fields
      if (formData.isBusinessOwner || formData.occupation === 'business_owner') {
        if (!formData.businessRegistration) newErrors.businessRegistration = 'Specify business registration status';
        if (!formData.businessType) newErrors.businessType = 'Select business type';
        if (!formData.yearsInBusiness) newErrors.yearsInBusiness = 'Select years in business';
        if (!formData.employees) newErrors.employees = 'Select employee range';
      }
    } else if (step === 4) {
      if (!formData.loanRequirement) newErrors.loanRequirement = 'Loan requirement is required';
      if (!formData.purpose) newErrors.purpose = 'Purpose is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) {
      setStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    setStep(prev => prev - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep()) {
      // Serialize form to search parameters
      const params = new URLSearchParams();
      Object.entries(formData).forEach(([key, val]) => {
        params.append(key, val.toString());
      });
      router.push(`/results?${params.toString()}`);
    }
  };

  const progressPercentage = (step / 4) * 100;

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <Container className="max-w-3xl space-y-6">
        
        {/* Page Header */}
        <div className="text-center space-y-3 mb-4">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Scheme Eligibility Checker
          </h1>
          <p className="text-sm sm:text-base text-slate-500 max-w-lg mx-auto">
            Provide your demographics and requirements to discover matching loans, subsidies, and grants instantly.
          </p>
        </div>

        {/* Resume Banner */}
        <AnimatePresence>
          {hasSavedProgress && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-blue-50 border border-blue-200 rounded-[1.5rem] p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm overflow-hidden"
            >
              <div className="flex items-center gap-3.5 text-left">
                <div className="bg-blue-100 text-primary p-2.5 rounded-xl border border-blue-200">
                  <History className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-xs text-blue-900">Resume saved progress?</h4>
                  <p className="text-[11px] text-slate-500 leading-tight">We found draft answers from &quot;{savedName || 'Unnamed'}&quot;. Would you like to resume checking?</p>
                </div>
              </div>
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <Button size="sm" onClick={handleResume} className="w-full sm:w-auto text-xs py-2 px-4">
                  Resume check
                </Button>
                <Button size="sm" variant="outline" onClick={handleClearSaved} className="w-full sm:w-auto text-xs py-2 px-4 text-slate-500 border-slate-200 hover:text-slate-700 hover:bg-slate-100">
                  Clear
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Progress Tracker Card */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm space-y-3">
          <div className="flex justify-between items-center text-xs font-semibold text-slate-500 uppercase tracking-wider">
            <span>Step {step} of 4</span>
            <span>
              {step === 1 && 'Personal Profile'}
              {step === 2 && 'Occupation & Category'}
              {step === 3 && 'Financials & Business'}
              {step === 4 && 'Funding Requirements'}
            </span>
          </div>
          <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary rounded-full transition-all duration-300 ease-out" 
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>

        {/* Form Container */}
        <Card className="p-8 sm:p-10 shadow-xl" padding="none">
          <form onSubmit={handleSubmit} className="p-8 sm:p-10 space-y-8">
            
            <AnimatePresence mode="wait">
              {/* STEP 1: Personal Details */}
              {step === 1 && (
                <motion.div 
                  key="step-1"
                  initial={{ opacity: 0, x: 15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -15 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-6"
                >
                  <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
                    <User className="w-5 h-5 text-primary" />
                    <h2 className="text-lg font-bold text-slate-800">Personal Demographics</h2>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Full Name */}
                    <div className="space-y-2 col-span-1 sm:col-span-2">
                      <label htmlFor="fullName" className="block text-sm font-semibold text-slate-700">Full Name</label>
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        placeholder="e.g. Ramesh Kumar"
                        value={formData.fullName}
                        onChange={handleChange}
                        className={`w-full border rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-primary transition-colors ${
                          errors.fullName ? 'border-red-400 focus:border-red-400 bg-red-50/20' : 'border-slate-200'
                        }`}
                      />
                      {errors.fullName && <p className="text-xs text-red-500 font-medium">{errors.fullName}</p>}
                    </div>

                    {/* Age */}
                    <div className="space-y-2">
                      <label htmlFor="age" className="block text-sm font-semibold text-slate-700">Age (Years)</label>
                      <input
                        type="number"
                        id="age"
                        name="age"
                        placeholder="e.g. 35"
                        value={formData.age}
                        onChange={handleChange}
                        className={`w-full border rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-primary transition-colors ${
                          errors.age ? 'border-red-400 focus:border-red-400 bg-red-50/20' : 'border-slate-200'
                        }`}
                      />
                      {errors.age && <p className="text-xs text-red-500 font-medium">{errors.age}</p>}
                    </div>

                    {/* Gender */}
                    <div className="space-y-2">
                      <label htmlFor="gender" className="block text-sm font-semibold text-slate-700">Gender</label>
                      <select
                        id="gender"
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        className={`w-full border rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-primary transition-colors ${
                          errors.gender ? 'border-red-400 focus:border-red-400 bg-red-50/20' : 'border-slate-200'
                        }`}
                      >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                      {errors.gender && <p className="text-xs text-red-500 font-medium">{errors.gender}</p>}
                    </div>

                    {/* State */}
                    <div className="space-y-2">
                      <label htmlFor="state" className="block text-sm font-semibold text-slate-700">State of Residence</label>
                      <select
                        id="state"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        className={`w-full border rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-primary transition-colors ${
                          errors.state ? 'border-red-400 focus:border-red-400 bg-red-50/20' : 'border-slate-200'
                        }`}
                      >
                        <option value="">Select State</option>
                        {states.map((st) => (
                          <option key={st} value={st}>{st}</option>
                        ))}
                      </select>
                      {errors.state && <p className="text-xs text-red-500 font-medium">{errors.state}</p>}
                    </div>

                    {/* District */}
                    <div className="space-y-2">
                      <label htmlFor="district" className="block text-sm font-semibold text-slate-700">District</label>
                      <input
                        type="text"
                        id="district"
                        name="district"
                        placeholder="e.g. Pune"
                        value={formData.district}
                        onChange={handleChange}
                        className={`w-full border rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-primary transition-colors ${
                          errors.district ? 'border-red-400 focus:border-red-400 bg-red-50/20' : 'border-slate-200'
                        }`}
                      />
                      {errors.district && <p className="text-xs text-red-500 font-medium">{errors.district}</p>}
                    </div>

                    {/* Education Level */}
                    <div className="space-y-2">
                      <label htmlFor="education" className="block text-sm font-semibold text-slate-700">Education Level</label>
                      <select
                        id="education"
                        name="education"
                        value={formData.education}
                        onChange={handleChange}
                        className={`w-full border rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-primary transition-colors ${
                          errors.education ? 'border-red-400 focus:border-red-400 bg-red-50/20' : 'border-slate-200'
                        }`}
                      >
                        <option value="">Select Education Level</option>
                        <option value="under_10">Below Class 10</option>
                        <option value="matric">Class 10 (Matric)</option>
                        <option value="senior_secondary">Class 12 (Senior Secondary)</option>
                        <option value="undergraduate">Graduate / Undergraduate Degree</option>
                        <option value="postgraduate">Post Graduate Degree</option>
                        <option value="diploma">Diploma / ITI Course</option>
                      </select>
                      {errors.education && <p className="text-xs text-red-500 font-medium">{errors.education}</p>}
                    </div>

                    {/* Area Type (Rural / Urban) */}
                    <div className="space-y-2">
                      <label htmlFor="areaType" className="block text-sm font-semibold text-slate-700">Residential Area Type</label>
                      <select
                        id="areaType"
                        name="areaType"
                        value={formData.areaType}
                        onChange={handleChange}
                        className={`w-full border rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-primary transition-colors ${
                          errors.areaType ? 'border-red-400 focus:border-red-400 bg-red-50/20' : 'border-slate-200'
                        }`}
                      >
                        <option value="">Select Residential Type</option>
                        <option value="rural">Rural Area</option>
                        <option value="urban">Urban Area</option>
                      </select>
                      {errors.areaType && <p className="text-xs text-red-500 font-medium">{errors.areaType}</p>}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* STEP 2: Profile & Occupation */}
              {step === 2 && (
                <motion.div 
                  key="step-2"
                  initial={{ opacity: 0, x: 15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -15 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-6"
                >
                  <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
                    <Briefcase className="w-5 h-5 text-primary" />
                    <h2 className="text-lg font-bold text-slate-800">Occupation & Profile Details</h2>
                  </div>

                  <div className="space-y-6">
                    {/* Occupation */}
                    <div className="space-y-2">
                      <label htmlFor="occupation" className="block text-sm font-semibold text-slate-700">Primary Occupation</label>
                      <select
                        id="occupation"
                        name="occupation"
                        value={formData.occupation}
                        onChange={handleChange}
                        className={`w-full border rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-primary transition-colors ${
                          errors.occupation ? 'border-red-400 focus:border-red-400 bg-red-50/20' : 'border-slate-200'
                        }`}
                      >
                        <option value="">Select Occupation</option>
                        {occupations.map((o) => (
                          <option key={o.value} value={o.value}>{o.label}</option>
                        ))}
                      </select>
                      {errors.occupation && <p className="text-xs text-red-500 font-medium">{errors.occupation}</p>}
                    </div>

                    {/* Profile flags checkbox grid */}
                    <div className="bg-slate-50 border border-slate-200/60 rounded-2xl p-5 space-y-4">
                      <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Help us tag your profile</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        
                        <label className="flex items-center space-x-3 p-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50/60 cursor-pointer select-none">
                          <input
                            type="checkbox"
                            name="isStudent"
                            checked={formData.isStudent}
                            onChange={handleChange}
                            className="rounded text-primary focus:ring-primary w-4.5 h-4.5"
                          />
                          <span className="text-xs font-semibold text-slate-700">I am a Student</span>
                        </label>

                        <label className="flex items-center space-x-3 p-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50/60 cursor-pointer select-none">
                          <input
                            type="checkbox"
                            name="isFarmer"
                            checked={formData.isFarmer}
                            onChange={handleChange}
                            className="rounded text-primary focus:ring-primary w-4.5 h-4.5"
                          />
                          <span className="text-xs font-semibold text-slate-700">I am a Farmer</span>
                        </label>

                        <label className="flex items-center space-x-3 p-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50/60 cursor-pointer select-none">
                          <input
                            type="checkbox"
                            name="isBusinessOwner"
                            checked={formData.isBusinessOwner}
                            onChange={handleChange}
                            className="rounded text-primary focus:ring-primary w-4.5 h-4.5"
                          />
                          <span className="text-xs font-semibold text-slate-700">Business Owner</span>
                        </label>

                      </div>
                    </div>

                    {/* Social Category & Disability */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label htmlFor="minorityCategory" className="block text-sm font-semibold text-slate-700">Social Category</label>
                        <select
                          id="minorityCategory"
                          name="minorityCategory"
                          value={formData.minorityCategory}
                          onChange={handleChange}
                          className={`w-full border rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-primary transition-colors ${
                            errors.minorityCategory ? 'border-red-400 focus:border-red-400 bg-red-50/20' : 'border-slate-200'
                          }`}
                        >
                          <option value="">Select Category</option>
                          <option value="general">General</option>
                          <option value="obc">OBC</option>
                          <option value="sc">Scheduled Caste (SC)</option>
                          <option value="st">Scheduled Tribe (ST)</option>
                          <option value="minority">Minority Communities (Sikh, Muslim, Christian, etc.)</option>
                        </select>
                        {errors.minorityCategory && <p className="text-xs text-red-500 font-medium">{errors.minorityCategory}</p>}
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="disabilityStatus" className="block text-sm font-semibold text-slate-700">Disability Status (PwD)</label>
                        <select
                          id="disabilityStatus"
                          name="disabilityStatus"
                          value={formData.disabilityStatus}
                          onChange={handleChange}
                          className={`w-full border rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-primary transition-colors ${
                            errors.disabilityStatus ? 'border-red-400 focus:border-red-400 bg-red-50/20' : 'border-slate-200'
                          }`}
                        >
                          <option value="">Select status</option>
                          <option value="yes">Yes (40% or more disability)</option>
                          <option value="no">No / Not Applicable</option>
                        </select>
                        {errors.disabilityStatus && <p className="text-xs text-red-500 font-medium">{errors.disabilityStatus}</p>}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* STEP 3: Financial & Business Profile */}
              {step === 3 && (
                <motion.div 
                  key="step-3"
                  initial={{ opacity: 0, x: 15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -15 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-6"
                >
                  <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
                    <IndianRupee className="w-5 h-5 text-primary" />
                    <h2 className="text-lg font-bold text-slate-800">Financials & Business Information</h2>
                  </div>

                  <div className="space-y-6">
                    {/* Annual Income */}
                    <div className="space-y-2">
                      <label htmlFor="annualIncome" className="block text-sm font-semibold text-slate-700">Family Annual Income (₹)</label>
                      <select
                        id="annualIncome"
                        name="annualIncome"
                        value={formData.annualIncome}
                        onChange={handleChange}
                        className={`w-full border rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-primary transition-colors ${
                          errors.annualIncome ? 'border-red-400 focus:border-red-400 bg-red-50/20' : 'border-slate-200'
                        }`}
                      >
                        <option value="">Select Annual Income Bracket</option>
                        {incomeBrackets.map((inc) => (
                          <option key={inc.value} value={inc.value}>{inc.label}</option>
                        ))}
                      </select>
                      {errors.annualIncome && <p className="text-xs text-red-500 font-medium">{errors.annualIncome}</p>}
                    </div>

                    {/* Female Entrepreneur checkbox */}
                    {formData.gender === 'female' && (
                      <label className="flex items-center space-x-3 p-4 rounded-xl border border-purple-200 bg-purple-50/30 cursor-pointer select-none">
                        <input
                          type="checkbox"
                          name="isWomenEntrepreneur"
                          checked={formData.isWomenEntrepreneur}
                          onChange={handleChange}
                          className="rounded text-purple-600 focus:ring-purple-500 w-4.5 h-4.5"
                        />
                        <span className="text-xs font-semibold text-purple-950">I am a Women Entrepreneur / starting a female-led venture</span>
                      </label>
                    )}

                    {/* Conditional Business Owner Section */}
                    {(formData.isBusinessOwner || formData.occupation === 'business_owner') && (
                      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-6">
                        <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider">Business Details</h3>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                          
                          <div className="space-y-2">
                            <label htmlFor="businessRegistration" className="block text-sm font-semibold text-slate-700">Business Registration</label>
                            <select
                              id="businessRegistration"
                              name="businessRegistration"
                              value={formData.businessRegistration}
                              onChange={handleChange}
                              className={`w-full bg-white border rounded-xl py-2.5 px-3.5 text-sm focus:outline-none focus:border-primary transition-colors ${
                                errors.businessRegistration ? 'border-red-400' : 'border-slate-200'
                              }`}
                            >
                              <option value="">Select registration</option>
                              <option value="registered">Registered (Udyam / GST / MSME / Pvt Ltd)</option>
                              <option value="unregistered">Unregistered / Informal Trader</option>
                              <option value="planning">Planning to start (New Greenfield)</option>
                            </select>
                            {errors.businessRegistration && <p className="text-xs text-red-500 font-medium">{errors.businessRegistration}</p>}
                          </div>

                          <div className="space-y-2">
                            <label htmlFor="businessType" className="block text-sm font-semibold text-slate-700">Business Sector</label>
                            <select
                              id="businessType"
                              name="businessType"
                              value={formData.businessType}
                              onChange={handleChange}
                              className={`w-full bg-white border rounded-xl py-2.5 px-3.5 text-sm focus:outline-none focus:border-primary transition-colors ${
                                errors.businessType ? 'border-red-400' : 'border-slate-200'
                              }`}
                            >
                              <option value="">Select Sector</option>
                              <option value="manufacturing">Manufacturing (Fabrication, Textiles, etc.)</option>
                              <option value="services">Services (IT, Consulting, Salons, Clinics)</option>
                              <option value="trading">Retail / Trading / Street Vending</option>
                              <option value="agriculture_allied">Agriculture Allied (Dairy, Poultry, Fisheries)</option>
                            </select>
                            {errors.businessType && <p className="text-xs text-red-500 font-medium">{errors.businessType}</p>}
                          </div>

                          <div className="space-y-2">
                            <label htmlFor="yearsInBusiness" className="block text-sm font-semibold text-slate-700">Years in Business</label>
                            <select
                              id="yearsInBusiness"
                              name="yearsInBusiness"
                              value={formData.yearsInBusiness}
                              onChange={handleChange}
                              className={`w-full bg-white border rounded-xl py-2.5 px-3.5 text-sm focus:outline-none focus:border-primary transition-colors ${
                                errors.yearsInBusiness ? 'border-red-400' : 'border-slate-200'
                              }`}
                            >
                              <option value="">Select Duration</option>
                              <option value="0">New Enterprise (0 - 1 year)</option>
                              <option value="3">Established (1 - 3 years)</option>
                              <option value="5">Experienced (More than 3 years)</option>
                            </select>
                            {errors.yearsInBusiness && <p className="text-xs text-red-500 font-medium">{errors.yearsInBusiness}</p>}
                          </div>

                          <div className="space-y-2">
                            <label htmlFor="employees" className="block text-sm font-semibold text-slate-700">Total Employees</label>
                            <select
                              id="employees"
                              name="employees"
                              value={formData.employees}
                              onChange={handleChange}
                              className={`w-full bg-white border rounded-xl py-2.5 px-3.5 text-sm focus:outline-none focus:border-primary transition-colors ${
                                errors.employees ? 'border-red-400' : 'border-slate-200'
                              }`}
                            >
                              <option value="">Select Employee count</option>
                              <option value="1">Self Only (1)</option>
                              <option value="10">Micro (Less than 10)</option>
                              <option value="50">Small (10 - 50)</option>
                              <option value="100">Medium (More than 50)</option>
                            </select>
                            {errors.employees && <p className="text-xs text-red-500 font-medium">{errors.employees}</p>}
                          </div>

                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}

              {/* STEP 4: Support & Funding Requirements */}
              {step === 4 && (
                <motion.div 
                  key="step-4"
                  initial={{ opacity: 0, x: 15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -15 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-6"
                >
                  <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
                    <Sparkles className="w-5 h-5 text-primary" />
                    <h2 className="text-lg font-bold text-slate-800">Support & Funding Needs</h2>
                  </div>

                  <div className="space-y-6">
                    {/* Loan Requirement */}
                    <div className="space-y-2">
                      <label htmlFor="loanRequirement" className="block text-sm font-semibold text-slate-700">Funding / Loan Amount Required (₹)</label>
                      <select
                        id="loanRequirement"
                        name="loanRequirement"
                        value={formData.loanRequirement}
                        onChange={handleChange}
                        className={`w-full border rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-primary transition-colors ${
                          errors.loanRequirement ? 'border-red-400 focus:border-red-400 bg-red-50/20' : 'border-slate-200'
                        }`}
                      >
                        <option value="">Select Loan/Grant Requirement</option>
                        <option value="no_loan">No funding needed (Information only)</option>
                        <option value="50000">Up to ₹50,000 (Micro Credit)</option>
                        <option value="500000">₹50,000 - ₹5 Lakhs</option>
                        <option value="1000000">₹5 Lakhs - ₹10 Lakhs</option>
                        <option value="5000000">₹10 Lakhs - ₹50 Lakhs</option>
                        <option value="above_50">Above ₹50 Lakhs</option>
                      </select>
                      {errors.loanRequirement && <p className="text-xs text-red-500 font-medium">{errors.loanRequirement}</p>}
                    </div>

                    {/* Purpose */}
                    <div className="space-y-2">
                      <label htmlFor="purpose" className="block text-sm font-semibold text-slate-700">Primary Purpose of Scheme Support</label>
                      <select
                        id="purpose"
                        name="purpose"
                        value={formData.purpose}
                        onChange={handleChange}
                        className={`w-full border rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-primary transition-colors ${
                          errors.purpose ? 'border-red-400 focus:border-red-400 bg-red-50/20' : 'border-slate-200'
                        }`}
                      >
                        <option value="">Select Purpose</option>
                        <option value="working_capital">Working Capital for Business Operations</option>
                        <option value="equipment">Purchase of Machinery / Tools / Tractor</option>
                        <option value="tuition">Paying Higher Education / School Tuition Fees</option>
                        <option value="farm_inputs">Buying Seeds, Fertilizers, or Farming Gear</option>
                        <option value="greenfield">Setting up a new Greenfield Manufacturing Unit</option>
                        <option value="pension">Old-age Financial Security / Pension</option>
                      </select>
                      {errors.purpose && <p className="text-xs text-red-500 font-medium">{errors.purpose}</p>}
                    </div>

                    {/* Agreement details */}
                    <div className="bg-blue-50/50 border border-blue-100 rounded-2xl p-5 flex gap-3.5 items-start">
                      <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <p className="text-xs text-slate-600 leading-relaxed">
                        By submitting this form, you confirm the details are correct. SchemeMate AI will search its database of 12+ schemes and score them based on matching compatibility. This will not trigger any official government application submissions.
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex items-center justify-between border-t border-slate-100 pt-6 mt-8">
              {step > 1 ? (
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleBack}
                  className="flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </Button>
              ) : (
                <div /> // Spacer
              )}

              {/* Save Progress Button */}
              <Button
                type="button"
                variant="outline"
                onClick={handleSaveProgress}
                className="flex items-center gap-1.5 border-dashed text-slate-500 hover:text-slate-700 hover:bg-slate-50"
              >
                <Save className="w-4 h-4" />
                Save Progress
              </Button>

              {step < 4 ? (
                <Button
                  type="button"
                  onClick={handleNext}
                  className="flex items-center gap-1.5"
                >
                  Next Step
                  <ArrowRight className="w-4 h-4" />
                </Button>
              ) : (
                <Button
                  type="submit"
                  variant="secondary"
                  className="flex items-center gap-1.5"
                >
                  Analyze Eligibility
                  <Sparkles className="w-4 h-4" />
                </Button>
              )}
            </div>

          </form>
        </Card>
      </Container>

      {/* Save Progress Toast Notification */}
      <AnimatePresence>
        {saveToast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 bg-slate-900 text-white rounded-2xl p-4 shadow-2xl border border-slate-800 flex items-center gap-3.5 z-50 max-w-sm"
          >
            <div className="bg-emerald-500/20 text-emerald-400 p-2 rounded-xl border border-emerald-500/30">
              <CheckCircle2 className="w-5 h-5 animate-pulse" />
            </div>
            <div className="text-left">
              <h4 className="font-extrabold text-xs">Progress Saved Locally!</h4>
              <p className="text-[10px] text-slate-400 leading-normal">Your draft answers for &quot;{savedName || 'Unnamed'}&quot; have been stored. You can reload or close and resume anytime.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
