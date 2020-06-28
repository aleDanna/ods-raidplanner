export const calculateSubscriptions = (subscriptions) => {

    const completedGroups = Math.trunc(subscriptions / 12);
    const newGroupCompletedAt = (completedGroups + 1) * 12;
    return {
        startNewGroupIfSubscribe: subscriptions % 12 === 0,
        completeGroupIfSubscribe: (subscriptions + 1) % 12 === 0,
        subscriptions: subscriptions,
        groups: completedGroups,
        newGroupStack: newGroupCompletedAt
    };
}
