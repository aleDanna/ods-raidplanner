export interface EventProps {
  id: string;
  title: string;
  group: string;
  start: string;
  description: string;
  subscriptions: string;
  icon: string;
  subscribed?: boolean;
}

export const EmptyEvent: EventProps = {
  description: '',
  icon: '',
  id: '',
  start: '',
  subscriptions: '',
  title: '',
  group: ''
};