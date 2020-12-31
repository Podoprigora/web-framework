interface ViewModelInterface {
    on(eventName: string, callback: () => void): void;
}

export abstract class View<T extends ViewModelInterface> {
    abstract template(): string;
    abstract eventsMap(): { [key: string]: () => void };

    constructor(public parent: Element | null, public model: T | null) {
        if (!this.parent) {
            throw new Error('Parent element not found!');
        }

        this.bindModel();
    }

    bindModel(): void {
        if (!this.model) {
            return;
        }

        this.model.on('change', () => {
            this.render();
        });
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
