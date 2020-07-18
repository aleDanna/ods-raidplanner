import { ContentTitle } from '@core/ui/atoms/ContentTitle/ContentTitle';
import pageBuilder from '@core/common/pageBuilder';
import { SignUp } from '@core/ui/components/SignUp/SignUp';

export const SignUpPage = (routeProps) => {

    const title = ContentTitle({nameTitle: 'SignUp'});
    const mainComponent = SignUp({history: routeProps.history});

    return pageBuilder.build(title, mainComponent);
};
