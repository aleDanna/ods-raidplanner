import { CharacterRoleProps, EmptyCharacterRole } from '@core/datatypes/CharacterRoleProps';

export interface UserCardProps {
  esoUsername: string;
  characterName: string;
  role: CharacterRoleProps;
}

export const EmptyUserCardProps: UserCardProps = {
  characterName: '',
  esoUsername: '',
  role: EmptyCharacterRole
};
