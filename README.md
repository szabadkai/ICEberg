# ICE Scorecard

A modern web application for product managers to score and prioritize features using the ICE (Impact, Confidence, Effort) scoring methodology.

## Features

- **Guided Scoring Process**: Multi-step questionnaire with 12 objective questions across three categories
- **Automated Calculation**: ICE score calculated as `Impact × Confidence × Ease`
- **Visual Feedback**: Beautiful illustrations and tier-based results
- **Export to CSV**: Download all scores for further analysis
- **Local Storage**: Scores persist in browser (up to 100 entries)
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Accessible**: WCAG 2.1 AA compliant with keyboard navigation and ARIA labels

## Technology Stack

- **Framework**: Lit 3.x with TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Lit Context API with custom store
- **CSV Export**: PapaParse library
- **Build Tool**: Vite
- **Browser Support**: Chrome, Firefox, Safari, Edge (last 2 versions)

## Getting Started

### Prerequisites

- Node.js 16+ and npm

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open http://localhost:5173 in your browser.

### Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

## Usage

1. **Start Scoring**: Click "Start Scoring" on the landing page
2. **Enter Feature Details**: Provide a feature name and scorer name
3. **Answer Questions**: Complete all 12 questions across Impact, Confidence, and Effort sections
4. **Review Results**: See your ICE score and priority tier
5. **Export**: Add scores to export list and download as CSV

## ICE Scoring Methodology

### Impact (4 questions)
How significantly will this feature move the needle?
- User reach
- Metric impact
- User segment
- Business alignment

### Confidence (4 questions)
How certain are we that this will succeed?
- Research validation
- Prior experience
- Technical proof
- Resource availability

### Ease (4 questions - inverted scale)
How easy will this be to implement? (Higher score = easier)
- Time duration (inverted: fewer sprints = higher score)
- Team coordination (inverted: fewer teams = higher score)
- Technical complexity (inverted: simpler = higher score)
- Dependencies (inverted: fewer dependencies = higher score)

### Priority Tiers

1. **Low Priority** (0-100): Weak combination
2. **Medium Priority** (101-300): Moderate opportunity
3. **Good Candidate** (301-500): Solid opportunity
4. **Strong Contender** (501-700): High value
5. **Top Priority** (701-1000): Excellent combination

## Project Structure

```
src/
├── components/          # Lit web components
│   ├── ice-scorecard-app.ts
│   ├── ice-landing-page.ts
│   ├── ice-feature-input.ts
│   ├── ice-illustration-break.ts
│   ├── ice-question-section.ts
│   ├── ice-justification-input.ts
│   ├── ice-results-screen.ts
│   ├── ice-export-manager.ts
│   └── ice-illustration.ts
├── data/               # Question bank and tier definitions
│   ├── questions.ts
│   └── tiers.ts
├── store/             # State management
│   ├── context.ts
│   └── store.ts
├── types/             # TypeScript type definitions
│   └── index.ts
├── utils/             # Utility functions
│   └── csv-export.ts
├── main.ts           # Application entry point
└── styles.css        # Global styles with Tailwind
```

## License

ISC

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
