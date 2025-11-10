import { QuestionSection } from '../types';

export const impactQuestions: QuestionSection = {
  id: 'impact',
  title: 'Impact',
  description: 'How significant will the impact of this feature be?',
  questions: [
    {
      id: 'impact-reach',
      text: 'What percentage of your user base will this feature affect?',
      options: [
        { label: 'Less than 5% of users', value: 1 },
        { label: '5% - 20% of users', value: 3 },
        { label: '20% - 50% of users', value: 5 },
        { label: '50% - 80% of users', value: 8 },
        { label: '80%+ of users', value: 10 },
      ],
    },
    {
      id: 'impact-metric',
      text: 'What is the expected impact on your primary metric?',
      helpText: 'Consider revenue, retention, engagement, or conversion rate',
      options: [
        { label: 'Less than 1%', value: 1 },
        { label: '1% - 5%', value: 3 },
        { label: '5% - 10%', value: 5 },
        { label: '10% - 25%', value: 8 },
        { label: '25%+', value: 10 },
      ],
    },
    {
      id: 'impact-segment',
      text: 'Which user segment does this primarily serve?',
      options: [
        { label: 'Edge cases', value: 2 },
        { label: 'Secondary personas', value: 4 },
        { label: 'Significant segment', value: 6 },
        { label: 'Primary personas', value: 8 },
        { label: 'All core users', value: 10 },
      ],
    },
    {
      id: 'impact-alignment',
      text: 'What is the business priority alignment?',
      options: [
        { label: 'Nice to have', value: 2 },
        { label: 'Secondary objectives', value: 4 },
        { label: 'Quarterly goals', value: 6 },
        { label: 'Annual OKRs', value: 8 },
        { label: 'Critical initiative', value: 10 },
      ],
    },
  ],
};

export const confidenceQuestions: QuestionSection = {
  id: 'confidence',
  title: 'Confidence',
  description: 'How confident are we that this feature will succeed?',
  questions: [
    {
      id: 'confidence-research',
      text: 'What level of user research supports this?',
      options: [
        { label: 'No research', value: 1 },
        { label: 'Anecdotal feedback', value: 3 },
        { label: 'Small survey (less than 10)', value: 5 },
        { label: 'Substantial research (10-50)', value: 7 },
        { label: 'Extensive research (50+)', value: 10 },
      ],
    },
    {
      id: 'confidence-experience',
      text: 'Have we built something similar before?',
      options: [
        { label: 'Completely novel', value: 2 },
        { label: 'Some related experience', value: 4 },
        { label: 'Similar features', value: 7 },
        { label: 'Nearly identical', value: 9 },
        { label: 'Exact replica', value: 10 },
      ],
    },
    {
      id: 'confidence-technical',
      text: 'Is the technical solution proven?',
      options: [
        { label: 'Theoretical/R&D', value: 2 },
        { label: 'Prototyped', value: 4 },
        { label: 'POC working', value: 6 },
        { label: 'Competitor success', value: 8 },
        { label: 'Industry standard', value: 10 },
      ],
    },
    {
      id: 'confidence-resources',
      text: 'Do we have all required resources and expertise?',
      options: [
        { label: 'Need hiring', value: 2 },
        { label: 'Significant upskilling required', value: 4 },
        { label: 'Minor gaps', value: 6 },
        { label: 'Most expertise available', value: 8 },
        { label: 'All secured', value: 10 },
      ],
    },
  ],
};

export const effortQuestions: QuestionSection = {
  id: 'effort',
  title: 'Effort',
  description: 'How much effort will be required to build this feature?',
  questions: [
    {
      id: 'effort-time',
      text: 'How many sprints will this require?',
      helpText: 'Assume 2-week sprints',
      options: [
        { label: '6+ sprints', value: 1 },
        { label: '4-6 sprints', value: 3 },
        { label: '2-3 sprints', value: 6 },
        { label: '1 sprint', value: 9 },
        { label: 'Less than 1 sprint', value: 10 },
      ],
    },
    {
      id: 'effort-coordination',
      text: 'How many teams need to be involved?',
      options: [
        { label: '4+ teams', value: 1 },
        { label: '3 teams', value: 3 },
        { label: '2 teams', value: 6 },
        { label: '1 team, multiple squads', value: 8 },
        { label: '1 squad', value: 10 },
      ],
    },
    {
      id: 'effort-complexity',
      text: 'What is the technical complexity?',
      options: [
        { label: 'Distributed systems', value: 1 },
        { label: 'Multiple services', value: 3 },
        { label: 'Backend + Frontend', value: 5 },
        { label: 'Mostly one layer', value: 7 },
        { label: 'Configuration only', value: 10 },
      ],
    },
    {
      id: 'effort-dependencies',
      text: 'How many external dependencies exist?',
      options: [
        { label: '4+ blocking dependencies', value: 1 },
        { label: '3 dependencies', value: 3 },
        { label: '1-2 dependencies', value: 6 },
        { label: 'Soft dependencies only', value: 8 },
        { label: 'None', value: 10 },
      ],
    },
  ],
};

export const questionSections = [impactQuestions, confidenceQuestions, effortQuestions];
