type EventCallback = (details?: any) => void;

class Dispatcher {
  private events: { [event: string]: { listeners: EventCallback[], details?: any } };

  constructor() {
    this.events = {};
  }

  public getEvent(event: string) {
    return this.events[event];
  }

  public add(event: string, callback: EventCallback) {
    if (typeof callback !== 'function') {
      console.error(`The listener callback must be a function, the given type is ${typeof callback}`);
      return false;
    }

    if (typeof event !== 'string') {
      console.error(`The event name must be a string, the given type is ${typeof event}`);
      return false;
    }

    if (!this.events[event]) {
      this.events[event] = { listeners: [] };
    }

    this.events[event].listeners.push(callback);
  }

  public remove(events: string[]) {
    events.forEach((event: string) => {
      delete this.events[event];
    });
  }

  public dispatch(event: string, details?: any) {
    if (!this.events[event]) {
      console.warn(`This event: ${event} does not exist`);
      return;
    }

    this.events[event].details = details;
    this.events[event].listeners.forEach((listener: EventCallback) => {
      listener(details);
    });
  }
}

export default new Dispatcher();