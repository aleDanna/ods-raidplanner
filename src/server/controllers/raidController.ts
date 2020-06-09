import {RaidsPage} from "../../pages/RaidsPage/RaidsPage"

export const RaidController = (express) => {
    express.get('/raids/:mode', RaidsPage);
}
