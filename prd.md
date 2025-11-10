# Product Requirements Document: ICE Scoring App

## 1. Overview

**Product Name**: ICE Scorecard  
**Version**: 1.0  
**Target Users**: Product Managers  
**Objective**: Standardize ICE (Impact, Confidence, Effort) scoring through guided, objective questions with CSV export capability

## 2. Core Features

### 2.1 Scoring Workflow

- Multi-step questionnaire with three sections (Impact, Confidence, Effort)
- Automatic ICE calculation: `(Impact × Confidence) / Effort`
- Conditional justification input based on score thresholds
- Results display with score interpretation
- CSV export functionality

### 2.2 Visual Experience

- Illustrations between sections and on results screen
- Clean, professional UI during question sections
- Responsive design (desktop & tablet optimized)

## 3. Technical Specifications

### 3.1 Tech Stack

```
Framework: Lit 3.x with TypeScript
Styling: Tailwind CSS
State Management: Lit Context API with custom store
Routing: State-based navigation (no URL routing needed)
CSV Export: papaparse library
Build Tool: Vite
Linting: ESLint + Prettier
```

### 3.2 Browser Support

- Chrome/Edge: Last 2 versions
- Firefox: Last 2 versions
- Safari: Last 2 versions
- Mobile browsers: iOS Safari 14+, Chrome Android

### 3.3 Data Persistence

- LocalStorage for saved scores (max 100 entries)
- Session state preserved on page refresh
- Clear all data functionality

## 4. Architecture

### 4.1 Component Structure

```
ice-scorecard-app (root)
├── ice-header
│   ├── ice-logo
│   ├── ice-progress-bar
│   └── ice-export-badge
├── ice-router (state-based view switcher)
│   ├── ice-landing-page
│   ├── ice-feature-input
│   ├── ice-illustration-break
│   ├── ice-question-section
│   │   ├── ice-question-card (repeated)
│   │   └── ice-radio-group
│   ├── ice-justification-input
│   ├── ice-results-screen
│   │   ├── ice-score-display
│   │   └── ice-tier-card
│   └── ice-export-manager
│       ├── ice-score-table
│       └── ice-csv-export-button
└── ice-footer
    ├── ice-button (back)
    └── ice-button (next)
```

### 4.2 State Management

**Global Store Pattern:**

- Single source of truth for app state
- Lit Context API for dependency injection
- Custom store class with observer pattern
- Components consume context and re-render on state changes

**State Shape:**

- Current navigation step
- Current feature being scored
- All question responses (Impact, Confidence, Effort)
- Array of completed scores
- User information (scorer name)

**State Transitions:**

- Step navigation (forward/back)
- Question response updates
- Score completion and storage
- Export data preparation

### 4.3 Component Communication

**Parent to Child:**

- Props passed down via Lit properties
- Context consumed by child components

**Child to Parent:**

- Custom events dispatched up
- Store mutations for global state

**Event Types:**

- `step-change`: Navigation between steps
- `response-selected`: Question answered
- `score-completed`: Feature scoring finished
- `export-requested`: CSV download triggered

## 5. Question Bank Specifications

### 5.1 Impact Questions (4 questions, averaged)

**Question 1: User Reach**

- "How many users will this feature affect?"
- Options: <100 (1), 100-1K (3), 1K-10K (5), 10K-100K (8), 100K+ (10)

**Question 2: Metric Impact**

- "What is the expected impact on your primary metric?"
- Help text: "Consider revenue, retention, engagement, or conversion rate"
- Options: <1% (1), 1-5% (3), 5-10% (5), 10-25% (8), 25%+ (10)

**Question 3: User Segment**

- "Which user segment does this primarily serve?"
- Options: Edge cases (2), Secondary personas (4), Significant segment (6), Primary personas (8), All core users (10)

**Question 4: Business Alignment**

- "What is the business priority alignment?"
- Options: Nice to have (2), Secondary objectives (4), Quarterly goals (6), Annual OKRs (8), Critical initiative (10)

### 5.2 Confidence Questions (4 questions, averaged)

**Question 1: Research Validation**

- "What level of user research supports this?"
- Options: No research (1), Anecdotal (3), Small survey <10 (5), Substantial 10-50 (7), Extensive 50+ (10)

**Question 2: Prior Experience**

- "Have we built something similar before?"
- Options: Completely novel (2), Some related (4), Similar features (7), Nearly identical (9), Exact replica (10)

**Question 3: Technical Proof**

- "Is the technical solution proven?"
- Options: Theoretical/R&D (2), Prototyped (4), POC working (6), Competitor success (8), Industry standard (10)

**Question 4: Resource Availability**

- "Do we have all required resources and expertise?"
- Options: Need hiring (2), Significant upskilling (4), Minor gaps (6), Most expertise (8), All secured (10)

### 5.3 Effort Questions (4 questions, averaged, INVERTED SCALE)

**Question 1: Time Duration**

- "How many sprints will this require?"
- Help text: "Assume 2-week sprints"
- Options: 6+ sprints (1), 4-6 sprints (3), 2-3 sprints (6), 1 sprint (9), <1 sprint (10)

**Question 2: Team Coordination**

- "How many teams need to be involved?"
- Options: 4+ teams (1), 3 teams (3), 2 teams (6), 1 team multiple squads (8), 1 squad (10)

**Question 3: Technical Complexity**

- "What is the technical complexity?"
- Options: Distributed systems (1), Multiple services (3), Backend+Frontend (5), Mostly one layer (7), Configuration (10)

**Question 4: Dependencies**

- "How many external dependencies exist?"
- Options: 4+ blocking (1), 3 dependencies (3), 1-2 dependencies (6), Soft dependencies (8), None (10)

## 6. User Flow

### 6.1 Navigation Steps

```
Step 1: Landing Page
  - Welcome message
  - "Start Scoring" CTA
  - Brief explanation of ICE methodology

Step 2: Feature Input
  - Feature name input (required, max 100 chars)
  - Scored by input (optional, defaults to "PM", max 50 chars)
  - Form validation before proceeding

Step 3: Impact Introduction
  - Illustration break
  - "Let's assess the Impact" heading
  - Brief description of what Impact means
  - Continue button

Step 4: Impact Questions
  - All 4 questions displayed on one screen
  - Radio buttons for each question
  - Help text where applicable
  - Progress indicator: "Impact (1/3)"
  - Next button disabled until all answered

Step 5: Confidence Introduction
  - Illustration break
  - "Now let's evaluate Confidence" heading
  - Brief description
  - Continue button

Step 6: Confidence Questions
  - All 4 questions displayed
  - Same interaction pattern
  - Progress indicator: "Confidence (2/3)"

Step 7: Effort Introduction
  - Illustration break
  - "Finally, let's estimate the Effort" heading
  - Brief description
  - Continue button

Step 8: Effort Questions
  - All 4 questions displayed
  - Same interaction pattern
  - Progress indicator: "Effort (3/3)"

Step 9: Justification (Conditional)
  - Shown if ICE score >= 7 OR <= 2
  - Textarea input (required, min 20 chars, max 500 chars)
  - Prompt text varies by score range:
    - High score: "Explain why this high-value item should be prioritized"
    - Low score: "Explain why this item is still being considered"

Step 10: Results Screen
  - Large ICE score display
  - Breakdown: Impact (X.X), Confidence (X.X), Effort (X.X)
  - Score tier card with illustration
  - Example poster project
  - "Add to Export List" button
  - "Score Another Feature" button
  - "View Export List" button

Step 11: Export View
  - Table of all scored features
  - Columns: Feature, I, C, E, ICE, Tier, Date
  - Sort by: ICE (default), Date, Feature name
  - "Download CSV" button
  - "Clear All Scores" button (with confirmation)
  - "Score New Feature" button
```

### 6.2 Navigation Rules

**Back Button:**

- Available on all steps except Landing and Results
- Returns to previous step
- Preserves all entered data
- Disabled during intro screens (auto-advance)

**Next Button:**

- Disabled until required inputs complete
- Shows loading state during calculation
- Validation occurs before advancing

**Progress Indicator:**

- Shows steps 3-8 (question sections)
- Format: "Impact (1/3)" or "2 of 3 complete"
- Visual progress bar

## 7. Score Calculation

### 7.1 Formula

```
Impact Score = Average of 4 impact question responses
Confidence Score = Average of 4 confidence question responses
Effort Score = Average of 4 effort question responses

ICE Score = (Impact × Confidence) / Effort

Final Score = Round to 2 decimal places
```

### 7.2 Score Tiers

**Tier 1: "The Reconsider Zone"**

- Range: 0 - 2.0
- Priority: Avoid
- Description: Low impact, uncertain outcome, or too costly
- Example: "Adding fax machine integration to a mobile app"
- Illustration: Skull/warning theme
- Color: Red/Orange

**Tier 2: "The Someday Backlog"**

- Range: 2.01 - 4.0
- Priority: Low
- Description: Nice to have but not urgent
- Example: "Custom notification sounds per feature"
- Illustration: Shrugging/uncertain theme
- Color: Yellow

**Tier 3: "The Queue It Up"**

- Range: 4.01 - 7.0
- Priority: Medium
- Description: Solid value, schedule when capacity allows
- Example: "Adding bulk actions to admin panel"
- Illustration: Thinking/planning theme
- Color: Blue

**Tier 4: "The Strong Contender"**

- Range: 7.01 - 12.0
- Priority: High
- Description: High value with manageable effort
- Example: "Improved search with filters and sorting"
- Illustration: Thumbs up/approval theme
- Color: Light Green

**Tier 5: "The Do It Now"**

- Range: 12.01 - 100
- Priority: Critical
- Description: Clear winner: high impact, high confidence, low effort
- Example: "One-click checkout for returning customers"
- Illustration: Rocket/success theme
- Color: Dark Green

## 8. CSV Export Specifications

### 8.1 File Format

**Filename:** `ice-scores-YYYY-MM-DD-HHMMSS.csv`

**Column Headers:**

```
Feature Name, Impact, Confidence, Effort, ICE Score, Priority Tier, Justification, Scored By, Date, Time
```

**Data Format:**

- Strings: Quoted if containing commas
- Numbers: Two decimal places
- Dates: YYYY-MM-DD format
- Time: HH:MM format (24-hour)
- Empty justifications: Empty string

**Example Row:**

```
"One-click checkout",9.50,8.75,3.25,25.58,Critical,"Strong user research plus proven tech",Sarah Chen,2025-11-10,18:00
```

### 8.2 Export Behavior

- Trigger: Button click on export view
- Browser: Native download dialog
- No server upload required
- Character encoding: UTF-8 with BOM
- Line endings: CRLF (Windows compatible)

## 9. UI/UX Specifications

### 9.1 Visual Design

**Color Palette:**

- Primary: Blue (#3B82F6)
- Success: Green (#10B981)
- Warning: Yellow (#F59E0B)
- Error: Red (#EF4444)
- Neutral: Gray scale (#F3F4F6 to #1F2937)

**Typography:**

- Headings: Inter or System UI, 24-32px, Bold
- Body: Inter or System UI, 16px, Regular
- Help text: 14px, Medium gray
- Buttons: 16px, Semibold

**Spacing:**

- Base unit: 4px
- Component padding: 16-24px
- Section margins: 32-48px
- Button height: 48px

**Responsive Breakpoints:**

- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

### 9.2 Interactive Elements

**Radio Buttons:**

- Large clickable area (full width)
- Clear selected state (blue border + background)
- Hover state (light gray background)
- Disabled state (50% opacity)

**Buttons:**

- Primary: Solid blue, white text
- Secondary: Blue outline, blue text
- Destructive: Red solid, white text
- Disabled: Gray, 50% opacity

**Input Fields:**

- Border: 1px gray, blue on focus
- Height: 48px (single line), auto (textarea)
- Placeholder text: Medium gray
- Error state: Red border + error message below

**Progress Bar:**

- Height: 8px
- Background: Light gray
- Fill: Blue, animated transition
- Percentage text above bar

### 9.3 Illustrations

**Required Illustrations (7 total):**

1. **Landing Page Welcome**
    - Theme: PM juggling priorities/overwhelmed
    - Style: Flat, colorful, friendly

2. **Impact Introduction**
    - Theme: Target with arrows/bullseye
    - Style: Success-oriented, confident

3. **Confidence Introduction**
    - Theme: Magnifying glass examining data
    - Style: Analytical, thoughtful

4. **Effort Introduction**
    - Theme: Clock/calendar with tools
    - Style: Organized, efficient

5. **Tier 1 - Reconsider Zone**
    - Theme: Stop sign/warning barrier
    - Style: Cautionary but not harsh

6. **Tier 2 - Someday Backlog**
    - Theme: Person shrugging with calendar
    - Style: Neutral, patient

7. **Tier 3 - Queue It Up**
    - Theme: Person at planning board
    - Style: Strategic, organized

8. **Tier 4 - Strong Contender**
    - Theme: Thumbs up with checkmark
    - Style: Positive, encouraging

9. **Tier 5 - Do It Now**
    - Theme: Rocket launching
    - Style: Energetic, exciting

**Illustration Specs:**

- Format: SVG (inline in components)
- Max size: 400x300px
- Color: Match tier colors or brand blue
- Style: Consistent across all illustrations
- Alt text: Required for accessibility

### 9.4 Accessibility

**WCAG 2.1 AA Compliance:**

- Color contrast: Minimum 4.5:1
- Focus indicators: Visible on all interactive elements
- Keyboard navigation: Full support
- Screen reader: ARIA labels on all components
- Form validation: Clear error messages
- Skip links: Skip to main content

**Keyboard Shortcuts:**

- Tab: Navigate forward
- Shift+Tab: Navigate backward
- Enter: Submit/proceed
- Escape: Cancel/close modals
- Arrow keys: Navigate radio options

## 10. Data Validation

### 10.1 Input Validation

**Feature Name:**

- Required field
- Min length: 3 characters
- Max length: 100 characters
- Error: "Feature name must be 3-100 characters"

**Scored By:**

- Optional field
- Max length: 50 characters
- Default: "PM"

**Question Responses:**

- Required: All questions in section
- Type: Single selection (radio)
- Error: "Please answer all questions to continue"

**Justification:**

- Required when: ICE >= 7 OR ICE <= 2
- Min length: 20 characters
- Max length: 500 characters
- Error: "Please provide at least 20 characters of justification"

### 10.2 Data Constraints

**Saved Scores:**

- Max stored: 100 entries
- When exceeded: Show warning, allow user to clear old scores
- LocalStorage check: Handle quota exceeded errors

**Score Range:**

- Theoretical min: 0.1 (1×1/10)
- Theoretical max: 100 (10×10/1)
- Display: Always 2 decimal places

## 11. Performance Requirements

### 11.1 Load Times

- Initial page load: < 2 seconds
- Step navigation: < 100ms
- Score calculation: < 50ms
- CSV generation: < 500ms (for 100 entries)

### 11.2 Bundle Size

- Target: < 50KB gzipped (without Tailwind)
- Tailwind: Purged unused styles
- Illustrations: SVG inline, optimized

### 11.3 Rendering

- No layout shift during navigation
- Smooth transitions (200-300ms)
- Responsive to all viewport sizes

## 12. Error Handling

### 12.1 User Errors

- Form validation: Inline, real-time feedback
- Missing responses: Highlight unanswered questions
- Invalid input: Clear error messages with guidance

### 12.2 System Errors

- LocalStorage full: Prompt to clear old data
- CSV generation failure: Show retry option
- State corruption: Reset to landing with message

### 12.3 Fallbacks

- Illustrations fail to load: Show placeholder
- LocalStorage unavailable: Session-only mode
- JavaScript disabled: Show upgrade message

---

# Illustration Prompts for Designer/AI

## Style Guide for All Illustrations

**Overall Style:**

- Flat design, 2D
- Rounded, friendly shapes
- Bold outlines (2-3px)
- Limited color palette (3-4 colors max per illustration)
- Friendly, approachable, professional tone
- No text within illustrations
- Character diversity when showing people

**Technical Specs:**

- Format: SVG
- Artboard: 400px × 300px
- Colors: Use hex codes from design system
- Clean paths, no unnecessary nodes
- Grouped layers for easy editing

---

## Illustration 1: Landing Page Welcome

**Scene Description:**
A product manager character standing at a crossroads with multiple signposts pointing in different directions. Each signpost has different icons (feature icons, user icons, priority stars). The PM is holding a clipboard and looking contemplative but slightly overwhelmed. Above them, thought bubbles show question marks and priority symbols.

**Mood:** Relatable, slightly chaotic but not stressed

**Color Palette:**

- Primary: Blue (#3B82F6)
- Accent: Yellow (#F59E0B)
- Neutral: Gray (#6B7280)

**Key Elements:**

- 1 PM character (gender-neutral)
- 4-5 signposts
- Icons on signs (lightbulb, user, star, chart)
- Thought bubbles with symbols

---

## Illustration 2: Impact Introduction

**Scene Description:**
A large target/bullseye in the center with concentric circles. Multiple arrows are flying toward the center, some hitting the bullseye, others at various distances. Around the target, show visual indicators of impact: ripple effects, growing charts, or expanding circles. Include a small celebration element (confetti or sparkles) at the bullseye.

**Mood:** Focused, goal-oriented, positive

**Color Palette:**

- Target: Red center, white/gray rings
- Arrows: Blue (#3B82F6)
- Effects: Light blue, white

**Key Elements:**

- Target with 3-4 rings
- 3-5 arrows at different positions
- Ripple effects around bullseye
- Small sparkle/success indicators

---

## Illustration 3: Confidence Introduction

**Scene Description:**
A magnifying glass examining data points, charts, and research documents. Show a pie chart, bar graph, and user research notes under the magnifying glass. Include a checkmark or validation badge near the magnifying glass. Add a small lightbulb icon to represent insight.

**Mood:** Analytical, thorough, reassuring

**Color Palette:**

- Magnifying glass: Dark gray handle, clear lens
- Charts: Blue (#3B82F6) and green (#10B981)
- Documents: Light gray background

**Key Elements:**

- Large magnifying glass
- 2-3 charts/graphs
- Document/note icons
- Checkmark or badge
- Optional: lightbulb

---

## Illustration 4: Effort Introduction

**Scene Description:**
A calendar or gantt chart in the background with a stopwatch/clock in the foreground. Show developer tools scattered around: laptop, code symbols, coffee cup, sticky notes. Include a character at a desk working efficiently (not stressed). Add progress indicators or time blocks on the calendar.

**Mood:** Organized, realistic, manageable

**Color Palette:**

- Calendar: Light blue background, blue blocks
- Tools: Gray, blue accents
- Character: Diverse skin tone options

**Key Elements:**

- Calendar/gantt chart (background)
- Stopwatch or clock (prominent)
- Laptop with code icon
- 2-3 tool icons
- Optional character at desk

---

## Illustration 5: Tier 1 - Reconsider Zone (ICE: 0-2)

**Scene Description:**
A warning barrier or construction cone blocking a path. Behind it, show a project represented as a box or file folder covered in dust/cobwebs, or sinking in quicksand. Include a detour sign pointing to a different direction. Keep it lighthearted - use a "maybe not" expression rather than harsh negativity.

**Mood:** Cautionary but friendly, redirecting not rejecting

**Color Palette:**

- Barrier: Orange/yellow stripes
- Warning: Red (#EF4444) accents
- Background: Light gray

**Key Elements:**

- Barrier or stop sign
- Project box with dust/cobwebs
- Detour arrow
- Optional: small "reconsider" icon

---

## Illustration 6: Tier 2 - Someday Backlog (ICE: 2.01-4.0)

**Scene Description:**
A character shrugging with a friendly expression, standing next to a "Later" pile or inbox. Show a calendar with pages flipping or a clock with relaxed time indicators. Include a "nice to have" tag or label on a project box. The character is calm and patient, not dismissive.

**Mood:** Neutral, patient, "not urgent"

**Color Palette:**

- Character: Warm neutral tones
- Calendar/clock: Yellow (#F59E0B)
- Box/tags: Light gray

**Key Elements:**

- Character with shrug gesture
- Stack of "later" items
- Calendar or clock
- "Nice to have" tag/label

---

## Illustration 7: Tier 3 - Queue It Up (ICE: 4.01-7.0)

**Scene Description:**
A character at a planning board or kanban board, moving task cards. Show a queue of items with one being selected/highlighted. Include organizational elements: sticky notes, priority markers, a roadmap timeline. The character is thoughtfully organizing, showing strategic planning.

**Mood:** Strategic, organized, methodical

**Color Palette:**

- Board: White/light gray
- Cards: Blue (#3B82F6)
- Character: Professional attire colors

**Key Elements:**

- Kanban/planning board
- 4-5 task cards
- Character organizing
- Priority markers
- Queue/pipeline visual

---

## Illustration 8: Tier 4 - Strong Contender (ICE: 7.01-12.0)

**Scene Description:**
A large thumbs up gesture with checkmarks floating around it. Show a project box or folder with a gold star or "approved" stamp. Include positive indicators: upward arrows, growing charts, happy user icons. Add a character giving an enthusiastic nod or approval gesture.

**Mood:** Positive, confident, approved

**Color Palette:**

- Thumbs up: Green (#10B981)
- Checkmarks: Blue (#3B82F6)
- Stars/stamps: Gold/yellow

**Key Elements:**

- Large thumbs up icon
- 3-4 checkmarks
- Project with star/stamp
- Upward trend arrow
- Optional: approving character

---

## Illustration 9: Tier 5 - Do It Now (ICE: 12.01-100)

**Scene Description:**
A rocket ship launching with a trail of stars and speed lines. The rocket has a project label or flag on it. Show excited characters cheering or celebrating at the launch pad. Include success indicators: trophy, gold medal, or "top priority" banner. Make it energetic and exciting.

**Mood:** Energetic, exciting, urgent success

**Color Palette:**

- Rocket: Blue (#3B82F6) with white accents
- Stars/trail: Yellow/gold
- Characters: Celebratory colors

**Key Elements:**

- Rocket ship (prominent)
- Launch smoke/stars trail
- 1-2 cheering characters
- "Priority" flag or banner
- Success indicators (trophy/medal)

---

## Design Consistency Notes

**Character Design (if multiple illustrations use people):**

- Same character style across all illustrations
- Simple, geometric shapes
- Gender-neutral or diverse representation
- Consistent proportions (head : body ratio)
- Friendly facial expressions (dot eyes, simple smile)

**Icon Style:**

- Outline style (2-3px stroke)
- Rounded corners
- Consistent size relative to scene
- Match overall illustration style

**Color Usage:**

- Primary action/focus: Blue
- Success/positive: Green
- Warning/caution: Yellow/Orange
- Error/stop: Red
- Neutral elements: Gray scale
- Maximum 4 colors per illustration

**Composition:**

- Main subject: Center or slightly off-center
- Supporting elements: Balanced around main subject
- Clear focal point
- Breathing room (negative space)
- No text within illustrations
