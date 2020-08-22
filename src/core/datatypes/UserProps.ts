import { CharacterProps } from '@core/datatypes/CharacterProps';
import { CredentialProps, EmptyCredentialProps } from '@core/datatypes/CredentialProps';

export interface UserProps {
  id?: string;
  name: string;
  surname: string;
  esoUsername: string;
  rank: number;
  credential: CredentialProps;
  characters?: Array<CharacterProps>;
}

export const EmptyUserProps: UserProps = {
  name: '',
  surname: '',
  esoUsername: '',
  rank: 0,
  credential: EmptyCredentialProps
};
