import { EmptyRaid, RaidProps } from '@core/datatypes/RaidProps';

export interface EventScheduleProps {
  raid: RaidProps;
  recurrent: boolean;
}

export const EmptyEventSchedule = {
  raid: EmptyRaid,
  recurrent: false
};
