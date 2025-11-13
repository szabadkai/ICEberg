import { ScoreResult } from '../types';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { getTierForScore } from '../data/tiers';

export class SupabaseStore {
  async loadScores(): Promise<ScoreResult[]> {
    if (!supabase) return [];

    try {
      const { data, error } = await supabase
        .from('scores')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error loading scores from Supabase:', error);
        return [];
      }

      return (data || []).map(this.mapFromDatabase);
    } catch (error) {
      console.error('Failed to load scores:', error);
      return [];
    }
  }

  async saveScore(score: ScoreResult): Promise<ScoreResult | null> {
    if (!supabase) return null;
    if (score.iceScore === null || !score.tier) {
      throw new Error('Incomplete scores cannot be saved to Supabase.');
    }

    try {
      const { data, error} = await supabase
        .from('scores')
        .insert([this.mapToDatabase(score)])
        .select()
        .single();

      if (error) {
        console.error('Error saving score to Supabase:', error);
        return null;
      }

      return this.mapFromDatabase(data);
    } catch (error) {
      console.error('Failed to save score:', error);
      return null;
    }
  }

  async updateScore(id: string, score: Partial<ScoreResult>): Promise<ScoreResult | null> {
    if (!supabase) return null;

    try {
      const updateData: any = {};

      if (score.featureName) updateData.feature_name = score.featureName;
      if (score.scoredBy) updateData.scored_by = score.scoredBy;
      if (score.impact !== undefined) updateData.impact = score.impact;
      if (score.confidence !== undefined) updateData.confidence = score.confidence;
      if (score.effort !== undefined) updateData.effort = score.effort;
      if (score.iceScore !== undefined && score.iceScore !== null) updateData.ice_score = score.iceScore;
      if (score.tier) {
        updateData.tier_name = score.tier.name;
        updateData.tier_priority = score.tier.priority;
      }
      if (score.justification !== undefined) updateData.justification = score.justification;
      if (score.date) updateData.score_date = score.date;
      if (score.time) updateData.score_time = score.time;

      const { data, error } = await supabase
        .from('scores')
        .update(updateData)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error('Error updating score in Supabase:', error);
        return null;
      }

      return this.mapFromDatabase(data);
    } catch (error) {
      console.error('Failed to update score:', error);
      return null;
    }
  }

  async deleteScore(id: string): Promise<boolean> {
    if (!supabase) return false;

    try {
      const { error } = await supabase
        .from('scores')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting score from Supabase:', error);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Failed to delete score:', error);
      return false;
    }
  }

  async deleteAllScores(): Promise<boolean> {
    if (!supabase) return false;

    try {
      const { error } = await supabase
        .from('scores')
        .delete()
        .neq('id', '00000000-0000-0000-0000-000000000000'); // Delete all

      if (error) {
        console.error('Error deleting all scores from Supabase:', error);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Failed to delete all scores:', error);
      return false;
    }
  }

  private mapFromDatabase(row: any): ScoreResult {
    return {
      id: row.id,
      featureName: row.feature_name,
      scoredBy: row.scored_by,
      impact: parseFloat(row.impact),
      confidence: parseFloat(row.confidence),
      effort: parseFloat(row.effort),
      iceScore: parseFloat(row.ice_score),
      tier: getTierForScore(parseFloat(row.ice_score)),
      justification: row.justification || undefined,
      date: row.score_date,
      time: row.score_time,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
      responses: row.responses || undefined,
    };
  }

  private mapToDatabase(score: ScoreResult): any {
    return {
      feature_name: score.featureName,
      scored_by: score.scoredBy,
      impact: score.impact,
      confidence: score.confidence,
      effort: score.effort,
      ice_score: score.iceScore!,
      tier_name: score.tier!.name,
      tier_priority: score.tier!.priority,
      justification: score.justification || null,
      score_date: score.date,
      score_time: score.time,
      responses: score.responses || null,
    };
  }
}

export const supabaseStore = isSupabaseConfigured ? new SupabaseStore() : null;
