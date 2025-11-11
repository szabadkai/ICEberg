-- Add responses column to scores table
ALTER TABLE scores ADD COLUMN IF NOT EXISTS responses JSONB;

-- Add responses column to session_scores table
ALTER TABLE session_scores ADD COLUMN IF NOT EXISTS responses JSONB;

-- Add comments to explain the column
COMMENT ON COLUMN scores.responses IS 'Detailed question responses stored as JSON: {impact: [{questionId, value}], confidence: [...], effort: [...]}';
COMMENT ON COLUMN session_scores.responses IS 'Detailed question responses stored as JSON: {impact: [{questionId, value}], confidence: [...], effort: [...]}';
