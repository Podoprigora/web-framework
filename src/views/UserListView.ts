import { CollectionView } from '../libs/view/CollectionView';
import { UserModel, UserProps } from '../models/UserModel';
import { UserShowView } from './UserShowView';

export class UserListView extends CollectionView<UserModel, UserProps> {
    renderItem(model: UserModel, itemParent: Element): void {
        const userShowView = new UserShowView(itemParent, model);

        userShowView.render();
    }
}
