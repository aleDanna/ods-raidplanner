import { getDateTimeString } from '@core/common/dateUtils';
import { EventProps } from '@core/datatypes/EventProps';

export default {
  transform(raids: any): Array<EventProps> {
    const events: Array<EventProps> = [];
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
};
