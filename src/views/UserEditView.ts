import { ViewModel } from '../libs/view/ViewModel';
import { UserModel } from '../models/UserModel';
import { UserFormView } from './UserFormView';
import { UserShowView } from './UserShowView';

export class UserEditView extends ViewModel<UserModel> {
    regionsMap() {
        return {
            userDetailElement: '.user-detail-section',
            userFormElement: '.user-form-section'
        };
    }

    template(): string {
        return '';
    }

    // template() {
    //     return `
    //         <div>
    //             <div class="user-detail-section"></div>
    //             <div class="user-form-section"></div>
    //         </div>
    //     `;
    // }

    onRender() {
        const { userDetailElement, userFormElement } = this.regions;

        const userDetailView = new UserShowView(userDetailElement, this.model);
        userDetailView.render();

        const userFormView = new UserFormView(userFormElement, this.model);
        userFormView.render();
    }
}
