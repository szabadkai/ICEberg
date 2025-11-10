# ICE Scoring Guide

## How ICE Scores Are Calculated

### The Formula

```
ICE Score = Impact × Confidence × Ease
```

**Note:** The "Effort" questions in this app use an **inverted scale** (higher score = easier), so they actually represent "Ease" in the standard ICE formula. This means:
- Easier features score higher (10 = very easy)
- Harder features score lower (1 = very hard)

### Step-by-Step Process

#### 1. Answer Questions (4 questions per category)

**Impact Questions** (Scale: 1-10)
- Q1: User reach percentage → 1, 3, 5, 8, or 10
- Q2: Primary metric impact → 1, 3, 5, 8, or 10
- Q3: User segment served → 2, 4, 6, 8, or 10
- Q4: Business alignment → 2, 4, 6, 8, or 10

**Confidence Questions** (Scale: 1-10)
- Q1: User research level → 1, 3, 5, 7, or 10
- Q2: Prior experience → 2, 4, 7, 9, or 10
- Q3: Technical proof → 2, 4, 6, 8, or 10
- Q4: Resource availability → 2, 4, 6, 8, or 10

**Effort Questions** (Scale: 1-10, INVERTED - higher = easier)
- Q1: Time duration → 1, 3, 6, 9, or 10
- Q2: Team coordination → 1, 3, 6, 8, or 10
- Q3: Technical complexity → 1, 3, 5, 7, or 10
- Q4: Dependencies → 1, 3, 6, 8, or 10

#### 2. Calculate Averages

Each category score is the **average** of its 4 questions:

```
Impact Score = (Q1 + Q2 + Q3 + Q4) / 4
Confidence Score = (Q1 + Q2 + Q3 + Q4) / 4
Effort Score = (Q1 + Q2 + Q3 + Q4) / 4
```

#### 3. Apply the ICE Formula

```
Final ICE Score = Impact × Confidence × Ease
```

Rounded to 2 decimal places.

**Important:** All three dimensions are **multiplied together**, which means:
- A low score in ANY dimension drastically reduces the final ICE score
- You need ALL three to be high for a truly high ICE score
- This prevents low-effort but low-impact features from ranking too high

---

## Worked Examples

### Example 1: High-Impact, Low-Effort Feature

**Feature:** "One-click checkout for returning customers"

**Impact Answers:**
- User reach: 80%+ of users → **10**
- Metric impact: 10-25% → **8**
- User segment: All core users → **10**
- Business alignment: Annual OKRs → **8**
- **Average Impact = (10 + 8 + 10 + 8) / 4 = 9.0**

**Confidence Answers:**
- Research: Extensive (50+) → **10**
- Experience: Similar features → **7**
- Technical: Industry standard → **10**
- Resources: All secured → **10**
- **Average Confidence = (10 + 7 + 10 + 10) / 4 = 9.25**

**Effort Answers:**
- Time: Less than 1 sprint → **10**
- Teams: 1 squad → **10**
- Complexity: Mostly one layer → **7**
- Dependencies: None → **10**
- **Average Effort = (10 + 10 + 7 + 10) / 4 = 9.25**

**ICE Calculation:**
```
ICE = 9.0 × 9.25 × 9.25
ICE = 770.06
```

**Result:** **770.06** → Tier 5 "Top Priority" (Critical)

---

### Example 2: Low-Impact, High-Effort Feature

**Feature:** "Fax machine integration"

**Impact Answers:**
- User reach: Less than 5% → **1**
- Metric impact: Less than 1% → **1**
- User segment: Edge cases → **2**
- Business alignment: Nice to have → **2**
- **Average Impact = (1 + 1 + 2 + 2) / 4 = 1.5**

**Confidence Answers:**
- Research: Anecdotal → **3**
- Experience: Completely novel → **2**
- Technical: Prototyped → **4**
- Resources: Significant upskilling → **4**
- **Average Confidence = (3 + 2 + 4 + 4) / 4 = 3.25**

**Effort Answers:**
- Time: 4-6 sprints → **3**
- Teams: 2 teams → **6**
- Complexity: Backend + Frontend → **5**
- Dependencies: 3 dependencies → **3**
- **Average Effort = (3 + 6 + 5 + 3) / 4 = 4.25**

**ICE Calculation:**
```
ICE = 1.5 × 3.25 × 4.25
ICE = 20.72
```

**Result:** **20.72** → Tier 1 "Low Priority"

---

### Example 3: Balanced Medium-Priority Feature

**Feature:** "Bulk actions in admin panel"

**Impact Answers:**
- User reach: 5-20% (admins) → **3**
- Metric impact: 1-5% → **3**
- User segment: Significant segment → **6**
- Business alignment: Quarterly goals → **6**
- **Average Impact = (3 + 3 + 6 + 6) / 4 = 4.5**

**Confidence Answers:**
- Research: Small survey (<10) → **5**
- Experience: Similar features → **7**
- Technical: Competitor success → **8**
- Resources: Most expertise → **8**
- **Average Confidence = (5 + 7 + 8 + 8) / 4 = 7.0**

**Effort Answers:**
- Time: 2-3 sprints → **6**
- Teams: 1 squad → **10**
- Complexity: Mostly one layer → **7**
- Dependencies: Soft dependencies → **8**
- **Average Effort = (6 + 10 + 7 + 8) / 4 = 7.75**

**ICE Calculation:**
```
ICE = 4.5 × 7.0 × 7.75
ICE = 244.12
```

**Result:** **244.12** → Tier 2 "Medium Priority"

---

## Score Ranges & Priority Tiers

| ICE Score | Tier | Priority | Recommendation |
|-----------|------|----------|----------------|
| 0 - 100 | Low Priority | Low | Weak combination of impact, confidence, or ease |
| 101 - 300 | Medium Priority | Medium | Moderate overall score across dimensions |
| 301 - 500 | Good Candidate | Good | Solid opportunity worth considering |
| 501 - 700 | Strong Contender | High | High value opportunity with good confidence |
| 701+ | Top Priority | Critical | Excellent combination - prioritize immediately |

---

## Theoretical Score Ranges

**Minimum Possible ICE Score:**
- Impact: 1.0 (all 1s)
- Confidence: 1.0 (all 1s)
- Ease: 1.0 (all 1s - hardest)
- ICE = 1.0 × 1.0 × 1.0 = **1.0**

**Maximum Possible ICE Score:**
- Impact: 10.0 (all 10s)
- Confidence: 10.0 (all 10s)
- Ease: 10.0 (all 10s - easiest)
- ICE = 10.0 × 10.0 × 10.0 = **1,000.0**

**Why This Formula Works:**
- **Triple Multiplication**: All three dimensions are multiplied together
- **Balanced Scoring**: A low score in ANY dimension severely reduces the final ICE score
- **Example:**
  - High impact (10), high confidence (10), but hard (2) = 10 × 10 × 2 = **200** (Medium)
  - High impact (10), low confidence (2), easy (10) = 10 × 2 × 10 = **200** (Medium)
  - All balanced (7, 7, 7) = 7 × 7 × 7 = **343** (Good Candidate)
  - All excellent (10, 10, 10) = 10 × 10 × 10 = **1,000** (Top Priority)

---

## Key Insights

1. **All Three Multiply**: A low score in ANY dimension (Impact, Confidence, or Ease) drastically reduces the final ICE score
2. **Ease Not Effort**: Higher ease scores (easier work) lead to higher ICE scores - the scale is inverted for user convenience
3. **Averages Smooth Extremes**: 4 questions per category prevents single outliers from dominating
4. **Justification Triggers**: Scores ≥701 (Top Priority) or ≤100 (Low Priority) require explanation for accountability
5. **Balanced Features Win**: A feature scoring 7/7/7 (343) often beats one scoring 10/10/3 (300)

---

## Quick Reference Table

| Category | Min Avg | Max Avg | Typical Range |
|----------|---------|---------|---------------|
| Impact | 1.5 | 10.0 | 3.0 - 8.0 |
| Confidence | 1.0 | 10.0 | 4.0 - 9.0 |
| Ease | 1.0 | 10.0 | 4.0 - 8.0 |
| ICE Score | 1.0 | 1,000.0 | 50 - 600 |

**Most Common ICE Range:** 100 - 500 for real-world features
**Sweet Spot:** 300 - 700 (Good to High priority features)
