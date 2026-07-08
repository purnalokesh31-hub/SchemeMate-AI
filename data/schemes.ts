import { Scheme } from '../types';

export const schemesData: Scheme[] = [
  // 1. Central Government Schemes (Pan-India)
  {
    id: 'pm-surya-ghar',
    name: 'PM Surya Ghar: Muft Bijli Yojana',
    department: 'Ministry of New and Renewable Energy',
    category: 'msme',
    description: 'Provides up to 300 units of free electricity per month to 1 crore households that install rooftop solar panels. Includes a subsidy of up to ₹78,000 for installation.',
    benefits: 'Up to 300 units of free electricity per month, installation subsidy of up to ₹78,000, and low-interest collateral-free loans.',
    documents: [
      'Aadhaar Card',
      'Electricity Bill (showing average monthly units)',
      'Proof of house ownership / Rooftop space availability',
      'Bank Account Passbook (linked with Aadhaar)'
    ],
    deadline: 'Ongoing enrollment',
    officialUrl: 'https://pmsuryaghar.gov.in/',
    criteria: {
      maxIncome: 800000
    }
  },
  {
    id: 'ab-pmjay',
    name: 'Ayushman Bharat Pradhan Mantri Jan Arogya Yojana (AB-PMJAY)',
    department: 'National Health Authority / Ministry of Health and Family Welfare',
    category: 'minority',
    description: 'Provides health cover of ₹5 lakh per family per year for secondary and tertiary care hospitalization. Recently updated to cover all senior citizens aged 70+ regardless of family income.',
    benefits: 'Cashless healthcare cover up to ₹5 Lakhs per family per year. All seniors aged 70+ receive exclusive cashless health cards under the Vay Vandana scheme.',
    documents: [
      'Aadhaar Card (establishing age 70+ or identity)',
      'Active mobile number (linked to Aadhaar)',
      'Ration Card / PMJAY Family Letter'
    ],
    deadline: 'Open enrollment',
    officialUrl: 'https://dashboard.pmjay.gov.in/pmjay-portal/',
    criteria: {
      minAge: 70
    }
  },
  {
    id: 'pm-vishwakarma',
    name: 'PM Vishwakarma Yojana',
    department: 'Ministry of Micro, Small and Medium Enterprises',
    category: 'msme',
    description: 'Support and handholding for traditional artisans and craftspeople with collateral-free loans, skill training, and toolkit incentives.',
    benefits: 'Concessional collateral-free enterprise development loans up to ₹3 Lakhs (₹1 Lakh in Tranche I and ₹2 Lakhs in Tranche II) at 5% interest, ₹15,000 toolkit incentives, and ₹500/day skill training stipend.',
    documents: [
      'Aadhaar Card',
      'Bank Account Passbook details',
      'Artisan category declaration / registration form',
      'Ration Card'
    ],
    deadline: 'Active (Ongoing registration)',
    officialUrl: 'https://pmvishwakarma.gov.in/',
    criteria: {
      businessOwner: true,
      minAge: 18
    }
  },
  {
    id: 'pm-kisan',
    name: 'Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)',
    department: 'Ministry of Agriculture and Farmers Welfare',
    category: 'agriculture',
    description: 'An income support scheme for all landholding farmers\' families in India to help purchase agriculture-related inputs and domestic needs.',
    benefits: 'Direct cash transfer of ₹6,000 per year, paid in three equal installments of ₹2,000 every four months directly into the bank accounts of beneficiaries.',
    documents: [
      'Aadhaar Card',
      'Landholding ownership documents / Land Revenue Records',
      'Active Bank Account Details (linked with Aadhaar)',
      'Mobile Number'
    ],
    deadline: 'Ongoing enrollment',
    officialUrl: 'https://pmkisan.gov.in/',
    criteria: {
      farmer: true,
      maxIncome: 400000
    }
  },
  {
    id: 'lakhpati-didi',
    name: 'Lakhpati Didi Scheme',
    department: 'Ministry of Rural Development',
    category: 'women',
    description: 'A major national initiative targeting 3 Crore women in Self-Help Groups (SHGs) to help them establish sustainable micro-enterprises and earn a minimum annual income of ₹1 Lakh.',
    benefits: 'Skill development training (LED bulb manufacturing, drone operation, tailoring), financial literacy workshops, micro-credit loan support, and market linkage opportunities.',
    documents: [
      'Aadhaar Card',
      'Proof of Self-Help Group (SHG) membership / registration ID',
      'Active bank account passbook details',
      'Income Certificate (establishing low-income status)'
    ],
    deadline: 'Ongoing enrollment (Targeting 3 Crore sisters)',
    officialUrl: 'https://lakhpatididi.gov.in/',
    criteria: {
      womenOnly: true,
      maxIncome: 200000
    }
  },

  // 2. State-Wise Schemes & Ruling Parties (2026 Updates)

  // 1. Andhra Pradesh (TDP + JSP + BJP Alliance - NDA)
  {
    id: 'ap-tdp-thalliki-vandanam',
    name: 'Thalliki Vandanam Scheme',
    department: 'School Education Department, Andhra Pradesh',
    category: 'education',
    description: 'Provides ₹15,000 annually to mothers who send their children to school.',
    benefits: 'Annual financial assistance of ₹15,000 deposited directly into the bank accounts of registered mothers.',
    documents: [
      'Aadhaar Card of mother and student child',
      'School enrollment / study certificate',
      'Aadhaar-seeded Bank Account Passbook details',
      'White Ration Card'
    ],
    deadline: 'Ongoing enrollment',
    officialUrl: 'https://ysrcheyutha.ap.gov.in/',
    criteria: {
      womenOnly: true,
      states: ['Andhra Pradesh']
    }
  },
  {
    id: 'ap-tdp-deepam',
    name: 'Deepam Scheme 2.0',
    department: 'Civil Supplies Department, Andhra Pradesh',
    category: 'msme',
    description: 'Grants 3 free LPG cylinders per year to eligible low-income households in Andhra Pradesh.',
    benefits: 'Provides 3 free LPG gas cylinders per year to eligible LPG connection holders in the state.',
    documents: [
      'Aadhaar Card',
      'Active LPG Gas Connection consumer number / booklet',
      'Ration Card (APL/BPL/Antyodaya)'
    ],
    deadline: 'Active registration',
    officialUrl: 'https://ysrcheyutha.ap.gov.in/',
    criteria: {
      states: ['Andhra Pradesh']
    }
  },
  {
    id: 'ap-tdp-aadabidda-nidhi',
    name: 'Aadabidda Nidhi Scheme',
    department: 'Department of Women and Child Welfare, Andhra Pradesh',
    category: 'women',
    description: 'Offers a monthly financial aid of ₹1,500 to women aged 18 to 59 in Andhra Pradesh.',
    benefits: 'Monthly financial assistance transfer of ₹1,500 to women aged 18 to 59.',
    documents: [
      'Aadhaar Card (verifying age of 18-59)',
      'Domicile certificate of Andhra Pradesh',
      'Active bank account details'
    ],
    deadline: 'Ongoing enrollment',
    officialUrl: 'https://ysrcheyutha.ap.gov.in/',
    criteria: {
      womenOnly: true,
      minAge: 18,
      maxAge: 59,
      states: ['Andhra Pradesh']
    }
  },
  {
    id: 'ap-tdp-annadatha-sukhibhava',
    name: 'Annadatha Sukhibhava Scheme',
    department: 'Agriculture Department, Andhra Pradesh',
    category: 'agriculture',
    description: 'Top-up farmer financial assistance program providing ₹20,000 per year (integrated with PM-Kisan).',
    benefits: 'Direct financial assistance of ₹20,000 per year (combined PM-Kisan ₹6,000 + State addition ₹14,000) deposited into bank accounts.',
    documents: [
      'Aadhaar Card',
      'Pattadar Passbook / Land Revenue landholder documents',
      'Aadhaar-linked Bank Account details'
    ],
    deadline: 'Seasonal enrollment',
    officialUrl: 'https://ysrcheyutha.ap.gov.in/',
    criteria: {
      farmer: true,
      states: ['Andhra Pradesh']
    }
  },

  // 2. Arunachal Pradesh (BJP)
  {
    id: 'arunachal-bjp-security',
    name: 'Chief Minister’s Social Security Scheme',
    department: 'Social Welfare Department, Arunachal Pradesh',
    category: 'minority',
    description: 'Financial pension of ₹1,500/month for elderly, widows, and specially-abled individuals in Arunachal Pradesh.',
    benefits: 'Guaranteed pension of ₹1,500 per month deposited directly into bank accounts of qualified residents.',
    documents: [
      'Age Certificate / Disability Certificate',
      'Domicile proof of Arunachal Pradesh',
      'Aadhaar Card and Bank details'
    ],
    deadline: 'Year-round enrollment',
    officialUrl: 'https://arunachal.gov.in/',
    criteria: {
      states: ['Arunachal Pradesh']
    }
  },
  {
    id: 'arunachal-bjp-swavalamban',
    name: 'Deen Dayal Upadhyaya Swavalamban Yojana',
    department: 'Department of Industries, Arunachal Pradesh',
    category: 'msme',
    description: 'Promotes startup culture with a 30% to 40% capital subsidy on bank loans for unemployed youth setting up eco-tourism or agri-businesses.',
    benefits: '30% to 40% capital subsidy on bank loans ranging from ₹10 Lakhs up to ₹50 Lakhs for greenfield business setups.',
    documents: [
      'Unemployed status certification / Registration card',
      'Detailed Project Report (DPR)',
      'Aadhaar and PAN Card of promoters',
      'Land allotment or ownership records'
    ],
    deadline: 'Ongoing batch-wise approvals',
    officialUrl: 'https://arunachal.gov.in/',
    criteria: {
      businessOwner: true,
      states: ['Arunachal Pradesh']
    }
  },

  // 3. Assam (BJP)
  {
    id: 'assam-bjp-orunodoi',
    name: 'Orunodoi 3.0 Scheme',
    department: 'Finance Department, Assam',
    category: 'women',
    description: 'Direct cash transfer of ₹1,400/month to female heads of poor families to pay for medicines and food in Assam.',
    benefits: 'Direct Benefit Transfer (DBT) of ₹1,400 per month credited directly to the female family head\'s bank account.',
    documents: [
      'Ration Card showing female head status',
      'Domicile Certificate of Assam',
      'Aadhaar Card and Bank Passbook (linked with Aadhaar)'
    ],
    deadline: 'Active saturation',
    officialUrl: 'https://finance.assam.gov.in/',
    criteria: {
      womenOnly: true,
      states: ['Assam']
    }
  },
  {
    id: 'assam-bjp-nijut-moina',
    name: 'Mukhya Mantri Nijut Moina Scheme',
    department: 'Higher Education Department, Assam',
    category: 'education',
    description: 'Financial incentives ranging from ₹1,000 to ₹2,500 per month for girls pursuing higher education to counter child marriage in Assam.',
    benefits: 'Monthly stipends: ₹1,000 for Higher Secondary, ₹1,250 for Degree, and ₹2,500 for Post-Graduate girl students.',
    documents: [
      'College Admission / Enrollment certificate',
      'Self-declaration of unmarried status',
      'Aadhaar Card of the girl student',
      'Marksheet of qualifying examinations'
    ],
    deadline: 'September 30, annually',
    officialUrl: 'https://finance.assam.gov.in/',
    criteria: {
      student: true,
      womenOnly: true,
      states: ['Assam']
    }
  },

  // 4. Bihar (JD(U) + BJP Alliance - NDA)
  {
    id: 'bihar-nda-udyami',
    name: 'Mukhyamantri Udyami Yojana',
    department: 'Department of Industries, Bihar',
    category: 'msme',
    description: 'Provides up to ₹10 lakh loan (50% subsidy) to youth, women, SC/ST, and OBC individuals to start micro-businesses in Bihar.',
    benefits: 'Financial assistance of ₹10 Lakhs (₹5 Lakhs as interest-free loan and ₹5 Lakhs as subsidy grant) for starting startup units.',
    documents: [
      'Educational certificates (Class 12 / ITI / Polytechnic pass)',
      'Caste certificate (for SC/ST/OBC categories)',
      'Domicile certificate of Bihar',
      'Project report and bank account passbook details'
    ],
    deadline: 'Periodic application windows',
    officialUrl: 'https://ekalyan.bih.nic.in/',
    criteria: {
      businessOwner: true,
      states: ['Bihar']
    }
  },
  {
    id: 'bihar-nda-kanya-utthan',
    name: 'Mukhyamantri Kanya Utthan Yojana',
    department: 'Social Welfare Department, Bihar',
    category: 'education',
    description: 'Sequential financial aid totaling ₹54,100 awarded to a girl child from her birth until graduation to promote female education and health.',
    benefits: 'Graduated cash payments at milestone phases: ₹2,000 at birth, ₹1,000 on vaccination, ₹2,000 on Aadhaar linking, ₹10,000 on passing Intermediate, and ₹50,000 on Graduation.',
    documents: [
      'Birth Certificate of girl child',
      'College Graduation Degree or Intermediate Marksheet',
      'Aadhaar Card of girl child and parent',
      'Domicile proof in Bihar'
    ],
    deadline: 'Ongoing enrollment',
    officialUrl: 'https://ekalyan.bih.nic.in/',
    criteria: {
      womenOnly: true,
      states: ['Bihar']
    }
  },

  // 5. Chhattisgarh (BJP)
  {
    id: 'cg-bjp-mahtari-vandan',
    name: 'Mahtari Vandan Yojana',
    department: 'Women and Child Development Department, Chhattisgarh',
    category: 'women',
    description: 'Provides direct financial support of ₹1,000/month (₹12,000/year) to married women in Chhattisgarh.',
    benefits: 'Direct financial assistance payout of ₹1,2000 per year paid in ₹1,000 monthly installments directly into Aadhaar-seeded bank accounts.',
    documents: [
      'Aadhaar Card of applicant and spouse',
      'Marriage Certificate or Gram Panchayat affidavit',
      'Domicile certificate of Chhattisgarh',
      'Aadhaar-seeded bank passbook'
    ],
    deadline: 'Ongoing enrollment',
    officialUrl: 'https://mahtarivandan.cgstate.gov.in/',
    criteria: {
      womenOnly: true,
      minAge: 21,
      maxAge: 60,
      states: ['Chhattisgarh']
    }
  },
  {
    id: 'cg-bjp-krishak-unnati',
    name: 'Krishak Unnati Yojana',
    department: 'Agriculture Department, Chhattisgarh',
    category: 'agriculture',
    description: 'Procures paddy from farmers in Chhattisgarh at an enhanced support price of ₹3,100 per quintal.',
    benefits: 'Paddy procurement payment at ₹3,100/quintal up to a maximum limit of 21 quintals per acre, with quick DBT clearance.',
    documents: [
      'Farmer registration ID / slip',
      'Land revenue records / Rin Pustika',
      'Aadhaar Card and Bank account passbook'
    ],
    deadline: 'Seasonal procurement dates',
    officialUrl: 'https://mahtarivandan.cgstate.gov.in/',
    criteria: {
      farmer: true,
      states: ['Chhattisgarh']
    }
  },

  // 6. Goa (BJP)
  {
    id: 'goa-bjp-griha-aadhar',
    name: 'Griha Aadhar Scheme',
    department: 'Directorate of Women and Child Development, Goa',
    category: 'women',
    description: 'Monthly financial assistance of ₹1,500 for housewives from low-income groups in Goa to combat price rises.',
    benefits: 'Monthly cash allowance of ₹1,500 to eligible housewives to support family groceries and kitchen management.',
    documents: [
      'Income Certificate (annual family income below ₹3 Lakhs)',
      'Marriage Certificate',
      'Domicile Certificate of Goa (minimum 15 years)',
      'Aadhaar and Bank details'
    ],
    deadline: 'Ongoing enrollment',
    officialUrl: 'https://www.goa.gov.in/',
    criteria: {
      womenOnly: true,
      maxIncome: 300000,
      states: ['Goa']
    }
  },
  {
    id: 'goa-bjp-laadli-laxmi',
    name: 'Laadli Laxmi Scheme',
    department: 'Directorate of Women and Child Development, Goa',
    category: 'women',
    description: 'Financial grant of ₹1 lakh transferred to a girl\'s bank account upon reaching 18 years to aid marriage or higher studies in Goa.',
    benefits: 'Fixed deposit of ₹1,00,000 opened in the name of the girl child, which matures and becomes withdrawable upon turning 18 or marriage.',
    documents: [
      'Birth Certificate of girl child',
      'Domicile Certificate of parents (15 years residency in Goa)',
      'School leaving certificate / academic marksheet',
      'Aadhaar Card details'
    ],
    deadline: 'Within 1 year of turning 18 / marriage registration',
    officialUrl: 'https://www.goa.gov.in/',
    criteria: {
      womenOnly: true,
      states: ['Goa']
    }
  },

  // 7. Gujarat (BJP)
  {
    id: 'gujarat-bjp-kisan-sahay',
    name: 'Mukhya Mantri Kisan Sahay Yojana',
    department: 'Agriculture, Farmers Welfare & Co-operation Department, Gujarat',
    category: 'agriculture',
    description: 'Direct crop compensation package without premium for farmers in Gujarat facing loss due to drought, excess rain, or unseasonal rain.',
    benefits: 'Compensation of ₹20,000/hectare for crop loss between 33% and 60%, and ₹25,000/hectare for crop loss above 60%, up to a limit of 4 hectares.',
    documents: [
      'Landholding 7/12 and 8-A documents',
      'Aadhaar Card of the farmer',
      'Bank Account Passbook (Aadhaar linked)',
      'Crop sowing area certificate'
    ],
    deadline: 'Seasonal filing post-damage events',
    officialUrl: 'https://magujarat.in/',
    criteria: {
      farmer: true,
      states: ['Gujarat']
    }
  },
  {
    id: 'gujarat-bjp-shravan-tirth',
    name: 'Shravan Tirthdarshan Yojana',
    department: 'Gujarat Pilgrimage Development Board, Gujarat',
    category: 'minority',
    description: 'Senior citizens receive a 50% subsidy on bus travel costs within Gujarat for religious pilgrimages.',
    benefits: '50% travel fare subsidy on state transport GSRTC buses for senior citizens traveling in designated tour clusters.',
    documents: [
      'Aadhaar Card / Age proof (establishing age 60+)',
      'Gujarat domicile ID card',
      'Travel booking / tour receipt'
    ],
    deadline: 'Year-round open booking',
    officialUrl: 'https://magujarat.in/',
    criteria: {
      minAge: 60,
      states: ['Gujarat']
    }
  },

  // 8. Haryana (BJP)
  {
    id: 'haryana-bjp-chirayu',
    name: 'Chirayu Haryana Yojana',
    department: 'Health Department, Haryana',
    category: 'minority',
    description: 'Extension of Ayushman Bharat providing cashless health insurance up to ₹5 lakh to families earning under ₹3 lakh annually in Haryana.',
    benefits: 'Cashless treatment cover up to ₹5 Lakhs per family per year across public and private hospitals under the Parivar Pehchan Patra (PPP) index.',
    documents: [
      'Parivar Pehchan Patra (Family ID Card - Mandatory)',
      'Aadhaar Card',
      'Income Certificate (establishing family income below ₹3 Lakhs)'
    ],
    deadline: 'Ongoing enrollment',
    officialUrl: 'https://socialjusticehry.gov.in/',
    criteria: {
      maxIncome: 300000,
      states: ['Haryana']
    }
  },
  {
    id: 'haryana-bjp-lado-lakshmi',
    name: 'Lado Lakshmi Yojana',
    department: 'Women and Child Development Department, Haryana',
    category: 'women',
    description: 'Direct cash support of ₹2,100/month to women heads of economically weaker households in Haryana.',
    benefits: 'Direct financial assistance of ₹2,100 per month credited directly to the registered woman head\'s bank account.',
    documents: [
      'Parivar Pehchan Patra (Family ID Card)',
      'Aadhaar Card of the applicant',
      'Ration Card / Income certificate proof',
      'Bank Account Passbook (Aadhaar linked)'
    ],
    deadline: 'Ongoing registration',
    officialUrl: 'https://socialjusticehry.gov.in/',
    criteria: {
      womenOnly: true,
      states: ['Haryana']
    }
  },

  // 9. Himachal Pradesh (INC)
  {
    id: 'hp-inc-pyari-behna',
    name: 'Indira Gandhi Pyari Behna Sukh Samman Nidhi',
    department: 'Social Justice and Empowerment Department, Himachal Pradesh',
    category: 'women',
    description: 'Direct monthly cash assistance of ₹1,500 to eligible women aged 18 to 60 in Himachal Pradesh.',
    benefits: 'Monthly financial assistance transfer of ₹1,500 directly into the bank accounts of registered beneficiaries.',
    documents: [
      'Aadhaar Card (verifying age of 18-60)',
      'Himachal Pradesh Domicile certificate',
      'Bank Account Passbook details',
      'Self-declaration of not holding government job'
    ],
    deadline: 'Ongoing enrollment',
    officialUrl: 'https://hp.gov.in/',
    criteria: {
      womenOnly: true,
      minAge: 18,
      maxAge: 60,
      states: ['Himachal Pradesh']
    }
  },
  {
    id: 'hp-inc-sukh-aashray',
    name: 'Mukhya Mantri Sukh-Aashray Yojana',
    department: 'Social Justice and Empowerment Department, Himachal Pradesh',
    category: 'education',
    description: 'Declares orphaned children as "Children of the State," funding their higher education, pocket money, and startup grants in Himachal Pradesh.',
    benefits: 'Fully sponsored higher education fees, monthly pocket money allowance of ₹4,000, land allotment grants, and ₹2 Lakhs startup business grants.',
    documents: [
      'Orphan status certificate issued by local Child Welfare Committee',
      'Aadhaar Card details',
      'HP Resident status records'
    ],
    deadline: 'Ongoing registration',
    officialUrl: 'https://hp.gov.in/',
    criteria: {
      states: ['Himachal Pradesh']
    }
  },

  // 10. Jharkhand (JMM-led Alliance - I.N.D.I.A)
  {
    id: 'jharkhand-jmm-maiya-samman',
    name: 'Mukhyamantri Maiya Samman Yojana',
    department: 'Women, Child Development and Social Security Department, Jharkhand',
    category: 'women',
    description: 'Direct cash transfer of ₹1,000 per month to women aged 21 to 50 in Jharkhand to support nutrition and health.',
    benefits: 'Monthly cash benefit of ₹1,000 paid directly into the bank account of the beneficiary.',
    documents: [
      'Aadhaar Card (verifying age of 21-50)',
      'Ration Card / Resident proof of Jharkhand',
      'Bank Account Passbook (Aadhaar linked)'
    ],
    deadline: 'Ongoing enrollment',
    officialUrl: 'https://jharkhand.gov.in/',
    criteria: {
      womenOnly: true,
      minAge: 21,
      maxAge: 50,
      states: ['Jharkhand']
    }
  },
  {
    id: 'jharkhand-jmm-abua-awas',
    name: 'Abua Awas Yojana',
    department: 'Rural Development Department, Jharkhand',
    category: 'msme',
    description: 'State-sponsored housing scheme targeting three-room permanent homes for homeless or mud-house dwellers in Jharkhand.',
    benefits: 'Financial assistance of ₹2 Lakhs distributed in 4 installments to construct a three-room concrete house with toilet facilities.',
    documents: [
      'Homeless status certificate / Kutcha house verification slip',
      'Aadhaar Card',
      'Jharkhand Resident Certificate',
      'Bank account details'
    ],
    deadline: 'Phase-wise allotment',
    officialUrl: 'https://jharkhand.gov.in/',
    criteria: {
      states: ['Jharkhand']
    }
  },

  // 11. Karnataka (INC)
  {
    id: 'karnataka-inc-gruha-lakshmi',
    name: 'Gruha Lakshmi Scheme',
    department: 'Women and Child Development Department, Karnataka',
    category: 'women',
    description: 'Transfer of ₹2,00,000 to ₹2,000 monthly directly into the bank accounts of female family heads in Karnataka.',
    benefits: 'Direct Benefit Transfer (DBT) payout of ₹2,000 per month to the woman head of household.',
    documents: [
      'Aadhaar Card of applicant and spouse',
      'Ration Card (APL/BPL showing head status)',
      'Aadhaar-linked Bank Account Passbook details'
    ],
    deadline: 'Ongoing enrollment',
    officialUrl: 'https://sevasindhu.karnataka.gov.in/',
    criteria: {
      womenOnly: true,
      states: ['Karnataka']
    }
  },
  {
    id: 'karnataka-inc-shakti',
    name: 'Shakti Scheme',
    department: 'Karnataka State Road Transport Corporation (KSRTC)',
    category: 'women',
    description: 'Guarantees free bus travel for all women residents in non-luxury state transport buses in Karnataka.',
    benefits: 'Free non-AC bus travel across KSRTC, BMTC, NWKRTC, and KKRTC transport services within Karnataka.',
    documents: [
      'Government-issued photo identity proof showing Karnataka address'
    ],
    deadline: 'Active (Ongoing)',
    officialUrl: 'https://sevasindhu.karnataka.gov.in/',
    criteria: {
      womenOnly: true,
      states: ['Karnataka']
    }
  },
  {
    id: 'karnataka-inc-gruha-jyothi',
    name: 'Gruha Jyothi Scheme',
    department: 'Energy Department / BESCOM / ESCOMs, Karnataka',
    category: 'msme',
    description: 'Up to 200 units of free power per month for domestic electricity consumers in Karnataka.',
    benefits: 'Free domestic electricity up to 200 units/month based on the average consumption of the consumer household.',
    documents: [
      'Aadhaar Card',
      'Customer ID / Account ID (Electricity Bill details)',
      'Rental Agreement / Proof of occupancy'
    ],
    deadline: 'Active registration',
    officialUrl: 'https://sevasindhu.karnataka.gov.in/',
    criteria: {
      states: ['Karnataka']
    }
  },

  // 12. Kerala (United Democratic Front - INC-led UDF) (Won May 2026 election)
  {
    id: 'kerala-udf-bhakshya-arogya',
    name: 'Bhakshya-Arogya Suraksha Card',
    department: 'Civil Supplies & Health Department, Kerala',
    category: 'women',
    description: 'A newly initiated scheme in 2026 delivering ₹2,500/month structural support to women in poor and BPL households in Kerala.',
    benefits: 'Monthly cash benefit transfer of ₹2,500 to the bank accounts of registered female heads of low-income families.',
    documents: [
      'Ration Card (BPL/Antyodaya)',
      'Kerala Resident Proof',
      'Aadhaar Card and Bank Passbook (linked with Aadhaar)'
    ],
    deadline: 'Announced in 2026 post-election phase',
    officialUrl: 'https://karunya.kerala.gov.in/',
    criteria: {
      womenOnly: true,
      states: ['Kerala']
    }
  },
  {
    id: 'kerala-udf-karunya',
    name: 'Karunya Benevolent Fund (KBF)',
    department: 'Taxes Department / Lottery Department, Kerala',
    category: 'minority',
    description: 'Provides critical illness medical expenditure support up to ₹3 lakh to weaker economic strata in Kerala.',
    benefits: 'One-time medical assistance up to ₹3 Lakhs for critical inpatient procedures (cancer, cardiac, renal).',
    documents: [
      'Medical Certificate with cost estimation details',
      'Income Certificate (annual family income below ₹3 Lakhs)',
      'Ration Card / Aadhaar details',
      'Resident proof of Kerala'
    ],
    deadline: 'Ongoing hospital-submission',
    officialUrl: 'https://karunya.kerala.gov.in/',
    criteria: {
      maxIncome: 300000,
      states: ['Kerala']
    }
  },

  // 13. Madhya Pradesh (BJP)
  {
    id: 'mp-bjp-ladli-behna',
    name: 'Ladli Behna Yojana',
    department: 'Women and Child Development Department, Madhya Pradesh',
    category: 'women',
    description: 'Continued cash benefit of ₹1,250/month directly dispatched to eligible sister beneficiaries in Madhya Pradesh.',
    benefits: 'Direct financial assistance transfer of ₹1,250 per month into the Aadhaar-linked bank account of registered women.',
    documents: [
      'Samagra Member ID / Family ID',
      'Aadhaar Card of the applicant',
      'Aadhaar-linked Bank Account details',
      'Mobile Number'
    ],
    deadline: 'Ongoing registration',
    officialUrl: 'https://cmladlibahna.mp.gov.in/',
    criteria: {
      womenOnly: true,
      states: ['Madhya Pradesh']
    }
  },
  {
    id: 'mp-bjp-teerth-darshan',
    name: 'Mukhyamantri Teerth Darshan Yojana',
    department: 'Religious Trusts and Endowments Department, Madhya Pradesh',
    category: 'minority',
    description: 'Fully government-sponsored free train tours and stays for senior citizens (60+) visiting national shrines from Madhya Pradesh.',
    benefits: 'Free train travel, accommodation, meals, and pilgrimage assistance for senior citizens to major holy sites in India.',
    documents: [
      'Aadhaar Card / Age proof (establishing age 60+)',
      'Madhya Pradesh Domicile certificate',
      'Medical fitness certificate'
    ],
    deadline: 'Batch-wise application windows',
    officialUrl: 'https://cmladlibahna.mp.gov.in/',
    criteria: {
      minAge: 60,
      states: ['Madhya Pradesh']
    }
  },

  // 14. Maharashtra (Mahayuti Alliance - BJP + Shiv Sena + NCP)
  {
    id: 'maharashtra-mahayuti-ladki-bahin',
    name: 'Mukhyamantri Majhi Ladki Bahin Yojana',
    department: 'Women and Child Development Department, Maharashtra',
    category: 'women',
    description: 'Provides ₹1,500 per month to underprivileged women aged 21 to 65 in Maharashtra.',
    benefits: 'Monthly financial assistance of ₹1,500 transferred directly to the bank account of qualified women.',
    documents: [
      'Aadhaar Card of the applicant',
      'Domicile Certificate of Maharashtra',
      'Income Certificate (annual family income below ₹2.5 Lakhs)',
      'Bank Account Passbook (Aadhaar seeded)'
    ],
    deadline: 'Ongoing registration',
    officialUrl: 'https://sanjaygandhianudanyojana.maharashtra.gov.in/',
    criteria: {
      womenOnly: true,
      minAge: 21,
      maxAge: 65,
      maxIncome: 250000,
      states: ['Maharashtra']
    }
  },
  {
    id: 'maharashtra-mahayuti-lek-ladki',
    name: 'Lek Ladki Yojana',
    department: 'Women and Child Development Department, Maharashtra',
    category: 'women',
    description: 'Financial cash milestones distributed for girl children until age 18, reaching ₹1 lakh total for education support in Maharashtra.',
    benefits: 'Staggered financial grants from birth till the girl child reaches age 18, totaling approximately ₹1,01,000 across educational milestones.',
    documents: [
      'Birth Certificate of girl child',
      'Yellow or Orange Ration Card',
      'Aadhaar Card of parents and child',
      'School admission certificate'
    ],
    deadline: 'Ongoing enrollment',
    officialUrl: 'https://sanjaygandhianudanyojana.maharashtra.gov.in/',
    criteria: {
      womenOnly: true,
      states: ['Maharashtra']
    }
  },

  // 15. Manipur (BJP)
  {
    id: 'manipur-bjp-cmht',
    name: 'Chief Minister-gi Hakshelgi Tengbang (CMHT)',
    department: 'Health Department, Manipur',
    category: 'minority',
    description: 'State health protection scheme supplying up to ₹5 lakh cashless care to vulnerable groups in Manipur.',
    benefits: 'Cashless treatment cover up to ₹5 Lakhs per family per year for secondary and tertiary care hospitalization.',
    documents: [
      'CMHT Card / e-KYC slip',
      'Aadhaar Card',
      'Domicile Certificate of Manipur / Ration Card'
    ],
    deadline: 'Ongoing enrollment',
    officialUrl: 'https://manipur.gov.in/',
    criteria: {
      states: ['Manipur']
    }
  },
  {
    id: 'manipur-bjp-laiyeng',
    name: 'CM Manipur Laiyeng Shen',
    department: 'Health Department, Manipur',
    category: 'minority',
    description: 'Financial package to treat rare illnesses among low-income households in Manipur.',
    benefits: 'One-time or recurring financial reimbursement package for treatment of rare, severe, or chronic illnesses.',
    documents: [
      'Medical diagnostic certificate from government hospital',
      'Income Certificate (establishing low-income status)',
      'Domicile / Address proof of Manipur'
    ],
    deadline: 'Open year-round',
    officialUrl: 'https://manipur.gov.in/',
    criteria: {
      states: ['Manipur']
    }
  },

  // 16. Meghalaya (NPP-led Coalition)
  {
    id: 'meghalaya-npp-focus',
    name: 'FOCUS (Farmers’ Collectivisation for Upscaling Production Systems)',
    department: 'Agriculture and Farmers Welfare Department, Meghalaya',
    category: 'agriculture',
    description: 'Direct equity grant of ₹5,000 to every farm producer group member to elevate farming clusters in Meghalaya.',
    benefits: 'Direct equity grant subsidy of ₹5,000 per member of registered producer groups to buy seeds, machinery, and agri-inputs.',
    documents: [
      'Producer Group membership ID',
      'Aadhaar Card of the farmer',
      'Active bank account passbook details',
      'Farming activity self-declaration'
    ],
    deadline: 'Ongoing enrollment',
    officialUrl: 'https://meghalaya.gov.in/',
    criteria: {
      farmer: true,
      states: ['Meghalaya']
    }
  },
  {
    id: 'meghalaya-npp-elevate',
    name: 'CM-ELEVATE Scheme',
    department: 'Department of Planning, Meghalaya',
    category: 'msme',
    description: 'Offers up to 35% to 75% subsidy for youth initiating entrepreneurship ventures across tourism, cinema, or agriculture in Meghalaya.',
    benefits: 'Subsidies ranging from 35% up to 75% for project capitals from ₹5 Lakhs to ₹1 Crore for setting up local businesses.',
    documents: [
      'Detailed Project Proposal (DPP)',
      'Meghalaya Residency ID Card',
      'Aadhaar and PAN details of promoters',
      'Educational / Trade qualification details'
    ],
    deadline: 'Ongoing approval cohorts',
    officialUrl: 'https://meghalaya.gov.in/',
    criteria: {
      businessOwner: true,
      states: ['Meghalaya']
    }
  },

  // 17. Mizoram (ZPM - Zoram People's Movement)
  {
    id: 'mizoram-zpm-handholding',
    name: 'Bana Lalsavunga (Handholding Policy)',
    department: 'Planning & Finance Department, Mizoram',
    category: 'msme',
    description: 'Structural micro-loans combined with skill mentorship programs targeting young farmers and craftspeople in Mizoram.',
    benefits: 'Micro-loans at zero or concessional interest rates up to ₹5 Lakhs, coupled with technical skills mentoring and marketing assistance.',
    documents: [
      'Aadhaar Card',
      'Mizoram Resident Certificate',
      'Trade selection or startup business outline proposal',
      'Bank statement records'
    ],
    deadline: 'Ongoing enrollment',
    officialUrl: 'https://mizoram.gov.in/',
    criteria: {
      states: ['Mizoram']
    }
  },
  {
    id: 'mizoram-zpm-healthcare',
    name: 'Mizoram Health Care Scheme',
    department: 'Health and Family Welfare Department, Mizoram',
    category: 'minority',
    description: 'Cashless medical aid worth up to ₹2 lakh yearly for designated treatment centers in Mizoram.',
    benefits: 'Cashless medical treatment cover of up to ₹2 Lakhs per family per year for secondary/tertiary hospital stays.',
    documents: [
      'Mizoram Health Card',
      'Domicile proof in Mizoram',
      'Aadhaar Card'
    ],
    deadline: 'Annual card renewal',
    officialUrl: 'https://mizoram.gov.in/',
    criteria: {
      states: ['Mizoram']
    }
  },

  // 18. Nagaland (NDPP + BJP Coalition)
  {
    id: 'nagaland-ndpp-cmhis',
    name: 'Chief Minister’s Universal Health Insurance Scheme (CMHIS)',
    department: 'Health and Family Welfare Department, Nagaland',
    category: 'minority',
    description: 'Cashless health insurance up to ₹5 lakh per family for common citizens and ₹20 lakh for state staff in Nagaland.',
    benefits: 'Cashless healthcare cover up to ₹5 Lakhs for general citizens and ₹20 Lakhs for state government employees and pensioners.',
    documents: [
      'CMHIS enrollment card / Family ID',
      'Aadhaar Card showing Nagaland address',
      'State government employment certificate (if applicable)'
    ],
    deadline: 'Ongoing enrollment',
    officialUrl: 'https://nagaland.gov.in/',
    criteria: {
      states: ['Nagaland']
    }
  },
  {
    id: 'nagaland-ndpp-micro-finance',
    name: 'Chief Minister’s Micro Finance Initiative',
    department: 'Department of Industries and Commerce, Nagaland',
    category: 'msme',
    description: 'Low-interest credits combined with state backing to set up micro-enterprises in Nagaland.',
    benefits: 'Concessional interest rate micro-loans with a capital subsidy up to 30% for setups in agriculture, services, and craft units.',
    documents: [
      'Aadhaar Card',
      'Project report of micro-venture',
      'Nagaland Resident Certificate',
      'Bank Account passbook details'
    ],
    deadline: 'Periodic applications',
    officialUrl: 'https://nagaland.gov.in/',
    criteria: {
      businessOwner: true,
      states: ['Nagaland']
    }
  },

  // 19. Odisha (BJP)
  {
    id: 'odisha-bjp-subhadra',
    name: 'Subhadra Yojana',
    department: 'Women and Child Development Department, Odisha',
    category: 'women',
    description: 'Landmark women-empowerment scheme providing ₹10,000 per year in two equal installments to women aged 21 to 60 in Odisha.',
    benefits: 'Direct financial assistance of ₹10,000 per year (split into ₹5,000 installments on Rakhi and International Women\'s Day) for a total of 5 years.',
    documents: [
      'Aadhaar Card of the applicant (mobile linked)',
      'Aadhaar-seeded bank account passbook details',
      'Domicile certificate of Odisha'
    ],
    deadline: 'Ongoing enrollment',
    officialUrl: 'https://subhadra.odisha.gov.in/',
    criteria: {
      womenOnly: true,
      minAge: 21,
      maxAge: 60,
      states: ['Odisha']
    }
  },
  {
    id: 'odisha-bjp-kalia',
    name: 'KALIA Scheme (Krushak Assistance for Livelihood and Income Augmentation)',
    department: 'Agriculture Department, Odisha',
    category: 'agriculture',
    description: 'Income reinforcement dispatching ₹10,000 per annum to small and marginal farmers across the crop cycles in Odisha.',
    benefits: 'Direct Benefit Transfer (DBT) of ₹10,000 per year (₹5,000 for Kharif and ₹5,000 for Rabi) for farm inputs procurement.',
    documents: [
      'KALIA registration slip / Land records',
      'Aadhaar Card of the farmer',
      'Active bank account passbook details'
    ],
    deadline: 'Seasonal crop cycles',
    officialUrl: 'https://subhadra.odisha.gov.in/',
    criteria: {
      farmer: true,
      states: ['Odisha']
    }
  },

  // 20. Punjab (AAP)
  {
    id: 'punjab-aap-free-electricity',
    name: 'Free Electricity Scheme',
    department: 'Punjab State Power Corporation Limited (PSPCL), Punjab',
    category: 'msme',
    description: 'Domestic consumers in Punjab receive 300 units of free power every month.',
    benefits: 'Zero electricity bill for households whose monthly electricity consumption is 300 units or less.',
    documents: [
      'Aadhaar Card showing Punjab address',
      'Electricity Connection Account ID / consumer book'
    ],
    deadline: 'Active (Ongoing billing cycles)',
    officialUrl: 'https://sswcd.punjab.gov.in/',
    criteria: {
      states: ['Punjab']
    }
  },
  {
    id: 'punjab-aap-clinics',
    name: 'Aam Aadmi Clinics',
    department: 'Health and Family Welfare Department, Punjab',
    category: 'minority',
    description: 'Provides localized infrastructure for free clinical consultation, diagnostic testing, and medicines directly within urban and rural communities in Punjab.',
    benefits: '100% free outpatient healthcare (consultations, 100+ diagnostic tests, and essential drugs list) at local clinics.',
    documents: [
      'Aadhaar Card / local address identification'
    ],
    deadline: 'Active (Walk-in services)',
    officialUrl: 'https://sswcd.punjab.gov.in/',
    criteria: {
      states: ['Punjab']
    }
  },

  // 21. Rajasthan (BJP)
  {
    id: 'rajasthan-bjp-chiranjeevi',
    name: 'Chiranjeevi Mangal Bima Yojana',
    department: 'Medical and Health Department, Rajasthan',
    category: 'minority',
    description: 'Provides ₹25 lakh universal cashless healthcare per year to enrolled families in Rajasthan.',
    benefits: 'Cashless treatment cover of up to ₹25 Lakhs per family per year for hospitalization expenses.',
    documents: [
      'Jan Aadhaar Card (Mandatory ID)',
      'Aadhaar Card of family members',
      'Ration Card / resident proof of Rajasthan'
    ],
    deadline: 'Ongoing renewal',
    officialUrl: 'https://rajasthan.gov.in/',
    criteria: {
      states: ['Rajasthan']
    }
  },
  {
    id: 'rajasthan-bjp-yuva-swarozgar',
    name: 'Mukhyamantri Yuva Swarozgar Yojana',
    department: 'Department of Industries, Rajasthan',
    category: 'msme',
    description: 'New initiative offering fully interest-free business loans to young entrepreneurs in Rajasthan.',
    benefits: 'Interest-free loans up to ₹5 Lakhs for startup setups, with state bearing the interest burden entirely.',
    documents: [
      'Aadhaar Card and PAN Card',
      'Rajasthan Resident certificate',
      'Business Project Report',
      'Unemployed registration card (if applicable)'
    ],
    deadline: 'Ongoing enrollment batches',
    officialUrl: 'https://rajasthan.gov.in/',
    criteria: {
      businessOwner: true,
      states: ['Rajasthan']
    }
  },

  // 22. Sikkim (Sikkim Krantikari Morcha - SKM)
  {
    id: 'sikkim-skm-aama',
    name: 'Sikkim Aama Yojana',
    department: 'Social Welfare Department, Sikkim',
    category: 'women',
    description: 'Financial hand-out of ₹20,000 per year given to non-working, single mothers in Sikkim to enable sustainable living.',
    benefits: 'Annual direct cash assistance transfer of ₹20,000 directly to the bank accounts of single, non-working mothers.',
    documents: [
      'Single Mother Status certificate (issued by local authorities)',
      'Non-working declaration / Income certificate',
      'Sikkim Subject Certificate / Certificate of Identification',
      'Aadhaar Card and Bank passbook details'
    ],
    deadline: 'Ongoing annual registration',
    officialUrl: 'https://sikkim.gov.in/',
    criteria: {
      womenOnly: true,
      states: ['Sikkim']
    }
  },
  {
    id: 'sikkim-skm-garib-awas',
    name: 'Sikkim Garib Awas Yojana',
    department: 'Rural Development Department, Sikkim',
    category: 'msme',
    description: 'Construction of concrete single-story independent housing units complete with urban furniture for underprivileged groups in Sikkim.',
    benefits: 'Provision of a fully built single-story house with 2 bedrooms, kitchen, bathroom, complete with furniture (bed, tables, chairs).',
    documents: [
      'Income Certificate (establishing low-income status)',
      'Certificate of Identification (Sikkim CoI)',
      'Land availability records for construction',
      'Aadhaar Card'
    ],
    deadline: 'Phase-wise allotments',
    officialUrl: 'https://sikkim.gov.in/',
    criteria: {
      states: ['Sikkim']
    }
  },

  // 23. Tamil Nadu (TVK - Vijay) (Won May 2026 election)
  {
    id: 'tn-tvk-respectful-women',
    name: 'Madhippumigu Magalir Thittam (Respectful Women Scheme)',
    department: 'Social Welfare Department, Tamil Nadu',
    category: 'women',
    description: 'Replaces prior setups to supply ₹2,500/month financial aid to female heads of households in Tamil Nadu.',
    benefits: 'Direct cash transfer of ₹2,500 per month credited directly to the woman head of household\'s bank account.',
    documents: [
      'Aadhaar Card of the applicant',
      'Ration Card (showing female head status)',
      'Aadhaar-linked Bank Passbook details',
      'Domicile certificate of Tamil Nadu'
    ],
    deadline: 'Announced post-2026 election rollout',
    officialUrl: 'https://penkalvi.tn.gov.in/',
    criteria: {
      womenOnly: true,
      states: ['Tamil Nadu']
    }
  },
  {
    id: 'tn-tvk-youth-unemployment',
    name: 'Youth Unemployment Assistance Scheme',
    department: 'Employment & Training Department, Tamil Nadu',
    category: 'education',
    description: 'Forthcoming launch of ₹4,000/month for jobless graduates and ₹2,500/month for ITI/Diploma holders in Tamil Nadu.',
    benefits: 'Monthly financial assistance allowance of ₹4,000/month for graduates and ₹2,500/month for ITI/Diploma holders.',
    documents: [
      'Degree / Diploma / ITI passing certificates',
      'Unemployment self-declaration certificate',
      'Aadhaar Card and Domicile proof of Tamil Nadu'
    ],
    deadline: 'Scheduled rollout late 2026',
    officialUrl: 'https://penkalvi.tn.gov.in/',
    criteria: {
      student: true,
      states: ['Tamil Nadu']
    }
  },

  // 24. Telangana (INC)
  {
    id: 'telangana-inc-aroogyasri',
    name: 'Rajiv Arogyasri (Cheyutha Scheme)',
    department: 'Health and Family Welfare Department, Telangana',
    category: 'minority',
    description: 'Cashless health treatment coverage expanded up to ₹10 lakh per family in Telangana.',
    benefits: 'Cashless healthcare cover up to ₹10 Lakhs per family per year for major hospitalization treatments.',
    documents: [
      'Arogyasri Card / Rajiv Rahasri Card details',
      'Aadhaar Card',
      'Ration Card showing Telangana address'
    ],
    deadline: 'Ongoing enrollment',
    officialUrl: 'https://rythubandhu.telangana.gov.in/',
    criteria: {
      states: ['Telangana']
    }
  },
  {
    id: 'telangana-inc-mahalakshmi',
    name: 'Maha Lakshmi Scheme',
    department: 'Women and Child Development Department, Telangana',
    category: 'women',
    description: 'Provides free TSRTC bus travel for women alongside direct gas cylinder access capped at ₹500 in Telangana.',
    benefits: 'Free transit bus travel for all women in Telangana, plus LPG cooking gas cylinders capped at a subsidised rate of ₹500.',
    documents: [
      'Aadhaar Card showing Telangana address',
      'LPG Connection consumer details / Ration card'
    ],
    deadline: 'Active (Ongoing registration)',
    officialUrl: 'https://rythubandhu.telangana.gov.in/',
    criteria: {
      womenOnly: true,
      states: ['Telangana']
    }
  },
  {
    id: 'telangana-inc-free-meals',
    name: 'Free Breakfast and Lunch Scheme',
    department: 'School Education Department, Telangana',
    category: 'education',
    description: 'State education welfare program delivering both nutritional morning meals and lunches to students from Nursery through Class 12 in Telangana.',
    benefits: 'Free daily hot breakfast and mid-day nutritional lunch at all government schools in Telangana.',
    documents: [
      'Student school enrollment card / registry ID'
    ],
    deadline: 'Active (Ongoing academic years)',
    officialUrl: 'https://rythubandhu.telangana.gov.in/',
    criteria: {
      student: true,
      states: ['Telangana']
    }
  },

  // 25. Tripura (BJP)
  {
    id: 'tripura-bjp-matru-pushti',
    name: 'Mukhyamantri Matru Pushti Uphaar',
    department: 'Social Welfare and Social Education Department, Tripura',
    category: 'women',
    description: 'Nutrition diagnostic kits containing health supplements supplied to pregnant and lactating mothers in Tripura.',
    benefits: 'Free maternal nutrition kit containing ghee, milk powder, peanuts, dates, and health supplements distributed during ANC checkups.',
    documents: [
      'Antenatal Care (ANC) registration card / clinic book',
      'Aadhaar Card of the mother',
      'Resident proof of Tripura'
    ],
    deadline: 'Ongoing hospital-submission',
    officialUrl: 'https://tripura.gov.in/',
    criteria: {
      womenOnly: true,
      states: ['Tripura']
    }
  },
  {
    id: 'tripura-bjp-industrial-promotion',
    name: 'Tripura Industrial Investment Promotion Incentive',
    department: 'Department of Industries and Commerce, Tripura',
    category: 'msme',
    description: 'Capital grant frameworks facilitating ease-of-business matching infrastructure for micro units in Tripura.',
    benefits: 'Capital investment subsidy up to 30%, procurement incentives, and interest subsidy support for setting up MSME units.',
    documents: [
      'Udyam Registration Certificate',
      'Business Project Report',
      'Aadhaar and PAN details of promoters',
      'Bank Account statements'
    ],
    deadline: 'Ongoing cohorts',
    officialUrl: 'https://tripura.gov.in/',
    criteria: {
      businessOwner: true,
      states: ['Tripura']
    }
  },

  // 26. Uttarakhand (BJP)
  {
    id: 'uttarakhand-bjp-lakhpati-didi',
    name: 'Lakhpati Didi Yojana (Uttarakhand)',
    department: 'Rural Development Department, Uttarakhand',
    category: 'women',
    description: 'Structural target group management providing self-help group (SHG) women with technical and marketing credit to reach ₹1 lakh annual income in Uttarakhand.',
    benefits: 'Skill development training (organic farming, handicraft marketing, drone operation) and interest-free loan lines for SHG women.',
    documents: [
      'Aadhaar Card',
      'SHG registration certificate details',
      'Income Certificate (proving poor/low-income status)',
      'Domicile Certificate of Uttarakhand'
    ],
    deadline: 'Ongoing enrollment',
    officialUrl: 'https://uttarakhand.gov.in/',
    criteria: {
      womenOnly: true,
      states: ['Uttarakhand']
    }
  },
  {
    id: 'uttarakhand-bjp-vatsalya',
    name: 'Mukhyamantri Vatsalya Yojana',
    department: 'Women Empowerment and Child Development Department, Uttarakhand',
    category: 'minority',
    description: 'Cash transfer of ₹3,00/month alongside free educational support to child victims who lost parents to pandemics or severe crises in Uttarakhand.',
    benefits: 'Monthly financial assistance allowance of ₹3,000/month, free educational books and schooling, and reservation in government jobs.',
    documents: [
      'Death certificates of parents (verifying orphan status)',
      'Aadhaar Card of the child / guardian',
      'Uttarakhand Domicile Certificate'
    ],
    deadline: 'Ongoing enrollment',
    officialUrl: 'https://uttarakhand.gov.in/',
    criteria: {
      states: ['Uttarakhand']
    }
  },

  // 27. Uttar Pradesh (BJP)
  {
    id: 'up-bjp-kanya-sumangala',
    name: 'Mukhyamantri Kanya Sumangala Yojana',
    department: 'Women and Child Development Department, Uttar Pradesh',
    category: 'women',
    description: 'Financial assistance up to ₹25,000 rolled out over 6 developmental milestones from birth to higher study entry for a girl child in Uttar Pradesh.',
    benefits: 'Staggered financial grant of ₹25,000 (increased from ₹15,000 in recent updates) across 6 milestones (birth, vaccination, class 1, 6, 9, and graduation admission).',
    documents: [
      'Address Proof of parent/guardian in Uttar Pradesh',
      'Income Certificate (annual family income below ₹3 Lakhs)',
      'Birth Certificate of the girl child',
      'Bank passbook details',
      'Certificate of school enrollment'
    ],
    deadline: 'Ongoing enrollment',
    officialUrl: 'https://mksy.up.gov.in/',
    criteria: {
      womenOnly: true,
      maxIncome: 300000,
      states: ['Uttar Pradesh']
    }
  },
  {
    id: 'up-bjp-abhyudaya',
    name: 'Mukhyamantri Abhyudaya Yojana',
    department: 'Social Welfare Department, Uttar Pradesh',
    category: 'education',
    description: 'Free residential and remote infrastructure offering competitive exam coaching (UPSC, NEET, JEE) to talented youth in Uttar Pradesh.',
    benefits: 'Free coaching classes, mock test series, study materials, and mentoring sessions for competitive examinations.',
    documents: [
      'Aadhaar Card',
      'Educational marksheets (Class 10/12/Graduation)',
      'Uttar Pradesh Domicile certificate',
      'Competitive exam application receipt'
    ],
    deadline: 'Entrance exam enrollment (Annual basis)',
    officialUrl: 'https://mksy.up.gov.in/',
    criteria: {
      student: true,
      states: ['Uttar Pradesh']
    }
  },

  // 28. West Bengal (BJP) (Won May 2026 election)
  {
    id: 'wb-bjp-ayushman-bharat',
    name: 'Ayushman Bharat Integration (West Bengal)',
    department: 'Health Department, West Bengal',
    category: 'minority',
    description: 'Transitioning local public wellness targets to achieve full deployment of the ₹5 lakh central healthcare infrastructure in West Bengal.',
    benefits: 'Cashless healthcare cover up to ₹5 Lakhs per family per year for secondary and tertiary care treatments.',
    documents: [
      'Aadhaar Card',
      'Ration Card / Family details',
      'PMJAY Card / e-KYC receipt'
    ],
    deadline: 'Active saturation rollout (2026)',
    officialUrl: 'https://dashboard.pmjay.gov.in/pmjay-portal/',
    criteria: {
      states: ['West Bengal']
    }
  },
  {
    id: 'wb-bjp-pm-kisan',
    name: 'PM-Kisan Saturation Drive (West Bengal)',
    department: 'Agriculture Department, West Bengal',
    category: 'agriculture',
    description: 'The new government is standardizing a full rollout of the ₹6,000 annual farmer direct transfer to clear previous state bottlenecks in West Bengal.',
    benefits: 'Direct cash transfer of ₹6,000 per year in three equal installments of ₹2,000 directly into the farmer\'s bank accounts.',
    documents: [
      'Aadhaar Card',
      'Landholding revenue records / Parcha',
      'Bank Passbook details (linked with Aadhaar)'
    ],
    deadline: 'Ongoing enrollment',
    officialUrl: 'https://pmkisan.gov.in/',
    criteria: {
      farmer: true,
      states: ['West Bengal']
    }
  }
];
