import { ScoreTier } from '../types';

export const scoreTiers: ScoreTier[] = [
  {
    name: 'Low Priority',
    range: '0 - 100',
    priority: 'Low',
    description: 'Weak combination of impact, confidence, or ease',
    example: 'Adding fax machine integration to a mobile app',
    color: '#EF4444',
    illustration: 'tier1',
  },
  {
    name: 'Medium Priority',
    range: '101 - 300',
    priority: 'Medium',
    description: 'Moderate overall score across dimensions',
    example: 'Custom notification sounds per feature',
    color: '#F59E0B',
    illustration: 'tier2',
  },
  {
    name: 'Good Candidate',
    range: '301 - 500',
    priority: 'Good',
    description: 'Solid opportunity worth considering',
    example: 'Adding bulk actions to admin panel',
    color: '#3B82F6',
    illustration: 'tier3',
  },
  {
    name: 'Strong Contender',
    range: '501 - 700',
    priority: 'High',
    description: 'High value opportunity with good confidence',
    example: 'Improved search with filters and sorting',
    color: '#10B981',
    illustration: 'tier4',
  },
  {
    name: 'Top Priority',
    range: '701+',
    priority: 'Critical',
    description: 'Excellent combination of high impact, confidence, and ease',
    example: 'One-click checkout for returning customers',
    color: '#059669',
    illustration: 'tier5',
  },
];

export function getTierForScore(iceScore: number): ScoreTier {
  if (iceScore <= 100) return scoreTiers[0];
  if (iceScore <= 300) return scoreTiers[1];
  if (iceScore <= 500) return scoreTiers[2];
  if (iceScore <= 700) return scoreTiers[3];
  return scoreTiers[4];
}
