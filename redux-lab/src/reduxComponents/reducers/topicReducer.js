export default function topicReducer(state = [], action) {
    switch (action.type) {
        case 'CREATE_TOPIC':
            return createTopic(state, action);

        default:
            return state;
    }
}


function createTopic(state, action) {
    return [...state, Object.assign({}, action.topic)];
}

