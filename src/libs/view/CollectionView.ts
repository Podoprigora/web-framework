import { ModelsCollection } from '../model/ModelsCollection';

export abstract class CollectionView<T, P> {
    abstract renderItem(model: T, itemParent: Element): void;

    constructor(public parent: Element | null, public collection: ModelsCollection<T, P>) {
        this.bindModel();
    }

    bindModel(): void {
        this.collection.on('change', () => {
            this.render();
        });
    }

    render(): void {
        if (!this.parent) {
            return;
        }

        const models = this.collection.models;
        const templateElement = document.createElement('template');

        for (let model of models) {
            const itemParent = document.createElement('div');

            this.renderItem(model, itemParent);
            templateElement.content.append(itemParent);
        }

        this.parent.innerHTML = '';
        this.parent.append(templateElement.content);
    }
}
