-- Create scores table
CREATE TABLE IF NOT EXISTS scores (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,

  -- Feature information
  feature_name TEXT NOT NULL,
  scored_by TEXT NOT NULL,

  -- Score components
  impact DECIMAL(5,2) NOT NULL CHECK (impact >= 0 AND impact <= 10),
  confidence DECIMAL(5,2) NOT NULL CHECK (confidence >= 0 AND confidence <= 10),
  effort DECIMAL(5,2) NOT NULL CHECK (effort >= 0 AND effort <= 10),
  ice_score DECIMAL(10,2) NOT NULL CHECK (ice_score >= 0 AND ice_score <= 1000),

  -- Tier information
  tier_name TEXT NOT NULL,
  tier_priority TEXT NOT NULL,

  -- Optional justification
  justification TEXT,

  -- Score metadata
  score_date DATE NOT NULL,
  score_time TIME NOT NULL
);

-- Create index on created_at for sorting
CREATE INDEX idx_scores_created_at ON scores(created_at DESC);

-- Create index on ice_score for filtering/sorting
CREATE INDEX idx_scores_ice_score ON scores(ice_score DESC);

-- Create index on feature_name for searching
CREATE INDEX idx_scores_feature_name ON scores(feature_name);

-- Enable Row Level Security
ALTER TABLE scores ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to read scores (for demo purposes)
-- In production, you'd want to add authentication
CREATE POLICY "Allow public read access" ON scores
  FOR SELECT
  USING (true);

-- Create policy to allow anyone to insert scores (for demo purposes)
CREATE POLICY "Allow public insert access" ON scores
  FOR INSERT
  WITH CHECK (true);

-- Create policy to allow anyone to update scores (for demo purposes)
CREATE POLICY "Allow public update access" ON scores
  FOR UPDATE
  USING (true);

-- Create policy to allow anyone to delete scores (for demo purposes)
CREATE POLICY "Allow public delete access" ON scores
  FOR DELETE
  USING (true);

-- Create function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = TIMEZONE('utc'::text, NOW());
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to call the function
CREATE TRIGGER update_scores_updated_at
  BEFORE UPDATE ON scores
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
