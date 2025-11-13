-- Demo collaborative session data for local testing
-- Run this script inside the Supabase SQL editor or any psql shell.

BEGIN;

-- Clean up previous demo runs so the script is idempotent
DELETE FROM scoring_sessions
WHERE name IN ('Northstar Growth FY25', 'Field Feedback Blitz');

WITH inserted_sessions AS (
  INSERT INTO scoring_sessions (name, description, created_by, status, aggregation_method)
  VALUES
    (
      'Northstar Growth FY25',
      'Focus features for the upcoming enterprise push. Mix of growth and retention bets.',
      'Demo Bot',
      'active',
      'mean'
    ),
    (
      'Field Feedback Blitz',
      'Weekly sync with CSM + Support to triage high-impact fixes from the last quarter.',
      'Demo Bot',
      'active',
      'median'
    )
  RETURNING id, name
), feature_templates AS (
  SELECT * FROM (
    VALUES
      ('Northstar Growth FY25', 'Guided Onboarding Tour', 'Contextual tips and walkthroughs tuned to persona.', 0),
      ('Northstar Growth FY25', 'Usage-Based Billing Alerts', 'Notify admins as spend nears contract thresholds.', 1),
      ('Northstar Growth FY25', 'AI Project Briefs', 'Summarize discovery notes into ready-to-share briefs.', 2),
      ('Northstar Growth FY25', 'Workspace Templates', 'Packaged best-practice configurations for new teams.', 3),
      ('Field Feedback Blitz', 'Bulk SLA Editor', 'One place to tweak SLAs across segments.', 0),
      ('Field Feedback Blitz', 'Segment Health Radar', 'Segment-level health with churn risk surfacing.', 1),
      ('Field Feedback Blitz', 'Case Replay Links', 'Shareable replays of tricky support cases for coaching.', 2)
  ) AS f(session_name, feature_name, feature_description, display_order)
), inserted_features AS (
  INSERT INTO session_features (session_id, name, description, display_order)
  SELECT s.id, f.feature_name, f.feature_description, f.display_order
  FROM feature_templates f
  JOIN inserted_sessions s ON s.name = f.session_name
  ORDER BY s.name, f.display_order
  RETURNING id, session_id, name
), score_templates AS (
  SELECT * FROM (
    VALUES
      -- Northstar Growth FY25
      ('Northstar Growth FY25', 'Guided Onboarding Tour', 'Avery Chen', 8.5, 7.2, 4.0, 153.0, 'Strong Contender', 'High', 'Onboarding NPS drops when this is missing.'),
      ('Northstar Growth FY25', 'Guided Onboarding Tour', 'Priya Patel', 9.0, 8.1, 5.0, 146.0, 'Strong Contender', 'High', 'Enterprise pilots asked for guardrails.'),
      ('Northstar Growth FY25', 'Guided Onboarding Tour', 'Marco Ruiz', 7.8, 6.5, 4.2, 121.0, 'Good Candidate', 'Medium', 'Enables scaled launches but not urgent.'),

      ('Northstar Growth FY25', 'Usage-Based Billing Alerts', 'Avery Chen', 8.0, 7.5, 3.5, 171.0, 'Top Priority', 'Critical', 'Prevents surprise overages for key accounts.'),
      ('Northstar Growth FY25', 'Usage-Based Billing Alerts', 'Priya Patel', 7.5, 7.9, 4.2, 141.0, 'Strong Contender', 'High', 'Finance flagged this in QBRs.'),
      ('Northstar Growth FY25', 'Usage-Based Billing Alerts', 'Marco Ruiz', 6.8, 7.0, 4.5, 106.0, 'Good Candidate', 'Medium', 'Useful but requires deep billing work.'),

      ('Northstar Growth FY25', 'AI Project Briefs', 'Avery Chen', 6.5, 6.8, 3.0, 148.0, 'Strong Contender', 'High', 'Cuts prep time for rollout teams.'),
      ('Northstar Growth FY25', 'AI Project Briefs', 'Priya Patel', 7.2, 6.5, 3.8, 123.0, 'Good Candidate', 'Medium', 'Pilot PMs liked early mockups.'),
      ('Northstar Growth FY25', 'AI Project Briefs', 'Marco Ruiz', 5.8, 6.2, 3.5, 103.0, 'Good Candidate', 'Medium', 'Could drift into "nice to have".'),

      ('Northstar Growth FY25', 'Workspace Templates', 'Avery Chen', 7.9, 7.1, 4.0, 140.0, 'Strong Contender', 'High', 'Improves time-to-value for new workspaces.'),
      ('Northstar Growth FY25', 'Workspace Templates', 'Priya Patel', 7.0, 6.8, 4.2, 114.0, 'Good Candidate', 'Medium', 'Ops teams can self-serve faster.'),
      ('Northstar Growth FY25', 'Workspace Templates', 'Marco Ruiz', 6.2, 6.0, 4.0, 93.0, 'Medium Priority', 'Medium', 'Nice uplift but not urgent.'),

      -- Field Feedback Blitz
      ('Field Feedback Blitz', 'Bulk SLA Editor', 'Lena Ortiz', 6.5, 7.2, 3.0, 156.0, 'Strong Contender', 'High', 'Success engineers spend hours tweaking SLAs.'),
      ('Field Feedback Blitz', 'Bulk SLA Editor', 'Noah Smith', 7.2, 6.9, 3.6, 138.0, 'Strong Contender', 'High', 'Critical for big deal renewals.'),
      ('Field Feedback Blitz', 'Bulk SLA Editor', 'Harper Lee', 5.8, 6.4, 3.5, 106.0, 'Good Candidate', 'Medium', 'Reduces toil but not customer facing.'),

      ('Field Feedback Blitz', 'Segment Health Radar', 'Lena Ortiz', 8.2, 7.5, 4.5, 137.0, 'Strong Contender', 'High', 'Execs want single risk view.'),
      ('Field Feedback Blitz', 'Segment Health Radar', 'Noah Smith', 7.9, 7.3, 4.2, 138.0, 'Strong Contender', 'High', 'Pairs well with QBR decks.'),
      ('Field Feedback Blitz', 'Segment Health Radar', 'Harper Lee', 8.5, 7.8, 4.8, 138.0, 'Strong Contender', 'High', 'CSMs lobbied hard for this.'),

      ('Field Feedback Blitz', 'Case Replay Links', 'Lena Ortiz', 6.2, 6.5, 2.5, 161.0, 'Top Priority', 'Critical', 'Support enablement win; reduces shadowing.'),
      ('Field Feedback Blitz', 'Case Replay Links', 'Noah Smith', 5.9, 6.4, 2.8, 135.0, 'Strong Contender', 'High', 'Links well with Academy content.'),
      ('Field Feedback Blitz', 'Case Replay Links', 'Harper Lee', 6.5, 6.8, 3.2, 138.0, 'Strong Contender', 'High', 'Reps can self-review tricky cases.')
  ) AS st(session_name, feature_name, scored_by, impact, confidence, effort, ice_score, tier_name, tier_priority, justification)
), inserted_scores AS (
  INSERT INTO session_scores (
    session_id,
    feature_id,
    scored_by,
    impact,
    confidence,
    effort,
    ice_score,
    tier_name,
    tier_priority,
    justification,
    responses
  )
  SELECT
    s.id,
    f.id,
    st.scored_by,
    st.impact,
    st.confidence,
    st.effort,
    st.ice_score,
    st.tier_name,
    st.tier_priority,
    st.justification,
    NULL::jsonb
  FROM score_templates st
  JOIN inserted_sessions s ON s.name = st.session_name
  JOIN inserted_features f ON f.session_id = s.id AND f.name = st.feature_name
  RETURNING id
)
SELECT
  (SELECT COUNT(*) FROM inserted_sessions) AS sessions_seeded,
  (SELECT COUNT(*) FROM inserted_features) AS features_seeded,
  (SELECT COUNT(*) FROM inserted_scores) AS scores_seeded;

COMMIT;
