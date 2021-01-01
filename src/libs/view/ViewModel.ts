import { View } from './View';

interface ViewModelInterface {
    on(eventName: string, callback: () => void): void;
}

export abstract class ViewModel<T extends ViewModelInterface> extends View {
    constructor(parent: Element | null, public model: T) {
        super(parent);

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
}
