// Program ID constants from environment variables or fallbacks
const CREATIVE_ID =
  process.env.REACT_APP_CREATIVE_KNOWLEDGE_CENTER_ID ||
  '4a7f12b8-c64d-4138-93ad-92f853f03fb7';

const SCHOOL_ID =
  process.env.REACT_APP_SCHOOL_ID || '87f6bdcb-8c62-4f34-9455-eda35a28990e';

const PRIVATE_ID =
  process.env.REACT_APP_PRIVATE_ID || '0d5c4507-ddbb-4011-a8a5-5d51279d8edb';

const COMMUNITY_ID =
  process.env.REACT_APP_COMMUNITY_ID || '0d3605b4-cb25-4874-ad4b-e6041aabe5f1';

// Program ID to name mapping
export const programIdToName = {
  [CREATIVE_ID]: 'Creative Knowledge Center',
  [SCHOOL_ID]: 'School',
  [PRIVATE_ID]: 'Private',
  [COMMUNITY_ID]: 'Community',
};

// Program name to ID mapping (reverse of the above)
export const programNameToId = {
  'Creative Knowledge Center': CREATIVE_ID,
  School: SCHOOL_ID,
  Private: PRIVATE_ID,
  Community: COMMUNITY_ID,
};

// Helper function to get program name from ID
export function getProgramNameById(programId) {
  return programIdToName[programId] || 'Unknown Program';
}

// Helper function to get program ID from name
export function getProgramIdByName(programName) {
  return programNameToId[programName] || null;
}

// Program abbreviations (as used in OrderTable)
export const programAbbreviations = {
  'Creative Knowledge Center': 'CKC',
  School: 'SP',
  Private: 'PT',
  Community: 'CP',
};

// Helper function to get abbreviation from program name
export function getProgramAbbreviation(programName) {
  return programAbbreviations[programName] || '';
}

// Helper function to get abbreviation from program ID
export function getProgramAbbreviationById(programId) {
  const programName = getProgramNameById(programId);
  return getProgramAbbreviation(programName);
}
