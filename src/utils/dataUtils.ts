export const calculateSubscriptions = (subscriptions) => {

    const completedGroups = Math.trunc(subscriptions / 12);
    const newGroupCompletedAt = (completedGroups + 1) * 12;
    return subscriptions + "/" + newGroupCompletedAt;
}
