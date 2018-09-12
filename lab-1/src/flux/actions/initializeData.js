import Dispatcher from "../dispatcher/dispatcher";
import ActionTypes from "../constants/usersConstants";
import data from "../../assets/data";

class InitializeData {

    initData() {
        Dispatcher.dispatch({
            actionType: ActionTypes.INITIALIZE,
            value: data.users
        })
    }
}


export default new InitializeData();