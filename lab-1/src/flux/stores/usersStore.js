import Dispatcher from "../dispatcher/dispatcher"
import EventEmitter  from 'events'
import ActionTypes from '../constants/usersConstants';

let _users = [];
const CHANGE = 'CHANGE';

class UsersStore extends EventEmitter {
    constructor() {
        super();
        Dispatcher.register(this.dispatcherCallback.bind(this))
    }

    dispatcherCallback(action) {
        switch (action.actionType) {
            case ActionTypes.SAVE_USER:
                this.saveUser(action.value);
                break;
            case ActionTypes.UPDATE_USER:
                this.updateUser(action.value);
                break;
            case ActionTypes.INITIALIZE:
                this.initializeUserData(action.value);
                break;

        }
    }

    initializeUserData(users) {
        _users = users;
    }

    saveUser(user) {
        _users.push(user);
        this.emit(CHANGE);
    }

    getAllUsers() {
        return _users;
    }

    updateUser(user) {
        let userIndex;
        for (let i= 0; i <_users.length; i++) {
            if (_users[i].id === user.id) {
                userIndex = i;
                break;
            }
        }
        _users.splice(userIndex, 1, user);
        this.emit(CHANGE);
    }

    addChangeListener(callback) {
        this.on(CHANGE, callback);
    }

    removeChangeListener(callback) {
        this.removeListener(CHANGE, callback);
    }

}


export default new UsersStore();