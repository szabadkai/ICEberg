# Collaborative Batch Scoring Feature

## Concept Overview

Allow teams to:
1. **Upload** multiple features at once (CSV or form)
2. **Invite** team members to score all features
3. **Track** who has scored what
4. **Analyze** consensus, disagreement, and final aggregated scores
5. **Visualize** results with charts and heatmaps

## User Flow

### Admin/PM Flow:
1. Create a "Scoring Session"
2. Bulk upload features (CSV, form, or API)
3. Add descriptions for each feature
4. Invite team members via email/link
5. Monitor progress (who's scored what)
6. View aggregated results when complete

### Team Member Flow:
1. Receive invitation link
2. Enter their name/email
3. See list of features to score
4. Score each feature one by one
5. See their own results
6. (Optional) See how their scores compare to team average

### Results View:
1. **Consensus Analysis**: Which features everyone agrees on
2. **Disagreement Flags**: Features with high variance
3. **Aggregated Scores**: Mean, median, mode for each feature
4. **Individual Comparison**: See each person's scores side-by-side
5. **Priority Ranking**: Final ranked list based on aggregation method

---

## Database Schema

### Tables Needed:

```sql
-- Scoring sessions (campaigns)
CREATE TABLE scoring_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  name TEXT NOT NULL,
  description TEXT,
  created_by TEXT NOT NULL, -- Email or user ID
  status TEXT DEFAULT 'active', -- active, completed, archived

  -- Settings
  allow_anonymous BOOLEAN DEFAULT true,
  require_justification BOOLEAN DEFAULT false,
  aggregation_method TEXT DEFAULT 'mean', -- mean, median, weighted
  deadline TIMESTAMPTZ,

  -- Access control
  access_code TEXT, -- Optional code for private sessions
  invite_list TEXT[], -- List of allowed emails (optional)

  CONSTRAINT valid_status CHECK (status IN ('active', 'completed', 'archived'))
);

-- Features to be scored in a session
CREATE TABLE session_features (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID REFERENCES scoring_sessions(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),

  feature_name TEXT NOT NULL,
  description TEXT,
  context TEXT, -- Additional context/links
  order_index INTEGER, -- Display order

  -- Pre-filled information (optional)
  estimated_users INTEGER,
  business_value TEXT,
  technical_notes TEXT
);

-- Individual scores from participants
CREATE TABLE session_scores (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID REFERENCES scoring_sessions(id) ON DELETE CASCADE,
  feature_id UUID REFERENCES session_features(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  -- Scorer information
  scorer_name TEXT NOT NULL,
  scorer_email TEXT, -- Optional, for tracking

  -- Scores
  impact DECIMAL(5,2) NOT NULL,
  confidence DECIMAL(5,2) NOT NULL,
  effort DECIMAL(5,2) NOT NULL,
  ice_score DECIMAL(10,2) NOT NULL,

  -- Optional
  justification TEXT,

  -- Detailed responses (JSON of all 12 questions)
  detailed_responses JSONB,

  CONSTRAINT unique_scorer_per_feature UNIQUE(feature_id, scorer_email)
);

-- Aggregated results (computed)
CREATE TABLE session_aggregates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID REFERENCES scoring_sessions(id) ON DELETE CASCADE,
  feature_id UUID REFERENCES session_features(id) ON DELETE CASCADE,
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  -- Aggregate stats
  total_scorers INTEGER,

  -- Mean scores
  mean_impact DECIMAL(5,2),
  mean_confidence DECIMAL(5,2),
  mean_effort DECIMAL(5,2),
  mean_ice DECIMAL(10,2),

  -- Median scores
  median_impact DECIMAL(5,2),
  median_confidence DECIMAL(5,2),
  median_effort DECIMAL(5,2),
  median_ice DECIMAL(10,2),

  -- Standard deviation (shows disagreement)
  stddev_impact DECIMAL(5,2),
  stddev_confidence DECIMAL(5,2),
  stddev_effort DECIMAL(5,2),
  stddev_ice DECIMAL(10,2),

  -- Range
  min_ice DECIMAL(10,2),
  max_ice DECIMAL(10,2),

  -- Consensus level (0-100, higher = more agreement)
  consensus_score INTEGER,

  CONSTRAINT unique_aggregate UNIQUE(session_id, feature_id)
);

-- Indexes
CREATE INDEX idx_session_features_session ON session_features(session_id);
CREATE INDEX idx_session_scores_session ON session_scores(session_id);
CREATE INDEX idx_session_scores_feature ON session_scores(feature_id);
CREATE INDEX idx_session_scores_email ON session_scores(scorer_email);
```

---

## API Endpoints

### Session Management

```typescript
// Create new scoring session
POST /api/sessions
{
  name: "Q1 2025 Feature Prioritization",
  description: "Score 15 features for Q1 roadmap",
  createdBy: "pm@company.com",
  allowAnonymous: false,
  deadline: "2025-02-01"
}

// Get session details
GET /api/sessions/:sessionId

// Update session
PATCH /api/sessions/:sessionId

// Delete session
DELETE /api/sessions/:sessionId
```

### Feature Management

```typescript
// Bulk upload features
POST /api/sessions/:sessionId/features/bulk
{
  features: [
    {
      name: "One-click checkout",
      description: "Allow returning customers to checkout with one click",
      context: "Reduces cart abandonment, proven by competitors",
      estimatedUsers: 50000
    },
    // ... more features
  ]
}

// Add single feature
POST /api/sessions/:sessionId/features

// Update feature
PATCH /api/sessions/:sessionId/features/:featureId

// Delete feature
DELETE /api/sessions/:sessionId/features/:featureId
```

### Scoring

```typescript
// Get all features to score
GET /api/sessions/:sessionId/features

// Submit score
POST /api/sessions/:sessionId/features/:featureId/scores
{
  scorerName: "John Doe",
  scorerEmail: "john@company.com",
  impact: 8.5,
  confidence: 7.25,
  effort: 9.0,
  iceScore: 552.38,
  justification: "High confidence based on customer interviews",
  detailedResponses: { /* all 12 Q&A */ }
}

// Get my scores for a session
GET /api/sessions/:sessionId/my-scores?email=john@company.com

// Update my score
PATCH /api/sessions/:sessionId/features/:featureId/scores/:scoreId
```

### Results & Analytics

```typescript
// Get aggregated results
GET /api/sessions/:sessionId/results

// Get detailed breakdown for one feature
GET /api/sessions/:sessionId/features/:featureId/breakdown

// Get scorer comparison
GET /api/sessions/:sessionId/comparison

// Export results
GET /api/sessions/:sessionId/export?format=csv
```

---

## UI Components

### 1. Session Setup Page

```
┌─────────────────────────────────────────┐
│ Create Scoring Session                  │
├─────────────────────────────────────────┤
│ Session Name: Q1 2025 Features          │
│ Description: ...                         │
│                                          │
│ Settings:                                │
│ ☑ Allow anonymous scoring               │
│ ☐ Require justification                 │
│ Deadline: 2025-02-01                     │
│                                          │
│ [Create Session]                         │
└─────────────────────────────────────────┘
```

### 2. Feature Upload

```
┌─────────────────────────────────────────┐
│ Add Features to Score                   │
├─────────────────────────────────────────┤
│ • Upload CSV                             │
│ • Enter manually                         │
│ • Import from Jira                       │
│                                          │
│ [Choose File] features.csv               │
│                                          │
│ Template CSV:                            │
│ feature_name,description,context         │
│ "One-click checkout","Returning          │
│  customers...","Reduces abandonment"     │
│                                          │
│ [Upload] [Cancel]                        │
└─────────────────────────────────────────┘
```

### 3. Invite Team

```
┌─────────────────────────────────────────┐
│ Invite Team Members                      │
├─────────────────────────────────────────┤
│ Share Link:                              │
│ https://ice.app/session/abc123           │
│ [Copy Link] [Send Email]                 │
│                                          │
│ Invited Members:                         │
│ • john@company.com ✓ Scored 12/15       │
│ • sarah@company.com ✓ Scored 15/15      │
│ • mike@company.com ⏳ Scored 3/15       │
│                                          │
│ [Add More]                               │
└─────────────────────────────────────────┘
```

### 4. Scorer View (Team Member)

```
┌─────────────────────────────────────────┐
│ Q1 2025 Feature Prioritization          │
│ Score 15 features by Feb 1               │
├─────────────────────────────────────────┤
│ Your Progress: ████████░░ 8/15           │
│                                          │
│ Features to Score:                       │
│                                          │
│ 1. ✓ One-click checkout                 │
│ 2. ✓ Bulk actions in admin              │
│ 3. ⏳ Custom notifications (NEXT)       │
│ 4. ○ Dark mode                          │
│ 5. ○ Advanced search                    │
│ ...                                      │
│                                          │
│ [Continue Scoring]                       │
└─────────────────────────────────────────┘
```

### 5. Results Dashboard

```
┌─────────────────────────────────────────────────────────────┐
│ Session Results: Q1 2025 Features                           │
│ 15 features • 8 scorers • Completed Jan 28                  │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│ Top Priorities (by mean ICE):                               │
│                                                              │
│ 1. One-click checkout        Mean: 742  Consensus: 89%  ●  │
│    Range: 685-810  Scorers: 8/8                             │
│                                                              │
│ 2. Advanced search          Mean: 456  Consensus: 72%  ●   │
│    Range: 320-590  Scorers: 8/8  ⚠ High variance           │
│                                                              │
│ 3. Dark mode                Mean: 387  Consensus: 94%  ●   │
│    Range: 370-405  Scorers: 8/8                             │
│                                                              │
│ [View All] [Export CSV] [See Comparison]                    │
└─────────────────────────────────────────────────────────────┘
```

### 6. Detailed Feature Breakdown

```
┌─────────────────────────────────────────────────────────────┐
│ Feature: One-click Checkout                                 │
├─────────────────────────────────────────────────────────────┤
│ Mean ICE Score: 742  (Range: 685-810)                       │
│ Consensus: 89% (High agreement)                             │
│                                                              │
│ Score Distribution:                                          │
│   Impact:     ●●●●●●●● 8.5  (σ: 0.8)                       │
│   Confidence: ●●●●●●● 7.8   (σ: 1.2)                       │
│   Ease:       ●●●●●●●●● 9.1 (σ: 0.6)                       │
│                                                              │
│ Individual Scores:                                           │
│ ┌──────────┬──────┬──────┬──────┬──────┐                   │
│ │ Scorer   │  I   │  C   │  E   │ ICE  │                   │
│ ├──────────┼──────┼──────┼──────┼──────┤                   │
│ │ John     │ 9.0  │ 8.5  │ 9.5  │ 726  │                   │
│ │ Sarah    │ 8.0  │ 7.0  │ 9.0  │ 504  │ ⚠ Outlier       │
│ │ Mike     │ 9.5  │ 8.0  │ 9.0  │ 684  │                   │
│ │ ...      │ ...  │ ...  │ ...  │ ...  │                   │
│ └──────────┴──────┴──────┴──────┴──────┘                   │
│                                                              │
│ Justifications:                                              │
│ • John: "Proven to reduce cart abandonment by 25%"          │
│ • Sarah: "Need more research on implementation cost"        │
│ • Mike: "Stripe already has this, easy integration"         │
└─────────────────────────────────────────────────────────────┘
```

### 7. Heatmap View

```
┌─────────────────────────────────────────────────────────────┐
│ ICE Score Heatmap                                           │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│ Features →        One-click  Dark   Search  Bulk  ...       │
│ Scorers ↓         Checkout   Mode                          │
│                                                              │
│ John              🟢 742     🟡 387  🟢 590  🟡 340         │
│ Sarah             🟡 504     🟢 405  🔴 220  🟢 445         │
│ Mike              🟢 684     🟢 390  🟡 456  🟢 512         │
│ Anna              🟢 810     🟡 370  🟢 512  🟡 390         │
│ ...                                                          │
│                                                              │
│ Legend: 🟢 High (>500)  🟡 Med (300-500)  🔴 Low (<300)   │
└─────────────────────────────────────────────────────────────┘
```

### 8. Consensus Analysis

```
┌─────────────────────────────────────────────────────────────┐
│ Consensus Analysis                                          │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│ Strong Consensus (Agreement >85%):                          │
│ ✓ One-click checkout (89%)                                  │
│ ✓ Dark mode (94%)                                           │
│ ✓ Email templates (87%)                                     │
│                                                              │
│ Moderate Consensus (70-85%):                                │
│ ~ Advanced search (72%)                                     │
│ ~ Bulk actions (78%)                                        │
│                                                              │
│ Low Consensus (<70%) - Needs Discussion:                    │
│ ⚠ Social login (45%) - Wide disagreement                   │
│ ⚠ Analytics dashboard (58%) - Mixed opinions               │
│                                                              │
│ Recommendation: Discuss low-consensus items in team         │
│ meeting before finalizing roadmap.                          │
└─────────────────────────────────────────────────────────────┘
```

---

## Implementation Plan

### Phase 1: Core Infrastructure (Week 1-2)
- [ ] Database schema & migrations
- [ ] Session CRUD API
- [ ] Feature CRUD API
- [ ] Basic scoring API
- [ ] Authentication (optional but recommended)

### Phase 2: Batch Scoring UI (Week 3-4)
- [ ] Session creation page
- [ ] CSV upload for features
- [ ] Scorer progress tracking
- [ ] Multi-feature scoring flow
- [ ] "Score all" wizard

### Phase 3: Results & Analytics (Week 5-6)
- [ ] Aggregation calculations
- [ ] Results dashboard
- [ ] Feature breakdown view
- [ ] Individual comparison
- [ ] CSV export with all scorer data

### Phase 4: Collaboration Features (Week 7-8)
- [ ] Email invitations
- [ ] Real-time progress updates
- [ ] Comments/discussions
- [ ] Notifications
- [ ] Consensus alerts

### Phase 5: Advanced Visualizations (Week 9-10)
- [ ] Heatmap view
- [ ] 2D scatter plots (Impact vs Confidence)
- [ ] Box plots for distributions
- [ ] Radar charts for multi-dimensional view
- [ ] Interactive filtering

---

## Key Features

### 1. **Aggregation Methods**

```typescript
enum AggregationMethod {
  MEAN = 'mean',           // Simple average
  MEDIAN = 'median',       // Middle value (robust to outliers)
  WEIGHTED = 'weighted',   // Weight by scorer expertise
  TRIMMED = 'trimmed',     // Remove top/bottom 10% then average
}
```

### 2. **Consensus Metrics**

```typescript
function calculateConsensus(scores: number[]): number {
  const mean = average(scores);
  const stdDev = standardDeviation(scores);

  // Lower std dev = higher consensus
  // Normalize to 0-100 scale
  const coefficientOfVariation = stdDev / mean;
  return Math.max(0, 100 - (coefficientOfVariation * 100));
}
```

### 3. **Outlier Detection**

```typescript
function detectOutliers(scores: number[]): number[] {
  const q1 = percentile(scores, 25);
  const q3 = percentile(scores, 75);
  const iqr = q3 - q1;

  const lowerBound = q1 - (1.5 * iqr);
  const upperBound = q3 + (1.5 * iqr);

  return scores.filter(s => s < lowerBound || s > upperBound);
}
```

### 4. **Smart Notifications**

- **Scorer**: "You have 7 features left to score (deadline: 3 days)"
- **Admin**: "Mike completed all 15 features!"
- **Admin**: "Low consensus on 'Social Login' - review recommended"
- **Team**: "All scoring complete! View results here."

---

## Benefits

### For Product Teams:
✅ Reduce bias from single-person scoring
✅ Surface hidden assumptions through disagreement
✅ Build team alignment on priorities
✅ Make data-driven decisions with confidence intervals
✅ Identify features needing more research (high variance)

### For Individuals:
✅ See how their judgment compares to team
✅ Learn from others' justifications
✅ Calibrate scoring over time
✅ Contribute to team decisions democratically

### For Organizations:
✅ Historical record of decision-making
✅ Audit trail for roadmap choices
✅ Training data for new PMs
✅ Benchmark across teams/products

---

## Tech Stack Recommendation

```typescript
Frontend:
- Lit (current) + Chart.js for visualizations
- D3.js for advanced charts (heatmaps, scatter plots)
- TanStack Table for data tables

Backend:
- Supabase (PostgreSQL + real-time subscriptions)
- Supabase Auth for user management
- Supabase Functions for aggregations

Notifications:
- Supabase Realtime for live updates
- SendGrid/Resend for email invitations
```

---

## MVP Scope (2-3 weeks)

For fastest time-to-value:

1. **Session Management**: Create session, add features manually
2. **Batch Scoring**: Score all features in one session
3. **Basic Results**: Mean scores, simple ranking
4. **CSV Export**: Export all individual scores
5. **Shareable Link**: Anyone with link can score

*Skip for MVP*: Auth, email, real-time, advanced charts

This would give you 80% of the value in 20% of the time!

---

## Would you like me to start implementing the MVP?

I can begin with:
1. Database schema updates
2. Session management API
3. Batch upload UI
4. Results dashboard

Let me know which part you'd like to tackle first!
