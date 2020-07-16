import { CharacterProps } from '@core/datatypes/CharacterProps';

export interface UserProps {
  id: string;
  name: string;
  surname: string;
  esousername: string;
  rank: string;
  username: string;
  role: string;
  characters: Array<CharacterProps>;
}

export const EmptyUserProps: UserProps = {
  id: '',
  name: '',
  surname: '',
  esousername: '',
  rank: '',
  username: '',
  role: '',
  characters: []
};
