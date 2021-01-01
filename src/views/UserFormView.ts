import { UserModel } from '../models/UserModel';
import { ViewModel } from '../libs/view/ViewModel';

export class UserFormView extends ViewModel<UserModel> {
    constructor(parent: Element | null, model: UserModel) {
        super(parent, model);

        this.onSetRandomAgeButtonClick = this.onSetRandomAgeButtonClick.bind(this);
        this.onSetNameButtonClick = this.onSetNameButtonClick.bind(this);
    }

    eventsMap() {
        return {
            'click:button#set-random-age': this.onSetRandomAgeButtonClick,
            'click:button#set-name': this.onSetNameButtonClick
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

    template(): string {
        const { id, name, age } = this.model.getAll();

        return `
            <form>
                <header>
                    <h3>User: ${name}</h3>
                </header>
                <section>
                    <input type="hidden" name="id" value="${id}" />
                    <p>
                        <label>
                            Username:
                            <input name="name" value="${name}" />
                            <button type="button" id="set-name">Change Name</button>
                        </label>
                    </p>
                    <p>
                        <label>
                            Age:
                            <input type="number" name="age" value="${age}" />
                        </label>
                    </p>
                    <button type="button" id="set-random-age">Set Random Age</button>
                </section>
            </form>
        `;
    }
}
