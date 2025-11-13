import { supabase } from '../lib/supabase';
import {
  ScoringSession,
  SessionFeature,
  SessionScore,
  SessionAggregate,
  SessionWithDetails,
  FeatureScoreBreakdown,
  ScoreTier,
} from '../types';

export class SessionStore {
  /**
   * Create a new scoring session
   */
  async createSession(
    name: string,
    createdBy: string,
    description?: string,
    aggregationMethod: 'mean' | 'median' | 'weighted' | 'trimmed' = 'mean'
  ): Promise<ScoringSession | null> {
    if (!supabase) {
      return null; // Supabase not configured (standalone mode)
    }

    try {
      const { data, error } = await supabase
        .from('scoring_sessions')
        .insert({
          name,
          description,
          created_by: createdBy,
          status: 'active',
          aggregation_method: aggregationMethod,
        })
        .select()
        .single();

      if (error) {
        console.error('Error creating session:', error);
        return null;
      }

      return data as ScoringSession;
    } catch (error) {
      console.error('Error creating session:', error);
      return null;
    }
  }

  /**
   * Load all sessions
   */
  async loadSessions(): Promise<ScoringSession[]> {
    if (!supabase) {
      return [];
    }

    try {
      const { data, error } = await supabase
        .from('scoring_sessions')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error loading sessions:', error);
        return [];
      }

      return (data as ScoringSession[]) || [];
    } catch (error) {
      console.error('Error loading sessions:', error);
      return [];
    }
  }

  /**
   * Load a single session with all details (features, scores, aggregates)
   */
  async loadSessionWithDetails(sessionId: string): Promise<SessionWithDetails | null> {
    if (!supabase) {
      return null;
    }

    try {
      // Load session
      const { data: session, error: sessionError } = await supabase
        .from('scoring_sessions')
        .select('*')
        .eq('id', sessionId)
        .single();

      if (sessionError || !session) {
        console.error('Error loading session:', sessionError);
        return null;
      }

      // Load features
      const { data: features, error: featuresError } = await supabase
        .from('session_features')
        .select('*')
        .eq('session_id', sessionId)
        .order('display_order', { ascending: true });

      if (featuresError) {
        console.error('Error loading features:', featuresError);
        return null;
      }

      // Load scores
      const { data: scores, error: scoresError } = await supabase
        .from('session_scores')
        .select('*')
        .eq('session_id', sessionId);

      if (scoresError) {
        console.error('Error loading scores:', scoresError);
        return null;
      }

      // Load aggregates
      const { data: aggregates, error: aggregatesError } = await supabase
        .from('session_aggregates')
        .select('*')
        .eq('session_id', sessionId);

      if (aggregatesError) {
        console.error('Error loading aggregates:', aggregatesError);
        return null;
      }

      return {
        ...session,
        features: (features as SessionFeature[]) || [],
        scores: (scores as SessionScore[]) || [],
        aggregates: (aggregates as SessionAggregate[]) || [],
      } as SessionWithDetails;
    } catch (error) {
      console.error('Error loading session with details:', error);
      return null;
    }
  }

  /**
   * Add features to a session
   */
  async addFeaturesToSession(
    sessionId: string,
    features: { name: string; description?: string }[]
  ): Promise<SessionFeature[]> {
    if (!supabase) {
      return [];
    }

    try {
      const featuresToInsert = features.map((feature, index) => ({
        session_id: sessionId,
        name: feature.name,
        description: feature.description,
        display_order: index,
      }));

      const { data, error } = await supabase
        .from('session_features')
        .insert(featuresToInsert)
        .select();

      if (error) {
        console.error('Error adding features:', error);
        return [];
      }

      return (data as SessionFeature[]) || [];
    } catch (error) {
      console.error('Error adding features:', error);
      return [];
    }
  }

  /**
   * Save a user's score for a feature
   */
  async saveSessionScore(
    sessionId: string,
    featureId: string,
    scoredBy: string,
    impact: number | null,
    confidence: number | null,
    effort: number | null,
    iceScore: number | null,
    tier?: ScoreTier,
    justification?: string,
    responses?: any
  ): Promise<SessionScore | null> {
    if (!supabase) {
      return null;
    }

    try {
      const { data, error } = await supabase
        .from('session_scores')
        .insert({
          session_id: sessionId,
          feature_id: featureId,
          scored_by: scoredBy,
          impact,
          confidence,
          effort,
          ice_score: iceScore,
          tier_name: tier?.name ?? null,
          tier_priority: tier?.priority ?? null,
          justification,
          responses: responses || null,
        })
        .select()
        .single();

      if (error) {
        console.error('Error saving session score:', error);
        return null;
      }

      return data as SessionScore;
    } catch (error) {
      console.error('Error saving session score:', error);
      return null;
    }
  }

  /**
   * Update an existing session score
   */
  async updateSessionScore(
    scoreId: string,
    updates: {
      impact?: number | null;
      confidence?: number | null;
      effort?: number | null;
      ice_score?: number | null;
      tier_name?: string;
      tier_priority?: string;
      justification?: string;
    }
  ): Promise<SessionScore | null> {
    if (!supabase) {
      return null;
    }

    try {
      const { data, error } = await supabase
        .from('session_scores')
        .update(updates)
        .eq('id', scoreId)
        .select()
        .single();

      if (error) {
        console.error('Error updating session score:', error);
        return null;
      }

      return data as SessionScore;
    } catch (error) {
      console.error('Error updating session score:', error);
      return null;
    }
  }

  /**
   * Get aggregates for a session
   */
  async getSessionAggregates(sessionId: string): Promise<SessionAggregate[]> {
    if (!supabase) {
      return [];
    }

    try {
      const { data, error } = await supabase
        .from('session_aggregates')
        .select('*')
        .eq('session_id', sessionId);

      if (error) {
        console.error('Error loading aggregates:', error);
        return [];
      }

      return (data as SessionAggregate[]) || [];
    } catch (error) {
      console.error('Error loading aggregates:', error);
      return [];
    }
  }

  /**
   * Get detailed breakdown for a specific feature
   */
  async getFeatureBreakdown(
    sessionId: string,
    featureId: string
  ): Promise<FeatureScoreBreakdown | null> {
    if (!supabase) {
      return null;
    }

    try {
      // Load feature
      const { data: feature, error: featureError } = await supabase
        .from('session_features')
        .select('*')
        .eq('id', featureId)
        .eq('session_id', sessionId)
        .single();

      if (featureError || !feature) {
        console.error('Error loading feature:', featureError);
        return null;
      }

      // Load aggregate
      const { data: aggregate, error: aggregateError } = await supabase
        .from('session_aggregates')
        .select('*')
        .eq('session_id', sessionId)
        .eq('feature_id', featureId)
        .single();

      if (aggregateError || !aggregate) {
        console.error('Error loading aggregate:', aggregateError);
        return null;
      }

      // Load individual scores
      const { data: scores, error: scoresError } = await supabase
        .from('session_scores')
        .select('*')
        .eq('session_id', sessionId)
        .eq('feature_id', featureId);

      if (scoresError) {
        console.error('Error loading scores:', scoresError);
        return null;
      }

      return {
        feature: feature as SessionFeature,
        aggregate: aggregate as SessionAggregate,
        individualScores: (scores as SessionScore[]) || [],
      };
    } catch (error) {
      console.error('Error loading feature breakdown:', error);
      return null;
    }
  }

  /**
   * Update session status
   */
  async updateSessionStatus(
    sessionId: string,
    status: 'active' | 'completed' | 'archived'
  ): Promise<boolean> {
    if (!supabase) {
      return false;
    }

    try {
      const { error } = await supabase
        .from('scoring_sessions')
        .update({ status })
        .eq('id', sessionId);

      if (error) {
        console.error('Error updating session status:', error);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Error updating session status:', error);
      return false;
    }
  }

  /**
   * Delete a session and all related data (cascades automatically)
   */
  async deleteSession(sessionId: string): Promise<boolean> {
    if (!supabase) {
      return false;
    }

    try {
      const { error } = await supabase
        .from('scoring_sessions')
        .delete()
        .eq('id', sessionId);

      if (error) {
        console.error('Error deleting session:', error);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Error deleting session:', error);
      return false;
    }
  }

  /**
   * Check if a user has scored a feature in a session
   */
  async hasUserScoredFeature(
    sessionId: string,
    featureId: string,
    scoredBy: string
  ): Promise<boolean> {
    if (!supabase) {
      return false;
    }

    try {
      const { data, error } = await supabase
        .from('session_scores')
        .select('id')
        .eq('session_id', sessionId)
        .eq('feature_id', featureId)
        .eq('scored_by', scoredBy)
        .single();

      if (error && error.code !== 'PGRST116') {
        // PGRST116 = no rows returned
        console.error('Error checking user score:', error);
        return false;
      }

      return !!data;
    } catch (error) {
      console.error('Error checking user score:', error);
      return false;
    }
  }

  /**
   * Get user's existing score for a feature
   */
  async getUserScore(
    sessionId: string,
    featureId: string,
    scoredBy: string
  ): Promise<SessionScore | null> {
    if (!supabase) {
      return null;
    }

    try {
      const { data, error } = await supabase
        .from('session_scores')
        .select('*')
        .eq('session_id', sessionId)
        .eq('feature_id', featureId)
        .eq('scored_by', scoredBy)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error loading user score:', error);
        return null;
      }

      return data as SessionScore | null;
    } catch (error) {
      console.error('Error loading user score:', error);
      return null;
    }
  }
}

export const sessionStore = new SessionStore();
