import Dispatcher from "../dispatcher/dispatcher"
import ActionTypes from '../constants/usersConstants';

class UsersActions {

    saveUser(user) {
        Dispatcher.dispatch({
            actionType: ActionTypes.SAVE_USER,
            value: user
        })
    }

    updateUser(user) {
        Dispatcher.dispatch({
            actionType: ActionTypes.UPDATE_USER,
            value: user
        })
    }


}


export default new UsersActions();