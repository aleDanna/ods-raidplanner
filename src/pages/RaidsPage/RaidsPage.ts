import raidsSubscriptionService from "../../server/services/raid-subscription-service"
import { Raids } from "../../components/Raids/Raids";
import {renderWithPageBuilder} from "../../server/pageBuilder/pageBuilder"

export const RaidsPage = async (req, res) => {
    const allowedGroups = await raidsSubscriptionService.getAvailableRaidGroups(req.userId);
    const component = Raids({groups: allowedGroups, mode: req.params.mode, isMobile: req.device.type === "phone"});
    res.render('templatePage', renderWithPageBuilder(component));
}
