import Papa from 'papaparse';
import { ScoreResult } from '../types';

export function exportToCSV(scores: ScoreResult[]): void {
  const data = scores.map((score) => ({
    'Feature Name': score.featureName,
    Impact: score.impact.toFixed(2),
    Confidence: score.confidence.toFixed(2),
    Effort: score.effort.toFixed(2),
    'ICE Score': score.iceScore.toFixed(2),
    'Priority Tier': score.tier.priority,
    Justification: score.justification || '',
    'Scored By': score.scoredBy,
    Date: score.date,
    Time: score.time,
  }));

  const csv = Papa.unparse(data, {
    quotes: true,
    header: true,
  });

  // Add UTF-8 BOM for better Excel compatibility
  const blob = new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8;' });

  // Generate filename with timestamp
  const now = new Date();
  const timestamp = now.toISOString().replace(/:/g, '-').split('.')[0];
  const filename = `ice-scores-${timestamp}.csv`;

  // Create download link
  const link = document.createElement('a');
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
}
