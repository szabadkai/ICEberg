-- Create scoring_sessions table
CREATE TABLE IF NOT EXISTS scoring_sessions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,

  -- Session info
  name TEXT NOT NULL,
  description TEXT,
  created_by TEXT NOT NULL,

  -- Session status
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'completed', 'archived')),

  -- Aggregation settings
  aggregation_method TEXT NOT NULL DEFAULT 'mean' CHECK (aggregation_method IN ('mean', 'median', 'weighted', 'trimmed'))
);

-- Create session_features table (features within a session)
CREATE TABLE IF NOT EXISTS session_features (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,

  -- Link to session
  session_id UUID NOT NULL REFERENCES scoring_sessions(id) ON DELETE CASCADE,

  -- Feature info
  name TEXT NOT NULL,
  description TEXT,

  -- Display order
  display_order INTEGER NOT NULL DEFAULT 0
);

-- Create session_scores table (individual user scores)
CREATE TABLE IF NOT EXISTS session_scores (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,

  -- Links
  session_id UUID NOT NULL REFERENCES scoring_sessions(id) ON DELETE CASCADE,
  feature_id UUID NOT NULL REFERENCES session_features(id) ON DELETE CASCADE,

  -- Scorer info
  scored_by TEXT NOT NULL,

  -- Score components
  impact DECIMAL(5,2) NOT NULL CHECK (impact >= 0 AND impact <= 10),
  confidence DECIMAL(5,2) NOT NULL CHECK (confidence >= 0 AND confidence <= 10),
  effort DECIMAL(5,2) NOT NULL CHECK (effort >= 0 AND effort <= 10),
  ice_score DECIMAL(10,2) NOT NULL CHECK (ice_score >= 0 AND ice_score <= 1000),

  -- Tier info
  tier_name TEXT NOT NULL,
  tier_priority TEXT NOT NULL,

  -- Optional justification
  justification TEXT,

  -- Prevent duplicate scores from same user for same feature
  UNIQUE(session_id, feature_id, scored_by)
);

-- Create session_aggregates table (calculated consensus scores)
CREATE TABLE IF NOT EXISTS session_aggregates (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,

  -- Links
  session_id UUID NOT NULL REFERENCES scoring_sessions(id) ON DELETE CASCADE,
  feature_id UUID NOT NULL REFERENCES session_features(id) ON DELETE CASCADE,

  -- Aggregated scores
  avg_impact DECIMAL(5,2) NOT NULL,
  avg_confidence DECIMAL(5,2) NOT NULL,
  avg_effort DECIMAL(5,2) NOT NULL,
  avg_ice_score DECIMAL(10,2) NOT NULL,

  -- Consensus metrics
  score_count INTEGER NOT NULL DEFAULT 0,
  impact_stddev DECIMAL(5,2),
  confidence_stddev DECIMAL(5,2),
  effort_stddev DECIMAL(5,2),
  ice_stddev DECIMAL(10,2),

  -- Final tier based on aggregate
  tier_name TEXT NOT NULL,
  tier_priority TEXT NOT NULL,

  -- Prevent duplicate aggregates
  UNIQUE(session_id, feature_id)
);

-- Create indexes
CREATE INDEX idx_sessions_status ON scoring_sessions(status);
CREATE INDEX idx_sessions_created_at ON scoring_sessions(created_at DESC);

CREATE INDEX idx_session_features_session ON session_features(session_id);
CREATE INDEX idx_session_features_order ON session_features(session_id, display_order);

CREATE INDEX idx_session_scores_session ON session_scores(session_id);
CREATE INDEX idx_session_scores_feature ON session_scores(feature_id);
CREATE INDEX idx_session_scores_scorer ON session_scores(scored_by);
CREATE INDEX idx_session_scores_unique_key ON session_scores(session_id, feature_id, scored_by);

CREATE INDEX idx_session_aggregates_session ON session_aggregates(session_id);
CREATE INDEX idx_session_aggregates_feature ON session_aggregates(feature_id);

-- Enable Row Level Security
ALTER TABLE scoring_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE session_features ENABLE ROW LEVEL SECURITY;
ALTER TABLE session_scores ENABLE ROW LEVEL SECURITY;
ALTER TABLE session_aggregates ENABLE ROW LEVEL SECURITY;

-- Public access policies (for demo - restrict in production)
CREATE POLICY "Allow public read sessions" ON scoring_sessions FOR SELECT USING (true);
CREATE POLICY "Allow public insert sessions" ON scoring_sessions FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update sessions" ON scoring_sessions FOR UPDATE USING (true);
CREATE POLICY "Allow public delete sessions" ON scoring_sessions FOR DELETE USING (true);

CREATE POLICY "Allow public read features" ON session_features FOR SELECT USING (true);
CREATE POLICY "Allow public insert features" ON session_features FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update features" ON session_features FOR UPDATE USING (true);
CREATE POLICY "Allow public delete features" ON session_features FOR DELETE USING (true);

CREATE POLICY "Allow public read scores" ON session_scores FOR SELECT USING (true);
CREATE POLICY "Allow public insert scores" ON session_scores FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update scores" ON session_scores FOR UPDATE USING (true);
CREATE POLICY "Allow public delete scores" ON session_scores FOR DELETE USING (true);

CREATE POLICY "Allow public read aggregates" ON session_aggregates FOR SELECT USING (true);
CREATE POLICY "Allow public insert aggregates" ON session_aggregates FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update aggregates" ON session_aggregates FOR UPDATE USING (true);
CREATE POLICY "Allow public delete aggregates" ON session_aggregates FOR DELETE USING (true);

-- Triggers for updated_at
CREATE TRIGGER update_sessions_updated_at
  BEFORE UPDATE ON scoring_sessions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_session_scores_updated_at
  BEFORE UPDATE ON session_scores
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_session_aggregates_updated_at
  BEFORE UPDATE ON session_aggregates
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Function to calculate and update aggregates
CREATE OR REPLACE FUNCTION update_session_aggregates()
RETURNS TRIGGER AS $$
BEGIN
  -- Recalculate aggregates for the affected feature
  INSERT INTO session_aggregates (
    session_id,
    feature_id,
    avg_impact,
    avg_confidence,
    avg_effort,
    avg_ice_score,
    score_count,
    impact_stddev,
    confidence_stddev,
    effort_stddev,
    ice_stddev,
    tier_name,
    tier_priority
  )
  SELECT
    NEW.session_id,
    NEW.feature_id,
    AVG(impact),
    AVG(confidence),
    AVG(effort),
    AVG(ice_score),
    COUNT(*),
    STDDEV(impact),
    STDDEV(confidence),
    STDDEV(effort),
    STDDEV(ice_score),
    -- Determine tier based on average ICE score
    CASE
      WHEN AVG(ice_score) <= 100 THEN 'Low Priority'
      WHEN AVG(ice_score) <= 300 THEN 'Medium Priority'
      WHEN AVG(ice_score) <= 500 THEN 'Good Candidate'
      WHEN AVG(ice_score) <= 700 THEN 'Strong Contender'
      ELSE 'Top Priority'
    END,
    CASE
      WHEN AVG(ice_score) <= 100 THEN 'Low'
      WHEN AVG(ice_score) <= 300 THEN 'Medium'
      WHEN AVG(ice_score) <= 500 THEN 'Good'
      WHEN AVG(ice_score) <= 700 THEN 'High'
      ELSE 'Critical'
    END
  FROM session_scores
  WHERE session_id = NEW.session_id AND feature_id = NEW.feature_id
  GROUP BY session_id, feature_id
  ON CONFLICT (session_id, feature_id) DO UPDATE SET
    avg_impact = EXCLUDED.avg_impact,
    avg_confidence = EXCLUDED.avg_confidence,
    avg_effort = EXCLUDED.avg_effort,
    avg_ice_score = EXCLUDED.avg_ice_score,
    score_count = EXCLUDED.score_count,
    impact_stddev = EXCLUDED.impact_stddev,
    confidence_stddev = EXCLUDED.confidence_stddev,
    effort_stddev = EXCLUDED.effort_stddev,
    ice_stddev = EXCLUDED.ice_stddev,
    tier_name = EXCLUDED.tier_name,
    tier_priority = EXCLUDED.tier_priority,
    updated_at = TIMEZONE('utc'::text, NOW());

  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to auto-update aggregates when scores are added/updated
CREATE TRIGGER auto_update_aggregates
  AFTER INSERT OR UPDATE ON session_scores
  FOR EACH ROW
  EXECUTE FUNCTION update_session_aggregates();
