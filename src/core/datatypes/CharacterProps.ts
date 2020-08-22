import { CharacterRoleProps, EmptyCharacterRole } from '@core/datatypes/CharacterRoleProps';

export interface CharacterProps {
  id?: number;
  name: string;
  role: CharacterRoleProps;
  userId: number;
}

export const EmptyCharacter = {
  id: 0,
  name: '',
  role: EmptyCharacterRole,
  userId: 0
};
