export interface CredentialProps {
  username: string;
  password: string;
  role: string;
}

export const EmptyCredentialProps: CredentialProps = {
  username: '',
  password: '',
  role: ''
};
