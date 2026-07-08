export interface SchemeCriteria {
  minAge?: number;
  maxAge?: number;
  states?: string[]; // Empty means all states
  occupations?: string[];
  maxIncome?: number; // Maximum income to qualify
  student?: boolean;
  farmer?: boolean;
  businessOwner?: boolean;
  womenOnly?: boolean;
  minorityOnly?: boolean;
  disabilityOnly?: boolean;
  businessTypes?: string[];
  businessRegistration?: string;
}

export interface Scheme {
  id: string;
  name: string;
  department: string;
  category: 'business' | 'education' | 'agriculture' | 'women' | 'minority' | 'msme';
  description: string;
  benefits: string;
  documents: string[];
  deadline: string;
  officialUrl: string;
  criteria: SchemeCriteria;
}

export interface EligibilityInputs {
  fullName: string;
  state: string;
  district: string;
  age: string;
  gender: string;
  occupation: string;
  isStudent: boolean;
  isFarmer: boolean;
  isBusinessOwner: boolean;
  annualIncome: string;
  businessRegistration: string;
  isWomenEntrepreneur: boolean;
  minorityCategory: string;
  disabilityStatus: string;
  businessType: string;
  yearsInBusiness: string;
  employees: string;
  loanRequirement: string;
  purpose: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string; // Using string for easy serialization
}
export type SchemeCategory = Scheme['category'];
