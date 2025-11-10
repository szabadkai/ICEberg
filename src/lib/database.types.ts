export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      scores: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          feature_name: string
          scored_by: string
          impact: number
          confidence: number
          effort: number
          ice_score: number
          tier_name: string
          tier_priority: string
          justification: string | null
          score_date: string
          score_time: string
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          feature_name: string
          scored_by: string
          impact: number
          confidence: number
          effort: number
          ice_score: number
          tier_name: string
          tier_priority: string
          justification?: string | null
          score_date: string
          score_time: string
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          feature_name?: string
          scored_by?: string
          impact?: number
          confidence?: number
          effort?: number
          ice_score?: number
          tier_name?: string
          tier_priority?: string
          justification?: string | null
          score_date?: string
          score_time?: string
        }
      }
    }
  }
}
