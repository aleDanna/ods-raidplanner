import {Raids} from "@shared/components/Raids/Raids";
import {isMobile} from "react-device-detect";
import raidsSubscriptionService from "../../server/services/raid-subscription-service";

export const RaidsPage = (routeProps) => {
    const mode = routeProps.match.params.mode;
    const groups = raidsSubscriptionService.getAvailableRaidGroups(""); //TODO implement session to get userId

    return (
        Raids({mode, groups, isMobile})
    );
}
