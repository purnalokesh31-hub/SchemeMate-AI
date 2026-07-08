# SchemeMate AI 🇮🇳

SchemeMate AI is a state-of-the-art, full-stack web application designed to simplify the discovery, eligibility matching, and application process for Indian government welfare programs. It bridges the gap between dense government databases and citizens through a modern SaaS interface and an AI-powered conversational assistant.

---

## 🌟 Key Features

* **Dynamic Eligibility Matcher**: Evaluates complex demographic parameters—including Age, Gender, Income, State, Occupation, Education level, and Residential area type (Rural/Urban)—to calculate compatibility percentages.
* **National Schemes Database (2026 Regimes)**: Houses 60 real-world active schemes:
  * **Pan-India Central Schemes**: PM Surya Ghar (solar), Ayushman Bharat PM-JAY (including Vay Vandana for 70+ seniors), PM Vishwakarma, PM-Kisan, and Lakhpati Didi.
  * **28 Indian States coverage**: Dynamic, localized schemes mapped across all 28 states, updated to reflect the latest 2026 assembly elections and ruling administrations.
* **Profile-Aware AI Assistant**: A server-side API-driven chatbot that securely loads the user's eligibility checker inputs and replies with personalized recommendations, explanation logs, and direct portal links.
* **Interactive Alternative Pathways**: Implements zero-deadend results UI. If strict matching parameters yield no direct state scheme, the platform automatically redirects the user to general-purpose central programs.
* **Modern Premium UX**: Smooth Framer Motion transitions, responsive sidebar filters, udyam status mapping, and sticky navigation.

---

## 🛠️ Technology Stack

* **Framework**: [Next.js](https://nextjs.org/) (React, Turbopack, App Router)
* **Styling**: [Tailwind CSS](https://tailwindcss.com/)
* **Icons**: [Lucide React](https://lucide.dev/)
* **Animations**: [Framer Motion](https://www.framer.com/motion/)

---

## 🚀 Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation
1. Open your terminal inside the project directory:
   ```bash
   npm install
   ```

2. Run the development server locally:
   ```bash
   npm run dev
   ```

3. Open **[http://localhost:3000](http://localhost:3000)** in your browser to see the live application.

---

## 📦 Deployment
This project is pre-configured for a 1-click deployment to **[Vercel](https://vercel.com/)**:
1. Push this folder to a new repository on your **GitHub** account.
2. Link the repository to your Vercel Dashboard.
3. Vercel will build and host the static pages and the serverless backend API route (`/api/chat`) automatically.
