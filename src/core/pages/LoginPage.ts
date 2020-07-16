import { Login } from '../ui/components/Login/Login';
import { ContentTitle } from '../ui/components/ContentTitle/ContentTitle';
import pageBuilder from '../common/pageBuilder';
import { PageProps } from '@core/datatypes/PageProps';

export const LoginPage = ({ history }: PageProps) => {
  const title = ContentTitle({ nameTitle: 'Login' });
  const mainComponent = Login({ history: history });

  return pageBuilder.build(title, mainComponent);
};
