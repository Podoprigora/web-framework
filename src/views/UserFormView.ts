import { UserModel } from '../models/UserModel';
import { ViewModel } from '../libs/view/ViewModel';

export class UserFormView extends ViewModel<UserModel> {
    constructor(parent: Element | null, model: UserModel) {
        super(parent, model);

        this.onSetRandomAgeButtonClick = this.onSetRandomAgeButtonClick.bind(this);
        this.onSetNameButtonClick = this.onSetNameButtonClick.bind(this);
        this.onSaveButtonClick = this.onSaveButtonClick.bind(this);
    }

    eventsMap() {
        return {
            'click:#btn-set-random-age': this.onSetRandomAgeButtonClick,
            'click:#btn-set-name': this.onSetNameButtonClick,
            'click:#btn-save': this.onSaveButtonClick
        };
    }

    onSetRandomAgeButtonClick(): void {
        this.model.setRandomAge();
    }

    onSetNameButtonClick(): void {
        if (!this.parent) {
            return;
        }

        const nameInputElement = this.parent.querySelector(
            'input[name="name"]'
        ) as HTMLInputElement | null;

        if (nameInputElement) {
            this.model.set({ name: nameInputElement?.value });
        }
    }

    onSaveButtonClick(): void {
        this.model.save();
    }

    template(): string {
        const { id, name = '', age } = this.model.getAll();

        return `
            <form>
                <section>
                    <input type="hidden" name="id" value="${id}" />
                    <p>
                        <label>
                            Username:
                            <input name="name" value="${name}" />
                            <button type="button" id="btn-set-name">Change Name</button>
                        </label>
                    </p>
                    <p>
                        <label>
                            Age:
                            <input type="number" name="age" value="${age}" />
                            <button type="button" id="btn-set-random-age">Set Random Age</button>
                        </label>
                    </p>
                    <p>
                        <button type="button" id="btn-save">Save</button>
                    </p>
                </section>
            </form>
        `;
    }
}
