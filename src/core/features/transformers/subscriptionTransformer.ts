import { SubscriptionProps } from '@core/datatypes/SubscriptionProps';

export default {
  transform(subscription: any): SubscriptionProps {
      return {
        id: Number(subscription.id),
        esoUsername: subscription.eso_username,
        characterName: subscription.character_name,
        roleName: subscription.role_name,
        groupNumber: Number(subscription.group_number)
      };
  },

  transformArray(subscriptions: any): Array<SubscriptionProps> {
    const result: Array<SubscriptionProps> = [];
    subscriptions.forEach(subscription => {
      result.push(this.transform(subscription));
    });
    return result;
  }
};
