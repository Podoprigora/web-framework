import { ViewModel } from '../libs/view/ViewModel';
import { UserModel } from '../models/UserModel';

export class UserShowView extends ViewModel<UserModel> {
    template() {
        const { name = '', age = '' } = this.model.getAll();

        return `
            <section>
                <header>
                    <h3>User Detail</h3>
                </header>
                <div>
                    <div>
                        <span>Name: ${name}</span>
                    </div>
                    <div>
                        <span>Age: ${age}</span>
                    </div>
                
                </div>
            </section>
        `;
    }
}
