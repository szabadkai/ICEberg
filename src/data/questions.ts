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
        {
          label: 'No research',
          value: 1,
          helpText: 'Pure hypothesis or internal assumption with no user validation'
        },
        {
          label: 'Anecdotal feedback',
          value: 3,
          helpText: '1-2 individual comments or requests - not representative of broader needs'
        },
        {
          label: 'Small survey (less than 10)',
          value: 5,
          helpText: 'Structured feedback from a handful of users or customers'
        },
        {
          label: 'Substantial research (10-50)',
          value: 7,
          helpText: 'Validated pattern across multiple users through interviews, surveys, or data'
        },
        {
          label: 'Extensive research (50+)',
          value: 10,
          helpText: 'Strong statistical evidence from large sample or repeated validation'
        },
      ],
    },
    {
      id: 'confidence-experience',
      text: 'Have we built something similar before?',
      options: [
        {
          label: 'Completely novel',
          value: 2,
          helpText: 'Never built anything like this - uncharted territory for the team'
        },
        {
          label: 'Some related experience',
          value: 4,
          helpText: 'Built features in similar domains but not this specific functionality'
        },
        {
          label: 'Similar features',
          value: 7,
          helpText: 'Have shipped comparable features with similar complexity'
        },
        {
          label: 'Nearly identical',
          value: 9,
          helpText: 'Built almost the exact same thing before, minor variations'
        },
        {
          label: 'Exact replica',
          value: 10,
          helpText: 'Literally done this exact implementation previously'
        },
      ],
    },
    {
      id: 'confidence-technical',
      text: 'Is the technical solution proven?',
      options: [
        {
          label: 'Theoretical/R&D',
          value: 2,
          helpText: 'Unproven approach - needs research and experimentation'
        },
        {
          label: 'Prototyped',
          value: 4,
          helpText: 'Built a rough proof-of-concept but not battle-tested'
        },
        {
          label: 'POC working',
          value: 6,
          helpText: 'Working prototype demonstrating core functionality'
        },
        {
          label: 'Competitor success',
          value: 8,
          helpText: 'Others have successfully implemented this approach'
        },
        {
          label: 'Industry standard',
          value: 10,
          helpText: 'Well-established, proven solution used widely'
        },
      ],
    },
    {
      id: 'confidence-resources',
      text: 'Do we have all required resources and expertise?',
      options: [
        {
          label: 'Need hiring',
          value: 2,
          helpText: 'Missing critical skills - must recruit before starting'
        },
        {
          label: 'Significant upskilling required',
          value: 4,
          helpText: 'Team needs substantial training or learning to execute'
        },
        {
          label: 'Minor gaps',
          value: 6,
          helpText: 'Mostly ready, some learning or external help needed'
        },
        {
          label: 'Most expertise available',
          value: 8,
          helpText: 'Team has the necessary skills, minor knowledge gaps'
        },
        {
          label: 'All secured',
          value: 10,
          helpText: 'Everything we need is ready and available now'
        },
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
        {
          label: 'Distributed systems',
          value: 1,
          helpText: 'Multi-region, cross-service coordination, complex infrastructure'
        },
        {
          label: 'Multiple services',
          value: 3,
          helpText: 'Changes across 3+ services or systems'
        },
        {
          label: 'Backend + Frontend',
          value: 5,
          helpText: 'Full-stack changes with API and UI work'
        },
        {
          label: 'Mostly one layer',
          value: 7,
          helpText: 'Primarily frontend OR backend changes'
        },
        {
          label: 'Configuration only',
          value: 10,
          helpText: 'No code changes - just settings or feature flags'
        },
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
