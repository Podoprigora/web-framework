export abstract class View {
    abstract template(): string;

    public regions: { [key: string]: Element } = {};

    constructor(public parent: Element | null) {
        if (!this.parent) {
            throw new Error('Parent element not found!');
        }
    }

    eventsMap(): { [key: string]: () => void } {
        return {};
    }

    regionsMap(): { [key: string]: string } {
        return {};
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

    mapRegions(fragment: DocumentFragment): void {
        const regionsMap = this.regionsMap();

        for (let key in regionsMap) {
            const selector = regionsMap[key];
            const element = fragment.querySelector(selector);

            if (element) {
                this.regions[key] = element;
            }
        }
    }

    onRender(): void {}

    render(): void {
        if (!this.parent) {
            return;
        }

        const templateElement = document.createElement('template');

        templateElement.innerHTML = this.template();
        this.bindEvents(templateElement.content);
        this.mapRegions(templateElement.content);

        this.onRender();

        this.parent.innerHTML = '';
        this.parent.append(templateElement.content);
    }
}
