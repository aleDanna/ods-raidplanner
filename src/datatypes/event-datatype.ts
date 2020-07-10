export interface EventInterface {
    id: string;
    title: string;
    group: string;
    start: string;
    description: string;
    subscriptions: string;
    icon: string;
    subscribed?: boolean;
}

export const EmptyEvent: EventInterface = {
    description: "",
    icon: "",
    id: "",
    start: "",
    subscriptions: "",
    title: "",
    group: ""

}
