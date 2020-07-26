import { EmptyRaidGroup, RaidGroupProps } from '@core/datatypes/RaidGroupProps';
import { SubscriptionProps } from '@core/datatypes/SubscriptionProps';

export interface RaidProps {
  id?: number;
  startDate: string;
  endDate: string;
  raidGroup: RaidGroupProps;
  subscriptions?: Array<SubscriptionProps>;
}

export const EmptyRaid: RaidProps = {
  id: 0,
  startDate: '',
  endDate: '',
  raidGroup: EmptyRaidGroup,
  subscriptions: []
};
