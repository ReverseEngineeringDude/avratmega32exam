# AVR ATmega32 Exam Prep

A comprehensive study tool for embedded systems students preparing for practical exams on **AVR ATmega32** microcontroller programming. Built with React + Vite and Firebase.

![React](https://img.shields.io/badge/React-19-blue)
![Vite](https://img.shields.io/badge/Vite-8-purple)
![Firebase](https://img.shields.io/badge/Firebase-Firestore-orange)

## Features

- **12 Practical Questions** covering LED, LCD, Keypad, ADC, UART, Timers, PWM, Motors, Interrupts, and more
- **Complete AVR C Code** with syntax highlighting, line numbers, and copy-to-clipboard
- **Proteus Circuit Diagrams** with lightbox zoom
- **Pin Connection Tables** for quick reference
- **Line-by-Line Code Explanations** for deep understanding
- **Important Register Snippets** highlighted with explanations
- **Viva/Oral Exam Q&A** with expandable accordions and "mark as memorized" tracking
- **Progress Tracking** — mark questions as reviewed (persisted in localStorage)
- **Dark Mode** toggle
- **Fully Responsive** — works on desktop, tablet, and mobile
- **Real-time data** from Firebase Firestore

## Prerequisites

- [Node.js](https://nodejs.org/) v18 or later
- A [Firebase](https://firebase.google.com/) project with Firestore and Storage enabled

## Setup

### 1. Clone and Install

```bash
git clone <your-repo-url>
cd avratmega32exam
npm install
```

### 2. Create a Firebase Project

1. Go to the [Firebase Console](https://console.firebase.google.com/)
2. Click **"Add project"** and follow the wizard
3. In the project dashboard, go to **Build → Firestore Database** and click **"Create database"**
   - Choose **"Start in test mode"** for development (remember to set proper rules before deploying)
   - Select a region close to your users
4. Go to **Build → Storage** and click **"Get started"**
   - Accept the default rules for now
5. Go to **Project Settings → General** → scroll to **"Your apps"** → click the **Web** icon (`</>`)
6. Register the app (give it any nickname) and copy the Firebase config values

### 3. Configure Environment Variables

Copy the example env file and fill in your Firebase credentials:

```bash
cp .env.example .env
```

Edit `.env` with your Firebase config values:

```env
VITE_FIREBASE_API_KEY=AIzaSy...
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abcdef
```

### 4. Seed the Firestore Database

To populate Firestore with all 12 practical questions, you need a **Firebase Admin SDK service account key**:

1. In Firebase Console → **Project Settings → Service accounts**
2. Click **"Generate new private key"** → download the JSON file
3. Save it as `scripts/serviceAccountKey.json` (this file is git-ignored)
4. Run the seed script:

```bash
npm run seed
```

You should see output like:
```
🌱 Starting Firestore seed...
✅ Seeded: LED blinking (digital output)
✅ Seeded: Push-button input with LED
...
🎉 All 12 questions seeded successfully!
```

### 5. (Optional) Upload Circuit Images

The seed script uses placeholder image URLs. To add real Proteus circuit screenshots:

1. Take screenshots of your Proteus simulations
2. Upload them to **Firebase Storage** (via the console or programmatically)
3. Copy the download URLs
4. Update the `circuitImageUrl` field for each question in Firestore

### 6. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### 7. Build for Production

```bash
npm run build
npm run preview  # Preview the production build locally
```

## Project Structure

```
avratmega32exam/
├── public/
│   └── favicon.svg
├── scripts/
│   └── seedFirestore.js          # Firestore seed script (Firebase Admin SDK)
├── src/
│   ├── firebase/
│   │   └── config.js             # Firebase initialization
│   ├── services/
│   │   └── questionsService.js   # Firestore data access layer
│   ├── hooks/
│   │   ├── useQuestions.js       # Hook for fetching all questions
│   │   ├── useQuestion.js        # Hook for fetching single question
│   │   └── useLocalStorage.js    # Generic localStorage hook
│   ├── components/
│   │   ├── Navbar.jsx / .css
│   │   ├── Footer.jsx / .css
│   │   ├── QuestionCard.jsx / .css
│   │   ├── SearchBar.jsx / .css
│   │   ├── CategoryFilter.jsx / .css
│   │   ├── CodeBlock.jsx / .css
│   │   ├── CodeExplanationList.jsx / .css
│   │   ├── CircuitFigure.jsx / .css
│   │   ├── VivaAccordion.jsx / .css
│   │   ├── PinConnectionTable.jsx / .css
│   │   ├── ImportantSnippets.jsx / .css
│   │   ├── ProgressBar.jsx / .css
│   │   ├── Spinner.jsx / .css
│   │   ├── ErrorMessage.jsx / .css
│   │   └── Lightbox.jsx / .css
│   ├── pages/
│   │   ├── HomePage.jsx / .css
│   │   └── QuestionDetailPage.jsx / .css
│   ├── App.jsx / .css
│   ├── index.css
│   └── main.jsx
├── .env.example
├── .gitignore
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## Adding New Questions

### Option A: Via Firebase Console

1. Go to Firestore in the Firebase Console
2. Navigate to the `questions` collection
3. Click **"Add document"** (auto-generate ID)
4. Fill in the fields following this schema:

```json
{
  "title": "Your Question Title",
  "category": "Digital I/O",
  "order": 13,
  "problemStatement": "Describe the practical task...",
  "circuitImageUrl": "https://...",
  "pinConnections": [
    { "mcuPin": "PORTB.0", "component": "LED Anode (via 330Ω)" }
  ],
  "code": "#include <avr/io.h>\n...",
  "codeExplanation": [
    { "line": "DDRB = 0xFF;", "explanation": "Sets PORTB as output" }
  ],
  "importantCode": [
    { "snippet": "DDRB = 0xFF;", "note": "Configures PORTB as output" }
  ],
  "vivaQuestions": [
    { "q": "Question?", "a": "Answer." }
  ]
}
```

### Option B: Extend the Seed Script

1. Open `scripts/seedFirestore.js`
2. Add a new question object to the `questions` array
3. Run `npm run seed` again (existing documents won't be duplicated if you use `doc(db, 'questions', uniqueId)`)

## Tech Stack

| Technology | Purpose |
|---|---|
| React 19 | UI framework |
| Vite 8 | Build tool & dev server |
| React Router v6 | Client-side routing |
| Firebase Firestore | Database (questions & answers) |
| Firebase Storage | Circuit diagram images |
| react-syntax-highlighter | Code syntax highlighting |
| lucide-react | Icon library |
| CSS (vanilla) | Styling with CSS custom properties |

## License

This project is for educational purposes. Feel free to use, modify, and share it with your classmates.
