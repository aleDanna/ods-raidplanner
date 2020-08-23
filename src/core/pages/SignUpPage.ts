import { ContentTitle } from '@core/ui/atoms/ContentTitle/ContentTitle';
import pageBuilder from '@core/common/pageBuilder';
import { SignUp } from '@core/ui/components/SignUp/SignUp';

export const SignUpPage = () => {

    const title = ContentTitle({nameTitle: 'SignUp'});
    const mainComponent = SignUp();

    return pageBuilder.build(title, mainComponent);
};
