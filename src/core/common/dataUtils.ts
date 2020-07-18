export const calculateSubscriptions = subscriptions => {
  const completedGroups = Math.trunc(subscriptions / 12);
  const newGroupCompletedAt = (completedGroups + 1) * 12;
  return {
    startNewGroupIfSubscribe: subscriptions % 12 === 0,
    completeGroupIfSubscribe: (subscriptions + 1) % 12 === 0,
    subscriptions: subscriptions,
    groups: completedGroups,
    newGroupStack: newGroupCompletedAt
  };
};

export const UNALLOWED_WORDS = ['\'', '"', ' ', '*', '(', ')', '[', ']', '{', '}', '|', '/', ','];

export const fieldChecker = (str) => {
  for (const i in UNALLOWED_WORDS) {
    if (str.indexOf(UNALLOWED_WORDS[i]) !== -1) {
      return true;
    }
  }
  return false;
};
