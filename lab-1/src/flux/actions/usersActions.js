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

    deleteUser(id) {
        console.log("delete user id: " + id)
        Dispatcher.dispatch({
            actionType: ActionTypes.DELETE_USER,
            value: id
        })
    }
}


export default new UsersActions();