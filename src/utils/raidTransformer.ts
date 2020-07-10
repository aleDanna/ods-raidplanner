import {getDateTimeString} from "./dateUtils";
import {EventInterface} from "../datatypes/event-datatype";

export default {
    transformSingle(raid) {

    },
    transform(raids): Array<EventInterface> {
        const events: Array<EventInterface> = [];
        raids.forEach(event => {
            events.push({
                id: event.id,
                title: event.name,
                group: event.group_id,
                start: event.start_date,
                description: `${event.name} del ${getDateTimeString(event.start_date)}`,
                subscriptions: event.subscriptions,
                icon: event.image_name
            });
        });
        return events;
    }
}
