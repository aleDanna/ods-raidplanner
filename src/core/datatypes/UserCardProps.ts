export interface UserCardProps {
  esoUsername: string;
  characterName: string;
  role: string;
}

export const EmptyUserCardProps: UserCardProps = {
  characterName: '',
  esoUsername: '',
  role: ''
};
