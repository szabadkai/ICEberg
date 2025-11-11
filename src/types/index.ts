export interface QuestionOption {
  label: string;
  value: number;
  helpText?: string; // Tooltip explanation for this option
}

export interface Question {
  id: string;
  text: string;
  helpText?: string;
  options: QuestionOption[];
}

export interface QuestionSection {
  id: 'impact' | 'confidence' | 'effort';
  title: string;
  description: string;
  questions: Question[];
}

export interface QuestionResponse {
  questionId: string;
  value: number;
}

export interface SectionResponses {
  impact: QuestionResponse[];
  confidence: QuestionResponse[];
  effort: QuestionResponse[];
}

export interface ScoreResult {
  id?: string; // Optional for new scores, required for saved scores
  featureName: string;
  scoredBy: string;
  impact: number;
  confidence: number;
  effort: number;
  iceScore: number;
  tier: ScoreTier;
  justification?: string;
  date: string;
  time: string;
  createdAt?: string; // ISO timestamp from database
  updatedAt?: string; // ISO timestamp from database
  // Detailed responses for each question
  responses?: SectionResponses;
}

export interface ScoreTier {
  name: string;
  range: string;
  priority: string;
  description: string;
  example: string;
  color: string;
  illustration: string;
}

export interface FeatureToScore {
  id: string;
  name: string;
  description?: string;
  status: 'pending' | 'in-progress' | 'completed' | 'skipped';
}

export interface BatchScoring {
  features: FeatureToScore[];
  currentFeatureIndex: number;
  scoredBy: string;
}

export type AppStep =
  | 'landing'
  | 'feature-input'
  | 'batch-upload'
  | 'batch-list'
  | 'session-create'
  | 'session-list'
  | 'session-dashboard'
  | 'session-visualize'
  | 'session-export'
  | 'feature-breakdown'
  | 'impact-intro'
  | 'impact-questions'
  | 'confidence-intro'
  | 'confidence-questions'
  | 'effort-intro'
  | 'effort-questions'
  | 'justification'
  | 'results'
  | 'export';

export interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
  duration?: number;
}

export interface ConfirmDialog {
  id: string;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  type?: 'danger' | 'warning' | 'info';
  onConfirm?: () => void;
  onCancel?: () => void;
}

// Collaborative Scoring Types
export interface ScoringSession {
  id: string; // UUID from database
  created_at: string;
  updated_at: string;
  name: string;
  description?: string;
  created_by: string;
  status: 'active' | 'completed' | 'archived';
  aggregation_method: 'mean' | 'median' | 'weighted' | 'trimmed';
}

export interface SessionFeature {
  id: string; // UUID from database
  created_at: string;
  session_id: string;
  name: string;
  description?: string;
  display_order: number;
}

export interface SessionScore {
  id: string; // UUID from database
  created_at: string;
  updated_at: string;
  session_id: string;
  feature_id: string;
  scored_by: string;
  impact: number;
  confidence: number;
  effort: number;
  ice_score: number;
  tier_name: string;
  tier_priority: string;
  justification?: string;
  // Detailed responses stored as JSON
  responses?: SectionResponses;
}

export interface SessionAggregate {
  id: string; // UUID from database
  created_at: string;
  updated_at: string;
  session_id: string;
  feature_id: string;
  avg_impact: number;
  avg_confidence: number;
  avg_effort: number;
  avg_ice_score: number;
  score_count: number;
  impact_stddev?: number;
  confidence_stddev?: number;
  effort_stddev?: number;
  ice_stddev?: number;
  tier_name: string;
  tier_priority: string;
}

export interface SessionWithDetails extends ScoringSession {
  features: SessionFeature[];
  scores: SessionScore[];
  aggregates: SessionAggregate[];
}

export interface FeatureScoreBreakdown {
  feature: SessionFeature;
  aggregate: SessionAggregate;
  individualScores: SessionScore[];
}

export interface AppState {
  currentStep: AppStep;
  featureName: string;
  scoredBy: string;
  responses: SectionResponses;
  savedScores: ScoreResult[];
  currentScore?: ScoreResult;
  batchScoring?: BatchScoring;
  toasts: Toast[];
  confirmDialog?: ConfirmDialog;
  // Collaborative scoring state
  currentSession?: ScoringSession;
  currentSessionFeature?: SessionFeature;
  sessions: ScoringSession[];
}
