export abstract class View {
    abstract template(): string;
    abstract eventsMap(): { [key: string]: () => void };

    constructor(public parent: Element | null) {
        if (!this.parent) {
            throw new Error('Parent element not found!');
        }
    }

    bindEvents(fragment: DocumentFragment): void {
        const eventsMap = this.eventsMap();

        for (let eventKey in eventsMap) {
            const [eventName, selector] = eventKey.split(':');
            const callback = eventsMap[eventKey];
            const elements = fragment.querySelectorAll(selector);

            if (elements && elements.length > 0) {
                elements.forEach((element) => {
                    element.addEventListener(eventName, callback, false);
                });
            }
        }
    }

    render(): void {
        if (!this.parent) {
            return;
        }

        const templateElement = document.createElement('template');

        templateElement.innerHTML = this.template();
        this.bindEvents(templateElement.content);

        this.parent.innerHTML = '';
        this.parent.append(templateElement.content);
    }
}
