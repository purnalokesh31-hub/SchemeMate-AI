import { NextRequest, NextResponse } from 'next/server';
import { schemesData } from '@/data/schemes';

export async function POST(req: NextRequest) {
  try {
    const { message, profile } = await req.json();

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Invalid message query parameter.' },
        { status: 400 }
      );
    }

    const query = message.toLowerCase().trim();
    let responseText = '';
    let matchedSchemesList: any[] = [];

    // Check if the user is inquiring about eligibility or matched recommendations
    const isEligibilityQuery = 
      query.includes('eligible') || 
      query.includes('qualification') || 
      query.includes('qualify') || 
      query.includes('criteria') ||
      query.includes('match') ||
      query.includes('my scheme') ||
      query.includes('recommend') ||
      query.includes('result');

    if (isEligibilityQuery) {
      if (profile && profile.fullName) {
        // Run the matching algorithm on the server using the user's actual profile!
        const userAge = parseInt(profile.age || '0');
        const userGender = profile.gender || '';
        const userOccupation = profile.occupation || '';
        const isStudent = profile.isStudent === true || userOccupation === 'student';
        const isFarmer = profile.isFarmer === true || userOccupation === 'farmer';
        const isBusinessOwner = profile.isBusinessOwner === true || 
                                userOccupation === 'business_owner' || 
                                userOccupation === 'street_vendor' || 
                                userOccupation === 'self_employed';
        const userIncome = profile.annualIncome || '';
        const minorityCategory = profile.minorityCategory || '';
        const disabilityStatus = profile.disabilityStatus || '';
        const businessRegistration = profile.businessRegistration || '';
        const isWomenEntrepreneur = profile.isWomenEntrepreneur === true;
        const userState = profile.state || '';
        const userEducation = profile.education || '';
        const userAreaType = profile.areaType || '';

        const results = schemesData.map((scheme) => {
          let score = 100;
          const { criteria } = scheme;

          // Age
          if (userAge > 0) {
            if (criteria.minAge && userAge < criteria.minAge) score -= 30;
            if (criteria.maxAge && userAge > criteria.maxAge) score -= 30;
          }

          // Gender
          if (criteria.womenOnly) {
            if (userGender !== 'female' && !isWomenEntrepreneur) {
              score = 0;
            } else {
              score += 5;
            }
          }

          // Student
          if (criteria.student && !isStudent) score -= 50;
          else if (criteria.student && isStudent) score += 10;

          // Farmer
          if (criteria.farmer && !isFarmer) score -= 50;
          else if (criteria.farmer && isFarmer) score += 10;

          // Business Owner
          if (criteria.businessOwner && !isBusinessOwner) score -= 40;
          else if (criteria.businessOwner && isBusinessOwner) {
            score += 10;
            if (criteria.businessRegistration === 'registered' && businessRegistration === 'unregistered') {
              score -= 30;
            }
          }

          // Income
          if (criteria.maxIncome) {
            let userIncomeVal = 0;
            if (userIncome === 'above_20') userIncomeVal = 2500000;
            else userIncomeVal = parseInt(userIncome) || 0;

            if (userIncomeVal > criteria.maxIncome) score -= 40;
            else score += 5;
          }

          // Minority
          if (criteria.minorityOnly) {
            if (minorityCategory === 'general' || minorityCategory === '') score -= 40;
            else score += 10;
          }

          // Disability
          if (criteria.disabilityOnly && disabilityStatus !== 'yes') score -= 50;

          // State
          if (criteria.states && criteria.states.length > 0 && userState) {
            if (!criteria.states.includes(userState)) score -= 20;
            else score += 5;
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
            score -= 40;
          } else if (scheme.id === 'pm-kisan' && userAreaType === 'urban') {
            score -= 20;
          } else if (userAreaType === 'rural' && scheme.id === 'pm-svanidhi') {
            score += 5;
          }

          return {
            ...scheme,
            matchScore: Math.max(0, Math.min(100, score))
          };
        });

        // Filter and sort schemes: Central schemes first, then State-specific schemes.
        // Within each, sort by matchScore descending.
        const qualified = results
          .filter(s => s.matchScore >= 60)
          .sort((a, b) => {
            const aIsCentral = !a.criteria.states || a.criteria.states.length === 0;
            const bIsCentral = !b.criteria.states || b.criteria.states.length === 0;
            
            if (aIsCentral && !bIsCentral) return -1;
            if (!aIsCentral && bIsCentral) return 1;
            
            return b.matchScore - a.matchScore;
          });

        if (qualified.length > 0) {
          matchedSchemesList = qualified.slice(0, 3);
          responseText = `Hello **${profile.fullName}**! Based on your saved Eligibility Checker profile (Age: ${userAge}, State: ${profile.state || 'N/A'}, Occupation: ${userOccupation || 'N/A'}, Income: below ₹${parseInt(userIncome).toLocaleString('en-IN') || 'N/A'}), here are your top recommended matches from our database:\n\n` +
            qualified.slice(0, 3).map((s, idx) => `**${idx + 1}. ${s.name}** (${s.matchScore}% Match)\n• *Benefit:* ${s.benefits}\n• *Application:* [Apply Portal](${s.officialUrl})`).join('\n\n') +
            `\n\nYou can click the links above to apply directly, or explore all matches inside the **Results** page!`;
        } else {
          responseText = `Hello **${profile.fullName}**! I evaluated your eligibility profile but couldn't find a high-compatibility scheme matching your criteria (above 60%). However, you might qualify for general programs like **PM Surya Ghar: Muft Bijli Yojana** or skill programs like **PM Vishwakarma**. You can view these inside the Schemes catalog.`;
        }
      } else {
        responseText = "I don't have your profile details yet! Please fill out our 2-minute **Eligibility Checker** first. Once submitted, I will immediately load your answers from the database to suggest personalized matches!";
      }
    } 
    // Conversational greetings
    else if (query === 'hello' || query === 'hi' || query === 'hey' || query.includes('good morning') || query.includes('good afternoon') || query.includes('who are you') || query.includes('what can you do')) {
      const nameGreeting = profile && profile.fullName ? `, ${profile.fullName}` : '';
      responseText = `Hello${nameGreeting}! I am your SchemeMate AI Assistant. I can check your profile against our 2026 schemes database to find matches. Try asking:\n\n• *\"What schemes am I eligible for?\"*\n• *\"Show me solar power programs\"*\n• *\"What benefits are in PM Vishwakarma?\"*\n\nHow can I help you today?`;
    } 
    // Conversational thank you
    else if (query.includes('thank') || query.includes('thanks') || query.includes('helpful') || query === 'ok' || query === 'cool' || query === 'bye') {
      responseText = "You're very welcome! I'm glad I could help. If you have any other questions or need support matching schemes, just ask. Have a great day!";
    } 
    // Specific scheme: PM Surya Ghar
    else if (query.includes('solar') || query.includes('electricity') || query.includes('surya') || query.includes('power') || query.includes('bijli')) {
      const solar = schemesData.find(s => s.id === 'pm-surya-ghar');
      matchedSchemesList = solar ? [solar] : [];
      responseText = "The **PM Surya Ghar: Muft Bijli Yojana** is a national rooftop solar subsidy program launched in 2024. It provides up to **300 units of free electricity per month** to 1 Crore households, including subsidies of up to **₹78,000** for installation.";
    } 
    // Specific scheme: PM-KISAN / Annadatha Sukhibhava
    else if (query.includes('kisan') || query.includes('farmer') || query.includes('agriculture') || query.includes('land')) {
      const kisan = schemesData.find(s => s.id === 'pm-kisan');
      const annadatha = schemesData.find(s => s.id === 'ap-tdp-annadatha-sukhibhava');
      matchedSchemesList = [kisan, annadatha].filter(Boolean);
      responseText = "For agriculture, we have active key programs in our database:\n\n1. **PM-KISAN (Pradhan Mantri Kisan Samman Nidhi)**: Income support of ₹6,00,000/year in three equal installments of ₹2,000 directly to landholding families.\n2. **Annadatha Sukhibhava (Andhra Pradesh)**: Combined with PM-Kisan to offer increased investment support of ₹20,000/year to farmers in AP.\n3. **Rythu Bandhu (Telangana)**: Investment support of ₹10,000 per acre per year.";
    } 
    // Specific scheme: Student scholarships / education
    else if (query.includes('student') || query.includes('scholarship') || query.includes('education') || query.includes('college') || query.includes('school')) {
      const yuvanidhi = schemesData.find(s => s.id === 'karnataka-inc-yuva-nidhi');
      const pudhumaipenn = schemesData.find(s => s.id === 'tamilnadu-pudhumai-penn');
      const abhyudaya = schemesData.find(s => s.id === 'up-bjp-abhyudaya');
      matchedSchemesList = [yuvanidhi, pudhumaipenn, abhyudaya].filter(Boolean);
      responseText = "Here are the top educational and unemployment schemes in our database:\n\n1. **Yuva Nidhi (Karnataka)**: Monthly unemployment allowance of ₹3,000 for graduates and ₹1,500 for diploma holders.\n2. **Pudhumai Penn (Tamil Nadu)**: Monthly higher education support of ₹1,000 for girls from government schools.\n3. **Abhyudaya Yojana (Uttar Pradesh)**: Free coaching classes for competitive exams (JEE, NEET, UPSC).\n4. **Kanya Sumangala Yojana (Uttar Pradesh)**: Educational progression grants.";
    } 
    // Specific scheme: Women entrepreneurship / Direct Benefits
    else if (query.includes('women') || query.includes('female') || query.includes('girl') || query.includes('mahila') || query.includes('lakhpati') || query.includes('drone') || query.includes('shakti') || query.includes('lakshmi')) {
      const lakhpati = schemesData.find(s => s.id === 'lakhpati-didi');
      const drone = schemesData.find(s => s.id === 'namo-drone-didi');
      const ladkibahin = schemesData.find(s => s.id === 'maharashtra-mahayuti-ladki-bahin');
      const gruhalakshmi = schemesData.find(s => s.id === 'karnataka-inc-gruha-lakshmi');
      matchedSchemesList = [lakhpati, drone, ladkibahin, gruhalakshmi].filter(Boolean);
      responseText = "We track the latest active women welfare programs in our database:\n\n• **Lakhpati Didi**: Skill development and micro-credit for women in Self-Help Groups (SHGs) to earn ₹1 Lakh+/year.\n• **Namo Drone Didi**: Agricultural drone piloting certification and ₹15,000/month stipends.\n• **Majhi Ladki Bahin (Maharashtra)**: ₹1,500/month direct cash assistance.\n• **Gruha Lakshmi (Karnataka)**: ₹2,000/month direct cash assistance.\n• **Aadabidda Nidhi (Andhra Pradesh)**: ₹1,500/month support for women aged 18-59.";
    } 
    // Specific scheme: PM Vishwakarma / artisans
    else if (query.includes('vishwakarma') || query.includes('artisan') || query.includes('craft') || query.includes('tool')) {
      const vishwakarma = schemesData.find(s => s.id === 'pm-vishwakarma');
      matchedSchemesList = vishwakarma ? [vishwakarma] : [];
      responseText = "The **PM Vishwakarma Yojana** supports traditional artisans with skill training, a free tool kit incentive (worth ₹15,000), a daily training stipend of ₹500, and low-interest collateral-free loans up to ₹3 Lakhs.";
    } 
    // General document check
    else if (query.includes('document') || query.includes('paper') || query.includes('file') || query.includes('certificate') || query.includes('proof')) {
      responseText = "Most current government schemes require standard documentation to register:\n\n1. **Aadhaar Card** (linked to mobile)\n2. **Income Certificate** (establishing EWS or low income eligibility)\n3. **Domicile Certificate** (to confirm state residency for state schemes)\n4. **Aadhaar-seeded Bank Account Passbook** (required for DBT payouts).";
    } 
    // General apply links check
    else if (query.includes('apply') || query.includes('online') || query.includes('link') || query.includes('portal') || query.includes('register') || query.includes('website')) {
      responseText = "All schemes listed on SchemeMate AI support online registration. You can click 'Apply Now' on any scheme card inside the Results dashboard to go directly to verified official registration portals (like `pmsuryaghar.gov.in` or `subhadra.odisha.gov.in`).";
    } 
    // General loan / credit
    else if (query.includes('loan') || query.includes('credit') || query.includes('money') || query.includes('fund') || query.includes('borrow')) {
      const vishwakarma = schemesData.find(s => s.id === 'pm-vishwakarma');
      const solar = schemesData.find(s => s.id === 'pm-surya-ghar');
      matchedSchemesList = [vishwakarma, solar].filter(Boolean);
      responseText = "For credit, we track the latest active programs:\n\n• **PM Vishwakarma**: Collateral-free enterprise development credit up to ₹3 Lakhs at a concessional 5% interest rate.\n• **PM Surya Ghar**: Concessional low-interest loans for rooftop solar panel installations.";
    } 
    // Default fallback - search matching schemes
    else {
      const searchMatches = schemesData.filter(s => 
        s.name.toLowerCase().includes(query) || 
        s.description.toLowerCase().includes(query) ||
        s.department.toLowerCase().includes(query)
      );

      if (searchMatches.length > 0) {
        matchedSchemesList = searchMatches.slice(0, 3);
        responseText = `I found ${searchMatches.length} matching scheme(s) in our database for "${message}":\n\n${searchMatches.map((s, i) => `${i+1}. **${s.name}** (${s.department})`).join('\n')}\n\nYou can view their detailed eligibility and official registration links on the Results dashboard!`;
      } else {
        responseText = "I couldn't find a specific scheme matching your exact words. I can help with details on **PM Surya Ghar**, **PM-KISAN**, **PM Vishwakarma**, and **Lakhpati Didi**. Alternatively, try running our **Eligibility Checker** for a full scan!";
      }
    }

    return NextResponse.json({
      text: responseText,
      matchedSchemes: matchedSchemesList,
    });
  } catch (error) {
    console.error('Chat API Error:', error);
    return NextResponse.json(
      { error: 'An error occurred while processing your request on the backend.' },
      { status: 500 }
    );
  }
}
