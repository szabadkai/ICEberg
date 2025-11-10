export interface QuestionOption {
  label: string;
  value: number;
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
  status: 'pending' | 'in-progress' | 'completed';
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
  | 'impact-intro'
  | 'impact-questions'
  | 'confidence-intro'
  | 'confidence-questions'
  | 'effort-intro'
  | 'effort-questions'
  | 'justification'
  | 'results'
  | 'export';

export interface AppState {
  currentStep: AppStep;
  featureName: string;
  scoredBy: string;
  responses: SectionResponses;
  savedScores: ScoreResult[];
  currentScore?: ScoreResult;
  batchScoring?: BatchScoring;
}
