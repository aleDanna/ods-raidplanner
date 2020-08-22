import { ContentTitle } from '@core/ui/atoms/ContentTitle/ContentTitle';
import pageBuilder from '@core/common/pageBuilder';
import { Error } from '../ui/components/Error/Error';

export const ErrorPage = () => {

  const titleComponent = ContentTitle({ nameTitle: 'Si é verificato un errore!' });
  const mainComponent = Error();

  return pageBuilder.build(titleComponent, mainComponent);
};
