export const ProgramOptions = [
  {
    label: 'Programs',
    items: [
      {
        label: 'Creative Knowledge Center',
        value:
          process.env.REACT_APP_CREATIVE_KNOWLEDGE_CENTER_ID ||
          '4a7f12b8-c64d-4138-93ad-92f853f03fb7',
      },
      {
        label: 'School',
        value:
          process.env.REACT_APP_SCHOOL_ID ||
          '87f6bdcb-8c62-4f34-9455-eda35a28990e',
      },
      {
        label: 'Private',
        value:
          process.env.REACT_APP_PRIVATE_ID ||
          '0d5c4507-ddbb-4011-a8a5-5d51279d8edb',
      },
      {
        label: 'Community',
        value:
          process.env.REACT_APP_COMMUNITY_ID ||
          '0d3605b4-cb25-4874-ad4b-e6041aabe5f1',
      },
    ],
  },
];
