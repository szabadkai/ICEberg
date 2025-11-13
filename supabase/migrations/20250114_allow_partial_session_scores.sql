-- Allow nullable component scores for collaborative sessions
ALTER TABLE session_scores
ALTER COLUMN impact DROP NOT NULL,
  ALTER COLUMN confidence DROP NOT NULL,
  ALTER COLUMN effort DROP NOT NULL,
  ALTER COLUMN ice_score DROP NOT NULL,
  ALTER COLUMN tier_name DROP NOT NULL,
  ALTER COLUMN tier_priority DROP NOT NULL;