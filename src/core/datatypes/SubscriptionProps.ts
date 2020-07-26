import { CharacterProps, EmptyCharacter } from '@core/datatypes/CharacterProps';
import { EmptyRaid, RaidProps } from '@core/datatypes/RaidProps';

export interface SubscriptionProps {
  id?: number;
  character: CharacterProps;
  raid: RaidProps;
  groupNumber: number;

  // client props
  esoUsername?: string;
}

export const EmptySubscription = {
  id: 0,
  character: EmptyCharacter,
  raid: EmptyRaid,
  groupNumber: 0
};
