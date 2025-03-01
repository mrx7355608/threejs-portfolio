let events;

export const getEvents = () => {
    if (!events) {
        events = new EventTarget();
    }

    return events;
};
