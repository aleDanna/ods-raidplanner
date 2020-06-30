import {Login} from "@shared/components/Login/Login";

export const LoginPage = (routeProps) => {

    return Login({history: routeProps.history});
}
