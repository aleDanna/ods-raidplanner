import { GroupProps, RoleProps } from '@core/datatypes/EnumProps';

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

export const getGroupValue = (groupEnum: string): GroupProps => {
  switch (groupEnum) {
    case 'IV_LEGIONE':
      return {description: 'IV Legione'};
    case 'V_LEGIONE':
      return {description: 'V Legione'};
    case 'NUMIDIAN_GUARD':
      return {description: 'Numidian Guard'};
    case 'TWO_MOONS_GUARD':
      return {description: 'Two Moons Guard'};
    case 'LORKHAN_GUARD':
      return {description: 'Lorkhan Guard'};
    default: return {description: groupEnum};
  }
};

export const getRoleValue = (roleEnum: string): RoleProps => {
  switch (roleEnum) {
    case 'DAMAGE_DEALER':
      return {
        description: 'Damage Dealer',
        tag: 'DD',
        color: '#e5653c'
      };
    case 'TANK':
      return {
        description: 'Tank',
        tag: 'T',
        color: '#377ea7'
      };
    case 'HEALER':
      return {
        description: 'Healer',
        tag: 'H',
        color: '#bbb586'
      };
    default: return {description: roleEnum, tag: 'NaN', color: 'black'};
  }
};
